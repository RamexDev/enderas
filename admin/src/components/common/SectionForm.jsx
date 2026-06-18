import { Card, CardBody, CardHeader } from '@/components/ui/Card'
import { Input, Textarea, FormField } from '@/components/ui/Input'

/**
 * Renders a titled card with a responsive grid of labeled inputs.
 * Used on the homepage editor and similar multi-section singleton pages.
 *
 * @param {object} props
 * @param {string} props.title - Section heading.
 * @param {Array<{ key: string, label: string, type?: 'textarea', rows?: number, full?: boolean }>} props.fields
 * @param {object} props.values - Current field values keyed by `field.key`.
 * @param {(key: string, value: string) => void} props.onChange - Field change handler.
 */
export default function SectionForm({ title, fields, values, onChange }) {
  return (
    <Card>
      <CardHeader title={title} />
      <CardBody className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.key} className={field.full ? 'sm:col-span-2' : undefined}>
            <FormField label={field.label}>
              {field.type === 'textarea' ? (
                <Textarea
                  value={values[field.key] || ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  rows={field.rows || 3}
                />
              ) : (
                <Input
                  value={values[field.key] || ''}
                  onChange={(e) => onChange(field.key, e.target.value)}
                />
              )}
            </FormField>
          </div>
        ))}
      </CardBody>
    </Card>
  )
}
