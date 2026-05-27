/**
 * TrustBadges — Certifications et labels professionnels sectoriels
 *
 * Server Component — aucune animation requise, rendu immédiat.
 * Alimente Schema.org `hasCredential` via siteConfig.certifications.
 *
 * Usage :
 *   import { TrustBadges } from '@/components/sections/trust-badges'
 *   <TrustBadges certifications={siteConfig.certifications} />
 *
 * Secteurs couverts :
 *   RGE → ['QualiPAC', 'Qualibat RGE', 'RGE Éco-Artisan']
 *   Santé → ['RPPS: 10XXXXXXXXX', 'Conventionné secteur 1']
 *   Notaire → ["Chambre des notaires de Loire-Atlantique"]
 *   Artisan → ['Qualibat', 'Qualifelec', 'Garantie décennale']
 */

import { CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TrustBadgeItem {
  label: string
  /** URL logo optionnelle (PNG fond transparent recommandé) */
  logoUrl?: string
  /** URL de la page officielle de certification */
  href?: string
}

export interface TrustBadgesProps {
  /** Certifications depuis siteConfig.certifications ou tableau étendu */
  certifications: string[] | TrustBadgeItem[]
  /** Titre optionnel au-dessus des badges */
  title?: string
  /** Variant visuel */
  variant?: 'chips' | 'cards' | 'inline'
  /** Classes CSS additionnelles sur la section */
  className?: string
}

// ---------------------------------------------------------------------------
// Helper — normaliser string[] | TrustBadgeItem[]
// ---------------------------------------------------------------------------

function normalize(items: string[] | TrustBadgeItem[]): TrustBadgeItem[] {
  return items.map((item) =>
    typeof item === 'string' ? { label: item } : item
  )
}

// ---------------------------------------------------------------------------
// Variant chips (défaut) — badges inline compacts
// ---------------------------------------------------------------------------

function ChipsBadges({ items }: { items: TrustBadgeItem[] }) {
  return (
    <ul
      role="list"
      className="flex flex-wrap gap-3"
      aria-label="Certifications professionnelles"
    >
      {items.map((item) => {
        const Badge = (
          <li
            key={item.label}
            className="flex items-center gap-2 px-4 py-2 border border-(--border) text-sm font-medium leading-none"
          >
            <CheckCircle
              className="size-4 shrink-0 text-(--signal)"
              aria-hidden="true"
            />
            <span>{item.label}</span>
          </li>
        )

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
          >
            {Badge}
          </a>
        ) : (
          Badge
        )
      })}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Variant cards — une card par certification avec logo optionnel
// ---------------------------------------------------------------------------

function CardsBadges({ items }: { items: TrustBadgeItem[] }) {
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
      aria-label="Certifications professionnelles"
    >
      {items.map((item) => {
        const inner = (
          <li
            key={item.label}
            className="flex flex-col items-center gap-3 border border-(--border) p-6 text-center"
          >
            {item.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.logoUrl}
                alt={`Logo ${item.label}`}
                className="h-12 w-auto object-contain"
                loading="lazy"
              />
            ) : (
              <CheckCircle
                className="size-8 text-(--signal)"
                aria-hidden="true"
              />
            )}
            <span className="text-sm font-medium leading-snug">{item.label}</span>
          </li>
        )

        return item.href ? (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
          >
            {inner}
          </a>
        ) : (
          inner
        )
      })}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Variant inline — liste horizontale défilante (mobile-first)
// ---------------------------------------------------------------------------

function InlineBadges({ items }: { items: TrustBadgeItem[] }) {
  return (
    <ul
      role="list"
      className="flex items-center gap-6 overflow-x-auto pb-1 scrollbar-none"
      aria-label="Certifications professionnelles"
    >
      {items.map((item, i) => (
        <li
          key={item.label}
          className={cn(
            'flex items-center gap-2 shrink-0 text-sm text-(--muted-foreground)',
            i !== 0 && 'border-l border-(--border) pl-6'
          )}
        >
          <CheckCircle className="size-4 shrink-0 text-(--signal)" aria-hidden="true" />
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  )
}

// ---------------------------------------------------------------------------
// Export principal
// ---------------------------------------------------------------------------

export function TrustBadges({
  certifications,
  title,
  variant = 'chips',
  className,
}: TrustBadgesProps) {
  const items = normalize(certifications)

  if (!items.length) return null

  return (
    <section
      className={cn('py-8', className)}
      aria-label="Certifications et labels professionnels"
    >
      <div className="mx-auto max-w-[1280px] px-6">
        {title && (
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-(--muted-foreground)">
            {title}
          </p>
        )}

        {variant === 'chips'  && <ChipsBadges  items={items} />}
        {variant === 'cards'  && <CardsBadges  items={items} />}
        {variant === 'inline' && <InlineBadges items={items} />}
      </div>
    </section>
  )
}
