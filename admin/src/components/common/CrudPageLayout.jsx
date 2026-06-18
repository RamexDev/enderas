import { ConfirmDialog } from '@/components/ui/Modal'
import { PageHeader } from '@/components/layout/Header'
import { PageLoader } from '@/components/ui/Loading'

/**
 * Standard layout wrapper for CRUD list pages.
 * Renders page header, optional loading state, table content, and delete confirmation.
 *
 * @param {object} props
 * @param {string} props.title - Page heading.
 * @param {string} [props.description] - Subtitle below the heading.
 * @param {React.ReactNode} [props.action] - Header action slot (e.g. "Add" button).
 * @param {boolean} [props.loading=false] - Shows full-page loader when true.
 * @param {React.ReactNode} props.children - Main page content (usually a DataTable).
 * @param {object} [props.deleteDialog] - Delete confirmation config from `useCrudList`.
 * @param {string} [props.deleteTitle='Delete item'] - Confirm dialog title.
 */
export default function CrudPageLayout({
  title,
  description,
  action,
  loading = false,
  children,
  deleteDialog,
  deleteTitle = 'Delete item',
}) {
  if (loading) return <PageLoader />

  return (
    <div>
      <PageHeader title={title} description={description} action={action} />
      {children}
      {deleteDialog && (
        <ConfirmDialog
          open={Boolean(deleteDialog.deleteId)}
          onClose={() => deleteDialog.setDeleteId(null)}
          onConfirm={deleteDialog.confirmDelete}
          title={deleteTitle}
          message="This action cannot be undone."
          loading={deleteDialog.deleting}
        />
      )}
    </div>
  )
}
