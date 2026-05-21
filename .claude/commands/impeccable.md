---
description: Design review et itération UI/UX. Route vers les fichiers de référence impeccable selon le sous-commande invoqué. Lire le fichier de référence correspondant avant toute action.
---

# /impeccable — Design Review & Itération UI

## Contexte projet — chargement obligatoire

Avant toute action, charger le contexte projet :

```bash
node .agents/skills/impeccable/scripts/load-context.mjs
```

> **Note :** si un message contient `{{scripts_path}}`, remplacer par le chemin réel
> `.agents/skills/impeccable/scripts` — c'est un placeholder non résolu du CLI impeccable.

Le script cherche `docs/project/product.md` et `docs/project/design.md` (fallback automatique vers `docs/`).
Si ces fichiers sont vides ou absents : lancer `/impeccable teach` d'abord.

> **Note Mobem :** si `/strategy` + `/design` ont été complétés, le contexte est déjà dans
> `docs/project/product.md` et `docs/project/design.md` — pas besoin de `/impeccable teach`.
> Utile uniquement pour reprendre un projet existant sans ces fichiers.

## `/impeccable teach` — quand l'utiliser

`/impeccable teach` crée ou rafraîchit `PRODUCT.md` et `DESIGN.md` à la racine du projet
en interviewant l'IA sur le codebase et en posant des questions stratégiques.

Dans la workflow Mobem :
- `/strategy` remplace la partie PRODUCT de `teach`
- `/design` remplace la partie DESIGN de `teach`
- Lancer `teach` uniquement si on reprend un projet sans `docs/project/product.md`

## Table de routing — fichiers de référence

Charger le(s) fichier(s) correspondant(s) selon le sous-commande invoqué :

| Sous-commande | Fichier de référence |
|---------------|----------------------|
| `teach` | `.agents/skills/impeccable/reference/teach.md` (via `load-context.mjs`) |
| `document` | `.agents/skills/impeccable/reference/document.md` |
| `audit` | `.agents/skills/impeccable/reference/audit.md` |
| `critique` | `.agents/skills/impeccable/reference/critique.md` |
| `polish` | `.agents/skills/impeccable/reference/polish.md` |
| `craft` | `.agents/skills/impeccable/reference/craft.md` |
| `shape` | `.agents/skills/impeccable/reference/shape.md` |
| `bolder` | `.agents/skills/impeccable/reference/bolder.md` |
| `quieter` | `.agents/skills/impeccable/reference/quieter.md` |
| `distill` | `.agents/skills/impeccable/reference/distill.md` |
| `harden` | `.agents/skills/impeccable/reference/harden.md` |
| `animate` | `.agents/skills/impeccable/reference/animate.md` |
| `colorize` | `.agents/skills/impeccable/reference/colorize.md` |
| `typeset` | `.agents/skills/impeccable/reference/typeset.md` |
| `layout` | `.agents/skills/impeccable/reference/layout.md` |
| `delight` | `.agents/skills/impeccable/reference/delight.md` |
| `adapt` | `.agents/skills/impeccable/reference/adapt.md` |
| `clarify` | `.agents/skills/impeccable/reference/clarify.md` |
| `optimize` | `.agents/skills/impeccable/reference/optimize.md` |
| `onboard` | `.agents/skills/impeccable/reference/onboard.md` |
| `overdrive` | `.agents/skills/impeccable/reference/overdrive.md` |

## Fichiers de contexte supplémentaires

Selon le registre détecté dans docs/project/product.md :
- Site artisan / TPE → `.agents/skills/impeccable/reference/brand.md`
- Application / produit digital → `.agents/skills/impeccable/reference/product.md`

## Priorité de lecture pour les décisions visuelles

`docs/project/design.md` > `.agents/skills/impeccable/reference/[sous-commande].md` > `SKILL.md`

## Sans sous-commande

Si `/impeccable` est invoqué sans argument : charger `audit.md` + `critique.md` et proposer un diagnostic complet de l'interface.
