/**
 * @fileoverview Global site settings store for layout components (footer, navigation).
 * Falls back to static defaults when the settings API is unavailable.
 */

import { create } from 'zustand'
import { getSettings } from '@/services/settingsService'
import { getServices } from '@/services/serviceService'
import { DEFAULT_SITE_SETTINGS } from '@/constants/siteDefaults'

export const useSiteStore = create((set, get) => ({
  settings: DEFAULT_SITE_SETTINGS,
  services: [],
  isLoading: true,
  hasFetched: false,
  error: null,

  /**
   * Loads global settings and a services list for the footer.
   * Contact info/map always have static defaults even if the API fails.
   */
  initialize: async () => {
    if (get().hasFetched) return
    set({ isLoading: true, error: null })

    const [settingsResult, servicesResult] = await Promise.allSettled([
      getSettings(),
      getServices({ limit: 6 }),
    ])

    set({
      settings:
        settingsResult.status === 'fulfilled' ? settingsResult.value : { ...DEFAULT_SITE_SETTINGS },
      services: servicesResult.status === 'fulfilled' ? servicesResult.value.data : [],
      isLoading: false,
      hasFetched: true,
      error: settingsResult.status === 'rejected' ? settingsResult.reason?.message : null,
    })
  },
}))
