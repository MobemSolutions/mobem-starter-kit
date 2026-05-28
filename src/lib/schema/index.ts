/**
 * Générateurs de schemas JSON-LD structurés — Mobem Solutions
 *
 * Couvre les 6 secteurs Tier 1 et Tier 2 identifiés dans l'étude de marché 2026.
 * Chaque schema étend LocalBusiness avec les propriétés différenciantes par secteur.
 *
 * Usage dans une page :
 *   import { generateSchemaFromConfig } from '@/lib/schema'
 *   import { siteConfig } from '@/lib/siteConfig'
 *   const schema = generateSchemaFromConfig(siteConfig)
 *   // Puis dans le <head> via next/script ou <script type="application/ld+json">
 *
 * GEO (Generative Engine Optimization) :
 *   La propriété `speakable` permet à ChatGPT, Perplexity et Gemini de
 *   citer directement les sections pertinentes d'une page.
 *   Ajouter generateSpeakableSchema(['#services', '#about', '.hero']) sur les pages clés.
 */

import type { SiteConfig, SectorType } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Types internes
// ---------------------------------------------------------------------------

type WithContext<T extends object> = T & { '@context': 'https://schema.org' }

function withContext<T extends object>(schema: T): WithContext<T> {
  return { '@context': 'https://schema.org', ...schema }
}

// ---------------------------------------------------------------------------
// Helpers partagés
// ---------------------------------------------------------------------------

/** Construit le bloc PostalAddress commun à tous les schemas */
function buildAddress(config: SiteConfig) {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: config.contact.address.street,
    addressLocality: config.contact.address.city,
    postalCode: config.contact.address.zip,
    addressRegion: config.contact.address.region,
    addressCountry: 'FR',
  }
}

/** Construit le bloc GeoCoordinates si lat/lng sont renseignés */
function buildGeo(config: SiteConfig) {
  if (!config.contact.geo.lat || !config.contact.geo.lng) return undefined
  return {
    '@type': 'GeoCoordinates' as const,
    latitude: config.contact.geo.lat,
    longitude: config.contact.geo.lng,
  }
}

/** Construit l'AggregateRating si des avis sont présents */
function buildAggregateRating(config: SiteConfig) {
  if (!config.reviews.length) return undefined
  const avg = config.reviews.reduce((s, r) => s + r.rating, 0) / config.reviews.length
  return {
    '@type': 'AggregateRating' as const,
    ratingValue: avg.toFixed(1),
    reviewCount: config.reviews.length,
    bestRating: 5,
    worstRating: 1,
  }
}

/** Construit les reviews individuelles pour le schema */
function buildReviews(config: SiteConfig) {
  return config.reviews.map((r) => ({
    '@type': 'Review' as const,
    author: { '@type': 'Person' as const, name: r.author },
    reviewRating: {
      '@type': 'Rating' as const,
      ratingValue: r.rating,
      bestRating: 5,
    },
    reviewBody: r.text,
    datePublished: r.date,
  }))
}

/** Construit le potentialAction ReserveAction si reservationUrl est renseigné */
function buildReserveAction(config: SiteConfig) {
  if (!config.reservationUrl) return undefined
  return {
    '@type': 'ReserveAction' as const,
    target: {
      '@type': 'EntryPoint' as const,
      urlTemplate: config.reservationUrl,
      actionPlatform: [
        'http://schema.org/DesktopWebPlatform',
        'http://schema.org/MobileWebPlatform',
      ],
    },
    result: {
      '@type': 'Reservation' as const,
      name: 'Réservation en ligne',
    },
  }
}

/** Construit le bloc hasCredential depuis les certifications */
function buildCredentials(certifications: string[]) {
  if (!certifications.length) return undefined
  return certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential' as const,
    credentialCategory: cert,
  }))
}

// ---------------------------------------------------------------------------
// Schema de base — LocalBusiness
// ---------------------------------------------------------------------------

/**
 * Schema LocalBusiness générique — utilisé comme base pour tous les secteurs.
 * Conforme aux recommandations Google Rich Results + GEO.
 */
export function generateLocalBusinessSchema(config: SiteConfig) {
  const aggregateRating = buildAggregateRating(config)
  const reviews = buildReviews(config)
  const potentialAction = buildReserveAction(config)
  const hasCredential = buildCredentials(config.certifications)
  const geo = buildGeo(config)

  return withContext({
    '@type': config.schemaType,
    name: config.name,
    description: config.description,
    url: config.url,
    telephone: config.contact.phone,
    email: config.contact.email,
    address: buildAddress(config),
    ...(geo && { geo }),
    openingHours: config.openingHours,
    areaServed: config.zones.map((zone) => ({
      '@type': 'City' as const,
      name: zone,
    })),
    ...(config.social.facebook && { sameAs: buildSameAs(config) }),
    ...(aggregateRating && { aggregateRating }),
    ...(reviews.length && { review: reviews }),
    ...(potentialAction && { potentialAction }),
    ...(hasCredential && { hasCredential }),
    inLanguage: 'fr',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Carte bancaire, Espèces, Virement',
    priceRange: '€€',
  })
}

function buildSameAs(config: SiteConfig): string[] {
  const urls: string[] = []
  if (config.social.facebook) urls.push(config.social.facebook)
  if (config.social.instagram) urls.push(config.social.instagram)
  if (config.social.linkedin) urls.push(config.social.linkedin)
  if (config.social.youtube) urls.push(config.social.youtube)
  return urls
}

// ---------------------------------------------------------------------------
// Tier 1 — Notaires / Juristes / Gestion de patrimoine
// Score Mobem : 9.1/10 — Revenu libéral moyen 8 640€/mois (INSEE 2022)
// ---------------------------------------------------------------------------

/**
 * Schema LegalService — pour notaires, avocats, conseillers en gestion de patrimoine.
 * Propriétés différenciantes : `legalName`, `serviceType`, `areaServed`.
 *
 * Argument ROI terrain : 1 dossier immobilier supplémentaire/mois = 1 500–5 000€ d'honoraires.
 * Le site est remboursé en 2–3 mois (source : étude de marché Mobem V3).
 */
export function generateLegalServiceSchema(
  config: SiteConfig,
  options?: {
    legalName?: string
    serviceTypes?: string[]    // ex: ['Vente immobilière', 'Succession', 'Droit des sociétés']
    barNumber?: string         // Numéro de barreau (avocats)
    chamberName?: string       // ex: "Chambre des notaires de Loire-Atlantique"
  }
) {
  const base = generateLocalBusinessSchema(config)
  return {
    ...base,
    '@type': 'LegalService',
    ...(options?.legalName && { legalName: options.legalName }),
    ...(options?.serviceTypes && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services juridiques',
        itemListElement: options.serviceTypes.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'LegalService', name: s },
        })),
      },
    }),
    ...(options?.chamberName && {
      memberOf: {
        '@type': 'Organization',
        name: options.chamberName,
      },
    }),
    ...(options?.barNumber && {
      identifier: {
        '@type': 'PropertyValue',
        name: 'Numéro de barreau',
        value: options.barNumber,
      },
    }),
  }
}

// ---------------------------------------------------------------------------
// Tier 1 — Santé libérale + Esthétique médicale
// Score Mobem : 8.8/10 — 1,3M libéraux de santé en France (INSEE)
// ---------------------------------------------------------------------------

/**
 * Schema MedicalBusiness — pour kinés, médecins, ostéos, esthétique médicale.
 * Propriétés différenciantes : `medicalSpecialty`, `availableService`, `RPPS`.
 *
 * Argument ROI terrain : économie Doctolib 150–300€/mois + nouveaux patients Google.
 * "Arrêtez de payer Doctolib pour des consultations que votre site pourrait générer."
 */
export function generateMedicalBusinessSchema(
  config: SiteConfig,
  options?: {
    medicalSpecialty?: string  // ex: 'Physiotherapy', 'GeneralPractice', 'Dermatology'
    rppsNumber?: string        // Numéro RPPS (praticien de santé)
    isAccepted?: boolean       // Conventionné Sécurité Sociale
    availableServices?: string[] // ex: ['Kinésithérapie', 'Bilan postural', 'Rééducation sportive']
    medicalCredentials?: string[] // ex: ['Diplôme d\'État de masseur-kinésithérapeute']
  }
) {
  const base = generateLocalBusinessSchema(config)

  return {
    ...base,
    '@type': 'MedicalBusiness',
    ...(options?.medicalSpecialty && { medicalSpecialty: options.medicalSpecialty }),
    ...(options?.isAccepted !== undefined && {
      isAcceptingNewPatients: options.isAccepted,
    }),
    ...(options?.rppsNumber && {
      identifier: {
        '@type': 'PropertyValue',
        name: 'Numéro RPPS',
        value: options.rppsNumber,
      },
    }),
    ...(options?.availableServices && {
      availableService: options.availableServices.map((s) => ({
        '@type': 'MedicalProcedure',
        name: s,
      })),
    }),
    ...(options?.medicalCredentials && {
      hasCredential: options.medicalCredentials.map((c) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: c,
      })),
    }),
  }
}

// ---------------------------------------------------------------------------
// Tier 1 — Installateurs RGE (solaire, PAC, isolation)
// Score Mobem : 8.9/10 — Double moteur MaPrimeRénov' + CEE
// ---------------------------------------------------------------------------

/**
 * Schema HomeAndConstructionBusiness — pour installateurs RGE, artisans qualifiés.
 * Propriétés différenciantes : `hasCredential` (certifications RGE), `makesOffer`.
 *
 * Argument ROI terrain : 1 chantier PAC supplémentaire/mois = +12 000–20 000€ CA.
 * Maintenance 200€/mois remboursée par 1 chantier généré dans l'année (×5 à ×8 ROI).
 */
export function generateHomeAndConstructionSchema(
  config: SiteConfig,
  options?: {
    rgeLabels?: string[]       // ex: ['QualiPAC', 'Qualibat RGE', 'RGE Éco-Artisan']
    services?: string[]        // ex: ['Installation pompe à chaleur', 'Panneaux solaires']
    sirenNumber?: string       // SIREN pour la crédibilité B2B
    guarantees?: string[]      // ex: ['Garantie décennale', 'Assurance RC Pro']
  }
) {
  const base = generateLocalBusinessSchema(config)

  return {
    ...base,
    '@type': 'HomeAndConstructionBusiness',
    ...(options?.rgeLabels && {
      hasCredential: options.rgeLabels.map((label) => ({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: label,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Ministère de la Transition Écologique',
        },
      })),
    }),
    ...(options?.services && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestations',
        itemListElement: options.services.map((s, i) => ({
          '@type': 'Offer',
          position: i + 1,
          itemOffered: { '@type': 'Service', name: s },
        })),
      },
    }),
    ...(options?.sirenNumber && {
      identifier: {
        '@type': 'PropertyValue',
        name: 'SIREN',
        value: options.sirenNumber,
      },
    }),
    ...(options?.guarantees && {
      award: options.guarantees,
    }),
  }
}

// ---------------------------------------------------------------------------
// Tier 2 — Restauration premium (5+ ans, 4.3+ étoiles)
// Score Mobem : 6.4/10 — Qualifier strictement avant signature
// ---------------------------------------------------------------------------

/**
 * Schema FoodEstablishment — pour restaurants et hôtels-restaurants.
 * Propriétés différenciantes : `servesCuisine`, `hasMenu`, `priceRange`.
 *
 * Argument ROI terrain : commissions TheFork 200–350€/mois.
 * "Le site de réservation directe supprime cette commission — rentable dès le 2ème mois."
 *
 * ⚠️ Qualifier avant signature : ancienneté 5+ ans, 4.3+ étoiles Google sur 50+ avis.
 * 9 061 défaillances dans la restauration en 2024-25 (IFRAP).
 */
export function generateFoodEstablishmentSchema(
  config: SiteConfig,
  options?: {
    cuisine?: string[]         // ex: ['Gastronomique', 'Française', 'Végétarienne']
    priceRange?: string        // ex: '€€€' (Google interprète ce champ)
    menuUrl?: string           // URL de la carte en ligne
    reservationUrl?: string    // Si différent de config.reservationUrl
    servesCuisine?: string     // Valeur Schema.org standard
    hasMenu?: boolean
  }
) {
  const base = generateLocalBusinessSchema(config)

  return {
    ...base,
    '@type': 'FoodEstablishment',
    ...(options?.cuisine && { servesCuisine: options.cuisine }),
    priceRange: options?.priceRange ?? '€€€',
    ...(options?.menuUrl && {
      hasMenu: {
        '@type': 'Menu',
        url: options.menuUrl,
      },
    }),
    ...(options?.reservationUrl && {
      potentialAction: {
        '@type': 'ReserveAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: options.reservationUrl,
          actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
        },
        result: { '@type': 'FoodEstablishmentReservation', name: 'Réservation table' },
      },
    }),
  }
}

// ---------------------------------------------------------------------------
// Tier 2 — Hôtellerie de charme
// ---------------------------------------------------------------------------

/**
 * Schema LodgingBusiness — pour hôtels boutique et hôtellerie de charme.
 * Propriétés différenciantes : `amenityFeature`, `checkinTime`, `starRating`.
 *
 * ⚠️ Même règle de qualification que la restauration : nuit 100€+, pas de dépendance Booking.
 */
export function generateLodgingBusinessSchema(
  config: SiteConfig,
  options?: {
    starRating?: number        // Nombre d'étoiles officielles
    amenities?: string[]       // ex: ['Spa', 'Piscine', 'Petit-déjeuner inclus', 'Parking']
    checkinTime?: string       // ex: '15:00'
    checkoutTime?: string      // ex: '12:00'
    numberOfRooms?: number
    priceRange?: string
  }
) {
  const base = generateLocalBusinessSchema(config)

  return {
    ...base,
    '@type': 'LodgingBusiness',
    priceRange: options?.priceRange ?? '€€€',
    ...(options?.starRating && {
      starRating: {
        '@type': 'Rating',
        ratingValue: options.starRating,
      },
    }),
    ...(options?.checkinTime && { checkinTime: options.checkinTime }),
    ...(options?.checkoutTime && { checkoutTime: options.checkoutTime }),
    ...(options?.numberOfRooms && { numberOfRooms: options.numberOfRooms }),
    ...(options?.amenities && {
      amenityFeature: options.amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        name: a,
        value: true,
      })),
    }),
  }
}

// ---------------------------------------------------------------------------
// Auto-detect — generateSchemaFromConfig()
// ---------------------------------------------------------------------------

/**
 * Génère automatiquement le bon schema JSON-LD depuis `siteConfig.sector`.
 * Utilisé par défaut dans layout.tsx ou les pages.
 *
 * Pour des propriétés avancées spécifiques au secteur (RPPS, RGE, menuUrl…),
 * appeler directement le générateur sectoriel correspondant.
 *
 * @example
 *   // Dans src/app/layout.tsx
 *   const schema = generateSchemaFromConfig(siteConfig)
 *   // <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
 */
export function generateSchemaFromConfig(config: SiteConfig) {
  switch (config.sector) {
    case 'notaire':
    case 'juriste':
      return generateLegalServiceSchema(config)

    case 'sante':
    case 'esthetique-medicale':
      return generateMedicalBusinessSchema(config)

    case 'rge':
    case 'artisan-btp':
    case 'renovation-haut-gamme':
      return generateHomeAndConstructionSchema(config)

    case 'restaurant':
      return generateFoodEstablishmentSchema(config)

    case 'hotel':
      return generateLodgingBusinessSchema(config)

    case 'pme-industrie':
    case 'autre':
    default:
      return generateLocalBusinessSchema(config)
  }
}

// ---------------------------------------------------------------------------
// GEO — Speakable (visibilité dans ChatGPT, Perplexity, Gemini)
// ---------------------------------------------------------------------------

/**
 * Schema `speakable` — propriété Schema.org qui signale aux LLMs et assistants vocaux
 * les sections les plus pertinentes d'une page pour la citation directe.
 *
 * Impact GEO : augmente la probabilité que ChatGPT, Perplexity ou Gemini cite
 * votre client dans une réponse à une requête sectorielle (ex: "meilleur kiné à Nantes").
 *
 * Source : étude de marché Mobem V3 — "Le GEO est le différenciateur commercial de 2026"
 * (79% d'adoption IA dans le secteur marketing/pub en France, DFM.fr 2025).
 *
 * @param cssSelectors - Sélecteurs CSS des sections à rendre speakable
 * @example
 *   generateSpeakableSchema(['#services', '#about', '.hero-description'])
 */
export function generateSpeakableSchema(cssSelectors: string[]) {
  return withContext({
    '@type': 'WebPage',
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  })
}

/**
 * Schema FAQ — pour les pages qui répondent à des questions fréquentes.
 * Éligible au Rich Result Google + cité directement dans les LLMs.
 *
 * @example
 *   const faqSchema = generateFAQSchema([
 *     { q: 'Proposez-vous des interventions le week-end ?', a: 'Oui, sur rendez-vous le samedi.' },
 *     { q: 'Êtes-vous certifié RGE ?', a: 'Oui, QualiPAC et Qualibat RGE depuis 2019.' },
 *   ])
 */
export function generateFAQSchema(items: { q: string; a: string }[]) {
  return withContext({
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: a,
      },
    })),
  })
}

// ---------------------------------------------------------------------------
// Données de référence — AIDES_PUBLIQUES_PAR_SECTEUR
// ---------------------------------------------------------------------------

/**
 * Aides publiques préremplies par secteur.
 * Source : étude de marché Mobem V3, Partie 7 § Aides publiques (printemps 2026).
 * ⚠️ Toujours vérifier les conditions d'accès en cours — les dispositifs évoluent fréquemment.
 *
 * Usage dans /strategy :
 *   import { AIDES_PUBLIQUES_PAR_SECTEUR } from '@/lib/schema'
 *   const aides = AIDES_PUBLIQUES_PAR_SECTEUR[config.sector] ?? AIDES_PUBLIQUES_PAR_SECTEUR['_tous']
 */
export const AIDES_PUBLIQUES_PAR_SECTEUR: Record<string, import('@/lib/siteConfig').AidePublique[]> = {
  /** Aides applicables à tous les secteurs */
  _tous: [
    {
      name: 'Chèque Numérique',
      amount: "Jusqu'à 1 500€ (50% des dépenses)",
      condition: 'TPE < 11 salariés — site, SEO, réseaux, e-commerce',
      url: 'https://www.cci.fr/numerique',
    },
    {
      name: 'Pass Numérique PME (France Num)',
      amount: "50% des prestations, plafond 5 000€",
      condition: 'PME < 250 salariés — prestataire référencé France Num requis',
      url: 'https://www.francenum.gouv.fr',
    },
    {
      name: 'ADEN (Aide à la Digitalisation des ENtreprises)',
      amount: "40% des investissements, plafond 30 000€",
      condition: 'Entreprises industrielles et artisanales',
      url: 'https://www.bpifrance.fr',
    },
  ],

  /** Aides spécifiques aux installateurs RGE (solaire, PAC, isolation) */
  rge: [
    {
      name: "MaPrimeRénov'",
      amount: "Jusqu'à 10 000€ par ménage (PAC air/eau)",
      condition: 'Ménages pour travaux rénovation énergétique — argument carnet de commandes plein',
      url: 'https://www.anah.gouv.fr/maprimerenov',
    },
    {
      name: 'CEE (Certificats d\'Économies d\'Énergie)',
      amount: 'Variable selon les travaux et la zone climatique',
      condition: "Travaux d'efficacité énergétique — cumulable avec MaPrimeRénov'",
      url: 'https://www.ecologie.gouv.fr/certificats-deconomies-denergie',
    },
    {
      name: 'Éco-Prêt à Taux Zéro (Éco-PTZ)',
      amount: "Jusqu'à 50 000€ sans intérêts",
      condition: 'Travaux de rénovation énergétique pour logements de plus de 2 ans',
      url: 'https://www.anil.org/aides-financieres/eco-ptz',
    },
  ],

  /** Artisans BTP — mêmes aides que RGE + chèque numérique */
  'artisan-btp': [
    {
      name: 'Chèque Numérique Artisan',
      amount: "Jusqu'à 1 500€",
      condition: 'Via la Chambre de métiers et de l\'artisanat (CMA)',
      url: 'https://www.artisanat.fr/numerique',
    },
  ],
}

/**
 * Retourne les aides publiques pour un secteur donné,
 * en fusionnant avec les aides universelles.
 */
export function getAidesForSector(sector: SectorType): import('@/lib/siteConfig').AidePublique[] {
  const universal = AIDES_PUBLIQUES_PAR_SECTEUR['_tous'] ?? []
  const sectorSpecific = AIDES_PUBLIQUES_PAR_SECTEUR[sector] ?? []
  return [...sectorSpecific, ...universal]
}

// ---------------------------------------------------------------------------
// ROI_ARGS_PAR_SECTEUR — Arguments chiffrés préremplis
// ---------------------------------------------------------------------------

/**
 * Arguments ROI chiffrés par secteur.
 * Source : étude de marché Mobem V3, Partie 7 § Arguments ROI sectoriels.
 *
 * Usage dans /strategy :
 *   import { ROI_ARGS_PAR_SECTEUR } from '@/lib/schema'
 *   const roiArgs = ROI_ARGS_PAR_SECTEUR[config.sector] ?? []
 */
export const ROI_ARGS_PAR_SECTEUR: Record<SectorType, import('@/lib/siteConfig').RoiArg[]> = {
  notaire: [
    {
      value: '1 500 – 5 000€',
      label: "d'honoraires par dossier supplémentaire",
      detail: '1 dossier immobilier ou succession via le web = site remboursé en 2–3 mois',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '0,1 dossier',
      label: 'par mois suffit à rentabiliser la maintenance',
      detail: 'Maintenance 400€/mois remboursée par 0,1 dossier supplémentaire',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  juriste: [
    {
      value: '1 500 – 5 000€',
      label: "d'honoraires par dossier supplémentaire",
      detail: '1 consultation ou dossier via le web = site remboursé en moins de 3 mois',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  sante: [
    {
      value: '150 – 300€/mois',
      label: 'économisés sur Doctolib',
      detail: 'Votre propre site génère les consultations que vous payiez à Doctolib',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '800 – 2 000€',
      label: 'de CA/mois possible via Google',
      detail: 'Sans site visible = invisible pour 60% des patients qui cherchent en ligne',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '2ème mois',
      label: "rentable dès le",
      detail: 'Maintenance 250€/mois = inférieure à l\'abonnement Doctolib',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  'esthetique-medicale': [
    {
      value: '35 – 50%',
      label: 'de marge brute dans l\'esthétique médicale',
      detail: 'Pas de plafond tarifaire, pas de conventionnement — chaque patient web = pur bénéfice',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '4 000 – 8 000€',
      label: 'de ticket moyen création',
      detail: 'Segment premium — design irréprochable obligatoire',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  rge: [
    {
      value: '+12 000€ de CA',
      label: 'par chantier PAC supplémentaire',
      detail: 'Avec 2–3 leads web/mois, le site est remboursé en < 1 semaine de chantier',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '×5 à ×8 ROI',
      label: 'minimum sur la maintenance annuelle',
      detail: 'Maintenance 200€/mois = 2 400€/an. 1 chantier généré dans l\'année = ROI garanti',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: "10 000€",
      label: "d'aide MaPrimeRénov' pour vos clients",
      detail: "Votre site explique les aides → carnet de commandes plein toute l'année",
      source: 'ANAH 2026',
    },
  ],
  'artisan-btp': [
    {
      value: '3 000 – 8 000€',
      label: 'de chantier moyen',
      detail: '1 lead/mois via site = site remboursé en moins de 6 mois',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: 'Leboncoin Pro',
      label: "moins cher qu'un abonnement",
      detail: 'Maintenance 200€/mois < Leboncoin Pro 150–300€/mois — résultat plus durable',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  'renovation-haut-gamme': [
    {
      value: '3 500 – 7 000€',
      label: 'de ticket moyen création',
      detail: 'Clientèle premium anti-crise — solvabilité excellente',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  restaurant: [
    {
      value: '200 – 350€/mois',
      label: 'économisés sur les commissions TheFork',
      detail: '100 couverts/mois via plateforme = 200–350€ de commissions. La réservation directe supprime ça.',
      source: 'Étude de marché Mobem 2026',
    },
    {
      value: '2ème mois',
      label: 'rentable dès le',
      detail: 'Économies commissions 200–350€/mois + CA additionnel = rentable immédiatement',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  hotel: [
    {
      value: '15 – 25%',
      label: 'de commission Booking.com économisés',
      detail: 'La réservation directe via votre site supprime les commissions plateformes',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  'pme-industrie': [
    {
      value: '5 000 – 15 000€',
      label: 'de ticket création',
      detail: 'EBE PME 21% (INSEE 2023) — solvabilité solide, décision multi-interlocuteurs',
      source: 'Étude de marché Mobem 2026',
    },
  ],
  autre: [],
}
