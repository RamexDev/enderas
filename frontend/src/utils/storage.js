import { STORAGE_KEY } from '@/constants/routes'

export function loadFromStorage(key = STORAGE_KEY) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveToStorage(data, key = STORAGE_KEY) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {
    // Storage full or unavailable
  }
}

export function removeFromStorage(key) {
  try {
    localStorage.removeItem(key)
  } catch {
    // ignore
  }
}
