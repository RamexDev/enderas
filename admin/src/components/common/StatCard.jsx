import { Link } from 'react-router-dom'
import { Card, CardBody } from '@/components/ui/Card'

/**
 * Dashboard statistic card with optional navigation link.
 *
 * @param {object} props
 * @param {string} props.label - Metric label shown above the value.
 * @param {number|string} props.value - Metric value to display.
 * @param {string} [props.to] - Optional route; wraps the card in a link when provided.
 */
export default function StatCard({ label, value, to }) {
  const content = (
    <Card className="transition-shadow hover:shadow-md">
      <CardBody>
        <p className="text-sm text-primary-500">{label}</p>
        <p className="mt-2 text-3xl font-semibold text-primary-900">{value ?? '—'}</p>
      </CardBody>
    </Card>
  )

  return to ? <Link to={to}>{content}</Link> : content
}
