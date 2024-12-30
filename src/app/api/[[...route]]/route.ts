import { Hono } from "hono";
import { handle } from "hono/vercel";
import { getPopulationComposition, getPrefectures } from "../lib/resas";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

export const runtime = "nodejs";

const app = new Hono().basePath("/api");

app.get("/prefectures", async (c) => {
    return c.json(await getPrefectures());
});

app.get(
    "/population",
    zValidator(
        "query",
        z.object({
            prefCode: z.string()
        })
    ),
    async(c)=>{
        const query = await c.req.valid("query");
        return c.json(await getPopulationComposition(parseInt(query.prefCode)));
    }
);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof app;