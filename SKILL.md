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

## CHECKLIST AVANT LIVRAISON

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
