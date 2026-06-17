import { useContentStore } from '@/store/useContentStore'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getSettings() {
  await delay()
  return useContentStore.getState().settings
}

export async function updateSettings(settings) {
  await delay()
  useContentStore.getState().setSettings(settings)
  return settings
}

export async function getNav() {
  await delay()
  return useContentStore.getState().nav
}

export async function updateNav(nav) {
  await delay()
  useContentStore.getState().setNav(nav)
  return nav
}

export async function getSlides() {
  await delay()
  return useContentStore.getState().slides
}

export async function updateSlides(slides) {
  await delay()
  useContentStore.getState().setSlides(slides)
  return slides
}

export async function getStats() {
  await delay()
  return useContentStore.getState().stats
}

export async function updateStats(stats) {
  await delay()
  useContentStore.getState().setStats(stats)
  return stats
}

export async function getHomepage() {
  await delay()
  return useContentStore.getState().homepage
}

export async function updateHomepage(homepage) {
  await delay()
  useContentStore.getState().setHomepage(homepage)
  return homepage
}

export async function getAuctionHighlight() {
  await delay()
  return useContentStore.getState().auctionHighlight
}

export async function updateAuctionHighlight(data) {
  await delay()
  useContentStore.getState().setAuctionHighlight(data)
  return data
}

export async function getServicesPromo() {
  await delay()
  return useContentStore.getState().servicesPromo
}

export async function updateServicesPromo(data) {
  await delay()
  useContentStore.getState().setServicesPromo(data)
  return data
}

export async function getCta() {
  await delay()
  return useContentStore.getState().cta
}

export async function updateCta(cta) {
  await delay()
  useContentStore.getState().setCta(cta)
  return cta
}

export async function getAbout() {
  await delay()
  return useContentStore.getState().about
}

export async function updateAbout(about) {
  await delay()
  useContentStore.getState().setAbout(about)
  return about
}

export async function resetContent() {
  await delay()
  useContentStore.getState().resetToSeed()
  return useContentStore.getState()
}
