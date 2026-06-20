/**
 * @fileoverview Generic async data fetcher used by every preview page.
 *
 * Calls `fetcher` on mount and whenever `deps` change. Exposes `reload` so the
 * EditDrawer can refresh the preview after a save. Errors are surfaced via the
 * `error` field — preview pages render a friendly retry state.
 */
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useAsyncData(fetcher, deps = [], options = {}) {
  const { silent = false } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err)
      if (!silent) {
        // Defer toast so we don't fire during unmount races
        Promise.resolve().then(() => toast.error(err?.message || 'Failed to load content'))
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) {
          setError(err)
          if (!silent) {
            Promise.resolve().then(() => toast.error(err?.message || 'Failed to load content'))
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, setData, loading, error, reload: run }
}
