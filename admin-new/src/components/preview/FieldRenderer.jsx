/**
 * @fileoverview FieldRenderer — maps a SectionDef's field list to actual form
 * controls. Supports all field types declared in editableSections.js:
 *   text, textarea, email, toggle, image, select,
 *   galleryCategorySelect, blogCategorySelect
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

    case 'blogCategorySelect':
      return <BlogCategorySelectField field={field} value={value} onChange={onChange} />

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

function BlogCategorySelectField({ field, value, onChange }) {
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

  const selected = Array.isArray(value) && value.length > 0 ? value[0] : ''

  return (
    <FormField label={field.label} help={field.help} className={field.full ? 'sm:col-span-2' : ''}>
      <Select value={selected} onChange={(e) => onChange(e.target.value ? [e.target.value] : [])}>
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
