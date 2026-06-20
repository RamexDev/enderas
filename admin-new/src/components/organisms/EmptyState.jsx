import { MotionDiv } from '@/components/motion'
import Icon from '@/components/atoms/Icon'

export default function EmptyState({ icon = 'search', title, message, action }) {
  return (
    <MotionDiv className="py-16 text-center">
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600 dark:bg-primary-800 dark:text-primary-300">
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <h3 className="font-heading text-xl font-semibold text-primary-900 dark:text-white">{title}</h3>
      {message && (
        <p className="mx-auto mt-2 max-w-md text-sm text-primary-700/95 dark:text-primary-200/70">{message}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </MotionDiv>
  )
}
