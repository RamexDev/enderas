import { describe, expect, it } from 'vitest'
import { cn } from '@/utils/cn'

describe('cn', () => {
  it('merges conditional class names', () => {
    const hidden = false
    expect(cn('px-2', hidden && 'hidden', 'text-sm')).toBe('px-2 text-sm')
  })

  it('resolves conflicting Tailwind utilities', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })
})
