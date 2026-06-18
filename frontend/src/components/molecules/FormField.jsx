import { forwardRef } from 'react'

const FormField = forwardRef(function FormField(
  {
    label,
    name,
    type = 'text',
    error,
    touched,
    placeholder,
    textarea,
    rows,
    required,
    autoComplete,
    ...inputProps
  },
  ref,
) {
  const id = `field-${name}`
  const showError = touched && error
  const baseInput =
    'w-full rounded-lg border bg-white px-4 py-3 text-sm text-primary-900 transition-colors placeholder-primary-400/80 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/40 dark:bg-primary-950 dark:text-white dark:placeholder-primary-400/60'
  const stateCls = showError
    ? 'border-error-500 dark:border-error-500'
    : 'border-primary-200 dark:border-primary-700'

  return (
    <div>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-primary-800 dark:text-primary-200">
          {label}
          {required && <span className="ml-0.5 text-gold-600 dark:text-gold-400">*</span>}
        </label>
      )}
      {textarea ? (
        <textarea
          id={id}
          name={name}
          ref={ref}
          placeholder={placeholder}
          rows={rows || 5}
          className={`${baseInput} ${stateCls} resize-y`}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          {...inputProps}
        />
      ) : (
        <input
          id={id}
          type={type}
          name={name}
          ref={ref}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${baseInput} ${stateCls}`}
          aria-invalid={!!showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          {...inputProps}
        />
      )}
      {showError && (
        <p id={`${id}-error`} className="mt-1.5 flex items-center gap-1 text-xs text-error-600 dark:text-error-500" role="alert">
          <span className="inline-block h-1 w-1 rounded-full bg-error-500" />
          {error}
        </p>
      )}
    </div>
  )
})

export default FormField
