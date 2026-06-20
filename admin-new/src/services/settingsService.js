/**
 * @fileoverview Global site settings — footer, social links, SEO defaults.
 * Merges site settings API with contact page API for CMS-driven contact info.
 */

import { settingsApi, contactApi } from './publicApi'
import { mapSettings } from '@/utils/mappers'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'

/**
 * Returns site settings for layout components, enriched with contact info from the CMS.
 * Falls back to static defaults when APIs are unavailable.
 * @returns {Promise<object>}
 */
export async function getSettings() {
  try {
    const [settingsResult, contactResult] = await Promise.allSettled([
      settingsApi.get(),
      contactApi.getPage(),
    ])
    return mapSettings(
      settingsResult.status === 'fulfilled' ? settingsResult.value : {},
      contactResult.status === 'fulfilled' ? contactResult.value : {},
    )
  } catch {
    return { ...DEFAULT_SITE_SETTINGS }
  }
}
