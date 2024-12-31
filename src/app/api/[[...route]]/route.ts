import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { z } from "zod";
import { getPopulationComposition, getPrefectures } from "../lib/resas";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

const route = app
    .get("/prefectures", async (c) => {
        return c.json(await getPrefectures());
    })
    .get(
        "/population",
        zValidator(
            "query",
            z.object({
                prefCode: z.string(),
            }),
        ),
        async (c) => {
            const query = await c.req.valid("query");
            return c.json(
                await getPopulationComposition(Number.parseInt(query.prefCode)),
            );
        },
    );

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;
