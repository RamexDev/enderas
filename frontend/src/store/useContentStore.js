import { create } from 'zustand'
import { getSeedData } from '@/data/seed/cmsData'
import { loadFromStorage, saveToStorage } from '@/utils/storage'
import { STORAGE_KEY } from '@/constants/routes'

function hydrateState() {
  const seed = getSeedData()
  const stored = loadFromStorage(STORAGE_KEY)
  if (!stored) return seed

  const hasAuctionsNav = stored.nav?.some((item) => item.to === '/auctions')
  const usesLegacyContact =
    stored.settings?.address?.includes('New York') ||
    stored.settings?.email === 'contact@enderas.com' ||
    !stored.settings?.mapCoordinates

  return {
    ...seed,
    ...stored,
    nav: hasAuctionsNav ? stored.nav : seed.nav,
    auctionsPage: stored.auctionsPage ?? seed.auctionsPage,
    auctionAssets: stored.auctionAssets?.length ? stored.auctionAssets : seed.auctionAssets,
    settings: usesLegacyContact ? { ...stored.settings, ...seed.settings, social: stored.settings?.social ?? seed.settings.social } : stored.settings,
  }
}

function persist(state) {
  const {
    settings,
    nav,
    slides,
    stats,
    services,
    gallery,
    blog,
    about,
    homepage,
    auctionHighlight,
    auctionsPage,
    auctionAssets,
    servicesPromo,
    cta,
    messages,
  } = state
  saveToStorage({
    settings,
    nav,
    slides,
    stats,
    services,
    gallery,
    blog,
    about,
    homepage,
    auctionHighlight,
    auctionsPage,
    auctionAssets,
    servicesPromo,
    cta,
    messages,
  })
}

export const useContentStore = create((set, get) => ({
  ...hydrateState(),

  setSettings: (settings) => {
    set({ settings })
    persist(get())
  },

  setNav: (nav) => {
    set({ nav })
    persist(get())
  },

  setSlides: (slides) => {
    set({ slides })
    persist(get())
  },

  setStats: (stats) => {
    set({ stats })
    persist(get())
  },

  setServices: (services) => {
    set({ services })
    persist(get())
  },

  addService: (service) => {
    set((s) => {
      const services = [...s.services, service]
      persist({ ...s, services })
      return { services }
    })
  },

  updateService: (id, data) => {
    set((s) => {
      const services = s.services.map((item) => (item.id === id ? { ...item, ...data } : item))
      persist({ ...s, services })
      return { services }
    })
  },

  deleteService: (id) => {
    set((s) => {
      const services = s.services.filter((item) => item.id !== id)
      persist({ ...s, services })
      return { services }
    })
  },

  setGallery: (gallery) => {
    set({ gallery })
    persist(get())
  },

  addGalleryItem: (item) => {
    set((s) => {
      const gallery = [...s.gallery, item]
      persist({ ...s, gallery })
      return { gallery }
    })
  },

  updateGalleryItem: (id, data) => {
    set((s) => {
      const gallery = s.gallery.map((item) => (item.id === id ? { ...item, ...data } : item))
      persist({ ...s, gallery })
      return { gallery }
    })
  },

  deleteGalleryItem: (id) => {
    set((s) => {
      const gallery = s.gallery.filter((item) => item.id !== id)
      persist({ ...s, gallery })
      return { gallery }
    })
  },

  setBlog: (blog) => {
    set({ blog })
    persist(get())
  },

  addBlogPost: (post) => {
    set((s) => {
      const blog = [...s.blog, post]
      persist({ ...s, blog })
      return { blog }
    })
  },

  updateBlogPost: (id, data) => {
    set((s) => {
      const blog = s.blog.map((item) => (item.id === id ? { ...item, ...data } : item))
      persist({ ...s, blog })
      return { blog }
    })
  },

  deleteBlogPost: (id) => {
    set((s) => {
      const blog = s.blog.filter((item) => item.id !== id)
      persist({ ...s, blog })
      return { blog }
    })
  },

  setAbout: (about) => {
    set({ about })
    persist(get())
  },

  setHomepage: (homepage) => {
    set({ homepage })
    persist(get())
  },

  setAuctionHighlight: (auctionHighlight) => {
    set({ auctionHighlight })
    persist(get())
  },

  setServicesPromo: (servicesPromo) => {
    set({ servicesPromo })
    persist(get())
  },

  setCta: (cta) => {
    set({ cta })
    persist(get())
  },

  addMessage: (message) => {
    set((s) => {
      const messages = [message, ...s.messages]
      persist({ ...s, messages })
      return { messages }
    })
  },

  deleteMessage: (id) => {
    set((s) => {
      const messages = s.messages.filter((m) => m.id !== id)
      persist({ ...s, messages })
      return { messages }
    })
  },

  markMessageRead: (id) => {
    set((s) => {
      const messages = s.messages.map((m) => (m.id === id ? { ...m, read: true } : m))
      persist({ ...s, messages })
      return { messages }
    })
  },

  resetToSeed: () => {
    const seed = getSeedData()
    set(seed)
    persist(seed)
  },
}))
