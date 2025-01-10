import type { Prefecture } from "@/app/types";
import { usePopulationStats } from "@/hooks/usePopulationStats";
import { usePrefectureStatsConverter } from "@/hooks/usePrefectureStatsConverter";
import { stringToColor } from "@/lib/utils";
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function ChartProvider({
    prefectures,
}: {
    prefectures: Prefecture[];
}): React.ReactNode {
    const { prefectureStats, isLoading, error } =
        usePopulationStats(prefectures);
    const chartData = usePrefectureStatsConverter(prefectureStats, "総人口");

    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart data={chartData}>
                {Object.values(prefectureStats).map((e) => (
                    <Line
                        type="monotone"
                        dataKey={e.prefName}
                        stroke={stringToColor(e.prefName)}
                        key={e.prefName}
                    />
                ))}
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip itemSorter={(item) => -(item.value as number)} />
            </LineChart>
        </ResponsiveContainer>
    );
}
