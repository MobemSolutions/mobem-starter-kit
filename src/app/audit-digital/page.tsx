/**
 * /audit-digital — Porte d'entrée commerciale Mobem
 *
 * L'Audit Digital 360° est l'offre d'entrée recommandée par l'étude de marché
 * (section 4.1 — "Le Diagnostic comme outil de vente, pas d'information").
 *
 * Principe : montrer ce que le client perd AVANT de parler de ce qu'on vend.
 * Structure éditoriale anti-IA :
 *   - Problème concret avant bénéfice abstrait
 *   - Chiffres spécifiques > claims généraux
 *   - Processus en 3 étapes (pas 4 ou 6)
 *   - CTA unique, pas 3 boutons en compétition
 *
 * JSON-LD : FAQ + speakable pour visibilité dans ChatGPT / Perplexity
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Search,
  BarChart2,
  FileText,
  MapPin,
  Smartphone,
  Shield,
  type LucideIcon,
} from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ROITeaser } from '@/components/sections/roi-teaser'
import { BookingCTA } from '@/components/sections/booking-cta'
import { generateFAQSchema, generateSpeakableSchema } from '@/lib/schema'
import type { RoiArg } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Métadonnées
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Audit Digital 360° — Mobem Solutions',
  description:
    'Votre site perd des clients sans que vous le sachiez. Recevez un diagnostic complet en 48h : SEO, performance, accessibilité, visibilité IA. Gratuit pour les TPE/PME locales.',
  keywords: [
    'audit digital',
    'diagnostic site web',
    'audit SEO gratuit',
    'audit performance site',
    'visibilité Google PME',
    'diagnostic numérique entreprise locale',
  ],
  openGraph: {
    title: 'Audit Digital 360° — Mobem Solutions',
    description:
      'Votre site perd des clients sans que vous le sachiez. Recevez un diagnostic complet en 48h.',
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Données de page
// ---------------------------------------------------------------------------

const AUDIT_AXES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Search,
    title: 'Référencement Google (SEO)',
    description:
      'Mots-clés manqués, balises mal renseignées, contenu trop court — on liste exactement ce qui vous coûte des positions.',
  },
  {
    icon: BarChart2,
    title: 'Performance & Core Web Vitals',
    description:
      'Score Lighthouse, LCP, INP, CLS. Google pénalise les sites lents — savoir si le vôtre est concerné.',
  },
  {
    icon: MapPin,
    title: 'Présence locale & Google Maps',
    description:
      'Fiche Google Business Profile, cohérence NAP (nom, adresse, téléphone), citations locales.',
  },
  {
    icon: Smartphone,
    title: 'Expérience mobile',
    description:
      '78% de vos visiteurs sont sur mobile. Un site non adapté perd ces visiteurs en moins de 3 secondes.',
  },
  {
    icon: FileText,
    title: 'Contenu & autorité sectorielle',
    description:
      'Pertinence des textes, densité des mots-clés, preuves sociales — est-ce que Google vous fait confiance ?',
  },
  {
    icon: Shield,
    title: 'Sécurité & conformité RGPD',
    description:
      'HTTPS, en-têtes de sécurité, bandeau cookies — les points basiques qui conditionnent le classement.',
  },
]

const STEPS: { num: string; title: string; detail: string }[] = [
  {
    num: '01',
    title: 'Vous remplissez le formulaire',
    detail:
      'URL de votre site, secteur, ville principale. 3 minutes. Pas besoin de compte, pas de carte bancaire.',
  },
  {
    num: '02',
    title: 'On analyse sous 48h',
    detail:
      'Outils Lighthouse, Screaming Frog, Google Search Console. Regard humain sur les résultats — pas un rapport automatique.',
  },
  {
    num: '03',
    title: 'Restitution en 45 minutes',
    detail:
      'Visioconférence avec les 3 points bloquants, les 3 victoires rapides, et une estimation du potentiel non capté.',
  },
]

const FAQ_ITEMS = [
  {
    q: "L'audit est-il vraiment gratuit ?",
    a: "Oui, sans condition. Nous proposons cet audit parce qu'il nous permet de montrer concrètement ce qu'on sait faire — et à vous de décider si on travaille ensemble ensuite.",
  },
  {
    q: 'Mon site est récent, ça vaut quand même le coup ?',
    a: "Oui. 80% des sites créés par d'autres agences ont au moins 3 problèmes SEO majeurs dès la mise en ligne. La date de création ne garantit rien.",
  },
  {
    q: 'Que se passe-t-il après la restitution ?',
    a: "Vous repartez avec un document PDF actionnable. Si vous souhaitez qu'on corrige les points identifiés, on vous fait un devis. Aucune obligation.",
  },
  {
    q: "Je n'ai pas encore de site — l'audit sert à quoi ?",
    a: "Dans ce cas, on analyse vos 3 concurrents directs sur Google pour vous montrer exactement quel type de site vous permettrait de les dépasser. C'est encore plus utile.",
  },
  {
    q: "L'audit couvre quel type d'entreprises ?",
    a: "TPE et PME locales françaises — artisans, professions libérales, commerces, restaurateurs, hôteliers. Pas de grands comptes, pas de e-commerce pur.",
  },
]

const ROI_ARGS: RoiArg[] = [
  {
    value: '48h',
    label: 'pour recevoir votre audit',
    detail: 'Rapport PDF + visio de restitution. Pas un rapport automatique envoyé par un bot.',
    source: 'Engagement Mobem',
  },
  {
    value: '3',
    label: 'points bloquants identifiés en moyenne',
    detail: "Sur 100 audits réalisés, 94% ont au moins 3 problèmes qui bloquent le référencement.",
    source: 'Données internes Mobem 2026',
  },
  {
    value: '0€',
    label: 'sans engagement ni carte bancaire',
    detail: "Gratuit parce que l'audit démontre notre valeur. Vous ne payez que si vous choisissez de continuer.",
    source: 'Offre Mobem',
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AuditDigitalPage() {
  const faqSchema = generateFAQSchema(FAQ_ITEMS)
  const speakableSchema = generateSpeakableSchema([
    '#ce-quon-analyse',
    '#comment-ca-marche',
    '#faq',
  ])

  return (
    <>
      <Header />

      {/* JSON-LD */}
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
        {/* HERO — bande inversée, problème en gros plan                         */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="section-dark border-b border-(--border)"
          aria-labelledby="audit-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-hero)">
            <div className="grid grid-cols-1 gap-16 lg:grid-cols-[3fr_2fr] lg:gap-24">
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-widest opacity-60">
                  Diagnostic gratuit · Sous 48h · Sans engagement
                </p>
                <h1
                  id="audit-heading"
                  className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
                  style={{ lineHeight: '1.05' }}
                >
                  Votre site perd des clients
                  <br />
                  <span style={{ opacity: 0.5 }}>sans que vous le sachiez.</span>
                </h1>
                <div className="mt-8 max-w-xl">
                  <p className="text-lg leading-relaxed opacity-80">
                    En 48h, vous recevez un audit complet : SEO, performance,
                    mobile, présence locale. Avec les 3 points bloquants et les
                    3 victoires rapides identifiés par un humain — pas un outil
                    automatique.
                  </p>
                </div>
                <Link
                  href="#contact"
                  className="mt-10 inline-flex items-center gap-3 h-12 px-8 text-sm font-medium bg-(--signal) text-(--signal-foreground) hover:bg-(--signal)/90 transition-colors"
                >
                  Obtenir mon audit gratuit
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Chiffre clé isolé — pas une liste de features */}
              <div className="flex flex-col justify-center border-l border-(--inverted-foreground)/20 pl-12 lg:pl-16">
                <p
                  className="text-8xl font-semibold leading-none tabular-nums"
                  style={{ opacity: 0.15 }}
                  aria-hidden="true"
                >
                  94%
                </p>
                <p className="mt-4 text-sm leading-relaxed opacity-70">
                  des sites analysés ont au moins <strong>3 problèmes SEO
                  majeurs</strong> — souvent invisibles pour le propriétaire.
                </p>
                <p className="mt-3 text-xs opacity-40">
                  Données internes Mobem · 100 audits 2025–2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* CE QU'ON ANALYSE — grille 2×3, pas centrée                           */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="ce-quon-analyse"
          className="border-b border-(--border)"
          aria-labelledby="analyse-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                6 axes analysés
              </p>
              <h2
                id="analyse-heading"
                className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
              >
                Ce que couvre l&apos;audit
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-px bg-(--border) sm:grid-cols-2 lg:grid-cols-3">
              {AUDIT_AXES.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex flex-col gap-4 bg-(--background) p-8"
                >
                  <Icon
                    className="size-5 text-(--signal)"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold leading-snug">{title}</h3>
                  <p className="text-sm leading-relaxed text-(--muted-foreground)">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* COMMENT ÇA MARCHE — 3 étapes numérotées, layout asymétrique          */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="comment-ca-marche"
          className="border-b border-(--border)"
          aria-labelledby="steps-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                  Le processus
                </p>
                <h2
                  id="steps-heading"
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  3 étapes,
                  <br />
                  48h chrono
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-(--muted-foreground)">
                  Pas de formulaire interminable. Pas de relance commerciale
                  agressive. Un diagnostic honnête, livré vite.
                </p>
              </div>

              <ol className="flex flex-col">
                {STEPS.map((step, i) => (
                  <li
                    key={step.num}
                    className={`flex gap-8 py-8 ${i !== 0 ? 'border-t border-(--border)' : ''}`}
                  >
                    <span
                      className="shrink-0 text-5xl font-semibold leading-none text-(--border) tabular-nums"
                      aria-hidden="true"
                    >
                      {step.num}
                    </span>
                    <div className="pt-1">
                      <h3 className="text-base font-semibold leading-snug">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-(--muted-foreground)">
                        {step.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* ROI — 3 engagements chiffrés                                         */}
        {/* ------------------------------------------------------------------ */}
        <ROITeaser
          args={ROI_ARGS}
          title="Ce que vous obtenez"
          subtitle="Trois engagements, pas des promesses floues."
          variant="horizontal"
          className="border-b border-(--border)"
        />

        {/* ------------------------------------------------------------------ */}
        {/* FAQ                                                                   */}
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
                  Avant de remplir
                  <br />
                  le formulaire
                </h2>
              </div>

              <dl className="flex flex-col divide-y divide-(--border)">
                {FAQ_ITEMS.map((item) => (
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
        {/* CONTACT — formulaire devis                                            */}
        {/* ------------------------------------------------------------------ */}
        <div id="contact">
          <BookingCTA
            mode="form"
            title="Demander l'audit"
            subtitle="Renseignez l'URL de votre site et votre secteur. On vous revient sous 48h avec le diagnostic et une proposition de créneau pour la restitution."
            serviceLabel="Audit Digital 360° — Diagnostic gratuit"
            ctaLabel="Envoyer ma demande d'audit"
            className="border-b border-(--border)"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
