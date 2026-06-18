import { useState } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { toast } from 'sonner'
import { mediaApi } from '@/services/cmsApi'
import { mediaUrl, normalizeMediaPath } from '@/utils/helpers'
import { getErrorMessage } from '@/utils/errors'
import { Input } from './Input'
import { FormField } from './Input'

export default function ImageField({ label, value, onChange, required }) {
  const [uploading, setUploading] = useState(false)

  const handleUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const media = await mediaApi.upload(file)
      onChange(normalizeMediaPath(media.path))
      toast.success('Image uploaded')
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  return (
    <FormField label={label} required={required}>
      <div className="space-y-3">
        {value && (
          <div className="relative inline-block">
            <img
              src={mediaUrl(value)}
              alt=""
              className="h-32 w-auto max-w-full rounded-lg border border-primary-200 object-cover"
            />
            <button
              type="button"
              onClick={() => onChange('')}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-primary-200 bg-white px-3 py-2 text-sm font-medium text-primary-900 hover:bg-primary-50">
            <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handleUpload} disabled={uploading} />
            <ImagePlus className="h-4 w-4" />
            {uploading ? 'Uploading…' : 'Upload image'}
          </label>
          <Input
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Or paste image path/URL"
            className="max-w-xs"
          />
        </div>
      </div>
    </FormField>
  )
}
