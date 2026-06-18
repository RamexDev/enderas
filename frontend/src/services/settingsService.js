/**
 * @fileoverview Global site settings — footer, social links, SEO defaults.
 * Contact display fields use static defaults; optional API settings enrich footer/SEO.
 */

import { settingsApi } from './publicApi'
import { mapSettings } from '@/utils/mappers'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'

/**
 * Returns site settings for layout components, merged with static defaults.
 * Does not call the contact page API — contact info/map are frontend-owned.
 * @returns {Promise<object>}
 */
export async function getSettings() {
  try {
    const settings = await settingsApi.get()
    return mapSettings(settings)
  } catch {
    return { ...DEFAULT_SITE_SETTINGS }
  }
}
