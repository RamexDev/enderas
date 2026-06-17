import { useEffect, useMemo, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1800, decimals = 0 } = {}) {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const ref = useRef(null)
  const [value, setValue] = useState(reducedMotion ? target : 0)
  const started = useRef(false)

  useEffect(() => {
    if (reducedMotion) return undefined

    const el = ref.current
    if (!el) return undefined

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            const start = performance.now()
            const tick = (now) => {
              const p = Math.min((now - start) / duration, 1)
              const eased = 1 - (1 - p) ** 3
              setValue(target * eased)
              if (p < 1) requestAnimationFrame(tick)
              else setValue(target)
            }
            requestAnimationFrame(tick)
          }
        })
      },
      { threshold: 0.4 },
    )

    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, reducedMotion])

  const display = useMemo(() => {
    const v = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
    return Number(v).toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
  }, [value, decimals])

  return [ref, display]
}

export function useCountdown(targetDate) {
  const calc = useMemo(
    () => () => {
      const diff = new Date(targetDate).getTime() - Date.now()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true }
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        done: false,
      }
    },
    [targetDate],
  )

  const [time, setTime] = useState(calc)

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(id)
  }, [calc])

  return time
}
