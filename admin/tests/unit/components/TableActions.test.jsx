import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TableActions from '@/components/common/TableActions'

describe('TableActions', () => {
  it('invokes edit, toggle, and delete handlers', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onToggle = vi.fn()
    const onDelete = vi.fn()

    render(<TableActions onEdit={onEdit} onToggle={onToggle} onDelete={onDelete} />)

    const buttons = screen.getAllByRole('button')
    await user.click(buttons[0])
    await user.click(buttons[1])
    await user.click(buttons[2])

    expect(onEdit).toHaveBeenCalledOnce()
    expect(onToggle).toHaveBeenCalledOnce()
    expect(onDelete).toHaveBeenCalledOnce()
  })

  it('hides the toggle button when showToggle is false', () => {
    render(
      <TableActions
        showToggle={false}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
      />,
    )

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
