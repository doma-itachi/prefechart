import {
    type PopulationCompositionPerYear,
    type Prefecture,
    zPopulationCompositionPerYearResponse,
    zPrefectureResponse,
} from "@/app/types";
import { env } from "@/env";
import { HTTPException } from "hono/http-exception";
import type { ContentfulStatusCode } from "hono/utils/http-status";
import { type ZodSchema, z } from "zod";

const cacheStorage: {
    [key: string]: {
        data: object;
        expire: number; //unix
    };
} = {};
const cacheLimitMin = 60 * 24; //1日 - 変更可能性が低いため

async function fetchWithCache<T extends object>(
    responseSchema: ZodSchema<T>,
    url: string,
): Promise<T> {
    const now = Date.now();

    if (cacheStorage[url] && cacheStorage[url].expire > now) {
        return cacheStorage[url].data as T;
    }

    const res = await fetch(url, {
        headers: {
            "X-API-KEY": env.API_KEY,
        },
    });

    if (!res.ok) {
        throw new HTTPException(res.status as ContentfulStatusCode, {
            message: await res.text(),
        });
    }

    const json = await res.json();
    try {
        const response = responseSchema.parse(json);
        cacheStorage[url] = {
            data: response,
            expire: now + cacheLimitMin * 60 * 1000,
        };
        return response;
    } catch (e) {
        if (e instanceof z.ZodError) {
            throw new HTTPException(500, {
                message: JSON.stringify(e.issues, null, "    "),
            });
        }
        throw new HTTPException(500);
    }
}

export async function getPrefectures(): Promise<Prefecture[]> {
    const url = new URL("/api/v1/prefectures", env.API_ENDPOINT);
    const res = await fetchWithCache(zPrefectureResponse, url.toString());
    return res.result;
}

export async function getPopulationComposition(
    prefCode: number,
): Promise<PopulationCompositionPerYear> {
    const url = new URL(
        "/api/v1/population/composition/perYear",
        env.API_ENDPOINT,
    );
    url.searchParams.append("prefCode", prefCode.toString());
    const res = await fetchWithCache(
        zPopulationCompositionPerYearResponse,
        url.toString(),
    );
    return res.result;
}
