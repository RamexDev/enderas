import { Link } from 'react-router-dom'
import { Card, CardBody } from '@/components/ui/Card'

export default function StatCard({ label, value, to }) {
  const content = (
    <Card className="transition-shadow hover:shadow-md">
      <CardBody>
        <p className="text-sm text-primary-500 dark:text-primary-400">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-primary-900 dark:text-white">{value ?? '—'}</p>
      </CardBody>
    </Card>
  )

  return to ? <Link to={to}>{content}</Link> : content
}
