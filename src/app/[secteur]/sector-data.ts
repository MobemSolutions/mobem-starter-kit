/**
 * Configuration des landing pages sectorielles SEO
 *
 * Chaque entrée = une URL /[secteur] générée statiquement.
 * Remplir après /strategy selon les secteurs cibles du client.
 *
 * Stratégie SEO source : étude de marché Mobem V3, section 2.2
 * "Les requêtes locales + sectorielles ont l'avantage décisif :
 * intention d'achat directe + quasi absence de concurrence qualitative
 * = taux de conversion 5 à 10 fois supérieur aux requêtes génériques."
 *
 * Exemples de requêtes à fort potentiel (100–500 recherches/mois, très faible concurrence) :
 *   - "site web kinésithérapeute [ville]"
 *   - "création site notaire [ville]"
 *   - "site installateur pompe à chaleur [département]"
 *
 * Usage :
 *   1. Copier un exemple ci-dessous
 *   2. Remplacer le slug et tout le contenu
 *   3. Ajouter le slug dans SECTOR_SLUGS pour la génération statique
 *   4. La page /[slug] est générée automatiquement
 */

import type { RoiArg } from '@/lib/siteConfig'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SectorPageData {
  /** Slug URL — ex: 'kinesitherapeute' → /kinesitherapeute */
  slug: string
  /** Secteur SiteConfig pour les schémas JSON-LD */
  sector: 'notaire' | 'juriste' | 'sante' | 'esthetique-medicale' | 'rge' | 'artisan-btp' | 'restaurant' | 'hotel' | 'autre'
  /** Métadonnées SEO */
  meta: {
    /** H1 + balise title — inclure le mot-clé local */
    title: string
    /** 150–160 caractères — métier + ville + CTA */
    description: string
    /** Mots-clés cibles pour les titres H2/H3 */
    keywords?: string[]
  }
  hero: {
    /** Accroche — formulée comme un problème à résoudre */
    headline: string
    /** Sous-titre — bénéfice concret */
    subheadline: string
    /** Label CTA principal */
    cta: string
  }
  /** Problème que rencontre ce secteur sans site ou sans visibilité */
  problemStatement: string
  /** 3–5 services ou prestations listées */
  services: { title: string; description: string }[]
  /** 2–3 arguments ROI spécifiques */
  roiArgs: RoiArg[]
  /** Certifications à afficher */
  certifications: string[]
  /** 4–6 questions/réponses FAQ sectorielles */
  faq: { q: string; a: string }[]
  /** Mode de prise de contact */
  bookingMode: 'doctolib' | 'calendly' | 'form' | 'phone'
  /** URL de réservation si mode doctolib/calendly */
  bookingUrl?: string
}

// ---------------------------------------------------------------------------
// Slugs — liste exhaustive pour generateStaticParams()
// Ajouter ici chaque nouveau slug créé ci-dessous.
// ---------------------------------------------------------------------------

export const SECTOR_SLUGS: string[] = [
  'kinesitherapeute',
  'notaire',
  'installateur-pac',
]

// ---------------------------------------------------------------------------
// Données par secteur — EXEMPLES À ADAPTER PAR CLIENT
// ---------------------------------------------------------------------------

export const SECTOR_DATA: Record<string, SectorPageData> = {

  // -------------------------------------------------------------------------
  // KINÉSITHÉRAPEUTE — Tier 1 Santé (8.8/10)
  // Requête cible : "kinésithérapeute [ville]" · "site web kinésithérapeute [ville]"
  // -------------------------------------------------------------------------
  kinesitherapeute: {
    slug: 'kinesitherapeute',
    sector: 'sante',
    meta: {
      title: 'Site web pour kinésithérapeute — Visible sur Google, sans Doctolib',
      description:
        'Créez un site professionnel pour votre cabinet de kinésithérapie. SEO local, prise de rendez-vous en ligne, remboursement Sécu affiché. Devis gratuit.',
      keywords: ['site web kinésithérapeute', 'site cabinet kiné', 'référencement kiné', 'prise de rendez-vous kinésithérapeute'],
    },
    hero: {
      headline: 'Votre cabinet kiné visible sur Google — sans payer Doctolib chaque mois',
      subheadline:
        "150 à 300€ par mois économisés. Vos patients vous trouvent directement. Vous remplissez votre agenda sans dépendre d'une plateforme.",
      cta: 'Voir un exemple de site kiné',
    },
    problemStatement:
      '60% de vos futurs patients vous cherchent sur Google avant de choisir un praticien. Sans site visible, vous êtes invisible pour eux — et vous payez Doctolib pour des consultations que votre propre site pourrait générer.',
    services: [
      {
        title: 'Site vitrine professionnel',
        description: 'Présentation de votre cabinet, spécialités, équipe, accès et horaires. Design soigné, adapté au secteur de santé.',
      },
      {
        title: 'Prise de rendez-vous en ligne',
        description: 'Intégration de votre agenda (Doctolib ou alternative). Vos patients réservent 24h/24 sans vous appeler.',
      },
      {
        title: 'Référencement local (SEO)',
        description: 'Optimisation pour apparaître en tête de Google sur "kinésithérapeute [votre ville]". Résultats en 2–4 mois.',
      },
      {
        title: 'Fiche Google Business Profile',
        description: 'Configuration et optimisation de votre fiche Google Maps. Avis, horaires, photos, lien de prise de RDV.',
      },
    ],
    roiArgs: [
      {
        value: '150–300€',
        label: 'économisés par mois sur Doctolib',
        detail: 'Votre propre site génère les consultations que vous payiez à Doctolib. Rentable dès le 2ème mois.',
        source: 'Étude Mobem 2026',
      },
      {
        value: '3 mois',
        label: 'pour rentabiliser le site',
        detail: "Maintenance 250€/mois = inférieure à l'abonnement Doctolib. 1–2 nouveaux patients web = site remboursé.",
        source: 'Étude Mobem 2026',
      },
    ],
    certifications: ['RPPS', 'Conventionné Sécurité Sociale', 'Assurance RC Pro'],
    faq: [
      {
        q: 'Combien coûte un site pour un kinésithérapeute ?',
        a: 'Nos sites pour praticiens de santé sont proposés entre 3 000 et 5 500€ selon les fonctionnalités. La maintenance mensuelle (200–400€/mois) inclut les mises à jour, la sécurité et le suivi SEO.',
      },
      {
        q: 'Peut-on intégrer Doctolib sur le site ?',
        a: 'Oui. Nous intégrons un lien ou un bouton Doctolib sur votre site. Nous pouvons aussi proposer une alternative moins chère (Cal.com ou formulaire de demande de RDV).',
      },
      {
        q: 'Le site respecte-t-il les règles déontologiques ?',
        a: 'Absolument. Nous connaissons les contraintes de l\'Ordre des masseurs-kinésithérapeutes. Pas de promesse de guérison, pas de comparatif, information factuelle uniquement.',
      },
      {
        q: 'En combien de temps le site est-il en ligne ?',
        a: 'Entre 3 et 6 semaines après le brief initial et la réception des contenus (textes, photos).',
      },
      {
        q: 'Apparaîtrai-je dans Google Maps ?',
        a: 'Oui. Nous configurons et optimisons votre fiche Google Business Profile en même temps que la mise en ligne du site.',
      },
    ],
    bookingMode: 'form',
  },

  // -------------------------------------------------------------------------
  // NOTAIRE — Tier 1 Juridique (9.1/10)
  // Requête cible : "notaire [ville]" · "création site notaire [département]"
  // -------------------------------------------------------------------------
  notaire: {
    slug: 'notaire',
    sector: 'notaire',
    meta: {
      title: 'Site web pour étude notariale — Présence digitale professionnelle',
      description:
        'Site institutionnel pour notaires et études notariales. SEO local, architecture sobre, respect de la déontologie. Devis gratuit.',
      keywords: ['site web notaire', 'site étude notariale', 'référencement notaire', 'site juridique'],
    },
    hero: {
      headline: 'Une présence digitale à la hauteur de votre étude',
      subheadline:
        'Un site sobre, professionnel, optimisé pour Google. Vos futurs clients vous trouvent avant de se tourner vers le confrère.',
      cta: 'Demander un entretien',
    },
    problemStatement:
      'La majorité des particuliers cherchent un notaire sur Google avant de demander une recommandation. Un site daté ou absent vous fait perdre des dossiers en faveur d\'études mieux référencées — sans que vous le sachiez.',
    services: [
      {
        title: 'Site institutionnel sobre et crédible',
        description: 'Design respectant les codes de la profession. Présentation de l\'étude, des collaborateurs et des domaines de compétence.',
      },
      {
        title: 'Référencement local',
        description: 'Optimisation pour apparaître sur les requêtes "notaire [ville]" et "acte [ville]". Résultats visibles en 3–4 mois.',
      },
      {
        title: 'Mise à jour et maintenance',
        description: 'Votre site reste à jour sans vous mobiliser. Modifications, sécurité, sauvegardes : tout est inclus dans la maintenance mensuelle.',
      },
      {
        title: 'Blog juridique SEO (optionnel)',
        description: 'Articles sur vos domaines de compétence — droit immobilier, successions, droit de la famille — pour capter les recherches informationnelles.',
      },
    ],
    roiArgs: [
      {
        value: '1 dossier',
        label: 'de plus par mois via Google',
        detail: '1 dossier immobilier ou succession = 1 500 à 5 000€ d\'honoraires. Le site est remboursé en 2–3 mois.',
        source: 'Étude Mobem 2026',
      },
      {
        value: '0,1 dossier',
        label: 'suffit à rentabiliser la maintenance',
        detail: 'Maintenance 400€/mois. 0,1 dossier supplémentaire par mois = ROI immédiat.',
        source: 'Étude Mobem 2026',
      },
    ],
    certifications: ["Chambre des notaires", "Conseil Supérieur du Notariat"],
    faq: [
      {
        q: 'Le site peut-il mentionner nos honoraires ?',
        a: 'Les honoraires notariaux sont réglementés par décret. Nous n\'affichons pas de tarif fixe, mais nous pouvons expliquer le mode de calcul et indiquer qu\'un devis est fourni lors du premier entretien.',
      },
      {
        q: 'Quel délai pour la mise en ligne ?',
        a: 'Entre 4 et 8 semaines selon la taille de l\'étude et le volume de contenu à intégrer.',
      },
      {
        q: 'Le site sera-t-il conforme aux règles déontologiques notariales ?',
        a: 'Oui. Nous respectons les recommandations du Conseil Supérieur du Notariat : pas de comparatif, pas de classement, information factuelle et institutionnelle uniquement.',
      },
      {
        q: 'Peut-on avoir une section recrutement ?',
        a: 'Absolument. Une page carrière avec les postes ouverts est incluse dans nos formules. Elle améliore aussi le référencement de l\'étude.',
      },
    ],
    bookingMode: 'phone',
  },

  // -------------------------------------------------------------------------
  // INSTALLATEUR PAC — Tier 1 RGE (8.9/10)
  // Requête cible : "installateur pompe à chaleur [ville]" · "poseur PAC [département]"
  // -------------------------------------------------------------------------
  'installateur-pac': {
    slug: 'installateur-pac',
    sector: 'rge',
    meta: {
      title: 'Site web pour installateur de pompe à chaleur — Devis en ligne, label RGE',
      description:
        'Site professionnel pour installateurs PAC. Formulaire de devis, page MaPrimeRénov\', certifications RGE mises en avant. Devis gratuit.',
      keywords: ['site web installateur PAC', 'site poseur pompe à chaleur', 'référencement RGE', 'site artisan rénovation énergétique'],
    },
    hero: {
      headline: 'Votre carnet de commandes plein toute l\'année — sans démarcher',
      subheadline:
        'Un site optimisé pour MaPrimeRénov\' et les aides CEE. Vos prospects trouvent vos certifications RGE, comprennent les aides disponibles, et vous contactent directement.',
      cta: 'Obtenir mon devis gratuit',
    },
    problemStatement:
      'Les particuliers cherchent un installateur PAC certifié RGE sur Google avant de demander un devis. Sans site clair sur vos certifications et les aides disponibles, ils passent chez un concurrent qui a investi dans sa présence en ligne.',
    services: [
      {
        title: 'Site vitrine + formulaire de devis',
        description: 'Présentation de vos installations, certifications RGE visibles, formulaire de demande de devis adapté aux projets PAC.',
      },
      {
        title: 'Page MaPrimeRénov\' dédiée',
        description: 'Explication des aides disponibles (MaPrimeRénov\', CEE, Éco-PTZ). Vos prospects comprennent le reste à charge réel avant de vous contacter.',
      },
      {
        title: 'Référencement local',
        description: 'Optimisation pour "installateur PAC [ville]" et "pompe à chaleur [département]". Requêtes à fort volume, faible concurrence qualitative.',
      },
      {
        title: 'Portfolio de chantiers',
        description: 'Photos de vos installations réelles, types de PAC posées, zones d\'intervention. Preuve concrète de votre savoir-faire.',
      },
    ],
    roiArgs: [
      {
        value: '+12 000€',
        label: 'de CA par chantier PAC supplémentaire',
        detail: '2–3 leads web/mois = site remboursé en moins d\'une semaine de chantier.',
        source: 'Étude Mobem 2026',
      },
      {
        value: '×5 à ×8',
        label: 'ROI sur la maintenance annuelle',
        detail: 'Maintenance 200€/mois = 2 400€/an. 1 chantier généré dans l\'année = ROI minimum garanti.',
        source: 'Étude Mobem 2026',
      },
      {
        value: '10 000€',
        label: 'd\'aide MaPrimeRénov\' pour vos clients',
        detail: 'Votre site explique les aides → carnet de commandes plein toute l\'année.',
        source: 'ANAH 2026',
      },
    ],
    certifications: ['RGE QualiPAC', 'Qualibat RGE', 'Garantie décennale', 'RC Pro'],
    faq: [
      {
        q: 'Êtes-vous certifié RGE ?',
        a: 'Oui, la certification RGE (Reconnu Garant de l\'Environnement) est obligatoire pour que vos clients bénéficient de MaPrimeRénov\' et des CEE. Nos certifications sont visibles sur le site.',
      },
      {
        q: 'Mes clients peuvent-ils bénéficier de MaPrimeRénov\' ?',
        a: 'Oui, sous conditions de ressources. Nous expliquons clairement les aides disponibles sur votre site pour que vos prospects arrivent en rendez-vous déjà informés.',
      },
      {
        q: 'Combien coûte un site pour un installateur PAC ?',
        a: 'Entre 3 000 et 6 000€ selon les fonctionnalités (portfolio, page MaPrimeRénov\', formulaire de devis). Maintenance 150–300€/mois.',
      },
      {
        q: 'Peut-on avoir un formulaire de devis en ligne ?',
        a: 'Absolument. Le formulaire de demande de devis est inclus dans toutes nos formules — c\'est le canal de contact principal pour ce secteur.',
      },
      {
        q: 'En combien de temps est-ce rentable ?',
        a: '1 chantier PAC supplémentaire par mois = entre 10 000 et 20 000€ de CA. Votre site est rentabilisé en moins d\'une semaine de travail.',
      },
    ],
    bookingMode: 'form',
  },
}
