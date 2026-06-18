/**
 * @fileoverview Homepage data access — hero, stats, featured content, testimonials, FAQs.
 */

import { homeApi } from './publicApi'
import { mapHomePageData } from '@/utils/mappers'

/**
 * Fetches and normalizes all homepage content from the CMS.
 * @returns {Promise<object>} Mapped homepage view model
 */
export async function getHomePage() {
  const payload = await homeApi.get()
  return mapHomePageData(payload)
}
