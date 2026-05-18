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
