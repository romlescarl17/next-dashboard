import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sendDiscordCode (email: any, code: any) {
  console.log(`Sending code ${code} to ${email}`)
}
