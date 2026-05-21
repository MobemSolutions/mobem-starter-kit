---
name: mobem-stack-skill
description: Senior UI/UX Engineer for client projects built on the Mobem stack. Enforces 8pt grid, OKLCH color system, Framer Motion micro-interactions, and strict anti-patterns. All artistic direction (palette, fonts, radius, layout style) comes from docs/design.md — never assumed by default.
---

# Mobem Stack — Engineering & Design Skill

---

## PRINCIPE FONDAMENTAL

**`docs/design.md` a autorité absolue sur toutes les décisions visuelles.**

- Palette, typographie, radius, style de composants → définis dans `docs/design.md` après validation client
- Ce fichier ne prescrit pas de DA par défaut — il pose les conventions techniques et les interdits
- Si `docs/design.md` est vide : arrêter et lancer le prompt d'initialisation (`docs/prompt.md`)
- Ne jamais inventer une direction artistique à partir de ce fichier

---

## ARCHITECTURE PAR DÉFAUT

### Stack
- Next.js App Router · React Server Components par défaut
- `'use client'` UNIQUEMENT pour : state, effects, motion, browser APIs
- TypeScript strict — `any` est interdit
- pnpm pour la gestion des packages

### Styling
- Tailwind CSS v4 (CSS-first, @theme dans globals.css)
- CSS custom properties pour tous les tokens de thème
- `cn()` depuis `@/lib/utils` pour la fusion des className
- Aucun style inline sauf valeurs dynamiques Framer Motion

### Structure des composants
- Atomic : `src/components/ui/` — primitives pures, composables
- Sections : `src/components/sections/` — compositions à l'échelle de la page
- Layout : `src/components/layout/` — header, footer, wrappers
- Framer Motion enveloppe l'élément DOM le plus externe, pas les éléments imbriqués

---

## CONVENTIONS TECHNIQUES NON-NÉGOCIABLES

### Grille 8pt — Espacements stricts
```
xs   :  8px (0.5rem)  → espacement d'icônes, gaps serrés
sm   : 16px (1rem)    → gap standard, champs de formulaire
md   : 24px (1.5rem)  → padding de composant
lg   : 32px (2rem)    → padding interne de section
xl   : 48px (3rem)    → gap entre sections
2xl  : 64px (4rem)    → padding section desktop
3xl  : 96px (6rem)    → padding vertical section
hero : 128px (8rem)   → padding vertical hero
```
Largeur max du container : `1280px` avec `px-6` (24px) de padding.

### Système de couleurs — CSS custom properties
Toutes les couleurs viennent des custom properties définies dans `src/app/globals.css`.
```
var(--background)         Fond de page
var(--foreground)         Texte principal
var(--primary)            Couleur d'action principale
var(--signal)             Accent — UN seul dominant par page
var(--border)             Règles et séparateurs (1px)
var(--muted-foreground)   Texte secondaire (WCAG AA)
var(--secondary)          Surface / fond hover
```

Règles :
- OKLCH exclusivement — aucun hex, aucun rgb() dans le code des composants
- L'accent signal est le SEUL accent — CTAs et une emphase max par section
- Tous les gris doivent avoir une légère teinte chaude (pas de gris neutres purs)
- Dark mode : fond sombre chaud — jamais noir pur

### Scale typographique — Structure (style défini dans docs/design.md)
```
Display  → font-display → clamp(2.5rem, 6vw, 5rem)     → police/style dans docs/design.md
H1       → font-display → clamp(2rem, 5vw, 3.5rem)
H2       → font-display → clamp(1.5rem, 3vw, 2.25rem)
H3       → font-sans font-medium → 1.25rem
Body     → font-sans font-normal → 1rem / line-height 1.6
Label    → font-mono font-medium → 0.75rem tracking-wide uppercase
Caption  → font-mono font-normal → 0.8125rem
```

Règles techniques (indépendantes du style choisi) :
- `text-wrap: balance` sur les titres, `text-wrap: pretty` sur les paragraphes
- Body text : `leading-relaxed` (1.75) pour les paragraphes, `leading-snug` (1.3) pour les titres
- Pas de bold dans le body sauf `<strong>` sémantique dans du rich text
- Taille des titres via `clamp()` — pas de font-size fixe

### Stack typographique par défaut
À utiliser quand `docs/design.md` ne précise pas d'alternative :
- **Display (titres, H1, H2) :** [à déduire du brief et des références visuelles]
- **Corps (body, UI) :** [à déduire du brief et des références visuelles]
- **Mono (labels, tags, code) :** [à déduire du brief et des références visuelles]

Si le brief client justifie d'autres polices, les définir dans `docs/design.md` et les charger dans `layout.tsx`.

### Motion — Timing standard

Définir la constante ease **localement dans chaque composant** — pas d'import depuis constants.
Ça rend chaque composant autonome et lisible sans navigation vers un autre fichier.

```typescript
// Ease standard Mobem
const EASE = [0.25, 0.1, 0.25, 1] as const

// Expo Out — pour grands éléments (hero H1, titres H2 massifs) : animation plus "settled"
// const EASE = [0.22, 1, 0.36, 1] as const
```

```typescript
const EASE = [0.25, 0.1, 0.25, 1] as const

// Entrée de section
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ ease: EASE, duration: 0.4 }}

// Liste avec stagger
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}}

// Micro-interaction bouton
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ ease: EASE, duration: 0.2 }}

// Déclenché au scroll
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
```

Règles :
- `viewport={{ once: true }}` sur toutes les animations au scroll
- NE JAMAIS animer les propriétés de layout (width, height, padding) — seulement transform et opacity
- Pas de spring physics pour les composants UI
- Respecter `prefers-reduced-motion` via `useReducedMotion()` de Framer — pattern obligatoire :
  ```typescript
  const reduced = useReducedMotion() ?? false
  // fromY = reduced ? 0 : 16 — dur = reduced ? 0.2 : 0.4
  ```

### États interactifs
```
hover   → décalage d'opacité ou de couleur, 150ms ease
focus   → ring 2px var(--ring), offset 2px — accessible et visible
active  → scale(0.98) via Framer Motion
disabled → opacity-50, cursor-not-allowed
```

### Matérialité — Surfaces et ombres
- Par défaut : surfaces plates, aucun box-shadow
- Quand la profondeur est nécessaire : `box-shadow: 0 1px 2px oklch(from var(--foreground) l c h / 0.06)`
- JAMAIS : `box-shadow: 0 4px 24px rgba(0,0,0,0.15)` (effet générique "flottant")
- Les bordures font le travail structurel — les règles 1px créent de la hiérarchie sans ombres

---

## PATTERNS DE COMPOSANTS — RÉFÉRENCE TECHNIQUE

Ces patterns définissent la structure technique des composants.
**Le style (radius, couleurs, typographie) vient de `docs/design.md`.**

### Variantes Button (CVA)
```
default → fond primary, texte contrasté — actions primaires
outline → bordure 1px, fond transparent — actions secondaires
ghost   → sans bordure, fond hover — actions tertiaires / nav
signal  → fond accent signal — LE CTA principal (1-2 max par page)
```

### Pattern Card
- Radius : selon `--radius` défini dans `docs/design.md`
- Bordure : `1px solid var(--border)` sur tous les côtés OU border-top uniquement pour les listes
- Padding : `p-6` (24px) standard, `p-8` (32px) mis en avant
- Pas d'imbrication card-dans-card
- Hover : légère transition de fond vers `var(--secondary)`, pas de scale ni d'ombre

### Grille compartimentée sans border

Pour les listes et grilles où chaque cellule doit être visuellement séparée sans CSS de bordure sur les enfants :

```tsx
{/* Parent : background = couleur de bordure */}
<div
  className="grid grid-cols-2 gap-px"
  style={{ background: 'var(--border)' }}
>
  {/* Enfants : background = fond de page */}
  {items.map(item => (
    <div key={item.id} style={{ background: 'var(--background)' }} className="p-6">
      {/* ... */}
    </div>
  ))}
</div>
```

Produit des dividers razor-thin parfaits (1px réel) sans aucune bordure sur les enfants. Maintenable : changer `--border` suffit pour tout mettre à jour.

### Compteurs séquentiels

Pour les listes structurées (tarifs, étapes, services détaillés) — crée une hiérarchie de section plus lisible que des H2 seuls :

```tsx
<samp className="font-mono text-[11px] uppercase tracking-[0.14em] text-(--muted-foreground) flex items-center gap-4">
  01
  <span className="flex-1 h-px bg-(--border)" />
</samp>
```

### Pattern Formulaire
- Inputs : `border border-(--input) bg-transparent` — pas de remplissage, juste la bordure
- Messages d'erreur : `font-mono text-xs text-(--signal)` sous le champ
- Labels : TOUJOURS visibles (pas de labels placeholder-only pour l'accessibilité)
- Submit : bouton `variant="signal"` — le seul CTA sur le formulaire

---

## TAILWIND V4 — RÈGLES SPÉCIFIQUES

### Syntaxe CSS custom properties
```
✅ bg-(--signal)          ← Tailwind v4 : parenthèses pour les CSS vars
❌ bg-[--signal]          ← v3 arbitrary syntax : ne s'applique PAS silencieusement en v4
```
Toutes les classes utilisant des custom properties : `bg-`, `text-`, `border-`, `ring-`, `fill-`, `stroke-`, `outline-` → parenthèses obligatoires.

### Nommage des tokens `@theme { --spacing-* }`
Les noms natifs Tailwind (`xl`, `2xl`, `3xl`...) entrent en collision silencieuse avec les utilitaires de dimension :
```
❌ @theme { --spacing-2xl: 4rem }
   → max-w-2xl = var(--spacing-2xl) = 4rem (64px) au lieu de 42rem
   → w-xl, h-3xl, etc. : toutes les dimensions cassées silencieusement
```
```
✅ Utiliser des noms métier : --spacing-section, --spacing-hero-v, --spacing-component
   → max-w-[40rem] pour les max-widths dans les composants (bracket explicite = bypass token)
```

---

## LAYOUTS — PATTERNS STRUCTURELS

### Hero image plein écran — Texte ancré en bas

```tsx
{/* Conteneur hero : hauteur définie */}
<section className="relative min-h-[100dvh]">
  {/* Image en fond */}
  <Image fill className="object-cover" ... />

  {/* Overlay vignette */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  {/* Contenu ancré en bas — TOUJOURS absolute, JAMAIS mt-auto */}
  <div className="absolute inset-x-0 bottom-0 px-6 py-16">
    <div className="mx-auto max-w-[1280px]">
      {/* ... */}
    </div>
  </div>
</section>
```

**Règles :**
- `absolute inset-x-0 bottom-0` sur le wrapper de contenu — JAMAIS `mt-auto` ni `flex justify-end` (instables quand parent a `min-height` mais pas `height`)
- `max-w-[40rem]` pour le texte (bracket explicite) — JAMAIS `max-w-2xl` (collision token @theme)
- `min-h-[100dvh]` sur le container (dvh pour iOS Safari correctness)

### Maps — URL embed vs standard

Google bloque le framing des URLs de vue standard :

```
❌ https://www.google.com/maps/place/MonEntreprise...  ← vue standard, bloqué
✅ https://maps.google.com/maps?q=Adresse%2C+Ville%2C+France&output=embed
```

Conversion :
```tsx
<iframe
  src="https://maps.google.com/maps?q=12%20Rue%20de%20la%20Paix%2C%2075001%20Paris%2C%20France&output=embed"
  width="100%" height="400" style={{ border: 0 }} loading="lazy"
  title="Localisation"
/>
```

Pré-requis CSP dans `next.config.mjs` : `frame-src https://maps.google.com https://www.google.com` (déjà dans le template).

---

## PRISE DE RDV — CALENDLY + DOCTOLIB

### Quand utiliser quoi

| Secteur | Solution |
|---------|----------|
| Notaire, avocat, RGE, architecte d'intérieur, expert-comptable | Calendly |
| Médecin, kiné, dentiste, clinique esthétique | Doctolib (priorité) ou Calendly |
| Restaurant, hôtel | TheFork / OpenTable (embed ou lien) |

Renseigner `siteConfig.reservationUrl` pour alimenter le schema `potentialAction` (ReserveAction).

### Calendly — intégration Next.js

Deux modes : **popup** (bouton CTA dans le hero ou contact) ou **inline** (page `/rdv` dédiée).

**Bouton popup :**
```tsx
'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/siteConfig'

export function CalendlyButton({ label = 'Prendre rendez-vous' }: { label?: string }) {
  const url = siteConfig.reservationUrl
  if (!url) return null

  return (
    <>
      <button
        onClick={() => {
          // @ts-ignore — Calendly injecté via Script
          window.Calendly?.initPopupWidget({ url })
          window.plausible?.('RDV Calendly')
        }}
        className="inline-flex items-center gap-2 rounded bg-(--signal) px-6 py-3 font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {label}
      </button>
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      {/* Styles Calendly — optionnel, personnalisables */}
      <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
    </>
  )
}
```

**Widget inline (`src/app/rdv/page.tsx`) :**
```tsx
'use client'

import Script from 'next/script'
import { siteConfig } from '@/lib/siteConfig'

export default function PageRdv() {
  return (
    <>
      <div
        className="calendly-inline-widget min-h-[700px] w-full"
        data-url={siteConfig.reservationUrl}
      />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />
    </>
  )
}
```

**CSP requis dans `next.config.mjs` si Calendly activé :**
```javascript
// Ajouter à script-src :   https://assets.calendly.com
// Ajouter à frame-src :    https://calendly.com
// Ajouter à style-src :    https://assets.calendly.com
// Ajouter à connect-src :  https://calendly.com
```

### Doctolib — bouton officiel

```tsx
import Image from 'next/image'
import { siteConfig } from '@/lib/siteConfig'

export function DoctolibButton() {
  const url = siteConfig.reservationUrl
  if (!url) return null

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => window.plausible?.('RDV Doctolib')}
      aria-label="Prendre rendez-vous sur Doctolib"
    >
      <Image
        src="https://pro.doctolib.fr/external_button/fr_button_v1.png"
        alt="Prendre RDV sur Doctolib"
        width={267}
        height={52}
        unoptimized
      />
    </a>
  )
}
```

`pro.doctolib.fr` est déjà autorisé via `img-src https:` dans la CSP. Aucune modification requise.

Règles :
- **Un seul CTA RDV par page** — ne pas mélanger Calendly + FloatingContact + formulaire sur la même page
- Le bouton RDV remplace ou complète le formulaire de contact — ne pas supprimer le formulaire (fallback important)
- Traquer avec `window.plausible?.('RDV [Outil]')` pour mesurer la conversion

---

## TRUST BADGES — CERTIFICATIONS ET LABELS

Composant systématique pour tous les clients avec certifications professionnelles (RGE, RPPS, Barreau, labels qualité).
Alimenté par `siteConfig.certifications` — vide si tableau vide.

### Placement recommandé

- **Header** : badges compacts à côté du logo (variant `compact`)
- **Footer** : badges en ligne avant les liens légaux (variant `row`)
- **Section héro** : sous le titre, avant le CTA (variant `row`)
- **Page /a-propos** : avec logos officiels téléchargés dans `public/badges/`

### Pattern composant

`src/components/ui/trust-badges.tsx`

```tsx
import { siteConfig } from '@/lib/siteConfig'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// Mapping slug → label lisible
// Logos officiels : télécharger dans public/badges/[slug].png
const CERT_LABELS: Record<string, string> = {
  'rge':         'Reconnu Garant de l\'Environnement',
  'qualipac':    'QualiPAC',
  'qualibat':    'RGE Qualibat',
  'qualisol':    'QualiSOL',
  'qualifelec':  'QualiＦELEC',
  'qualit-enr':  'Qualit\'EnR',
}

type Props = {
  variant?: 'row' | 'compact'
  className?: string
}

export function TrustBadges({ variant = 'row', className }: Props) {
  if (!siteConfig.certifications.length) return null

  return (
    <ul
      role="list"
      aria-label="Certifications professionnelles"
      className={cn('flex flex-wrap items-center', variant === 'row' ? 'gap-4' : 'gap-2', className)}
    >
      {siteConfig.certifications.map(cert => {
        const slug  = cert.toLowerCase().replace(/[^a-z0-9]/g, '-')
        const label = CERT_LABELS[slug] ?? cert

        return (
          <li key={cert}>
            {/* Si le logo existe dans public/badges/ → afficher l'image, sinon le texte */}
            <span
              className={cn(
                'inline-flex items-center border border-(--border) font-mono uppercase tracking-wide text-(--muted-foreground)',
                variant === 'row'     ? 'px-3 py-1 text-xs'  : 'px-2 py-0.5 text-[10px]'
              )}
              title={label}
            >
              {cert}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
```

### Logos officiels — où les trouver

| Certification | Source |
|--------------|--------|
| RGE (générique) | [ademe.fr/logos-rge](https://www.ademe.fr) — télécharger et placer dans `public/badges/rge.png` |
| QualiPAC | qualit-enr.org |
| Qualibat | qualibat.com |
| RPPS (médecins) | Ne pas afficher le logo — afficher le numéro en texte : `certifications: ['RPPS: 10XXXXXXXXX']` |
| Barreau | Pas de logo standard — afficher : `certifications: ['Barreau de Paris']` |
| Doctolib Verified | Badge automatique sur le profil Doctolib — ne pas reproduire sur le site |

Règles :
- Utiliser uniquement les logos officiels téléchargés sur les sites des organismes — jamais reconstruits
- Les numéros d'identification (RPPS, SIRET) s'affichent en texte dans le badge, pas comme logos
- Maximum 4–5 badges visibles — au-delà, utiliser une section "Certifications" dédiée avec description

---

## AI TELLS — PATTERNS INTERDITS

### Visuel & CSS
- `background: linear-gradient(...)` — INTERDIT
- `backdrop-filter: blur(...)` comme style par défaut — INTERDIT
- `background-clip: text; -webkit-text-fill-color: transparent` — INTERDIT
- `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)` (Tailwind shadow-md) — INTERDIT
- `#000000` ou `#ffffff` couleurs brutes — INTERDIT (utiliser les CSS custom properties)
- Couleurs hardcodées dans les composants au lieu de `var(--...)` — INTERDIT

### Typographie
- Plus de 2 familles de polices par page — INTERDIT
- `font-bold` sur le body text sans raison sémantique — INTERDIT
- MAJUSCULES dans le body text — INTERDIT (uniquement les labels mono, uppercase avec font-mono)
- Plusieurs graisses sur la même ligne sans but de hiérarchie — INTERDIT

### Layout
- Chaque section enveloppée dans un `<Card>` — INTERDIT
- Cards imbriquées (card > card) — INTERDIT
- `grid grid-cols-3` pour tout sans considération du contenu — INTERDIT
- `flex justify-between` sans respiration — INTERDIT
- Bordures > 1px sans justification design explicite — INTERDIT
- `overflow-x: hidden` sur `<body>` pour masquer des bugs de layout — INTERDIT (corriger la cause racine)

### Contenu
- Lorem ipsum dans les commits — remplacer par du contenu métier réaliste
- CTAs génériques ("En savoir plus", "Click here", "Learn more") — INTERDIT, utiliser des formulations spécifiques au métier
- Eyebrow pills (petite capsule `text-xs uppercase` au-dessus du H2) — INTERDIT par défaut. Le H2 seul suffit. Réserver aux rares cas où le contexte de section ne peut pas s'établir sans label explicite.
- Boutons icon-only sans aria-label — INTERDIT
- Images placeholder (chat photos, picsum, lorempixel) dans un commit — INTERDIT

---

## PLAUSIBLE — TRACKING CUSTOM EVENTS

Déclarer le type global **une seule fois** dans le projet :

`src/types/plausible.d.ts`
```typescript
declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void
  }
}
export {}
```

### Événements standards — à tracker sur chaque site artisan

```typescript
// Soumission formulaire (dans contact.tsx, après setStatus('success'))
window.plausible?.('Formulaire soumis')

// Clic téléphone (sur tout <a href="tel:...">)
onClick={() => window.plausible?.('Appel téléphonique')}

// Clic email (sur tout <a href="mailto:...">)
onClick={() => window.plausible?.('Email cliqué')}

// CTA principal (hero, section services)
onClick={() => window.plausible?.('CTA cliqué', { props: { label: 'Demander un devis' } })}

// WhatsApp (FloatingContact)
onClick={() => window.plausible?.('WhatsApp cliqué')}
```

Règles :
- `window.plausible?.()` (optional chaining) — silencieux si Plausible n'est pas chargé (dev local, AdBlock)
- Noms d'événements en français avec majuscule — cohérent entre tous les projets
- Ne pas tracker les interactions sans valeur business (hover, scroll depth, etc.)

---

## FLOATING CONTACT — CTA FIXE WHATSAPP + TÉL

Systématique sur tous les sites artisans. Visible sur toutes les pages.
Le numéro WhatsApp vient de `siteConfig.social.whatsapp` — vide = bouton absent.

`src/components/ui/floating-contact.tsx`
```tsx
'use client'

import { Phone } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export function FloatingContact() {
  const tel = siteConfig.contact.phone
  const wa  = siteConfig.social.whatsapp

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-center">
      {wa && (
        <a
          href={`https://wa.me/${wa}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contacter sur WhatsApp"
          onClick={() => window.plausible?.('WhatsApp cliqué')}
          className="flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          <svg viewBox="0 0 24 24" className="size-7 fill-current" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </a>
      )}
      <a
        href={`tel:${tel}`}
        aria-label={`Appeler le ${siteConfig.contact.phoneDisplay}`}
        onClick={() => window.plausible?.('Appel téléphonique')}
        className="flex size-14 items-center justify-center rounded-full bg-(--signal) text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        <Phone className="size-6" aria-hidden="true" />
      </a>
    </div>
  )
}
```

Ajouter dans `src/app/layout.tsx` à l'intérieur du `<ThemeProvider>`, après `{children}` :
```tsx
import { FloatingContact } from '@/components/ui/floating-contact'
// ...
<FloatingContact />
```

Règles :
- `size-14` (56px) — assez grand pour le tap mobile
- `z-50` — au-dessus de tout contenu mais sous les modals (`z-[100]`)
- Le bouton WhatsApp est conditionnellement absent si `siteConfig.social.whatsapp` est vide
- Couleur WhatsApp : `#25D366` (couleur officielle de la marque — exception au système de couleurs)
- Couleur tél : `--signal` — cohérent avec les CTAs du site

---

## GALERIE RÉALISATIONS — LIGHTBOX

Package recommandé : `yet-another-react-lightbox` (YARL) — 5 KB gzippé, accessible, compatible next/image.

```bash
pnpm add yet-another-react-lightbox
pnpm audit
```

Pattern galerie + lightbox :

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'

type Realisation = {
  src: string
  width: number
  height: number
  alt: string
}

export function RealisationsGallery({ items }: { items: Realisation[] }) {
  const [open, setOpen]   = useState(false)
  const [index, setIndex] = useState(0)

  return (
    <>
      <div className="grid grid-cols-2 gap-px md:grid-cols-3" style={{ background: 'var(--border)' }}>
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => { setIndex(i); setOpen(true) }}
            className="group relative aspect-[4/3] overflow-hidden"
            style={{ background: 'var(--background)' }}
            aria-label={`Voir la réalisation : ${item.alt}`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={items}
      />
    </>
  )
}
```

Règles :
- `aspect-[4/3]` sur les vignettes — ratio cohérent, pas d'images étirées
- `fill` + `sizes` sur next/image — pas de dimensions fixes (responsive)
- La grille compartimentée (`gap-px` + background parent) donne les dividers razor-thin sans CSS de bordure
- `group-hover:scale-105` sur l'image, pas sur le bouton (évite le layout shift)
- Toujours inclure le plugin `Thumbnails` si plus de 10 photos : `import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails'`

---

## CHECKLIST AVANT LIVRAISON

- [ ] Skip-to-content link présent dans `layout.tsx` (`href="#main-content"`) + `id="main-content"` sur le `<main>` de chaque page
- [ ] Mobile 375px testé — pas d'overflow horizontal
- [ ] Dark mode testé — tous les tokens résolus en `.dark`
- [ ] Toutes les animations ont `viewport={{ once: true }}` si déclenchées au scroll
- [ ] `useReducedMotion()` présent dans chaque composant avec animation Framer Motion
- [ ] Hero : traitement visuel cohérent avec le brief (image si secteur physique/artisan, typographique si service immatériel ou choix assumé)
- [ ] Toutes les images ont `alt` + `width` + `height` explicites
- [ ] Aucune couleur hardcodée — seulement des CSS custom properties
- [ ] Aucun `any` en TypeScript — `tsc --noEmit` passe propre
- [ ] Accent signal : max 1-2 par section
- [ ] `docs/design.md` mis à jour si nouveau composant ou token ajouté
- [ ] `docs/product.md` mis à jour si la navigation ou le périmètre change
