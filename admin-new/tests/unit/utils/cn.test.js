import { describe, expect, it } from 'vitest'
import { cn } from '@/utils/cn'

describe('cn', () => {
  it('merges tailwind classes', () => {
    expect(cn('px-4', 'p-2')).toBe('p-2')
  })

  it('handles conditional classes', () => {
    expect(cn('text-red-500', false && 'hidden', 'block')).toBe('text-red-500 block')
  })
})
