/**
 * @fileoverview FieldRenderer — maps a SectionDef's field list to actual form
 * controls. Supports all field types declared in editableSections.js:
 *   text, textarea, email, toggle, image, select,
 *   galleryCategorySelect, blogCategoryMultiSelect
 *
 * The two "select" variants fetch their option lists on mount from the right
 * admin endpoints (gallery categories / blog categories).
 */
import { useEffect, useState } from 'react'
import { galleryApi, blogApi } from '@/services/cmsApi'
import { FormField, Input, Textarea, Select, Toggle } from '@/components/ui/Input'
import ImageField from '@/components/ui/ImageField'

export default function FieldRenderer({ field, value, onChange }) {
  switch (field.type) {
    case 'textarea':
      return (
        <FormField label={field.label} required={field.required} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
          <Textarea
            rows={field.rows || 4}
            value={value ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormField>
      )

    case 'email':
    case 'text':
      return (
        <FormField label={field.label} required={field.required} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
          <Input
            type={field.type === 'email' ? 'email' : 'text'}
            value={value ?? ''}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        </FormField>
      )

    case 'toggle':
      return (
        <div className={field.full ? 'sm:col-span-2' : ''}>
          <Toggle
            checked={Boolean(value)}
            onChange={onChange}
            label={field.label}
            description={field.help}
          />
        </div>
      )

    case 'select':
      return (
        <FormField label={field.label} required={field.required} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
          <Select value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormField>
      )

    case 'image':
      return (
        <div className={field.full ? 'sm:col-span-2' : ''}>
          <ImageField
            label={field.label}
            required={field.required}
            help={field.help}
            value={value}
            onChange={onChange}
          />
        </div>
      )

    case 'galleryCategorySelect':
      return <GalleryCategorySelectField field={field} value={value} onChange={onChange} />

    case 'blogCategoryMultiSelect':
      return <BlogCategoryMultiSelectField field={field} value={value || []} onChange={onChange} />

    default:
      return null
  }
}

function GalleryCategorySelectField({ field, value, onChange }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let cancelled = false
    galleryApi
      .listCategories()
      .then((list) => {
        if (!cancelled) setCategories(Array.isArray(list) ? list : [])
      })
      .catch(() => {
        if (!cancelled) setCategories([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <FormField label={field.label} required={field.required} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
      <Select value={value ?? ''} onChange={(e) => onChange(e.target.value || null)}>
        <option value="">— No category —</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>
    </FormField>
  )
}

function BlogCategoryMultiSelectField({ field, value, onChange }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    let cancelled = false
    blogApi
      .listCategories()
      .then((list) => {
        if (!cancelled) setCategories(Array.isArray(list) ? list : [])
      })
      .catch(() => {
        if (!cancelled) setCategories([])
      })
    return () => {
      cancelled = true
    }
  }, [])

  const selected = Array.isArray(value) ? value : []

  const toggle = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter((v) => v !== id))
    } else {
      onChange([...selected, id])
    }
  }

  return (
    <FormField label={field.label} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
      <div className="flex flex-wrap gap-2 rounded-lg border border-primary-200 bg-white p-2">
        {categories.length === 0 && (
          <span className="px-2 py-1 text-xs text-primary-400">No categories defined yet.</span>
        )}
        {categories.map((c) => {
          const on = selected.includes(c.id)
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => toggle(c.id)}
              className={
                'rounded-full px-3 py-1 text-xs font-medium transition-colors ' +
                (on
                  ? 'bg-gold-500 text-primary-950'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200')
              }
            >
              {c.name}
            </button>
          )
        })}
      </div>
    </FormField>
  )
}
