import { z } from "zod";

const zPrefecture = z.object({
    prefCode: z.number(),
    prefName: z.string(),
});
export type Prefecture = z.infer<typeof zPrefecture>;

export const zPrefectureResponse = z.object({
    message: z.any(),
    result: z.array(zPrefecture),
});

const zPopulationCompositionPerYearDataCommon = z.object({
    label: z.string(),
    data: z.array(
        z.object({
            year: z.number(),
            value: z.number(),
            rate: z.number(),
        }),
    ),
});

const zPopulationCompositionPerYearDataTotal = z.object({
    label: z.literal("総人口"),
    data: z.array(
        z.object({
            year: z.number(),
            value: z.number(),
        }),
    ),
});

const zPopulationCompositionPerYear = z.object({
    boundaryYear: z.number(),
    data: z.array(
        z.union([
            zPopulationCompositionPerYearDataCommon,
            zPopulationCompositionPerYearDataTotal,
        ]),
    ),
});
export type PopulationCompositionPerYear = z.infer<
    typeof zPopulationCompositionPerYear
>;

export const zPopulationCompositionPerYearResponse = z.object({
    message: z.any(),
    result: zPopulationCompositionPerYear,
});

export type Stats = Record<
    number,
    PopulationCompositionPerYear & { prefName: string }
>;

export const statLabel = ["総人口", "年少人口", "生産年齢人口", "老年人口"];
export type StatLabel = (typeof statLabel)[number];
