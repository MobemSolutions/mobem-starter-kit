// Source de vérité unique — NAP, zones, avis, coordonnées.
// Remplir après /strategy. Tous les composants lisent depuis ici.
// Mettre à jour si téléphone, adresse ou zone change — un seul endroit.

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
  sector: string
  /** Voir build.md § Schema @type pour le mapping secteur → type précis */
  schemaType: string
  /** 'B2C' = particuliers · 'B2B' = entreprises · 'B2C+B2B' = les deux */
  clientType: 'B2C' | 'B2B' | 'B2C+B2B'
  /** Labels et certifications professionnelles → Schema.org `award` + composant TrustBadges */
  certifications: string[]
  /** URL de prise de RDV (Calendly, Doctolib, TheFork…) — optionnel */
  reservationUrl?: string
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
  sector:      'TODO: ex. Plombier-Chauffagiste',
  schemaType:  'LocalBusiness', // TODO: affiner — voir build.md § Schema @type
  clientType:  'B2C',           // TODO: 'B2C' | 'B2B' | 'B2C+B2B'
  certifications: [],           // TODO: ex. ['RGE', 'QualiPAC'] ou ['RPPS: 10XXXXXXXXX']
  // reservationUrl: '',        // TODO: ex. 'https://calendly.com/prenom-nom/consultation'

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
    whatsapp:  '', // ex: '33612345678' — laisser vide si le client n'utilise pas WhatsApp
  },

  reviews: [
    // Copier les vrais avis Google ici — voir build.md § AggregateRating
    // { author: 'Marie D.', rating: 5, text: 'Intervention rapide et soignée.', date: '2024-03-15' },
  ],
}
