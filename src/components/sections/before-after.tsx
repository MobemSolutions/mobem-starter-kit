'use client'

/**
 * BeforeAfter — Cas clients chiffrés (avant / après intervention)
 *
 * Client Component — compteurs animés au scroll, motion sur les cards.
 *
 * "Un prospect qui voit des preuves signe 3× plus facilement qu'un prospect
 * qui entend des promesses." — Étude de marché Mobem V3, Partie 5.
 *
 * Usage :
 *   import { BeforeAfter } from '@/components/sections/before-after'
 *
 *   <BeforeAfter
 *     title="Résultats réels"
 *     caseStudies={[
 *       {
 *         client: "Cabinet kiné — Nantes",
 *         period: "3 mois après lancement",
 *         metrics: [
 *           { value: 0,  label: "leads/mois",      beforeValue: 0  },
 *           { value: 23, label: "leads/mois",       beforeValue: 0, isAfter: true },
 *           { value: 4.8, label: "étoiles Google", suffix: "★"   },
 *         ],
 *         quote: "On n'avait aucun contact via internet. Maintenant je refuse des patients.",
 *         author: "Dr. Martin, kinésithérapeute",
 *       }
 *     ]}
 *   />
 *
 * Note : ne jamais inventer de témoignages. Utiliser uniquement des données client réelles.
 * Voir workflow.md § Phase 5 — capture métriques J+0 pour constituer ces cas clients.
 */

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { TrendingUp, Quote } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CaseStudyMetric {
  /** Valeur numérique — animée au scroll */
  value: number
  /** Libellé — ex: "leads/mois", "étoiles Google", "% de trafic en plus" */
  label: string
  /** Préfixe — ex: "+", "×" */
  prefix?: string
  /** Suffixe — ex: "€", "%", "★" */
  suffix?: string
  /** Si true, cette métrique est la valeur "après" et sera mise en avant */
  highlight?: boolean
}

export interface CaseStudyItem {
  /** Ex: "Cabinet kiné — Nantes" — jamais de nom complet sans autorisation */
  client: string
  /** Ex: "3 mois après lancement" */
  period?: string
  /** 2 à 4 métriques clés */
  metrics: CaseStudyMetric[]
  /** Citation client authentique */
  quote?: string
  /** Ex: "Dr. Martin, kinésithérapeute" */
  author?: string
  /** Secteur pour le label visuel */
  sector?: string
}

export interface BeforeAfterProps {
  caseStudies: CaseStudyItem[]
  title?: string
  subtitle?: string
  className?: string
}

// ---------------------------------------------------------------------------
// AnimatedNumber — compte de 0 à value au scroll
// ---------------------------------------------------------------------------

function AnimatedNumber({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (!inView) return

    const duration = MOTION.duration.macro * 1000 * 2 // 800ms
    const steps = 40
    const interval = duration / steps
    let step = 0

    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(eased * value))
      if (step >= steps) {
        clearInterval(timer)
        setDisplayed(value)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [inView, value])

  // Formater avec séparateur pour les grands nombres
  const formatted = value >= 1000
    ? displayed.toLocaleString('fr-FR')
    : String(displayed)

  return (
    <span ref={ref} aria-label={`${prefix ?? ''}${value}${suffix ?? ''}`}>
      {prefix}{formatted}{suffix}
    </span>
  )
}

// ---------------------------------------------------------------------------
// MetricCard
// ---------------------------------------------------------------------------

function MetricCard({
  metric,
  index,
}: {
  metric: CaseStudyMetric
  index: number
}) {
  return (
    <motion.div
      className={cn(
        'flex flex-col gap-1 p-6 border border-(--border)',
        metric.highlight && 'bg-(--signal) text-(--signal-foreground) border-transparent'
      )}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        ease: MOTION.ease,
        duration: MOTION.duration.standard,
        delay: index * MOTION.stagger.children,
      }}
    >
      {metric.highlight && (
        <TrendingUp
          className="mb-1 size-4 opacity-80"
          aria-hidden="true"
        />
      )}
      <p
        className="text-3xl font-semibold leading-none sm:text-4xl"
        aria-hidden="true"
      >
        <AnimatedNumber
          value={metric.value}
          prefix={metric.prefix}
          suffix={metric.suffix}
        />
      </p>
      <p className={cn(
        'text-sm leading-snug',
        metric.highlight ? 'opacity-90' : 'text-(--muted-foreground)'
      )}>
        {metric.label}
      </p>
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// CaseStudyCard
// ---------------------------------------------------------------------------

function CaseStudyCard({ study, index }: { study: CaseStudyItem; index: number }) {
  return (
    <motion.article
      className="border border-(--border)"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        ease: MOTION.ease,
        duration: MOTION.duration.macro,
        delay: index * 0.12,
      }}
      aria-label={`Cas client : ${study.client}`}
    >
      {/* En-tête */}
      <div className="flex items-start justify-between gap-4 border-b border-(--border) p-6">
        <div>
          <p className="font-semibold leading-snug">{study.client}</p>
          {study.period && (
            <p className="mt-1 text-sm text-(--muted-foreground)">{study.period}</p>
          )}
        </div>
        {study.sector && (
          <span className="shrink-0 border border-(--border) px-3 py-1 text-xs font-medium uppercase tracking-wider">
            {study.sector}
          </span>
        )}
      </div>

      {/* Métriques */}
      <div
        className={cn(
          'grid gap-px bg-(--border)',
          study.metrics.length === 2 && 'grid-cols-2',
          study.metrics.length === 3 && 'grid-cols-3',
          study.metrics.length >= 4 && 'grid-cols-2 sm:grid-cols-4',
        )}
      >
        {study.metrics.map((metric, i) => (
          <MetricCard key={`${metric.label}-${i}`} metric={metric} index={i} />
        ))}
      </div>

      {/* Citation */}
      {study.quote && (
        <div className="border-t border-(--border) p-6">
          <blockquote className="flex flex-col gap-3">
            <Quote
              className="size-5 text-(--muted-foreground)"
              aria-hidden="true"
            />
            <p className="text-(--muted-foreground) leading-relaxed italic">
              &ldquo;{study.quote}&rdquo;
            </p>
            {study.author && (
              <footer>
                <cite className="not-italic text-sm font-medium">
                  — {study.author}
                </cite>
              </footer>
            )}
          </blockquote>
        </div>
      )}
    </motion.article>
  )
}

// ---------------------------------------------------------------------------
// Export principal
// ---------------------------------------------------------------------------

export function BeforeAfter({
  caseStudies,
  title = 'Résultats réels',
  subtitle,
  className,
}: BeforeAfterProps) {
  if (!caseStudies.length) return null

  return (
    <section
      className={cn('py-16 border-t border-(--border)', className)}
      aria-labelledby="before-after-title"
    >
      <div className="mx-auto max-w-[1280px] px-6">

        {/* En-tête */}
        <div className="mb-12">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-(--muted-foreground)">
            Preuves terrain
          </p>
          <h2
            id="before-after-title"
            className="text-2xl font-semibold leading-snug"
          >
            {title}
          </h2>
          {subtitle && (
            <div className="mt-2 max-w-2xl">
              <p className="text-(--muted-foreground)">{subtitle}</p>
            </div>
          )}
        </div>

        {/* Cas clients */}
        <div
          className={cn(
            'grid gap-6',
            caseStudies.length >= 2 && 'md:grid-cols-2',
            caseStudies.length >= 3 && 'lg:grid-cols-3',
          )}
        >
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.client} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
