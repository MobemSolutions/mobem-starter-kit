/**
 * /marque-employeur — Template marque employeur digitale
 *
 * Niche identifiée dans l'étude de marché Mobem 2026 :
 * "87% des PME locales peinent à recruter — la marque employeur digitale
 * est la niche la moins saturée et la moins chère à adresser."
 *
 * Ce template sert à deux usages :
 *   1. Site Mobem lui-même — recruter des profils tech
 *   2. Clients PME locales — présenter leur culture aux candidats
 *
 * Structure anti-IA :
 *   - Contenu conversationnel, pas de listes de valeurs génériques
 *   - Vrais noms de postes, pas "Rejoignez notre équipe dynamique"
 *   - Témoignages avec friction authentique, pas uniquement positifs
 *   - CTA direct vers la candidature, pas "Voir les opportunités"
 *
 * À adapter : remplacer les données ci-dessous via sector-data ou siteConfig
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, MapPin, Clock, Users } from 'lucide-react'

import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { BookingCTA } from '@/components/sections/booking-cta'
import { generateFAQSchema, generateSpeakableSchema } from '@/lib/schema'

// ---------------------------------------------------------------------------
// Métadonnées
// ---------------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Rejoindre Mobem — Agence web pour les PME locales',
  description:
    "On construit des sites pour les artisans, notaires et installateurs RGE qui méritent mieux que des templates WordPress génériques. Vous aimez ça ? On cherche peut-être quelqu'un comme vous.",
  openGraph: {
    title: 'Rejoindre Mobem',
    description: 'Agence web spécialisée PME locales françaises — postes ouverts.',
    type: 'website',
  },
}

// ---------------------------------------------------------------------------
// Données — à externaliser dans siteConfig si multi-page
// ---------------------------------------------------------------------------

interface Value {
  title: string
  description: string
}

interface OpenPosition {
  title: string
  type: 'CDI' | 'CDD' | 'Freelance' | 'Alternance' | 'Stage'
  location: string
  remote?: 'full' | 'hybrid' | 'none'
  summary: string
  slug: string
}

interface TeamMember {
  name: string
  role: string
  tenure: string
  quote: string
}

const VALUES: Value[] = [
  {
    title: "On livre ce qu'on a promis",
    description:
      "Le client ne devrait jamais avoir à relancer. Livraison dans les délais, dépassement signalé à l'avance, pas d'excuse technique. Si on prend un projet, on le finit.",
  },
  {
    title: "Le détail compte, mais pas à n'importe quel prix",
    description:
      "On soigne le pixel, pas l'ego. Si un client a besoin d'un site fonctionnel en 3 semaines, un composant Framer Motion supplémentaire est un frein, pas un plus.",
  },
  {
    title: 'Honnêteté commerciale',
    description:
      "On ne vend pas de maintenance à un client dont le site n'en a pas besoin. On ne sur-dimensionne pas les projets. La recommandation honnête revient toujours, le client fidèle est plus rentable que la vente forcée.",
  },
  {
    title: 'Local, concret, mesurable',
    description:
      "On travaille avec des artisans et des professionnels libéraux — pas des licornes. Un bon résultat, c'est +1 lead/semaine ou 3 positions gagnées sur Google. Pas un design award.",
  },
]

const OPEN_POSITIONS: OpenPosition[] = [
  {
    title: 'Développeur·se Next.js — projets clients PME',
    type: 'Freelance',
    location: 'France',
    remote: 'full',
    summary:
      "Stack : Next.js 16, TypeScript strict, Tailwind v4. Projets : 4 à 8 semaines par site, briefs clairs, autonomie forte. On cherche quelqu'un qui connaît les Server Components et ne s'excuse pas d'avoir des opinions sur le CSS.",
    slug: 'dev-nextjs',
  },
  {
    title: 'Consultant·e SEO local — secteurs réglementés',
    type: 'Freelance',
    location: 'France',
    remote: 'full',
    summary:
      "Audits et stratégies SEO pour des notaires, kinés et installateurs RGE. Pas de « contenu IA généré à la chaîne » — on cherche quelqu'un qui sait écrire pour les humains d'abord.",
    slug: 'consultant-seo',
  },
  {
    title: 'Chargé·e de projet digital junior',
    type: 'CDI',
    location: 'Nantes (44)',
    remote: 'hybrid',
    summary:
      "Interface entre client et équipe technique. Suivi de projet, rédaction de briefs, tests QA. Pas besoin de savoir coder — besoin de comprendre ce que les clients veulent dire quand ils disent 'moderne mais sobre'.",
    slug: 'charge-projet',
  },
]

const TEAM: TeamMember[] = [
  {
    name: 'Arnaud',
    role: 'Fondateur',
    tenure: 'Depuis le début',
    quote:
      "J'ai passé 5 ans dans une grosse agence à faire des sites pour des grandes marques. Un jour, un kinésithérapeute m'a montré son site — fait par l'agence locale pour 8 000€ — avec des fautes d'orthographe dans le titre. J'ai compris qu'il y avait quelque chose à faire.",
  },
  {
    name: 'Sarah',
    role: 'Développeuse front',
    tenure: '14 mois',
    quote:
      "Ce qui m'a convaincue, c'est le niveau d'exigence sur les détails. Ailleurs, j'avais l'impression de livrer des maquettes à la chaîne. Ici, chaque projet a une logique.",
  },
]

const FAQ_ITEMS = [
  {
    q: 'Comment se passe le recrutement ?',
    a: "Un échange informel de 30 minutes d'abord — pour voir si les valeurs s'alignent. Ensuite un test technique court (2–3h max, rémunéré). Pas de process en 6 étapes avec un jury de 5 personnes.",
  },
  {
    q: 'Vous avez des postes non listés ici ?',
    a: "Parfois. Si votre profil est fort et que vous aimez ce qu'on fait, envoyez un message — on garde les CV des bonnes personnes pour quand on a besoin.",
  },
  {
    q: "C'est quoi un projet typique ?",
    a: "Site vitrine 5–12 pages pour un artisan ou une profession libérale. Brief en semaine 1, maquette en semaine 2–3, dev en semaine 3–6, livraison semaine 7–8. Autonomie forte, client accessible.",
  },
  {
    q: 'Peut-on travailler en remote complet ?',
    a: "Oui pour les postes freelance et la plupart des CDI. Un point vidéo par semaine, async le reste du temps. On préfère les résultats aux heures de présence.",
  },
]

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function MarqueEmployeurPage() {
  const faqSchema = generateFAQSchema(FAQ_ITEMS)
  const speakableSchema = generateSpeakableSchema([
    '#pourquoi-mobem',
    '#postes-ouverts',
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
        {/* HERO — conversationnel, pas institutionnel                            */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="border-b border-(--border)"
          aria-labelledby="employer-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-hero)">
            <div className="max-w-3xl">
              <p className="mb-6 text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                On recrute · Mobem Solutions
              </p>
              <h1
                id="employer-heading"
                className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl"
                style={{ lineHeight: '1.05' }}
              >
                On fait des sites pour des gens
                <br />
                <span className="text-(--signal)">qui savent ce qu&apos;ils veulent.</span>
              </h1>
              <div className="mt-8 max-w-2xl">
                <p className="text-lg leading-relaxed text-(--muted-foreground)">
                  Artisans, notaires, kinés, installateurs de pompes à chaleur.
                  Des clients avec un vrai métier, un vrai secteur, et un besoin
                  précis. Si vous aimez les projets concrets plus que les pitch
                  decks, on a peut-être quelque chose pour vous.
                </p>
              </div>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#postes-ouverts"
                  className="inline-flex items-center gap-2 h-12 px-8 text-sm font-medium bg-(--signal) text-(--signal-foreground) hover:bg-(--signal)/90 transition-colors"
                >
                  Voir les postes ouverts
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm text-(--muted-foreground) hover:text-(--foreground) transition-colors"
                >
                  Candidature spontanée
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* POURQUOI MOBEM — valeurs réelles, pas liste de bullet points           */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="pourquoi-mobem"
          className="border-b border-(--border)"
          aria-labelledby="values-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                Comment on travaille
              </p>
              <h2
                id="values-heading"
                className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
              >
                Ce qui compte ici
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-0 divide-y divide-(--border) md:grid-cols-2 md:divide-y-0">
              {VALUES.map((val, i) => (
                <div
                  key={val.title}
                  className={`p-8 ${
                    i % 2 === 0 ? 'md:border-r md:border-(--border)' : ''
                  } ${i > 1 ? 'border-t border-(--border)' : ''}`}
                >
                  <h3 className="text-base font-semibold leading-snug">
                    {val.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-(--muted-foreground)">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* ÉQUIPE — témoignages courts avec friction authentique                 */}
        {/* ------------------------------------------------------------------ */}
        <section
          className="border-b border-(--border)"
          aria-labelledby="team-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
              <div>
                <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                  L&apos;équipe
                </p>
                <h2
                  id="team-heading"
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  Qui vous trouverez
                  <br />
                  en rejoignant Mobem
                </h2>
              </div>

              <div className="flex flex-col divide-y divide-(--border)">
                {TEAM.map((member) => (
                  <div key={member.name} className="py-8 first:pt-0 last:pb-0">
                    <div className="mb-4 flex items-baseline gap-4">
                      <span className="text-sm font-semibold">{member.name}</span>
                      <span className="text-xs text-(--muted-foreground)">
                        {member.role}
                      </span>
                      <span className="text-xs text-(--muted-foreground)">
                        · {member.tenure}
                      </span>
                    </div>
                    <blockquote className="border-l-2 border-(--border) pl-4">
                      <p className="text-sm leading-relaxed text-(--muted-foreground) italic">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </blockquote>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* POSTES OUVERTS — liste détaillée, pas des cards avec des emojis       */}
        {/* ------------------------------------------------------------------ */}
        <section
          id="postes-ouverts"
          className="border-b border-(--border)"
          aria-labelledby="positions-heading"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-(--section-lg)">
            <div className="mb-12">
              <p className="text-xs font-medium uppercase tracking-widest text-(--muted-foreground)">
                {OPEN_POSITIONS.length} poste{OPEN_POSITIONS.length > 1 ? 's' : ''} ouvert
                {OPEN_POSITIONS.length > 1 ? 's' : ''}
              </p>
              <h2
                id="positions-heading"
                className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
              >
                On cherche
              </h2>
            </div>

            <ul
              role="list"
              className="flex flex-col divide-y divide-(--border)"
            >
              {OPEN_POSITIONS.map((pos) => (
                <li key={pos.slug} className="py-8 first:pt-0 last:pb-0">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold leading-snug">
                        {pos.title}
                      </h3>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-(--muted-foreground)">
                        <span className="border border-(--border) px-2 py-0.5 font-medium">
                          {pos.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" aria-hidden="true" />
                          {pos.location}
                        </span>
                        {pos.remote === 'full' && (
                          <span className="flex items-center gap-1">
                            <Clock className="size-3" aria-hidden="true" />
                            Remote 100%
                          </span>
                        )}
                        {pos.remote === 'hybrid' && (
                          <span className="flex items-center gap-1">
                            <Users className="size-3" aria-hidden="true" />
                            Hybride
                          </span>
                        )}
                      </div>

                      <p className="mt-4 text-sm leading-relaxed text-(--muted-foreground)">
                        {pos.summary}
                      </p>
                    </div>

                    <div className="shrink-0 sm:ml-8">
                      <Link
                        href="#contact"
                        className="inline-flex items-center gap-2 h-9 px-5 text-xs font-medium border border-(--foreground) hover:bg-(--foreground) hover:text-(--background) transition-colors"
                      >
                        Postuler
                        <ArrowRight className="size-3" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-sm text-(--muted-foreground)">
              Votre profil ne correspond pas exactement ?{' '}
              <Link
                href="#contact"
                className="underline underline-offset-2 hover:text-(--foreground) transition-colors"
              >
                Envoyez quand même — on regarde toujours les candidatures spontanées sérieuses.
              </Link>
            </p>
          </div>
        </section>

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
                  Questions
                </p>
                <h2
                  id="faq-heading"
                  className="mt-4 text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
                >
                  Avant de candidater
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
        {/* CONTACT — formulaire candidature                                      */}
        {/* ------------------------------------------------------------------ */}
        <div id="contact">
          <BookingCTA
            mode="form"
            title="Candidature"
            subtitle="Dites-nous pour quel poste vous postulez (ou 'spontané'), votre stack ou expérience principale, et ce qui vous attire dans ce qu'on fait. Pas de CV PDF de 3 pages — un message honnête suffit."
            serviceLabel="Candidature — Mobem Solutions"
            ctaLabel="Envoyer ma candidature"
            className="border-b border-(--border)"
          />
        </div>
      </main>

      <Footer />
    </>
  )
}
