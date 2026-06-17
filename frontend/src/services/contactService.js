import { useContentStore } from '@/store/useContentStore'
import { generateId } from '@/utils/formatDate'

const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

export async function submitInquiry(data) {
  await delay()
  const message = {
    id: generateId(useContentStore.getState().messages),
    ...data,
    read: false,
    createdAt: new Date().toISOString(),
  }
  useContentStore.getState().addMessage(message)
  return message
}

export async function getMessages() {
  await delay()
  return useContentStore.getState().messages
}

export async function deleteMessage(id) {
  await delay()
  useContentStore.getState().deleteMessage(id)
}

export async function markMessageRead(id) {
  await delay()
  useContentStore.getState().markMessageRead(id)
}
