import * as React from "react"
import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"

// Utility: تبدیل اعداد فارسی/عربی به انگلیسی
const toEnglishDigits = (str: string) => {
    return str.replace(/[\u06F0-\u06F9]/g, (d) => String(d.charCodeAt(0) - 0x06F0))
        .replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
};

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input"> & { onlyDigits?: boolean }>(
    ({ className, type = "text", onlyDigits = false, onChange, ...props }, ref) => {
        const { error } = useFormField();

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            let value = e.target.value;

            // اگر فقط عددی باشد:
            if (onlyDigits) {
                value = toEnglishDigits(value); // تبدیل به انگلیسی
                value = value.replace(/[^0-9]/g, ""); // حذف غیرعددی‌ها
            }

            // ایجاد یک event جدید با مقدار اصلاح‌شده
            const event = {
                ...e,
                target: {
                    ...e.target,
                    value,
                },
            };

            onChange?.(event as React.ChangeEvent<HTMLInputElement>);
        };

        return (
            <input
                type={type}
                ref={ref}
                className={cn(
                    "flex h-10 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
                    { "text-red-500 dark:text-red-900 border-red-500 focus-visible:ring-red-500": error },
                    className
                )}
                onChange={handleChange}
                {...props}
            />
        );
    }
);

Input.displayName = "Input";

export { Input };
