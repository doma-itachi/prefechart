"use client";

import { ChartProvider } from "@/components/charts/chartProvider";
import { PrefectureCheckboxList } from "@/components/prefCheckbox/prefectureCheckboxList";
import { TabButton } from "@/components/tabButton";
import { useState } from "react";
import { type Prefecture, type StatLabel, statLabel } from "./types";

export function Client({
    prefectures,
}: {
    prefectures: Prefecture[];
}) {
    const [selectedLabel, setSelectedLabel] = useState<StatLabel>(statLabel[0]);
    const [selectedPrefectures, setSelectedPrefectures] = useState<
        Prefecture[]
    >([]);
    return (
        <main className="flex flex-col items-center gap-4 m-2">
            <ChartProvider
                prefectures={selectedPrefectures}
                label={selectedLabel}
            />
            <TabButton items={statLabel} onChange={setSelectedLabel} />
            <PrefectureCheckboxList
                prefectures={prefectures}
                onChangePrefecture={setSelectedPrefectures}
            />
        </main>
    );
}
