import type { Prefecture } from "@/app/types";
import { client } from "@/lib/hono";
import { useEffect, useMemo, useState } from "react";

export function usePrefectures() {
    const [prefectures, setPrefectures] = useState<Prefecture[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error>();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const res = await client.api.prefectures.$get();
                setPrefectures(await res.json());
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                } else throw e;
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    return { prefectures, isLoading, error };
}
