import { describe, it, expect, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useAsyncData } from '@/hooks/useAsyncData'

describe('useAsyncData', () => {
  it('loads data on mount and clears loading state', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true })
    const { result } = renderHook(() => useAsyncData(fetcher, []))

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(fetcher).toHaveBeenCalledOnce()
    expect(result.current.data).toEqual({ ok: true })
    expect(result.current.error).toBeNull()
  })

  it('captures fetch errors', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('Network failed'))
    const { result } = renderHook(() => useAsyncData(fetcher, []))

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data).toBeNull()
    expect(result.current.error).toBe('Network failed')
  })

  it('reload refetches data', async () => {
    const fetcher = vi.fn().mockResolvedValueOnce({ count: 1 }).mockResolvedValueOnce({ count: 2 })
    const { result } = renderHook(() => useAsyncData(fetcher, []))

    await waitFor(() => expect(result.current.loading).toBe(false))
    await result.current.reload()
    await waitFor(() => expect(result.current.data).toEqual({ count: 2 }))
    expect(fetcher).toHaveBeenCalledTimes(2)
  })
})
