import { describe, expect, it, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { toast } from 'sonner'
import { useCrudList } from '@/hooks/useCrudList'

vi.mock('sonner', () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}))

const emptyRecord = { name: '' }

function createMocks() {
  return {
    createFn: vi.fn().mockResolvedValue({ id: 'new' }),
    updateFn: vi.fn().mockResolvedValue({ id: '1' }),
    deleteFn: vi.fn().mockResolvedValue(undefined),
    toggleFn: vi.fn().mockResolvedValue(undefined),
    reload: vi.fn().mockResolvedValue(undefined),
  }
}

describe('useCrudList', () => {
  it('opens create modal with empty defaults', () => {
    const mocks = createMocks()
    const { result } = renderHook(() => useCrudList({ ...mocks, emptyRecord }))

    act(() => result.current.openCreate())

    expect(result.current.isModalOpen).toBe(true)
    expect(result.current.isEditing).toBe(false)
    expect(result.current.editingRecord).toEqual({ name: '' })
  })

  it('creates a record and reloads the list', async () => {
    const mocks = createMocks()
    const { result } = renderHook(() =>
      useCrudList({ ...mocks, emptyRecord, messages: { create: 'Created' } }),
    )

    act(() => result.current.openCreate())
    await act(async () => {
      await result.current.save({ name: 'New item' })
    })

    expect(mocks.createFn).toHaveBeenCalledWith({ name: 'New item' })
    expect(mocks.reload).toHaveBeenCalled()
    expect(toast.success).toHaveBeenCalledWith('Created')
    expect(result.current.isModalOpen).toBe(false)
  })

  it('updates an existing record when editing', async () => {
    const mocks = createMocks()
    const { result } = renderHook(() => useCrudList({ ...mocks, emptyRecord }))

    act(() => result.current.openEdit({ id: '42', name: 'Old' }))
    await act(async () => {
      await result.current.save({ name: 'Updated' })
    })

    expect(mocks.updateFn).toHaveBeenCalledWith('42', { name: 'Updated' })
    expect(mocks.createFn).not.toHaveBeenCalled()
  })

  it('toggles status and shows a toast', async () => {
    const mocks = createMocks()
    const { result } = renderHook(() => useCrudList({ ...mocks, emptyRecord }))

    await act(async () => {
      await result.current.toggle('7')
    })

    expect(mocks.toggleFn).toHaveBeenCalledWith('7')
    expect(toast.success).toHaveBeenCalled()
  })

  it('deletes after confirmation', async () => {
    const mocks = createMocks()
    const { result } = renderHook(() =>
      useCrudList({ ...mocks, emptyRecord, messages: { delete: 'Removed' } }),
    )

    act(() => result.current.setDeleteId('99'))
    await act(async () => {
      await result.current.confirmDelete()
    })

    expect(mocks.deleteFn).toHaveBeenCalledWith('99')
    expect(toast.success).toHaveBeenCalledWith('Removed')
    expect(result.current.deleteId).toBeNull()
    expect(result.current.deleting).toBe(false)
  })

  it('surfaces API errors via toast on save failure', async () => {
    const mocks = createMocks()
    mocks.createFn.mockRejectedValue(new Error('Server error'))
    const { result } = renderHook(() => useCrudList({ ...mocks, emptyRecord }))

    act(() => result.current.openCreate())
    await act(async () => {
      await result.current.save({ name: 'Fail' })
    })

    expect(toast.error).toHaveBeenCalledWith('Server error')
    expect(result.current.isModalOpen).toBe(true)
  })
})
