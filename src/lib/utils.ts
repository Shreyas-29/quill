import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
};

export function url(index: number) {
    const url = `https://picsum.photos/1440/2842?random=${index}`;
    return url;
};