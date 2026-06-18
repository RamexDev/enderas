import { describe, expect, it } from 'vitest'
import { recordToForm } from '@/hooks/useFormState'

describe('recordToForm', () => {
  const defaults = { title: '', slug: '', content: '' }

  it('returns a copy of defaults when record is null', () => {
    const form = recordToForm(null, defaults)
    expect(form).toEqual(defaults)
    expect(form).not.toBe(defaults)
  })

  it('maps record fields and coerces nullish values to defaults', () => {
    const form = recordToForm({ id: 1, title: 'Hello', slug: null }, defaults)
    expect(form).toEqual({ title: 'Hello', slug: '', content: '' })
  })

  it('ignores extra record keys not in defaults', () => {
    const form = recordToForm({ id: 99, title: 'Post', extra: 'x' }, defaults)
    expect(form).toEqual({ title: 'Post', slug: '', content: '' })
    expect(form).not.toHaveProperty('id')
  })
})
