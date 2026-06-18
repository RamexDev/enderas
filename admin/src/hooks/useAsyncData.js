import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/errors'

/**
 * Fetches data when the component mounts (or when `deps` change) and exposes
 * loading state plus a manual `reload` function.
 *
 * @param {() => Promise<*>} fetcher - Async function that returns the resource data.
 * @param {Array<unknown>} [deps=[]] - Dependency list that triggers a refetch when changed.
 * @param {{ silent?: boolean }} [options] - When `silent` is true, errors are not toasted.
 * @returns {{ data: *, loading: boolean, reload: () => Promise<void>, setData: Function }}
 */
export function useAsyncData(fetcher, deps = [], options = {}) {
  const { silent = false } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      const result = await fetcher()
      setData(result)
    } catch (error) {
      if (!silent) toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }, [fetcher, silent])

  useEffect(() => {
    reload()
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return { data, setData, loading, reload }
}
