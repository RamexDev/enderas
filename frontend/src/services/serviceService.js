import { useContentStore } from '@/store/useContentStore'

const delay = (ms = 150) => new Promise((r) => setTimeout(r, ms))

export async function getServices() {
  await delay()
  return useContentStore.getState().services.filter((s) => s.active !== false)
}

export async function getAllServices() {
  await delay()
  return useContentStore.getState().services
}

export async function getServiceById(id) {
  await delay()
  return useContentStore.getState().services.find((s) => s.id === id)
}

export async function createService(service) {
  await delay()
  useContentStore.getState().addService(service)
  return service
}

export async function updateService(id, data) {
  await delay()
  useContentStore.getState().updateService(id, data)
  return useContentStore.getState().services.find((s) => s.id === id)
}

export async function deleteService(id) {
  await delay()
  useContentStore.getState().deleteService(id)
}
