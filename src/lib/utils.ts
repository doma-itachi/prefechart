import clsx from "clsx";
import type { ClassValue } from "clsx";
import shajs from "sha.js";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * 文字列を固有のカラーコード$012345に変換します
 * @param str 対象の文字列
 */
export function stringToColor(str: string): `#${string}` {
    const hash = shajs("sha256").update(str).digest("hex");
    return `#${hash.slice(0, 6)}`;
}
