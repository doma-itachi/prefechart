import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
    server: {
        API_ENDPOINT: z.string().url(),
        API_KEY: z.string().min(1),
    },
    runtimeEnv: {
        API_ENDPOINT: process.env.API_ENDPOINT,
        API_KEY: process.env.API_KEY,
    }
});