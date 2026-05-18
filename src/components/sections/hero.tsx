'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { MOTION } from '@/lib/constants'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION.stagger.children,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { ease: MOTION.ease, duration: MOTION.duration.macro } },
}

// Remplacer par les KPIs réels du client via le prompt d'initialisation
const STATS = [
  { value: '—', label: '[KPI 1]' },
  { value: '—', label: '[KPI 2]' },
  { value: '—', label: '[KPI 3]' },
]

export function Hero() {
  return (
    <section className="border-b border-[--border]">
      <div className="mx-auto max-w-[1280px] px-6 py-[--spacing-hero]">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div variants={itemVariants}>
            <Badge variant="muted" className="mb-8">
              [Secteur] · [Zone géographique]
            </Badge>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="font-display italic leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            [Titre accrocheur],{' '}
            <span className="not-italic font-sans font-semibold">
              [complément d'accroche].
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 text-lg text-[--muted-foreground] leading-relaxed max-w-xl"
          >
            [Description courte — proposition de valeur du client en 1 à 2 phrases. Quoi, pour qui, pourquoi choisir ce prestataire.]
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center h-12 px-8 font-mono text-sm font-medium tracking-wide bg-[--signal] text-[--signal-foreground] transition-colors hover:bg-[--signal]/90"
            >
              [Action principale]
            </Link>
            <Link
              href="/#realisations"
              className="inline-flex items-center justify-center h-12 px-8 font-mono text-sm font-medium tracking-wide border border-[--border] hover:bg-[--secondary] transition-colors"
            >
              [Action secondaire]
            </Link>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-3 gap-8 border-t border-[--border] pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display italic text-3xl">{stat.value}</p>
                <p className="mt-1 font-mono text-xs text-[--muted-foreground] tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
