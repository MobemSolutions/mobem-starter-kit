---
description: Phase 3 — Développement des sections. Lit docs/product.md + docs/design.md, construit les composants un par un. Aucun fichier src/ sans avoir lu ces deux fichiers.
---

# /build — Développement des sections

## Prérequis — vérifications bloquantes

### 1. docs/product.md + docs/design.md
Lis les deux fichiers avant d'écrire la première ligne de code.
Si `docs/design.md` ne contient pas de palette validée (tokens OKLCH) : **STOP**.
Demande de lancer `/design` d'abord.

### 2. globals.css
Vérifie que `src/app/globals.css` contient les CSS custom properties `--background`, `--foreground`, `--signal`.
Si non : **STOP**. Le `/design` n'a pas été completé.

### 3. Hero — cohérence brief / traitement visuel
Si la section demandée est le Hero, poser cette question avant de coder :

Le brief implique-t-il une imagerie ? (artisan en action, chantier, produit physique, lieu, équipe)
- **Oui** → prévoir un emplacement image. Trouver une URL Unsplash fiable : récupérer la page photo individuelle, extraire la vraie URL CDN longue, vérifier via vision. Ne jamais écrire une URL Unsplash non vérifiée.
- **Non** (service immatériel, studio, cabinet, approche éditoriale assumée) → hero typographique acceptable et parfois supérieur — meilleure performance LCP, parti pris clair.

Si incertain : demander avant de coder.

## Ordre de lecture obligatoire

1. `docs/product.md` — north star, sections, contenu réel
2. `docs/design.md` — palette, typographie, radius, motion dials
3. `SKILL.md` — grille, motion, anti-patterns techniques
4. `.agents/skills/impeccable/reference/craft.md` — avant chaque composant
5. `.agents/skills/full-output-enforcement/SKILL.md` — règles de sortie complète (aucun placeholder, aucune troncature)
6. `docs/context/discovery-report.md` — si le fichier existe : lire pour enrichir le contenu (voix de marque, positionnement, CTAs)

## Photo workflow Unsplash

Quand une image est requise (hero, illustration de section) :

1. Rechercher avec des termes précis : `[sujet] [ambiance] [éclairage]` — ex: `plumber workshop warm lighting`
2. Vérifier que la photo n'est pas Unsplash+ (badge "Premium" = payant, interdit)
3. Ouvrir la page individuelle de la photo sur unsplash.com
4. Extraire l'URL CDN longue via WebFetch (format `https://images.unsplash.com/photo-XXXX?...`)
5. Vérifier visuellement : télécharger avec WebFetch → lire via Read (vision) → confirmer ambiance et cadrage
6. Sauvegarder l'ID photo (ex: `photo-1234567890`) dans un commentaire ou dans `docs/design.md` pour référence

**Ne jamais écrire une URL Unsplash non vérifiée dans le code.** Les URLs courtes ou construites à la main renvoient des 404.

## Règles d'animation

### Hero (above-fold)
```typescript
// animate= dès le montage
animate={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 16 }}
transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.4 }}
```

### Sections (below-fold)
```typescript
// whileInView uniquement — jamais animate= sur les sections
whileInView={{ opacity: 1, y: 0 }}
initial={{ opacity: 0, y: 16 }}
viewport={{ once: true, margin: "-50px" }}
transition={{ ease: [0.25, 0.1, 0.25, 1], duration: 0.4 }}
```

### Stagger sur les listes
```typescript
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { ease: [0.25, 0.1, 0.25, 1], duration: 0.3 } }
}
```

### Règles motion — non-négociables
- `viewport={{ once: true }}` systématique sur tous les `whileInView`
- Animer UNIQUEMENT `opacity` et `transform` (y, x, scale) — jamais width/height/padding
- `useReducedMotion()` obligatoire dans chaque composant animé — pattern exact :
  ```typescript
  const reduced = useReducedMotion() ?? false
  const fromY = reduced ? 0 : 16
  const dur = reduced ? 0.01 : 0.4
  ```
- Pas de spring, pas de bounce, pas d'elastic — ease cubique uniquement

## Règles de contenu

- **Zéro placeholder** : aucun "Lorem ipsum", aucun "Service 1", aucun "Jean Dupont"
- Contenu extrait de `docs/product.md` — si une info manque, laisser un `TODO:` visible
- CTAs spécifiques au métier : `"Demander un devis"` > `"En savoir plus"`
- Noms de sections ancrés dans le réel : `"Mes chantiers récents"` > `"Portfolio"`
- Téléphones, adresses, horaires : utiliser les vraies données du brief ou `TODO: [téléphone]`

## Contraintes TypeScript strict

- Aucun `any` implicite ou explicite
- Props interfaces complètes pour chaque composant
- Server Components par défaut — `'use client'` uniquement pour state/effects/motion
- `cn()` depuis `@/lib/utils` pour la fusion className
- Aucun style inline sauf valeurs dynamiques Framer Motion

## Analytics — Plausible (systématique)

Installer sur tout projet avant la livraison. Privacy-first, pas de bandeau CNIL requis, données EU.

Dans `src/app/layout.tsx` :

```tsx
import Script from 'next/script'

// Dans le <body>, après les children :
<Script
  defer
  data-domain="[domaine-client].fr"  // TODO: remplacer
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"
/>
```

Vérifier en production (pas en localhost — Plausible ignore les requêtes locales) : ouvrir le dashboard Plausible et confirmer que les pages vues remontent.

---

## Checklist mentale par composant

Avant de valider chaque composant :

- [ ] Toutes les couleurs via CSS custom properties (`var(--...)`) — aucun hex hardcodé
- [ ] Grille 8pt respectée — espacements multiples de 8px uniquement
- [ ] Animation below-fold : `whileInView` avec `once: true`
- [ ] Animation hero : `animate=` au montage
- [ ] `useReducedMotion()` présent dans chaque composant animé
- [ ] `id="main-content"` sur le `<main>` de chaque page (cible du skip link dans layout.tsx)
- [ ] Hero : traitement visuel cohérent avec le brief (image si le secteur l'implique, typographique si choix assumé)
- [ ] Contenu réel — aucun placeholder générique
- [ ] Mobile 375px : pas d'overflow horizontal
- [ ] `alt` + `width` + `height` sur toutes les images `next/image`
- [ ] Accent `--signal` : max 1-2 occurrences par section
- [ ] Pas de `console.log`

## Fichiers systématiques — à créer avant les sections

Ces 7 fichiers + 1 composant sont toujours créés, quel que soit le projet. Infrastructure SEO/partage de base + conversion + accessibilité.

### OG Image — `src/app/opengraph-image.tsx`

Affichée lors du partage WhatsApp / Facebook / LinkedIn. Sans elle, le partage donne un aperçu vide.

```tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div style={{
      width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end', padding: '64px',
      background: 'oklch(0.12 0.01 55)', color: 'oklch(0.97 0.003 80)',
    }}>
      <div style={{ fontSize: 56, fontWeight: 700, lineHeight: 1.1, marginBottom: 16 }}>
        {/* TODO: Nom du client */}
      </div>
      <div style={{ fontSize: 28, opacity: 0.7 }}>
        {/* TODO: Tagline ou secteur */}
      </div>
    </div>
  )
}
```

Adapter les couleurs et le contenu aux tokens de `docs/design.md`.

### Favicon — `src/app/icon.tsx`

Génère le favicon (32×32) dynamiquement depuis `siteConfig.name`. Sans ce fichier, le favicon reste celui du template Next.js par défaut.

```tsx
import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/siteConfig'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  const initials = siteConfig.name
    .split(' ')
    .filter(w => !['&','et','de','du','la','le','les'].includes(w.toLowerCase()))
    .slice(0, 2).map(w => w[0]).join('').toUpperCase().slice(0, 2)

  return new ImageResponse(
    <div style={{ width:'100%', height:'100%', display:'flex', alignItems:'center',
      justifyContent:'center', background:'oklch(0.18 0.02 55)', // TODO: tokens design
      color:'oklch(0.97 0.003 80)', fontSize: initials.length === 1 ? 18 : 14, fontWeight:700 }}>
      {initials}
    </div>,
    { ...size }
  )
}
```

**Après `/design` :** mettre à jour les couleurs background et color pour correspondre aux tokens OKLCH du projet.

### Loading — `src/app/loading.tsx`

Skeleton affiché pendant les Suspense boundaries (navigation, streaming SSR). Complète le trio avec `not-found.tsx` et `error.tsx`.

Utilise `animate-pulse` + tokens `--secondary` et `--border`. Adapter la structure au layout réel du site (nb de colonnes, hauteur hero, etc.).

### FloatingContact — `src/components/ui/floating-contact.tsx`

CTA fixe WhatsApp + téléphone, visible sur toutes les pages. Systématique sur les sites artisans — conversion directe sans formulaire.

Voir le pattern complet dans `SKILL.md` § "FLOATING CONTACT".

Ajouter dans `src/app/layout.tsx` après `{children}` :
```tsx
import { FloatingContact } from '@/components/ui/floating-contact'
// ...
<FloatingContact />
```

Prérequis : `siteConfig.contact.phone` renseigné. `siteConfig.social.whatsapp` optionnel — le bouton WhatsApp est absent si vide.
Déclarer le type Plausible : créer `src/types/plausible.d.ts` (voir `SKILL.md` § "PLAUSIBLE").

### Plausible — `src/types/plausible.d.ts`

Déclarer le type global une seule fois pour éviter les erreurs TypeScript sur `window.plausible` :

```typescript
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}
export {}
```

### Sitemap — `src/app/sitemap.ts`

```typescript
import { MetadataRoute } from 'next'

const BASE = 'https://[domaine-client].fr' // TODO: remplacer

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.6 },
    // Ajouter toutes les pages de l'arborescence docs/product.md
  ]
}
```

### Robots — `src/app/robots.ts`

```typescript
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: 'https://[domaine-client].fr/sitemap.xml', // TODO: remplacer
  }
}
```

### Métadonnées layout — `src/app/layout.tsx`

Vérifier que le `metadata` object est complet :

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://[domaine-client].fr'), // TODO
  title: { default: '[Nom] — [Métier] à [Ville]', template: '%s | [Nom]' },
  description: '[Description 150-160 car — inclure métier + ville + proposition de valeur]',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: '[Nom du client]',
  },
  twitter: { card: 'summary_large_image' },
}
```

---

## Schema JSON-LD — sections qui l'exigent

### LocalBusiness (page d'accueil)

Utiliser le type le plus précis disponible — meilleurs rich results que le type générique `LocalBusiness` :

| Secteur | `@type` Schema.org |
|---------|-------------------|
| **Artisans BTP** | |
| Plombier, chauffagiste | `Plumber` |
| Électricien | `Electrician` |
| Installateur RGE (solaire, PAC, isolation) | `HVACBusiness` ou `Electrician` + `certifications: ['RGE']` |
| Maçon, entrepreneur BTP | `HomeAndConstructionBusiness` |
| Couvreur | `RoofingContractor` |
| Menuisier, charpentier | `Carpenter` |
| Peintre bâtiment | `HousePainter` |
| Serrurier | `Locksmith` |
| Jardinier, paysagiste | `LandscapeService` |
| **Professions libérales** | |
| Notaire | `Notary` |
| Avocat, juriste | `Attorney` |
| Cabinet juridique | `LegalService` |
| Médecin généraliste ou spécialiste | `Physician` |
| Kinésithérapeute | `PhysicalTherapist` |
| Dentiste | `Dentist` |
| Clinique esthétique médicale | `HealthAndBeautyBusiness` |
| Expert-comptable | `AccountingService` |
| Architecte d'intérieur | `InteriorDesigner` |
| **Restauration & hôtellerie** | |
| Restaurant | `Restaurant` |
| Hôtel | `Hotel` |
| Chambre d'hôtes, B&B | `BedAndBreakfast` |
| **Autres** | |
| Salon de coiffure, spa | `HairSalon` |
| PME industrielle, entreprise | `Organization` |
| Secteur non listé | `LocalBusiness` |

Le type est défini dans `siteConfig.schemaType` — mettre à jour après `/strategy`.

```typescript
const schema = {
  '@context': 'https://schema.org',
  '@type': siteConfig.schemaType,
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  telephone: siteConfig.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.zip,
    addressCountry: 'FR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.lat,   // TODO: ajouter dans siteConfig
    longitude: siteConfig.geo.lng,
  },
  areaServed: siteConfig.zones,
  // Certifications (RGE, RPPS, Barreau…) → étoiles dans les SERPs sur certains types
  ...(siteConfig.certifications.length > 0 && {
    award: siteConfig.certifications,
  }),
  // Prise de RDV (Calendly, Doctolib, TheFork…)
  ...(siteConfig.reservationUrl && {
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: siteConfig.reservationUrl },
      result:  { '@type': 'Reservation', name: 'Prise de rendez-vous' },
    },
  }),
  // Si avis hardcodés présents → ajouter AggregateRating
  ...(siteConfig.reviews.length > 0 && {
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(
        siteConfig.reviews.reduce((s, r) => s + r.rating, 0) / siteConfig.reviews.length
      ),
      reviewCount: String(siteConfig.reviews.length),
      bestRating: '5',
    },
  }),
}
```

`AggregateRating` affiche les étoiles directement dans les SERPs Google — ne jamais l'omettre si des avis sont présents.

### FAQPage (section FAQ — à créer sur tout site artisan)

La section FAQ est **systématique** sur les sites artisans : capte les requêtes longue traîne, déclenche les rich snippets Google, et alimente directement les réponses IA (GEO).

```typescript
// Minimum 4-6 questions réelles du secteur
const faqs = [
  { q: 'Quel est le délai d\'intervention pour une urgence ?', a: '...' },
  { q: 'Intervenez-vous le week-end ?', a: '...' },
  // ...
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}
```

Questions à déduire du secteur dans `docs/product.md` — jamais génériques.

### Service (pages de prestation secondaires)

Sur chaque page dédiée à une prestation (`/plomberie-urgence`, `/installation-chaudiere`…), ajouter un schema `Service` pour les rich results de page secondaire :

```typescript
const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: '[type de service — ex: Plomberie urgence]', // TODO
  name: '[titre de la page]',
  description: '[description du service]',
  provider: {
    '@type': siteConfig.schemaType,
    name: siteConfig.name,
    url:  siteConfig.url,
  },
  areaServed: siteConfig.zones,
  url: `${siteConfig.url}/[slug-de-la-page]`,
}
```

Valider sur Google Rich Results Test après déploiement.

---

## Ordre de développement recommandé

0. Fichiers systématiques (OG image · favicon · loading · sitemap · robots · metadata layout · FloatingContact · plausible.d.ts)
1. Layout (header + footer) — squelette de navigation réelle
2. Hero — première impression, CTA principal
3. Services / Prestations — cœur du métier
4. Réalisations / Chantiers — preuves sociales + galerie lightbox si demandé (voir SKILL.md § "GALERIE")
5. À propos — humanisation
6. FAQ — rich snippets + GEO (systématique sur sites artisans)
7. Contact / Devis — conversion finale

## Après chaque section

Indique : `Section [nom] terminée — lancer pnpm dev pour valider visuellement avant de continuer.`
Ne pas enchaîner plusieurs sections sans validation intermédiaire.

## Migration de constante globale (ex : renommer EASE, MOTION, etc.)

Après un `replace_all`, toujours faire un grep final sur tout `src/` avant de déclarer terminé :
les occurrences multi-lignes et les fichiers non-sections (button.tsx, header.tsx) sont manquées par un replace single-line.

```
grep -r "NOM_ANCIENNE_CONSTANTE" src/
```

Si des résultats apparaissent : les corriger avant de continuer. Une occurrence manquée → erreur runtime silencieuse en production.
