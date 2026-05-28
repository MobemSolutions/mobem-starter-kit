/**
 * AidesPubliques — Dispositifs d'aides publiques par secteur
 *
 * Server Component — rendu statique, SEO-friendly.
 *
 * Ces aides sont des leviers de closing documentés dans l'étude de marché Mobem 2026 :
 * MaPrimeRénov', Chèque Numérique, Pass Numérique PME (5k€), ADEN (30k€).
 * Mention en fin de pitch réduit le frein prix et crée un sentiment d'urgence.
 *
 * Usage :
 *   import { AidesPubliques } from '@/components/sections/aides-publiques'
 *   import { getAidesForSector } from '@/lib/schema'
 *   <AidesPubliques aides={getAidesForSector(siteConfig.sector)} />
 *
 *   // Ou depuis siteConfig.aidesPubliques si préremplies via /strategy
 *   <AidesPubliques aides={siteConfig.aidesPubliques} />
 */

import { ExternalLink, BadgeEuro } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AidePublique } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AidesPubliquesProps {
  aides?: AidePublique[]
  title?: string
  subtitle?: string
  /** Si true, affiche une note de bas de section sur la vérification des conditions */
  showDisclaimer?: boolean
  className?: string
}

// ---------------------------------------------------------------------------
// Composant
// ---------------------------------------------------------------------------

export function AidesPubliques({
  aides,
  title = 'Aides publiques disponibles',
  subtitle,
  showDisclaimer = true,
  className,
}: AidesPubliquesProps) {
  if (!aides?.length) return null

  return (
    <section
      className={cn('py-16 border-t border-(--border)', className)}
      aria-labelledby="aides-publiques-title"
    >
      <div className="mx-auto max-w-[1280px] px-6">

        {/* En-tête */}
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-(--muted-foreground)">
              Financement
            </p>
            <h2
              id="aides-publiques-title"
              className="text-2xl font-semibold leading-snug"
            >
              {title}
            </h2>
            {subtitle && (
              <p className="mt-2 text-(--muted-foreground)">{subtitle}</p>
            )}
          </div>
          <BadgeEuro
            className="hidden size-12 shrink-0 text-(--muted-foreground) sm:block"
            aria-hidden="true"
          />
        </div>

        {/* Grille d'aides */}
        <ul
          role="list"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {aides.map((aide) => (
            <li
              key={aide.name}
              className="flex flex-col border border-(--border) p-6"
            >
              {/* Montant — mis en avant */}
              <p className="mb-1 text-xl font-semibold text-(--signal) leading-tight">
                {aide.amount}
              </p>

              {/* Nom du dispositif */}
              <h3 className="mb-2 font-medium leading-snug">
                {aide.name}
              </h3>

              {/* Condition d'éligibilité */}
              <p className="flex-1 text-sm text-(--muted-foreground) leading-relaxed">
                {aide.condition}
              </p>

              {/* Lien officiel */}
              <a
                href={aide.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
                aria-label={`En savoir plus sur ${aide.name} (ouvre un nouvel onglet)`}
              >
                <span>En savoir plus</span>
                <ExternalLink className="size-3.5 shrink-0" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>

        {/* Disclaimer */}
        {showDisclaimer && (
          <p className="mt-6 text-xs text-(--muted-foreground)">
            ⚠️ Les conditions d&apos;accès à ces dispositifs évoluent régulièrement.
            Renseignez-vous auprès de votre CCI ou de{' '}
            <a
              href="https://www.francenum.gouv.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-(--foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
            >
              France Num
            </a>{' '}
            pour vérifier les conditions en vigueur.
          </p>
        )}
      </div>
    </section>
  )
}
