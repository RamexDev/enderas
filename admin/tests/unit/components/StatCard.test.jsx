import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import StatCard from '@/components/common/StatCard'

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Blog Posts" value={12} />)
    expect(screen.getByText('Blog Posts')).toBeInTheDocument()
    expect(screen.getByText('12')).toBeInTheDocument()
  })

  it('wraps content in a link when `to` is provided', () => {
    render(
      <MemoryRouter>
        <StatCard label="Services" value={5} to="/services" />
      </MemoryRouter>,
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/services')
  })
})
