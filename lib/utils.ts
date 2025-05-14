import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Function to get the initials of name
export const getInitials = (name: string) => {
  const nameParts = name.split(" ")

  const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("")

  return initials
}

export const getConfidence = (): string => {
  const min = 80
  const max = 90
  const randomPercentage = Math.floor(Math.random() * (max - min + 1)) + min
  return `${randomPercentage}%`
}
