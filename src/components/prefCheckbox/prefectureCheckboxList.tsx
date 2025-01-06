import type { Prefecture } from "@/app/types";
import { usePrefectures } from "@/hooks/usePrefectures";
import { useEffect, useState } from "react";
import { CheckboxWithLabel } from "../checkboxWithLabel";

export function PrefectureCheckboxList({
    onChangePrefecture,
}: {
    onChangePrefecture?: (selected: Prefecture[]) => void;
}): React.ReactNode {
    const { prefectures, isLoading, error } = usePrefectures();
    const [selectedPrefectures, setSelectedPrefectures] = useState<Set<number>>(
        new Set(),
    );

    function handleCheckboxChange(prefCode: number, checked: boolean) {
        setSelectedPrefectures((e) => {
            const newSet = new Set(e);
            if (checked) {
                newSet.add(prefCode);
            } else {
                newSet.delete(prefCode);
            }

            if (prefectures) {
                onChangePrefecture?.(
                    prefectures.filter((e) => newSet.has(e.prefCode)),
                );
            }

            return newSet;
        });
    }

    return (
        <div className="flex flex-wrap">
            {prefectures?.map((e) => (
                <CheckboxWithLabel
                    className="w-32 grow"
                    key={e.prefCode}
                    label={e.prefName}
                    onChange={(checked) =>
                        handleCheckboxChange(e.prefCode, checked)
                    }
                />
            ))}
        </div>
    );
}
