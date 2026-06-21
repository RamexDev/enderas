import { describe, expect, it, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { toast } from 'sonner'
import { useAsyncData } from '@/hooks/useAsyncData'

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}))

describe('useAsyncData', () => {
  it('loads data on mount', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true })
    const { result } = renderHook(() => useAsyncData(fetcher))

    expect(result.current.loading).toBe(true)

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.data).toEqual({ ok: true })
    expect(fetcher).toHaveBeenCalledOnce()
  })

  it('reloads data when reload is called', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce({ count: 1 })
      .mockResolvedValueOnce({ count: 2 })

    const { result } = renderHook(() => useAsyncData(fetcher))

    await waitFor(() => expect(result.current.data).toEqual({ count: 1 }))

    await result.current.reload()

    await waitFor(() => expect(result.current.data).toEqual({ count: 2 }))
    expect(fetcher).toHaveBeenCalledTimes(2)
  })

  it('shows a toast when loading fails', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('Network down'))
    const { result } = renderHook(() => useAsyncData(fetcher))

    await waitFor(() => expect(result.current.loading).toBe(false))

    expect(result.current.data).toBeNull()
    expect(toast.error).toHaveBeenCalledWith('Network down')
  })
})
