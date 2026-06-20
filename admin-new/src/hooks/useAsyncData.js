/**
 * @fileoverview Reusable hook for page-level async data fetching with loading state.
 */

import { useCallback, useEffect, useState } from 'react'

/**
 * Fetches data when the component mounts (or when `deps` change) and exposes
 * loading state plus a manual `reload` function.
 *
 * @param {() => Promise<*>} fetcher - Async function that returns the resource data.
 * @param {Array<unknown>} [deps=[]] - Dependency list that triggers a refetch when changed.
 * @returns {{ data: *, loading: boolean, error: string|null, reload: () => Promise<void>, setData: Function }}
 */
export function useAsyncData(fetcher, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetcher()
      setData(result)
    } catch (err) {
      setError(err?.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- fetch-on-mount; reload updates loading/data state
    void reload()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, loading, error, reload }
}
