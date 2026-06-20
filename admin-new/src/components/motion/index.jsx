import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { easeOut, fadeIn, fadeUp, staggerContainer } from './variants'

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
      viewport={{ once: true, amount: 0.1, margin: '0px 0px -5% 0px' }}
      variants={fadeIn}
      transition={{ duration: 0.3, ease: easeOut, delay }}
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
      viewport={{ once: true, amount: 0.1 }}
      variants={variant}
      transition={{ duration: 0.25, ease: easeOut, delay }}
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
    <motion.div className={className} variants={fadeUp} transition={{ duration: 0.25, ease: easeOut }}>
      {children}
    </motion.div>
  )
}

export function PageTransition({ children, className = '' }) {
  const reduced = useMotionSafe()

  if (reduced) return <div className={className}>{children}</div>

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
