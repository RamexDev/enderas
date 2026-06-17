import { useEffect } from 'react'

export function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal:not(.in-view)')
    if (!els.length) return undefined

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in-view'))
      return undefined
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, deps)
}
