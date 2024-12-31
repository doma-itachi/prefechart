"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { type ChangeEvent, useState } from "react";

export function CheckboxWithLabel({
    label,
    className,
    onChange,
}: {
    label: string;
    className?: string;
    onChange?: (checked: boolean) => void;
}): React.ReactNode {
    const [checked, setChecked] = useState(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setChecked(e.target.checked);
        onChange?.(e.target.checked);
    }

    return (
        <label className={cn("inline-flex items-center px-1", className)}>
            <input
                type="checkbox"
                className="appearance-none"
                onChange={handleChange}
            />
            <div className="w-6 h-6 m-1 border flex justify-center items-center rounded">
                <Check
                    className={cn(
                        "transition duration-150",
                        !checked && "opacity-0",
                    )}
                />
            </div>
            <span className="select-none ml-1">{label}</span>
        </label>
    );
}
