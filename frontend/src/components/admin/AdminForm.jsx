export default function AdminInput({ label, error, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-primary-800 dark:text-primary-200">{label}</label>
      )}
      <input
        className={`w-full rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm text-primary-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-primary-700 dark:bg-primary-950 dark:text-white ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error-600">{error}</p>}
    </div>
  )
}

export function AdminTextArea({ label, error, rows = 4, className = '', ...props }) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-primary-800 dark:text-primary-200">{label}</label>
      )}
      <textarea
        rows={rows}
        className={`w-full resize-y rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm text-primary-900 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:border-primary-700 dark:bg-primary-950 dark:text-white ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error-600">{error}</p>}
    </div>
  )
}

export function AdminCard({ title, children, actions }) {
  return (
    <div className="rounded-2xl border border-primary-100 bg-white p-6 dark:border-primary-800 dark:bg-primary-900">
      {(title || actions) && (
        <div className="mb-5 flex items-center justify-between gap-4">
          {title && <h2 className="font-heading text-xl font-semibold text-primary-900 dark:text-white">{title}</h2>}
          {actions}
        </div>
      )}
      {children}
    </div>
  )
}

export function DataTable({ columns, data, onEdit, onDelete }) {
  if (!data.length) {
    return <p className="text-sm text-primary-600 dark:text-primary-300">No items yet.</p>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b border-primary-100 dark:border-primary-800">
            {columns.map((col) => (
              <th key={col.key} className="px-3 py-2 font-semibold text-primary-700 dark:text-primary-200">
                {col.label}
              </th>
            ))}
            <th className="px-3 py-2 font-semibold text-primary-700 dark:text-primary-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b border-primary-50 dark:border-primary-800/60">
              {columns.map((col) => (
                <td key={col.key} className="px-3 py-3 text-primary-800 dark:text-primary-100">
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
              <td className="px-3 py-3">
                <div className="flex gap-2">
                  {onEdit && (
                    <button
                      type="button"
                      onClick={() => onEdit(row)}
                      className="text-gold-600 hover:text-gold-500 dark:text-gold-400"
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      type="button"
                      onClick={() => onDelete(row)}
                      className="text-error-600 hover:text-error-500"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
