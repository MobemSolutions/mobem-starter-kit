# [Nom du Client] — Design System

> Source de vérité design du projet. À lire avant toute modification visuelle.
> Généré par l'IA à partir du brief client — valeurs à adapter selon le contexte.

---

## Ambiance & direction artistique

> En une phrase : quelle est l'émotion ou l'impression que le site doit dégager ?

---

## Palette couleurs — OKLCH

> L'IA proposera 2-3 options de palettes OKLCH adaptées au secteur et au positionnement client.
> Une seule sera retenue et intégrée dans `src/app/globals.css`.

| Token CSS | OKLCH | Usage |
|-----------|-------|-------|
| `--background` | `oklch(...)` | Fond principal |
| `--foreground` | `oklch(...)` | Texte principal |
| `--primary` | `oklch(...)` | Couleur d'action principale |
| `--signal` | `oklch(...)` | Accent — CTA, emphase |
| `--border` | `oklch(...)` | Règles et séparateurs |
| `--muted-foreground` | `oklch(...)` | Texte secondaire |

### Dark mode
| Token CSS | OKLCH |
|-----------|-------|
| `--background` (dark) | `oklch(...)` |
| `--foreground` (dark) | `oklch(...)` |
| `--border` (dark) | `oklch(...)` |

---

## Typographie

> Conserver les polices par défaut de la stack (DM Serif / Inter / JetBrains Mono)
> ou les remplacer si le brief le justifie.

- **Display (titres, H1, H2) :** [ ] DM Serif Display italic (défaut) · [ ] Autre :
- **Corps (body, UI) :** [ ] Inter 400/500 (défaut) · [ ] Autre :
- **Mono (labels, tags, code) :** [ ] JetBrains Mono (défaut) · [ ] Autre :
- **Ton typographique :** (éditorial · sobre · dynamique · chaleureux)

---

## Rayon de bordure

> Choisir UN seul rayon pour tout le projet — cohérence absolue.

- [ ] `0px` — architectural, industriel, précis
- [ ] `2px` — sobre, professionnel, discret
- [ ] `4px` — légèrement chaleureux, accessible
- [ ] Autre :

---

## Éléments visuels spécifiques

> Quels composants ou patterns visuels sont nécessaires selon le brief ?
> (L'IA les définira selon le contexte — aucune liste imposée)

---

## Sémantique des ombres

> Par défaut : surfaces plates, zéro ombre (règle SKILL.md).
> Utiliser les ombres avec parcimonie — choisir UN seul niveau par composant.

| Niveau | CSS | Usage |
|--------|-----|-------|
| **Soft** | `box-shadow: 0 1px 2px oklch(from var(--foreground) l c h / 0.06)` | Input focus, card hover |
| **Floating** | `box-shadow: 0 4px 12px oklch(from var(--foreground) l c h / 0.10)` | Dropdown, tooltip |
| **Deep** | `box-shadow: 0 8px 24px oklch(from var(--foreground) l c h / 0.15)` | Modal, drawer |

Règle : jamais deux ombres empilées sur le même élément. Jamais `rgba(0,0,0,...)` — OKLCH uniquement.

- **Niveau retenu pour ce projet :** [ ] Soft · [ ] Floating · [ ] Deep · [ ] Plat (défaut)

---

## Responsive Policy

> Définir les règles de comportement mobile AVANT de coder les sections.

| Breakpoint | Largeur | Comportement grille |
|------------|---------|---------------------|
| Mobile | 375px | 1 colonne |
| Tablet | 768px | 2 colonnes |
| Desktop | 1280px | Selon le design |

**Règles fixes (non négociables) :**
- Padding `hero` (128px) → `xl` (48px) sur mobile
- Padding `3xl` (96px) → `lg` (32px) sur mobile
- Titres : `clamp()` actif — aucune `font-size` fixe sur les H1/H2
- Navigation : hamburger sous 768px
- Images : `aspect-ratio` fixe pour éviter le CLS
- Tester à 375px avant chaque livraison — aucun overflow horizontal

**Adaptations spécifiques à ce projet :**

- **Navigation mobile :**
- **Grilles de services :**
- **Section hero :**

---

## Assets à prévoir

- **Logo :** (`/public/logo.svg`)
- **Favicon :** (`/public/favicon.ico`)
- **OG Image :** (`/public/og-image.png` — 1200×630px)
- **Photos / illustrations :** (à préciser)

---

## Checklist design

- [ ] Palette OKLCH définie et intégrée dans `globals.css`
- [ ] `src/lib/constants/colors.ts` synchronisé
- [ ] Police(s) chargée(s) dans `layout.tsx`
- [ ] Dark mode testé
- [ ] Mobile 375px testé — pas d'overflow
- [ ] `docs/design.md` à jour
