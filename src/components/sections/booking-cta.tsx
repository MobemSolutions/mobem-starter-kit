'use client'

/**
 * BookingCTA — Prise de contact / réservation multi-mode
 *
 * Client Component — gestion du formulaire devis (state + submit).
 *
 * Modes supportés (depuis siteConfig.bookingMode) :
 *   - 'doctolib'  → Lien Doctolib avec bouton signal
 *   - 'calendly'  → Lien Calendly
 *   - 'cal'       → Lien Cal.com
 *   - 'thefork'   → Lien LaFourchette / TheFork (restauration)
 *   - 'form'      → Formulaire devis inline (RGE, BTP, artisans)
 *   - 'phone'     → Affichage numéro + click-to-call
 *   - 'whatsapp'  → Lien wa.me avec message pré-rempli
 *   - 'none'      → Rendu null (désactivé)
 *
 * Argument ROI terrain :
 *   Doctolib 150–300€/mois · TheFork 200–350€/mois de commissions économisées.
 *   Source : étude de marché Mobem V3, Partie 7.
 *
 * Usage :
 *   import { BookingCTA } from '@/components/sections/booking-cta'
 *   <BookingCTA
 *     mode={siteConfig.bookingMode}
 *     url={siteConfig.reservationUrl}
 *     phone={siteConfig.contact.phone}
 *     phoneDisplay={siteConfig.contact.phoneDisplay}
 *     whatsapp={siteConfig.social.whatsapp}
 *   />
 *
 * Le formulaire devis poste sur /api/contact — même endpoint que le formulaire principal.
 * Pré-rempli avec le label du service si `serviceLabel` est fourni.
 */

import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageSquare, Calendar, ExternalLink, Send, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { MOTION } from '@/lib/constants'
import type { BookingMode } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface BookingCTAProps {
  mode?: BookingMode
  /** URL Doctolib, Calendly, Cal.com, TheFork — requis si mode != 'form'|'phone'|'whatsapp'|'none' */
  url?: string
  phone?: string
  phoneDisplay?: string
  /** Numéro international sans + ni espaces, ex: '33612345678' */
  whatsapp?: string
  /** Titre de la section */
  title?: string
  /** Sous-titre / accroche */
  subtitle?: string
  /** Label pré-rempli dans le formulaire devis — ex: "Installation PAC" */
  serviceLabel?: string
  /** CTA principal — override du libellé selon le mode */
  ctaLabel?: string
  className?: string
}

// ---------------------------------------------------------------------------
// Labels et icônes par mode
// ---------------------------------------------------------------------------

const MODE_DEFAULTS: Record<
  Exclude<BookingMode, 'none'>,
  { label: string; icon: React.ElementType; ariaLabel: string }
> = {
  doctolib: {
    label: 'Prendre rendez-vous sur Doctolib',
    icon: Calendar,
    ariaLabel: 'Prendre rendez-vous en ligne via Doctolib (ouvre un nouvel onglet)',
  },
  calendly: {
    label: 'Réserver un créneau',
    icon: Calendar,
    ariaLabel: 'Réserver un créneau en ligne via Calendly (ouvre un nouvel onglet)',
  },
  cal: {
    label: 'Réserver un créneau',
    icon: Calendar,
    ariaLabel: 'Réserver un créneau en ligne (ouvre un nouvel onglet)',
  },
  thefork: {
    label: 'Réserver une table',
    icon: Calendar,
    ariaLabel: 'Réserver une table en ligne (ouvre un nouvel onglet)',
  },
  form: {
    label: 'Demander un devis gratuit',
    icon: Send,
    ariaLabel: 'Ouvrir le formulaire de demande de devis',
  },
  phone: {
    label: 'Nous appeler',
    icon: Phone,
    ariaLabel: 'Appeler directement',
  },
  whatsapp: {
    label: 'Nous écrire sur WhatsApp',
    icon: MessageSquare,
    ariaLabel: 'Contacter par WhatsApp (ouvre un nouvel onglet)',
  },
}

// ---------------------------------------------------------------------------
// Sous-composant — Formulaire devis (mode 'form')
// ---------------------------------------------------------------------------

function QuoteForm({ serviceLabel }: { serviceLabel?: string }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [message, setMessage] = useState(
    serviceLabel ? `Bonjour, je souhaite un devis pour : ${serviceLabel}.` : ''
  )

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, message }),
      })

      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        className="flex flex-col items-center gap-4 py-8 text-center"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: MOTION.ease, duration: MOTION.duration.standard }}
      >
        <CheckCircle2 className="size-10 text-(--signal)" aria-hidden="true" />
        <p className="text-lg font-medium">Demande envoyée ✓</p>
        <p className="text-sm text-(--muted-foreground)">
          Nous vous rappelons sous 24h ouvrées.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      {/* Honeypot anti-spam */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        autoComplete="off"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-name" className="text-sm font-medium">
            Votre nom <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            className="border border-(--input) bg-(--background) px-4 py-2.5 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
            placeholder="Marie Dupont"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="booking-phone" className="text-sm font-medium">
            Téléphone <span aria-hidden="true">*</span>
          </label>
          <input
            id="booking-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="tel"
            className="border border-(--input) bg-(--background) px-4 py-2.5 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
            placeholder="06 12 34 56 78"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="booking-message" className="text-sm font-medium">
          Votre projet <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="booking-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={3}
          className="resize-none border border-(--input) bg-(--background) px-4 py-2.5 text-sm placeholder:text-(--muted-foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
          placeholder="Décrivez votre projet en quelques mots…"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600" role="alert">
          Une erreur est survenue. Veuillez réessayer ou nous appeler directement.
        </p>
      )}

      <Button
        type="submit"
        variant="default"
        size="lg"
        disabled={status === 'sending'}
        aria-live="polite"
        className="w-full sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            <span>Envoi en cours…</span>
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            <span>Envoyer ma demande</span>
          </>
        )}
      </Button>

      <p className="text-xs text-(--muted-foreground)">
        Réponse sous 24h ouvrées · Sans engagement · Données protégées
      </p>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Export principal
// ---------------------------------------------------------------------------

export function BookingCTA({
  mode,
  url,
  phone,
  phoneDisplay,
  whatsapp,
  title,
  subtitle,
  serviceLabel,
  ctaLabel,
  className,
}: BookingCTAProps) {
  const [formOpen, setFormOpen] = useState(false)

  if (!mode || mode === 'none') return null

  const defaults = MODE_DEFAULTS[mode]
  const finalLabel = ctaLabel ?? defaults.label
  const Icon = defaults.icon

  // Construire l'URL selon le mode
  function buildHref(): string {
    switch (mode) {
      case 'doctolib':
      case 'calendly':
      case 'cal':
      case 'thefork':
        return url ?? '#'
      case 'phone':
        return phone ? `tel:${phone.replace(/\s/g, '')}` : '#'
      case 'whatsapp': {
        const num = whatsapp ?? ''
        const msg = encodeURIComponent(
          serviceLabel
            ? `Bonjour, je souhaite un devis pour : ${serviceLabel}.`
            : 'Bonjour, je souhaite vous contacter.'
        )
        return `https://wa.me/${num}?text=${msg}`
      }
      default:
        return '#'
    }
  }

  const isLink = mode !== 'form'
  const isExternal = ['doctolib', 'calendly', 'cal', 'thefork', 'whatsapp'].includes(mode)

  return (
    <section
      className={cn(
        'py-16 border-t border-(--border)',
        className
      )}
      aria-labelledby={title ? 'booking-cta-title' : undefined}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col gap-8">

          {/* En-tête */}
          {(title || subtitle) && (
            <div className="max-w-2xl">
              {title && (
                <h2
                  id="booking-cta-title"
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

          {/* CTA principal */}
          {isLink ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={buildHref()}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                aria-label={defaults.ariaLabel}
                className="inline-flex items-center gap-2 bg-(--signal) px-8 py-3.5 text-sm font-medium text-(--signal-foreground) transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
              >
                <Icon className="size-4 shrink-0" aria-hidden="true" />
                <span>{finalLabel}</span>
                {isExternal && (
                  <ExternalLink className="size-3.5 shrink-0 opacity-70" aria-hidden="true" />
                )}
              </a>

              {/* Numéro de téléphone en complément si mode non-phone */}
              {mode !== 'phone' && phoneDisplay && phone && (
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
                >
                  <Phone className="size-4 shrink-0 text-(--muted-foreground)" aria-hidden="true" />
                  <span>{phoneDisplay}</span>
                </a>
              )}
            </div>
          ) : (
            /* Mode form */
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {!formOpen ? (
                  <motion.div
                    key="btn"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ ease: MOTION.ease, duration: MOTION.duration.micro }}
                  >
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => setFormOpen(true)}
                      aria-expanded={formOpen}
                      aria-controls="booking-form"
                      className="gap-2"
                    >
                      <Icon className="size-4" aria-hidden="true" />
                      {finalLabel}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    id="booking-form"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ ease: MOTION.ease, duration: MOTION.duration.standard }}
                    className="overflow-hidden"
                  >
                    <div className="border border-(--border) p-6">
                      <div className="mb-6 flex items-center justify-between">
                        <h3 className="font-semibold">Demande de devis gratuit</h3>
                        <button
                          onClick={() => setFormOpen(false)}
                          className="text-sm text-(--muted-foreground) hover:text-(--foreground) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-(--ring)"
                          aria-label="Fermer le formulaire"
                        >
                          Annuler
                        </button>
                      </div>
                      <QuoteForm serviceLabel={serviceLabel} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
