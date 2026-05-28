// Source de vérité unique — NAP, zones, avis, coordonnées.
// Remplir après /strategy. Tous les composants lisent depuis ici.
// Mettre à jour si téléphone, adresse ou zone change — un seul endroit.

// ---------------------------------------------------------------------------
// Types sectoriels — Matrice de priorisation Mobem 2026
// ---------------------------------------------------------------------------

/**
 * Secteurs cibles classés par Tier (source : étude de marché Mobem V3, avril 2026).
 * Tier 1 = à attaquer immédiatement · Tier 2 = fort potentiel, qualifier d'abord
 * Tier 3 = après 12 mois · Tier 4 = éviter en démarrage
 */
export type SectorType =
  // Tier 1 — Score 8.8 à 9.1/10 (cibles prioritaires 0–6 mois)
  | 'notaire'               // Droit des affaires, notaires, gestion patrimoine — 9.1/10
  | 'juriste'               // Avocats, cabinets d'affaires — 9.1/10 (même segment)
  | 'sante'                 // Kiné, médecin, ostéo, dentiste — 8.8/10
  | 'esthetique-medicale'   // Esthétique médicale non-conventionnée — 8.8/10 (niche premium)
  | 'rge'                   // Installateurs solaire, PAC, isolation — 8.9/10
  // Tier 2 — Score 6.4 à 7.2/10 (qualifier avant signature)
  | 'artisan-btp'           // Artisans BTP qualifiés 10+ ans, 4.0+ étoiles — 6.8/10
  | 'renovation-haut-gamme' // Architectes d'intérieur, rénovation premium — 7.2/10
  | 'restaurant'            // Restauration premium 5+ ans, 4.3+ étoiles — 6.4/10
  | 'hotel'                 // Hôtellerie de charme — Tier 2
  // Tier 3 — après 12 mois avec références sectorielles
  | 'pme-industrie'         // PME industrielles, cabinets comptables — 7.5/10
  | 'autre'

/**
 * Types Schema.org correspondant à chaque secteur.
 * Utilisé dans `generateSchemaFromConfig()` pour le JSON-LD structuré.
 */
export type SchemaOrgType =
  | 'LocalBusiness'
  | 'LegalService'
  | 'Attorney'
  | 'MedicalBusiness'
  | 'Physician'
  | 'HomeAndConstructionBusiness'
  | 'FoodEstablishment'
  | 'Restaurant'
  | 'LodgingBusiness'
  | 'Hotel'
  | 'ProfessionalService'

/**
 * Mode de prise de contact / réservation.
 * Injecté dans le composant BookingCTA et le schema `potentialAction`.
 */
export type BookingMode =
  | 'doctolib'   // Lien Doctolib — médecins, kinés, esthétique médicale
  | 'calendly'   // Lien Calendly
  | 'cal'        // Cal.com (open-source)
  | 'thefork'    // TheFork / LaFourchette — restaurants
  | 'form'       // Formulaire devis inline — RGE, BTP, artisans
  | 'phone'      // Appel téléphonique uniquement
  | 'whatsapp'   // WhatsApp direct (wa.me)
  | 'none'       // Pas de réservation en ligne

/**
 * Argument ROI chiffré par secteur.
 * Source : étude de marché Mobem V3, Partie 7 — Arguments ROI sectoriels.
 * Utilisé dans le composant ROITeaser.
 */
export type RoiArg = {
  /** Chiffre mis en avant — ex: "150€/mois", "×5 ROI", "+23 leads" */
  value: string
  /** Libellé court — ex: "économisés sur Doctolib" */
  label: string
  /** Détail optionnel pour le tooltip ou la sous-ligne */
  detail?: string
  /** Source pour la crédibilité — ex: "Étude de marché Mobem 2026" */
  source?: string
}

/**
 * Aide publique applicable au secteur.
 * Source : étude de marché Mobem V3, Partie 7 § Aides publiques.
 * Utilisé dans le composant AidesPubliques.
 */
export type AidePublique = {
  /** Nom officiel du dispositif — ex: "MaPrimeRénov'" */
  name: string
  /** Montant / taux — ex: "Jusqu'à 10 000€", "50% des dépenses" */
  amount: string
  /** Conditions d'éligibilité courtes */
  condition: string
  /** URL officielle (France Num, ANAH, Bpifrance…) */
  url: string
}

// ---------------------------------------------------------------------------
// Types de données de base
// ---------------------------------------------------------------------------

export type Review = {
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  text: string
  date: string // YYYY-MM-DD
}

export type SiteConfig = {
  name: string
  tagline: string
  description: string
  url: string

  // -------------------------------------------------------------------------
  // Secteur & positionnement
  // -------------------------------------------------------------------------
  /** Secteur client — détermine les schémas JSON-LD, les composants sectoriels et les CTAs */
  sector: SectorType
  /**
   * Type Schema.org exact.
   * `generateSchemaFromConfig()` peut le déduire depuis `sector`,
   * mais le préciser ici permet de surcharger si nécessaire.
   * Valeurs possibles : voir SchemaOrgType
   */
  schemaType: SchemaOrgType
  /** 'B2C' = particuliers · 'B2B' = entreprises · 'B2C+B2B' = les deux */
  clientType: 'B2C' | 'B2B' | 'B2C+B2B'

  // -------------------------------------------------------------------------
  // Certifications & preuves sociales (composant TrustBadges)
  // -------------------------------------------------------------------------
  /**
   * Labels et certifications professionnelles.
   * Exemples : ['RGE', 'QualiPAC'] · ['RPPS: 10XXXXXXXXX'] · ["Ordre des notaires"]
   * → Schema.org `hasCredential` + composant TrustBadges
   */
  certifications: string[]

  // -------------------------------------------------------------------------
  // Prise de contact & réservation (composant BookingCTA)
  // -------------------------------------------------------------------------
  /**
   * Mode de réservation en ligne.
   * Conditionne le rendu du composant BookingCTA.
   * ex: 'doctolib' pour un kiné, 'form' pour un installateur RGE
   */
  bookingMode?: BookingMode
  /**
   * URL de prise de RDV (Calendly, Doctolib, TheFork, Cal.com…).
   * Requis si bookingMode est 'doctolib' | 'calendly' | 'cal' | 'thefork'.
   * Alimente aussi le schema `potentialAction` (ReserveAction).
   */
  reservationUrl?: string
  /**
   * Activer le formulaire devis inline (RGE, BTP, artisans).
   * Si true et bookingMode = 'form', le composant BookingCTA affiche le formulaire.
   */
  quoteFormEnabled?: boolean

  // -------------------------------------------------------------------------
  // Arguments ROI (composant ROITeaser)
  // -------------------------------------------------------------------------
  /**
   * 2 à 3 arguments ROI chiffrés spécifiques au secteur.
   * Préremplis automatiquement par /strategy selon le secteur.
   * ex pour un kiné : [{value:"150€/mois", label:"économisés sur Doctolib"}]
   */
  roiArgs?: RoiArg[]

  // -------------------------------------------------------------------------
  // Aides publiques (composant AidesPubliques)
  // -------------------------------------------------------------------------
  /**
   * Dispositifs d'aides publiques applicables au secteur du client.
   * ex pour RGE : MaPrimeRénov', CEE, Éco-PTZ
   * ex pour tout secteur : Chèque Numérique, Pass Numérique PME, ADEN
   * Préremplis automatiquement par /strategy selon le secteur.
   */
  aidesPubliques?: AidePublique[]

  // -------------------------------------------------------------------------
  // Marque employeur (page /marque-employeur, composant CareerSection)
  // -------------------------------------------------------------------------
  /**
   * Activer la page /marque-employeur.
   * 87% des PME peinent à recruter — niche peu saturée (étude Mobem 2026).
   * Upsell naturel pour les clients déjà en maintenance.
   */
  careerPageEnabled?: boolean
  /**
   * Activer les éléments de marque employeur sur le site principal
   * (section équipe étendue, valeurs, témoignages collaborateurs).
   */
  employerBrandEnabled?: boolean

  // -------------------------------------------------------------------------
  // Coordonnées
  // -------------------------------------------------------------------------
  contact: {
    phone: string
    phoneDisplay: string
    email: string
    address: {
      street: string
      city: string
      zip: string
      region: string
    }
    geo: {
      lat: number
      lng: number
    }
  }
  zones: string[]        // villes couvertes → areaServed dans LocalBusiness schema
  openingHours: string[] // format Schema.org "Mo-Fr 08:00-18:00"
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
    /** Numéro international sans espaces ni '+', ex: '33612345678' — utilisé dans wa.me/[numéro] */
    whatsapp?: string
  }
  reviews: Review[]
}

export const siteConfig: SiteConfig = {
  name:        'TODO: Nom du Client',
  tagline:     'TODO: Tagline courte',
  description: 'TODO: Description 150-160 caractères — métier + ville + proposition de valeur',
  url:         process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',

  // Secteur — choisir parmi SectorType (Tier 1 recommandé pour les 6 premiers mois)
  // Tier 1 : 'notaire' | 'juriste' | 'sante' | 'esthetique-medicale' | 'rge'
  // Tier 2 : 'artisan-btp' | 'renovation-haut-gamme' | 'restaurant' | 'hotel'
  sector:      'autre',        // TODO: choisir le secteur client

  // SchemaType — generateSchemaFromConfig() peut le déduire depuis sector,
  // mais le préciser ici permet de surcharger si nécessaire.
  // Mapping secteur → schéma : notaire→LegalService · sante→MedicalBusiness
  // rge/artisan→HomeAndConstructionBusiness · restaurant→FoodEstablishment · hotel→LodgingBusiness
  schemaType:  'LocalBusiness', // TODO: affiner selon le secteur

  clientType:  'B2C',           // TODO: 'B2C' | 'B2B' | 'B2C+B2B'

  // Certifications — alimentent TrustBadges + Schema.org hasCredential
  // ex RGE : ['QualiPAC', 'Qualibat RGE', 'RGE Éco-Artisan']
  // ex santé : ['RPPS: 10XXXXXXXXX', 'Conventionné secteur 1']
  // ex notaire : ["Chambre des notaires de [Département]"]
  certifications: [],

  // Booking — configurer selon le secteur
  // bookingMode: 'form',      // TODO: 'doctolib'|'calendly'|'cal'|'thefork'|'form'|'phone'|'whatsapp'|'none'
  // reservationUrl: '',        // TODO: URL Doctolib, Calendly, etc. — requis si bookingMode != 'form'|'phone'
  // quoteFormEnabled: true,    // TODO: true pour RGE, BTP, artisans (active le formulaire devis)

  // ROI — 2 à 3 arguments chiffrés (préremplis par /strategy selon le secteur)
  // Exemples par secteur :
  //   sante    → {value:"150€/mois", label:"économisés sur Doctolib", source:"Étude Mobem 2026"}
  //   rge      → {value:"+12 000€", label:"de CA par chantier PAC supplémentaire"}
  //   notaire  → {value:"3 mois", label:"pour rembourser le site via 1 dossier en plus"}
  //   resto    → {value:"200–350€/mois", label:"économisés sur les commissions TheFork"}
  roiArgs: [],

  // Aides publiques — préremplies par /strategy selon le secteur
  // Voir AIDES_PUBLIQUES_PAR_SECTEUR dans src/lib/schema/index.ts
  aidesPubliques: [],

  // Marque employeur — décommenter si le client recrute activement
  // careerPageEnabled: false,
  // employerBrandEnabled: false,

  contact: {
    phone:        'TODO: +33123456789',
    phoneDisplay: 'TODO: 01 23 45 67 89',
    email:        'TODO: contact@domaine.fr',
    address: {
      street: "TODO: 1 Rue de l'Artisan",
      city:   'TODO: Ville',
      zip:    'TODO: 75000',
      region: 'TODO: Île-de-France',
    },
    geo: {
      lat: 0, // TODO: https://www.latlong.net/
      lng: 0,
    },
  },

  zones: [
    'TODO: Ville principale',
    'TODO: Commune voisine',
  ],

  openingHours: [
    'Mo-Fr 08:00-18:00',
    // 'Sa 08:00-12:00',
  ],

  social: {
    facebook:  '', // laisser vide si absent
    instagram: '',
    linkedin:  '',
    youtube:   '',
    whatsapp:  '', // ex: '33612345678' — laisser vide si le client n'utilise pas WhatsApp
  },

  reviews: [
    // Copier les vrais avis Google ici — voir workflow.md § AggregateRating
    // { author: 'Marie D.', rating: 5, text: 'Intervention rapide et soignée.', date: '2024-03-15' },
  ],
}
