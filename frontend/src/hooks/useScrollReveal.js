import { useEffect } from 'react'

/**
 * Observes `.reveal` elements and adds `in-view` when they enter the viewport.
 * Pass a dependency (e.g. loaded page data) so observation runs after async content mounts.
 *
 * @param {Array<unknown>} [deps=[]] - Re-run when async content appears (e.g. `[pageData]`).
 */
export function useScrollReveal(deps = []) {
  useEffect(() => {
    let io = null

    const observe = () => {
      const els = document.querySelectorAll('.reveal:not(.in-view)')
      if (!els.length) return

      if (!('IntersectionObserver' in window)) {
        els.forEach((el) => el.classList.add('in-view'))
        return
      }

      io?.disconnect()
      io = new IntersectionObserver(
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
    }

    const frame = requestAnimationFrame(observe)
    return () => {
      cancelAnimationFrame(frame)
      io?.disconnect()
    }
  }, deps)
}
