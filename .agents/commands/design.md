---
description: Phase 2 — Direction artistique. Lit le brief + les skills, propose 2 palettes OKLCH, remplit docs/design.md après validation. Aucun fichier src/ avant confirmation.
---

# /design — Direction Artistique

## Prérequis — vérifications bloquantes

### 1. docs/product.md
Vérifie que `docs/product.md` contient du contenu réel (pas seulement le header du template).
Si le fichier est vide ou ne contient que des ⚠️ non résolus : **STOP**.
Demande de lancer `/strategy` d'abord.

### 2. Références visuelles — GATE BLOQUANT
Vérifie que `docs/context/` contient AU MOINS l'un de ces éléments :
- Un fichier avec des URLs de sites aimés par le client (min. 2)
- Une description d'ambiance validée par le client
- Des références de concurrents à suivre ou éviter

Si ces éléments sont absents : **STOP IMMÉDIAT**.

Demande exactement ceci :
> "Avant de proposer une palette, j'ai besoin de 3 informations :
> 1. 2 à 3 sites dont vous aimez l'esthétique (même hors de votre secteur)
> 2. 1 site que vous ne voulez absolument pas ressembler
> 3. Un mot qui décrit l'ambiance souhaitée : sobre, chaleureux, premium, dynamique, artisanal…
>
> Ces références sont la donnée la plus utile pour une direction artistique pertinente."

Ne génère aucune palette sans cette réponse.

## Ordre de lecture obligatoire

Lis dans cet ordre exact avant de proposer quoi que ce soit :

1. `docs/product.md` — north star stratégique
2. `docs/context/refs.md` (ou équivalent) — références visuelles client
3. `docs/context/brief.md` — ton, positionnement, audience
4. `SKILL.md` — conventions techniques Mobem
5. `.agents/skills/impeccable/SKILL.md` — règles design (typography, color, spatial)
6. `.agents/skills/design-taste-frontend/SKILL.md` — anti-slop frontend

## Mission

### Palettes
Propose **2 palettes OKLCH distinctes** adaptées au secteur et au positionnement :
- Palette A : option premium / contrastée
- Palette B : option chaleureuse / accessible

Pour chaque palette, fournis le tableau complet :

| Token CSS | OKLCH | Usage |
|-----------|-------|-------|
| `--background` | `oklch(...)` | |
| `--foreground` | `oklch(...)` | |
| `--primary` | `oklch(...)` | |
| `--primary-foreground` | `oklch(...)` | |
| `--signal` | `oklch(...)` | |
| `--signal-foreground` | `oklch(...)` | |
| `--secondary` | `oklch(...)` | |
| `--muted-foreground` | `oklch(...)` | |
| `--border` | `oklch(...)` | |
| `--ring` | `oklch(...)` | |
| `--background` dark | `oklch(...)` | |
| `--foreground` dark | `oklch(...)` | |
| `--border` dark | `oklch(...)` | |

Règles OKLCH obligatoires :
- Tous les gris ont une légère teinte chaude — jamais de gris neutres purs (chroma > 0)
- Le fond sombre n'est jamais noir pur — chroma et hue identiques au fond clair
- `--signal` est le seul accent dominant — pas de deuxième couleur vive
- Vérifier mentalement les ratios de contraste WCAG AA avant de proposer

### Typographie
Déduis les polices du brief et des références — ne jamais partir des défauts du README.

Justifie chaque choix par rapport au secteur et au positionnement client.
Si DM Serif / Inter / JetBrains Mono sont le bon choix, justifie-le explicitement.
Si non, propose des alternatives Google Fonts ou system fonts justifiées.

### Rayon de bordure
Recommande UN seul rayon (0px · 2px · 4px) pour tout le projet.
Justifie par rapport au ton et à l'audience.

## Format de présentation (avant tout fichier)

Présente ce résumé exact et attends la validation :

```
━━━ STRATÉGIE — rappel ━━━
Problème résolu : [1 phrase]
Audience        : [profil en 2-3 mots]
Ton             : [1 mot]

━━━ PALETTE A — [Nom évocateur] ━━━
Ambiance   : [1 phrase]
Background : oklch(...)   Foreground : oklch(...)
Primary    : oklch(...)   Signal     : oklch(...)
Border     : oklch(...)   Muted      : oklch(...)
Dark bg    : oklch(...)   Dark fg    : oklch(...)
Radius     : [valeur]     Typo       : [choix justifié]

━━━ PALETTE B — [Nom évocateur] ━━━
[même format]

━━━ QUESTIONS ⚠️ ━━━
[liste si informations manquantes]
```

## STOP

**N'écris aucun fichier `src/`. Aucun `globals.css`. Aucun composant.**

Attends la validation explicite : "go palette A" ou "go palette B" (ou ajustements demandés).

## Après validation

Une fois la palette confirmée :

1. Remplis `docs/design.md` avec les choix retenus
2. Mets à jour `src/app/globals.css` — tokens OKLCH + `@source` déjà présent, remplacer les valeurs placeholder dans `:root` et `.dark`
3. Mets à jour `src/app/globals.css` — remplacer les fallbacks système dans `--font-display/sans/mono` par les `var(--font-xyz)` des polices choisies
4. Charge les polices dans `src/app/layout.tsx` via `next/font/google` — ajouter les imports, créer les variables CSS, les injecter dans `className` de `<html>`
5. Mets à jour `src/lib/constants/colors.ts` — compléter `THEME_META.light` et `THEME_META.dark` avec les approximations hex des couleurs background (utilisées pour les meta tags)
6. Adapte `src/components/layout/header.tsx` — nom réel, navigation réelle, CTA réel
7. Adapte `src/components/layout/footer.tsx` — NAP réel, liens réels

Puis : **STOP**. Indique de lancer `pnpm dev` pour vérifier visuellement les couleurs et polices
avant de commencer le développement des sections avec `/build`.