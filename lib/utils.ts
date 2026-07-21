import { twMerge } from "tailwind-merge";

export type ClassValue = string | number | null | boolean | undefined;

export function cn(...inputs: ClassValue[]): string {
  return twMerge(inputs.filter(Boolean).join(" "));
}
