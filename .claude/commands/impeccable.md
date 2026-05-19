---
description: Design review et itération UI/UX. Route vers les fichiers de référence impeccable selon le sous-commande invoqué. Lire le fichier de référence correspondant avant toute action.
---

# /impeccable — Design Review & Itération UI

## Setup obligatoire

Avant toute action, charger le contexte projet :

```bash
node .agents/skills/impeccable/scripts/load-context.mjs
```

Consomme le JSON complet. Ne pas piper via `head` ou `grep`.

## Table de routing — fichiers de référence

Charger le(s) fichier(s) correspondant(s) selon le sous-commande invoqué :

| Sous-commande | Fichier de référence |
|---------------|----------------------|
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

Selon le registre détecté dans PRODUCT.md :
- Site artisan / TPE → `.agents/skills/impeccable/reference/brand.md`
- Application / produit digital → `.agents/skills/impeccable/reference/product.md`

## Priorité de lecture pour les décisions visuelles

`docs/design.md` > `.agents/skills/impeccable/reference/[sous-commande].md` > `SKILL.md`

## Sans sous-commande

Si `/impeccable` est invoqué sans argument : charger `audit.md` + `critique.md` et proposer un diagnostic complet de l'interface.
