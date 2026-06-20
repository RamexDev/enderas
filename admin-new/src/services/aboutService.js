/**
 * @fileoverview About page data access — history, mission, vision, values, partners.
 */

import { aboutApi } from './publicApi'
import { mapAboutPageData } from '@/utils/mappers'

/**
 * Fetches and normalizes about page content from the CMS.
 * @returns {Promise<object>}
 */
export async function getAboutPage() {
  const payload = await aboutApi.get()
  return mapAboutPageData(payload)
}
