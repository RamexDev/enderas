import { describe, it, expect } from 'vitest'
import { PUBLIC_NAV, AUCTION_LINK } from '@/constants/navigation'

describe('PUBLIC_NAV', () => {
  it('includes all required static routes from the spec', () => {
    const paths = PUBLIC_NAV.map((item) => item.to)
    expect(paths).toContain('/')
    expect(paths).toContain('/about')
    expect(paths).toContain('/services')
    expect(paths).toContain('/gallery')
    expect(paths).toContain('/blog')
    expect(paths).toContain('/contact')
  })

  it('does not register a live /auctions route', () => {
    expect(PUBLIC_NAV.some((item) => item.to === '/auctions')).toBe(false)
  })

  it('points Assets for Sale highlight to placeholder hash', () => {
    const auctionItem = PUBLIC_NAV.find((item) => item.highlight)
    expect(auctionItem?.label).toBe('Assets for Sale')
    expect(auctionItem?.to).toBe('#')
    expect(AUCTION_LINK).toBe('#')
  })
})
