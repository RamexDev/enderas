import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { contactApi } from '@/services/cmsApi'

const POLL_INTERVAL = 30000

export function useUnreadMessages() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [recentMessages, setRecentMessages] = useState([])
  const highWaterRef = useRef(0)
  const firstRunRef = useRef(true)

  const check = useCallback(async () => {
    try {
      const data = await contactApi.getUnread()
      setUnreadCount(data.count)
      setRecentMessages(data.messages || [])

      if (firstRunRef.current) {
        firstRunRef.current = false
        highWaterRef.current = data.count
      } else if (data.count > highWaterRef.current) {
        highWaterRef.current = data.count
        toast.info(
          `You have ${data.count} unread message${data.count > 1 ? 's' : ''}`,
        )
      }
    } catch {
    }
  }, [])

  useEffect(() => {
    check()
    const interval = setInterval(check, POLL_INTERVAL)
    return () => clearInterval(interval)
  }, [check])

  return { unreadCount, recentMessages }
}
