---
name: mobem-stack-skill
description: Senior UI/UX Engineer for client projects built on the Mobem stack. Enforces 8pt grid, OKLCH color system, Framer Motion micro-interactions, and strict anti-patterns from Impeccable + TasteSkill. Client-specific palette and content come from docs/design.md and docs/product.md.
---

# Mobem Stack — Design & Engineering Skill

## ACTIVE BASELINE CONFIGURATION

```
DESIGN_VARIANCE:   4   // Structured editorial — neither pure symmetry nor chaos
MOTION_INTENSITY:  5   // Purposeful micro-animations, not cinematic
VISUAL_DENSITY:    4   // Breathing room, generous whitespace
```

---

## DEFAULT ARCHITECTURE

### Framework Defaults
- Next.js 16 App Router · React Server Components by default
- `'use client'` ONLY for: state, effects, motion, browser APIs
- TypeScript strict — `any` is forbidden
- pnpm for package management

### Styling Policy
- Tailwind CSS v4 (CSS-first, @theme in globals.css)
- CSS custom properties for all theme tokens
- `cn()` from `@/lib/utils` for className merging
- NO inline styles except Framer Motion dynamic values

### Component Architecture
- Atomic: `src/components/ui/` — pure, composable primitives
- Sections: `src/components/sections/` — page-level compositions
- Layout: `src/components/layout/` — header, footer, wrappers
- Framer Motion wraps the outermost DOM element, not nested elements

---

## DESIGN ENGINEERING DIRECTIVES

### Typography — Deterministic Rules
```
Display  → font-display italic    → DM Serif Display   → clamp(2.5rem, 6vw, 5rem)
H1       → font-display italic    → DM Serif Display   → clamp(2rem, 5vw, 3.5rem)
H2       → font-display italic    → DM Serif Display   → clamp(1.5rem, 3vw, 2.25rem)
H3       → font-sans font-medium  → Inter 500          → 1.25rem
Body     → font-sans font-normal  → Inter 400          → 1rem / line-height 1.6
Label    → font-mono font-medium  → JetBrains Mono     → 0.75rem tracking-wide uppercase
Caption  → font-mono font-normal  → JetBrains Mono     → 0.8125rem
```

Rules:
- Display font is ALWAYS italic — it's the editorial signature
- Body text: `leading-relaxed` (1.75) for paragraphs, `leading-snug` (1.3) for headings
- `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs
- NO bold in body text unless it's a semantic `<strong>` in rich text

### Color System
All colors come from CSS custom properties defined in `src/app/globals.css` and documented in `docs/design.md`.

```
var(--background)         Page background
var(--foreground)         Primary text
var(--primary)            Primary action color
var(--signal)             Accent — ONE dominant per page
var(--border)             Rules and separators (1px)
var(--muted-foreground)   Secondary text (WCAG AA compliant)
var(--secondary)          Surface / hover background
```

Rules:
- OKLCH exclusively — no hex, no rgb() in component code
- Signal accent is the ONLY accent — use it for CTAs and one emphasis per section max
- All grays must have a slight warm tint (no neutral grays)
- Dark mode uses a warm dark background — never pure black
- Border/rules: always 1px, always `var(--border)` — visible but subtle
- See `docs/design.md` for the client's actual palette values

### Layout & Spacing — 8pt Grid
```
xs   :  8px (0.5rem)  → icon spacing, tight gaps
sm   : 16px (1rem)    → standard gap, form fields
md   : 24px (1.5rem)  → component padding
lg   : 32px (2rem)    → section padding internal
xl   : 48px (3rem)    → section gap
2xl  : 64px (4rem)    → section padding desktop
3xl  : 96px (6rem)    → section vertical padding
hero : 128px (8rem)   → hero vertical padding
```

Max container width: `1280px` with `px-6` (24px) padding.
Swiss-style grid: visible 1px horizontal rules between sections.
Section numbers (01, 02, 03) in JetBrains Mono when content allows.

### Materiality — Surfaces & Shadows
- Default: flat surfaces, NO box-shadow
- When depth is needed: `box-shadow: 0 1px 2px oklch(0 0 0 / 0.06)` (subtle, directional)
- NEVER: `box-shadow: 0 4px 24px rgba(0,0,0,0.15)` (generic, floating effect)
- Borders do the heavy lifting — 1px rules create structure without shadows

### Interactive States
```
hover  → opacity or color shift, 150ms ease
focus  → 2px ring var(--ring), offset 2px — accessible, visible
active → scale(0.98) via Framer Motion
disabled → opacity-50, cursor-not-allowed
```

---

## MOTION ENGINE

### Signature Ease
```typescript
const EASE = [0.25, 0.1, 0.25, 1] as const

// Entry animation (all sections)
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ ease: EASE, duration: 0.4 }}

// Staggered list
variants={{
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}}

// Button micro-interaction
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
transition={{ ease: EASE, duration: 0.2 }}

// Scroll-triggered (use viewport prop)
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-50px" }}
```

Rules:
- `viewport={{ once: true }}` on all scroll-triggered animations
- NEVER animate layout properties (width, height, padding) — only transform and opacity
- NEVER use spring physics for UI components (only for playful/brand moments)
- Reduce motion: respect `prefers-reduced-motion` via Framer's `useReducedMotion()`

---

## COMPONENT PATTERNS

### Button Variants (CVA)
```
default → Primary bg, contrasting text — primary actions
outline → 1px border, transparent bg — secondary actions
ghost   → no border, hover bg — tertiary / nav actions
signal  → Signal accent bg — THE primary CTA (max 1-2 per page)
```

### Card Pattern — Swiss Cell
- NO rounded corners (radius: 0px) by default
- Border: `1px solid var(--border)` on all sides OR border-top only for list items
- Padding: `p-6` (24px) standard, `p-8` (32px) featured
- NO card-in-card nesting
- Hover: subtle background shift to `var(--secondary)`, NOT scale or shadow

### Form Pattern
- Inputs: `border border-[--input] bg-transparent` — no fill, just border
- Error messages: `font-mono text-xs text-[--signal]` below the field
- Labels: ALWAYS visible (no placeholder-only labels for accessibility)
- Submit: `variant="signal"` button — the one CTA on the form

---

## AI TELLS — FORBIDDEN PATTERNS

### Visual & CSS
- `background: linear-gradient(...)` — BANNED
- `backdrop-filter: blur(...)` as default style — BANNED
- `background-clip: text; -webkit-text-fill-color: transparent` — BANNED
- `box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1)` (Tailwind shadow-md default) — BANNED
- `border-radius: 0.5rem` (8px) on everything — BANNED (use explicit tokens)
- `#000000` or `#ffffff` raw colors — BANNED (use CSS custom properties)

### Typography
- Inter as the ONLY font for headlines — BANNED (must use DM Serif for display)
- `font-bold` on body text without semantic reason — BANNED
- ALL CAPS in body text — BANNED (only JetBrains Mono labels use uppercase)
- Multiple font weights on the same line without hierarchy purpose — BANNED

### Layout
- Every section wrapped in a `<Card>` — BANNED
- Nested cards (card > card) — BANNED
- `grid grid-cols-3` for everything regardless of content — BANNED
- `flex justify-between` with no breathing room — BANNED

### Content
- Placeholder lorem ipsum in commits — replace with realistic client content
- Generic CTA text ("Click here", "Learn more") — replace with specific actions
- Icon-only buttons without aria-label — BANNED

---

## CREATIVE ARSENAL — High-End Patterns for Artisans & SMEs

### Editorial Section Opener
```
[Section number in mono]  01
[Display italic headline]  Titre en DM Serif italic
[Rule 1px]                 ─────────────────────
[Body in Inter]            Description...
```

### Testimonial — Pull Quote Style
```
[Signal accent quote mark]  "
[Display italic quote]      Texte en italique DM Serif
[Mono attribution]          — Prénom Nom, Métier · Ville
```

### Service Card — Swiss Cell
```
[Mono tag top-left]    01 / [SERVICE]
[Rule 1px bottom]      ───────────────
[Display H3 italic]    Titre service
[Body description]     Description courte...
[CTA ghost bottom]     En savoir plus →
```

### Stats Row
```
[Display italic number]  [Valeur clé]
[Mono label under]       [LABEL MÉTRIQUE]
```

---

## FINAL PRE-FLIGHT CHECKLIST

Before every component delivery:

- [ ] Mobile layout tested at 375px — no horizontal overflow
- [ ] Dark mode tested — all tokens resolve correctly in `.dark`
- [ ] All animations have `viewport={{ once: true }}` if scroll-triggered
- [ ] All images have `alt` text + explicit `width` + `height`
- [ ] No hardcoded colors — only CSS custom properties
- [ ] No `any` in TypeScript — `tsc --noEmit` passes clean
- [ ] Signal accent: max 1-2 per section
- [ ] `docs/design.md` updated if new component or token added
- [ ] `docs/product.md` updated if navigation or feature scope changed
