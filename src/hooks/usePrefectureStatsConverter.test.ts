import { renderHook } from "@testing-library/react";
import { usePrefectureStatsConverter } from "./usePrefectureStatsConverter";
import { Stats } from "@/app/types";

const population: Stats = {
    1: {
        "prefName": "県",
        "boundaryYear": 2020,
        "data": [
            {
                "label": "総人口",
                "data": [
                    {
                        "year": 1960,
                        "value": 1426606,
                    },
                    {
                        "year": 1965,
                        "value": 1416591,
                    }
                ],
            },
            {
                "label": "年少人口",
                "data": [
                    {
                        "year": 1960,
                        "value": 513397,
                        "rate": 35.99,
                    },
                    {
                        "year": 1965,
                        "value": 447068,
                        "rate": 31.56,
                    }
                ],
            },
            {
                "label": "老年人口",
                "data": [
                    {
                        "year": 1960,
                        "value": 64371,
                        "rate": 4.51,
                    },
                    {
                        "year": 1965,
                        "value": 75002,
                        "rate": 5.29,
                    }
                ],
            },
        ],
    },
}
const expected = [
    {
        "name": 1960,
         "県": 1426606,
    },
    {
        "name": 1965,
         "県": 1416591,
    },
]

describe("usePrefectureStatsConverter", () => {
    it("正しく変換されるか", () => {
        const {result} = renderHook(() =>
            usePrefectureStatsConverter(population, "総人口")
        );
        expect(result.current).toStrictEqual(expected);
    });
});
