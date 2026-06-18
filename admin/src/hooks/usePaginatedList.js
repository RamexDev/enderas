import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { getErrorMessage } from '@/utils/errors'

const DEFAULT_META = { page: 1, limit: 10, total: 0, totalPages: 1 }

/**
 * Manages paginated list state for CMS tables (services, gallery, posts, etc.).
 *
 * @param {(params: { page: number, limit: number } & Record<string, unknown>) => Promise<{ data: Array, meta: object }>} listFn
 * @param {{ limit?: number, filters?: Record<string, unknown> }} [options]
 * @returns {{
 *   items: Array,
 *   meta: object,
 *   loading: boolean,
 *   loadPage: (page?: number) => Promise<void>,
 *   setFilters: Function,
 *   filters: object,
 * }}
 */
export function usePaginatedList(listFn, options = {}) {
  const { limit = 10, filters: initialFilters = {} } = options
  const [items, setItems] = useState([])
  const [meta, setMeta] = useState({ ...DEFAULT_META, limit })
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState(initialFilters)

  const loadPage = useCallback(async (page = 1) => {
    setLoading(true)
    try {
      const result = await listFn({ page, limit, ...filters })
      setItems(result.data)
      setMeta(result.meta)
    } catch (error) {
      toast.error(getErrorMessage(error))
    } finally {
      setLoading(false)
    }
  }, [listFn, limit, filters])

  useEffect(() => {
    loadPage(1)
  }, [filters]) // eslint-disable-line react-hooks/exhaustive-deps

  return { items, meta, loading, loadPage, setFilters, filters }
}
