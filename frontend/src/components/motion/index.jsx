import { motion, useReducedMotion } from 'framer-motion'
import { easeOut, fadeUp, staggerContainer } from './variants'

function useMotionSafe() {
  return useReducedMotion()
}

export function MotionSection({ children, className = '', delay = 0, ...props }) {
  const reduced = useMotionSafe()
  if (reduced) return <section className={className}>{children}</section>

  return (
    <motion.section
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      variants={fadeUp}
      transition={{ duration: 0.65, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export function MotionDiv({ children, className = '', delay = 0, variant = fadeUp, ...props }) {
  const reduced = useMotionSafe()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={variant}
      transition={{ duration: 0.6, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function MotionStagger({ children, className = '' }) {
  const reduced = useMotionSafe()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({ children, className = '' }) {
  const reduced = useMotionSafe()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div className={className} variants={fadeUp} transition={{ duration: 0.55, ease: easeOut }}>
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }) {
  const reduced = useMotionSafe()
  if (reduced) return children

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: easeOut }}
    >
      {children}
    </motion.div>
  )
}
