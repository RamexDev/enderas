import { create } from 'zustand'
import { settingsApi } from '@/services/cmsApi'
import { imageUrl } from '@/utils/imageUrl'

export const useSiteStore = create((set) => ({
  logo: '',
  favicon: '',
  loaded: false,
  load: async () => {
    try {
      const data = await settingsApi.get()
      const logo = imageUrl(data.logo)
      const favicon = imageUrl(data.favicon)
      set({ logo, favicon, loaded: true })
      if (favicon) {
        const link = document.querySelector('link[rel="icon"]')
        if (link) link.href = favicon
      }
    } catch {
      set({ loaded: true })
    }
  },
}))
