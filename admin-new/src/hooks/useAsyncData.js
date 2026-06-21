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
  const [refreshing, setRefreshing] = useState(false)
  const [error, setError] = useState(null)

  const run = useCallback(async (isReload = false) => {
    if (isReload) setRefreshing(true)
    else setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err)
      if (!silent) {
        Promise.resolve().then(() => toast.error(err?.message || 'Failed to load content'))
      }
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    run(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, setData, loading, refreshing, error, reload: () => run(true) }
}
