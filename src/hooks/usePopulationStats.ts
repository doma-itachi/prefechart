import type {
    PopulationCompositionPerYear,
    Prefecture,
    Stats,
} from "@/app/types";
import { client } from "@/lib/hono";
import { useEffect, useState } from "react";

const cache: Record<number, PopulationCompositionPerYear> = {};

async function fetchPopulationStat(prefCode: number) {
    if (!cache[prefCode]) {
        const res = await client.api.population.$get({
            query: {
                prefCode: prefCode.toString(),
            },
        });
        cache[prefCode] = await res.json();
    }

    return cache[prefCode];
}

export function usePopulationStats(prefectures: Prefecture[]) {
    const [prefectureStats, setPrefectureStats] = useState<Stats>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const stats: Stats = {};
            for (const pref of prefectures) {
                try {
                    const stat = await fetchPopulationStat(pref.prefCode);
                    stats[pref.prefCode] = { ...stat, prefName: pref.prefName };
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e);
                    } else throw e;
                }
            }
            setPrefectureStats(stats);
            setIsLoading(false);
        })();
    }, [prefectures]);

    return { prefectureStats, isLoading, error };
}
