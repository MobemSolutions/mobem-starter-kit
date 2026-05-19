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

## Ordre de lecture obligatoire

1. `docs/product.md` — north star, sections, contenu réel
2. `docs/design.md` — palette, typographie, radius, motion dials
3. `SKILL.md` — grille, motion, anti-patterns techniques
4. `.agents/skills/impeccable/reference/craft.md` — avant chaque composant

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
- Respecter `prefers-reduced-motion` : wrapper les animations dans `useReducedMotion()`
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

## Checklist mentale par composant

Avant de valider chaque composant :

- [ ] Toutes les couleurs via CSS custom properties (`var(--...)`) — aucun hex hardcodé
- [ ] Grille 8pt respectée — espacements multiples de 8px uniquement
- [ ] Animation below-fold : `whileInView` avec `once: true`
- [ ] Animation hero : `animate=` au montage
- [ ] Contenu réel — aucun placeholder générique
- [ ] Mobile 375px : pas d'overflow horizontal
- [ ] `alt` + `width` + `height` sur toutes les images `next/image`
- [ ] Accent `--signal` : max 1-2 occurrences par section
- [ ] Pas de `console.log`

## Ordre de développement recommandé

1. Layout (header + footer) — squelette de navigation réelle
2. Hero — première impression, CTA principal
3. Services / Prestations — cœur du métier
4. Réalisations / Chantiers — preuves sociales
5. À propos — humanisation
6. Contact / Devis — conversion finale

## Après chaque section

Indique : `Section [nom] terminée — lancer pnpm dev pour valider visuellement avant de continuer.`
Ne pas enchaîner plusieurs sections sans validation intermédiaire.
