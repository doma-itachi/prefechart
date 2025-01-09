import type { Stats } from "@/app/types";
import { useMemo } from "react";

type ChartData = {
    name: number;
} & {
    [K: string]: number;
};

type StatLabel = "総人口" | "年少人口" | "生産年齢人口" | "老年人口";

export function usePrefectureStatsConverter(
    stats: Stats,
    label: StatLabel,
): ChartData[] {
    const data = useMemo<ChartData[]>(() => {
        const result: ChartData[] = [];

        for (const i in stats) {
            const prefName = stats[i].prefName;
            const dataTable = stats[i].data.find(
                (e) => e.label === label,
            )?.data;
            if (!dataTable) {
                continue;
            }

            for (const j of dataTable) {
                const index = result.findIndex((e) => e.name === j.year);
                if (index === -1) {
                    const dat: ChartData = {
                        name: j.year,
                    };
                    dat[prefName] = j.value;
                    result.push(dat);
                } else {
                    result[index][prefName] = j.value;
                }
            }
        }
        return result;
    }, [stats, label]);

    return data;
}
