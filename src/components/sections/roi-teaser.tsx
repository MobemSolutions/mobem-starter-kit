'use client'

/**
 * ROITeaser — Arguments ROI chiffrés par secteur
 *
 * Client Component — animation des chiffres au scroll (useInView + counter).
 *
 * Source des données : ROI_ARGS_PAR_SECTEUR dans src/lib/schema/index.ts
 * Source terrain : étude de marché Mobem V3, Partie 7 § Arguments ROI sectoriels.
 *
 * Usage :
 *   import { ROITeaser } from '@/components/sections/roi-teaser'
 *   import { ROI_ARGS_PAR_SECTEUR } from '@/lib/schema'
 *
 *   // Depuis les données de l'étude (recommandé)
 *   <ROITeaser args={ROI_ARGS_PAR_SECTEUR['sante']} />
 *
 *   // Depuis siteConfig (si prérempli via /strategy)
 *   <ROITeaser args={siteConfig.roiArgs} />
 *
 * Règle design : max 3 arguments — au-delà, la hiérarchie visuelle est perdue.
 * Choisir les 2–3 arguments qui font démarrer la calculatrice mentale du dirigeant.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/constants'
import type { RoiArg } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ROITeaserProps {
  args: RoiArg[]
  title?: string
  subtitle?: string
  /** Variant visuel */
  variant?: 'horizontal' | 'stack'
  /** Classes CSS additionnelles */
  className?: string
}

// ---------------------------------------------------------------------------
// AnimatedValue — anime un nombre simple (ex: "23" → compte de 0 à 23)
// Si la valeur contient des caractères non-numériques, affiche sans animation.
// ---------------------------------------------------------------------------

function AnimatedValue({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [displayed, setDisplayed] = useState('0')

  // Extraire la partie numérique pour l'animation
  const match = value.match(/^([+×≥~]?\s*)(\d[\d\s.,]*)(.*)$/)
  const prefix = match?.[1] ?? ''
  const numStr  = match?.[2]?.replace(/\s/g, '') ?? ''
  const suffix  = match?.[3] ?? ''
  const numeric = parseFloat(numStr.replace(',', '.'))
  const isAnimatable = !isNaN(numeric) && numStr !== ''

  useEffect(() => {
    if (!inView || !isAnimatable) {
      return
    }

    const duration = MOTION.duration.macro * 1000 * 2 // 800ms
    const steps = 40
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.round(eased * numeric)
      // Reformater avec séparateurs si l'original en avait
      const formatted = numStr.includes(' ')
        ? current.toLocaleString('fr-FR')
        : String(current)
      setDisplayed(`${prefix}${formatted}${suffix}`)
      if (step >= steps) {
        clearInterval(timer)
        setDisplayed(value)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, isAnimatable, numeric, value, prefix, numStr, suffix])

  return (
    <span ref={ref} aria-label={value}>
      {isAnimatable ? displayed : value}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Composant principal
// ---------------------------------------------------------------------------

export function ROITeaser({
  args,
  title,
  subtitle,
  variant = 'horizontal',
  className,
}: ROITeaserProps) {
  if (!args.length) return null

  // Limiter à 3 arguments (règle design)
  const items = args.slice(0, 3)

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: MOTION.stagger.children * 2 },
    },
  }

  const itemVariants = {
    hidden:  { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        ease: MOTION.ease,
        duration: MOTION.duration.standard,
      },
    },
  }

  return (
    <section
      className={cn(
        'py-16 border-t border-(--border)',
        className
      )}
      aria-labelledby={title ? 'roi-teaser-title' : undefined}
    >
      <div className="mx-auto max-w-[1280px] px-6">

        {/* En-tête optionnel */}
        {(title || subtitle) && (
          <div className="mb-12 max-w-2xl">
            {title && (
              <h2
                id="roi-teaser-title"
                className="text-2xl font-semibold leading-snug"
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-(--muted-foreground)">{subtitle}</p>
            )}
          </div>
        )}

        {/* Grille d'arguments ROI */}
        <motion.ul
          role="list"
          className={cn(
            variant === 'horizontal'
              ? 'grid grid-cols-1 gap-px border border-(--border) sm:grid-cols-2 lg:grid-cols-3'
              : 'flex flex-col divide-y divide-(--border) border border-(--border)'
          )}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          aria-label="Arguments de retour sur investissement"
        >
          {items.map((arg) => (
            <motion.li
              key={arg.label}
              className="flex flex-col gap-2 bg-(--background) p-8"
              variants={itemVariants}
            >
              {/* Valeur principale — grande, signal */}
              <p
                className="text-4xl font-semibold leading-none text-(--signal) sm:text-5xl"
                aria-hidden="true"
              >
                <AnimatedValue value={arg.value} />
              </p>

              {/* Label */}
              <p className="font-medium leading-snug">
                {arg.label}
              </p>

              {/* Détail */}
              {arg.detail && (
                <p className="text-sm text-(--muted-foreground) leading-relaxed">
                  {arg.detail}
                </p>
              )}

              {/* Source */}
              {arg.source && (
                <p className="mt-auto pt-2 text-xs text-(--muted-foreground)">
                  {arg.source}
                </p>
              )}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
