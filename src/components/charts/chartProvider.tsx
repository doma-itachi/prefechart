import type { Prefecture, StatLabel } from "@/app/types";
import { usePopulationStats } from "@/hooks/usePopulationStats";
import { usePrefectureStatsConverter } from "@/hooks/usePrefectureStatsConverter";
import { stringToColor } from "@/lib/utils";
import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export function ChartProvider({
    prefectures,
    label,
}: {
    prefectures: Prefecture[];
    label: StatLabel;
}): React.ReactNode {
    const { prefectureStats, isLoading, error } =
        usePopulationStats(prefectures);
    const chartData = usePrefectureStatsConverter(prefectureStats, label);

    return (
        <ResponsiveContainer width={"100%"} height={400}>
            <LineChart
                data={chartData}
                margin={{
                    left: 20,
                    right: 20,
                }}
            >
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
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    );
}
