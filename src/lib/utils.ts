import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { atomWithStorage } from 'jotai/utils'
import { RandomUser } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function faToEnDigits(str: string): string {
  return str.replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728));
}


export const userAtom = atomWithStorage<RandomUser | null>('user', null)
