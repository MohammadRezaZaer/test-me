import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function faToEnDigits(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
}
