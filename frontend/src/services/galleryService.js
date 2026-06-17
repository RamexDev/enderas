import { useContentStore } from '@/store/useContentStore'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getGalleryItems() {
  await delay()
  return useContentStore.getState().gallery
}

export async function createGalleryItem(item) {
  await delay()
  useContentStore.getState().addGalleryItem(item)
  return item
}

export async function updateGalleryItem(id, data) {
  await delay()
  useContentStore.getState().updateGalleryItem(id, data)
  return useContentStore.getState().gallery.find((g) => g.id === id)
}

export async function deleteGalleryItem(id) {
  await delay()
  useContentStore.getState().deleteGalleryItem(id)
}
