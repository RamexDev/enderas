import { motion, useReducedMotion } from 'framer-motion'
import { easeOut, fadeIn, staggerContainer } from './variants'

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
      viewport={{ once: true, amount: 0.2, margin: '0px 0px -5% 0px' }}
      variants={fadeIn}
      transition={{ duration: 0.4, ease: easeOut, delay }}
      {...props}
    >
      {children}
    </motion.section>
  )
}

export function MotionDiv({ children, className = '', delay = 0, variant = fadeIn, ...props }) {
  const reduced = useMotionSafe()
  if (reduced) return <div className={className}>{children}</div>

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={variant}
      transition={{ duration: 0.35, ease: easeOut, delay }}
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
      viewport={{ once: true, amount: 0.12 }}
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
    <motion.div className={className} variants={fadeIn} transition={{ duration: 0.35, ease: easeOut }}>
      {children}
    </motion.div>
  )
}

export function PageTransition({ children }) {
  return children
}
