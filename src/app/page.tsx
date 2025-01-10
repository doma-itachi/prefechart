import { client } from "@/lib/hono";
import { Client } from "./client";
import type { Prefecture } from "./types";
import { getPrefectures } from "./api/lib/resas";

export default async function Home() {
    let prefectures: Prefecture[];
    try{
        const res = await (await client.api.prefectures.$get()).json();
        prefectures = res;
    }
    catch{
        try{
            const res = await getPrefectures();
            prefectures = res;
        }
        catch{
            throw new Error("都道府県一覧の取得に失敗");
        }
    }

    return (
        <div className="md:mx-6">
            <Client prefectures={prefectures} />
        </div>
    );
}
