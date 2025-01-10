import { client } from "@/lib/hono";
import { Client } from "./client";
import type { Prefecture } from "./types";

export default async function Home() {
    const res = await client.api.prefectures.$get();
    if (!res.ok) {
        throw new Error("都道府県一覧の取得に失敗");
    }
    const prefectures: Prefecture[] = await res.json();

    return (
        <div className="md:mx-6">
            <Client prefectures={prefectures} />
        </div>
    );
}
