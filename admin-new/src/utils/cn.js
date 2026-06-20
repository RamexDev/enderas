import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind-aware className combiner.
 * @param {...any} inputs
 * @returns {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
