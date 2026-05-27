/**
 * /[secteur] — Landing pages sectorielles SEO générées statiquement
 *
 * Chaque slug dans SECTOR_SLUGS devient une URL statique indexable.
 * Requêtes cibles : "site web [métier] [ville]" — intention d'achat directe.
 *
 * Structure éditoriale (anti-IA) :
 *   Problème formulé avant la solution
 *   Services listés avec verbes d'action, pas de titres génériques
 *   ROI chiffré, sourcé, animé au scroll
 *   FAQ sectorielle avec generateFAQSchema() pour les Rich Results Google
 */

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TrustBadges } from '@/components/sections/trust-badges'
import { ROITeaser } from '@/components/sections/roi-teaser'
import { BookingCTA } from '@/components/sections/booking-cta'
import { generateFAQSchema, generateSpeakableSchema } from '@/lib/schema'

import { SECTOR_DATA, SECTOR_SLUGS } from './sector-data'

// ---------------------------------------------------------------------------
// Génération statique
// ---------------------------------------------------------------------------

export function generateStaticParams() {
  return SECTOR_SLUGS.map((secteur) => ({ secteur }))
}

// ---------------------------------------------------------------------------
// Métadonnées dynamiques
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ secteur: string }>
}): Promise<Metadata> {
  const { secteur } = await params
  const data = SECTOR_DATA[secteur]
  if (!data) return {}

  return {
    title: data.meta.title,
    description: data.meta.description,
    ...(data.meta.keywords && { keywords: data.meta.keywords }),
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function SecteurPage({
  params,
}: {
  params: Promise<{ secteur: string }>
}) {
  const { secteur } = await params
  const data = SECTOR_DATA[secteur]
  if (!data) notFound()

  // JSON-LD
  const faqSchema = generateFAQSchema(data.faq)
  const speakableSchema = generateSpeakableSchema([
    '#probleme',
    '#services',
    '#faq',
  ])

  return (
    <>
      <Header />

      {/* JSON-LD — FAQ Rich Results + speakable GEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />

      <main>
        {/* ------------------------------------------------------------------ */}
        {/* HERO — problème formulé avant la solution, layout gauche-dominant   */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="border-b border-(--border)"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-hero)">
            <div className="max-w-3xl">
              {/* Fil d'Ariane sectoriel */}
              <p className="mb-6 text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                Mobem Solutions · Offre sectorielle
              </p>

              <h1
                id="hero-heading"
                className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
                style={{ lineHeight: '1.1' }}
              >
                {data.hero.headline}
              </h1>

              <div className="mt-6 max-w-2xl">
                <p className="text-lg leading-relaxed text-(--muted-foreground) md:text-xl">
                  {data.hero.subheadline}
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 h-12 px-8 text-sm font-medium bg-(--signal) text-(--signal-foreground) hover:bg-(--signal)/90 transition-colors"
                >
                  {data.hero.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="tel:+33000000000"
                  className="inline-flex items-center gap-2 text-sm text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  Appel direct — sans engagement
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* CERTIFICATIONS — en-tête de confiance, avant le problème            */}
        {/* ------------------------------------------------------------------ */}
        {data.certifications.length > 0 && (
          <TrustBadges
            certifications={data.certifications}
            variant="inline"
            className="border-b border-(--border)"
          />
        )}

        {/* ------------------------------------------------------------------ */}
        {/* PROBLÈME — énoncé en citation large, pas un paragraphe générique    */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="probleme"
          className="border-b border-(--border)"
          aria-label="Problématique du secteur"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                  Le constat
                </p>
              </div>
              <blockquote className="border-l-2 border-(--signal) pl-8">
                <p className="text-xl leading-relaxed md:text-2xl">
                  {data.problemStatement}
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* SERVICES — liste numérotée, pas une grille de cartes égales          */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="services"
          className="border-b border-(--border)"
          aria-labelledby="services-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                  Ce qu&apos;on livre
                </p>
                <h2
                  id="services-heading"
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  Votre site de{' '}
                  <span className="text-(--signal)">A à Z</span>
                </h2>
              </div>

              <ol className="flex flex-col divide-y divide-(--border)">
                {data.services.map((service, i) => (
                  <li key={service.title} className="py-6 first:pt-0 last:pb-0">
                    <div className="flex gap-6">
                      <span
                        className="shrink-0 text-4xl font-semibold leading-none text-(--border) tabular-nums"
                        aria-hidden="true"
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div>
                        <h3 className="text-base font-semibold leading-snug">
                          {service.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-(--muted-foreground)">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* ROI — chiffres animés au scroll, avec source citée                  */}
        {/* ------------------------------------------------------------------ */}
        {data.roiArgs.length > 0 && (
          <ROITeaser
            args={data.roiArgs}
            title="Le retour sur investissement, chiffré"
            subtitle="Chiffres issus de l'étude de marché Mobem 2026 — secteur et cas clients réels."
            variant="horizontal"
            className="border-b border-(--border)"
          />
        )}

        {/* ------------------------------------------------------------------ */}
        {/* FAQ — structure Schema.org pour Rich Results                         */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="faq"
          className="border-b border-(--border)"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                  Questions fréquentes
                </p>
                <h2
                  id="faq-heading"
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  Ce que vous demandez
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-(--muted-foreground)">
                  Réponses précises aux questions que posent vos confrères avant
                  de commander leur site.
                </p>
              </div>

              <dl className="flex flex-col divide-y divide-(--border)">
                {data.faq.map((item) => (
                  <div key={item.q} className="py-6 first:pt-0 last:pb-0">
                    <dt className="text-sm font-semibold leading-snug">
                      {item.q}
                    </dt>
                    <dd className="mt-3 text-sm leading-relaxed text-(--muted-foreground)">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* CONTACT — mode adapté au secteur (form | phone | calendly | etc.)    */}
        {/* ------------------------------------------------------------------ */}
        <div id="contact">
          <BookingCTA
            mode={data.bookingMode}
            url={data.bookingUrl}
            title="On vous rappelle sous 24h"
            subtitle="Décrivez votre projet en quelques lignes — on revient vers vous avec un premier diagnostic gratuit."
            serviceLabel={`Demander un devis — ${data.meta.title.split('—')[0].trim()}`}
            className="border-b border-(--border)"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
