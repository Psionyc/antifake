import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getBaseDomain(str: string): string | null {
  try {
    const url = new URL(str.trim())
    return url.hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}
