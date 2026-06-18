/**
 * @fileoverview Services listing and detail data access.
 */

import { servicesApi } from './publicApi'
import { mapService } from '@/utils/mappers'

/**
 * Fetches active services with optional pagination.
 * @param {object} [params] - Query params (`page`, `limit`)
 * @returns {Promise<{ data: Array, meta: object }>}
 */
export async function getServices(params = {}) {
  const result = await servicesApi.list(params)
  return { data: result.data.map(mapService), meta: result.meta }
}

/**
 * Fetches a single service by slug.
 * @param {string} slug
 * @returns {Promise<object>}
 */
export async function getServiceBySlug(slug) {
  const service = await servicesApi.getBySlug(slug)
  return mapService(service)
}
