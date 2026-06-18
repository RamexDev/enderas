/**
 * @fileoverview Gallery data access.
 */

import { galleryApi } from './publicApi'
import { mapGalleryItem } from '@/utils/mappers'

/**
 * Fetches gallery items with optional category filter and pagination.
 * @param {object} [params] - Query params (`page`, `limit`, `category`)
 * @returns {Promise<{ data: Array, meta: object }>}
 */
export async function getGalleryItems(params = {}) {
  const result = await galleryApi.list(params)
  return { data: result.data.map(mapGalleryItem), meta: result.meta }
}
