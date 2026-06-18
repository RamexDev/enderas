import { cn } from '@/utils/cn'
import Button from './Button'

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <p className="text-sm text-primary-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export function DataTable({ columns, data, keyField = 'id', emptyMessage = 'No records found' }) {
  if (!data?.length) {
    return <p className="py-8 text-center text-sm text-primary-500">{emptyMessage}</p>
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-primary-200">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-primary-50 text-primary-600">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={cn('px-4 py-3 font-medium', col.className)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-primary-100">
          {data.map((row) => (
            <tr key={row[keyField]} className="bg-white hover:bg-primary-50/50">
              {columns.map((col) => (
                <td key={col.key} className={cn('px-4 py-3 text-primary-800', col.className)}>
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
