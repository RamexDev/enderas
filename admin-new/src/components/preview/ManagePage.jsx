/**
 * @fileoverview ManagePage — wrapper for non-preview admin surfaces
 * (Messages, Media, Settings, Users). Renders a toolbar-style header
 * and a content area.
 */
import PreviewToolbar from '@/components/preview/PreviewToolbar'

export default function ManagePage({ title, subtitle, action, children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PreviewToolbar title={title} subtitle={subtitle} hideModeToggle />
      <div className="flex-1 bg-sand-50 p-4 lg:p-6 dark:bg-primary-950">
        {action && (
          <div className="mb-4 flex justify-end gap-2">{action}</div>
        )}
        {children}
      </div>
    </div>
  )
}
