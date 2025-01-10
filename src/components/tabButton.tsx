import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type TabButtonProps<T extends string> = {
    items: T[];
    onChange?: (item: T) => void;
};

export function TabButton<T extends string>({
    items,
    onChange,
}: TabButtonProps<T>) {
    const [selectedItem, setSelectedItem] = useState(items[0]);
    // biome-ignore lint: onChangeセット時に発火される
    useEffect(() => {
        onChange?.(selectedItem);
    }, [selectedItem]);

    return (
        <div className="flex gap-2 bg-neutral-100 px-2 py-1 rounded">
            {items.map((e) => (
                <button
                    type="button"
                    onClick={() => setSelectedItem(e)}
                    key={e}
                    className={cn(
                        "px-2 py-1 transition",
                        selectedItem === e && "bg-white rounded shadow-sm",
                    )}
                >
                    {e}
                </button>
            ))}
        </div>
    );
}
