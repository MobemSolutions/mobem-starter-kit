# Mobem — Workflow de création client

> Guide opérationnel complet. Une section = une étape = un livrable avant de passer à la suite.

---

## Vue d'ensemble

```
Brief client
    ↓
[Vous] Constituer docs/context/          ← étape humaine, bloquante
    ↓
/strategy   → docs/product.md validé     ← session CLI #1
    ↓
/design     → docs/design.md validé      ← session CLI #2
    ↓
/build      → composant par composant    ← session CLI #3+
    ↓
/impeccable audit  → corrections
    ↓
/impeccable polish → livraison
```

**Règle absolue : ne jamais passer à l'étape suivante sans valider la précédente.**
Chaque phase est une session Claude Code distincte. Ne pas tout faire dans la même session.

---

## Phase 0 — Brief (vous, avant Claude)

Avant d'ouvrir Claude Code, constituez `docs/context/` avec ces fichiers :

```
docs/context/
├── brief.md (ou brief.pdf)     — objectifs, audience, ton, fonctionnalités
├── refs.md                     — 2-5 URLs de sites aimés + 1-2 sites à éviter
└── contraintes.md              — budget, délai, RGAA requis, contraintes techniques
```

**`refs.md` est la donnée la plus critique.** Sans références visuelles réelles,
Claude revient à ses defaults génériques. Si le client n'en a pas, posez-lui ces questions :

- "3 sites que vous aimez, même hors de votre secteur ?"
- "1 site que vous ne voulez absolument pas ressembler ?"
- "Un mot pour décrire l'ambiance souhaitée : sobre, chaleureux, premium, dynamique ?"

Ne lancez pas `/design` sans ces réponses.

---

## Phase 1 — Stratégie produit

**Outil :** Claude Code CLI
**Commande :** `/strategy`
**Durée estimée :** 15–20 min
**Livrable :** `docs/product.md` complété

### Ce que fait la commande
- Lit `docs/context/` en entier
- Prouve sa lecture (cite 3 informations clés du brief)
- Remplit `docs/product.md` : présentation, problème, objectifs, audience, périmètre, ton, métriques
- Note `⚠️ À confirmer` pour chaque information manquante
- Propose une arborescence de 3 à 7 pages adaptée au secteur

### Votre validation
Relisez `docs/product.md` et vérifiez :
- [ ] L'arborescence correspond à ce que le client attend
- [ ] Les objectifs business sont corrects
- [ ] L'audience est bien décrite
- [ ] Les ⚠️ sont résolus ou acceptés
- [ ] `docs/feedback.md` mis à jour si friction ou insight notable durant cette phase

**STOP. Ne lancez pas `/design` avant d'avoir validé ce fichier.**

---

## Phase 1.5 — Figma (optionnel)

> À utiliser si le client a besoin de voir un visuel avant de valider la palette.

**Commande :** `/figma` → Usage A
**Prérequis :** `.mcp.json` configuré avec `FIGMA_API_KEY` (copier `.mcp.json.example`)

Crée une maquette simplifiée dans Figma depuis `docs/design.md` validé.
Le client commente directement dans Figma → retours structurés, pas de malentendus.

---

## Phase 2 — Direction artistique

**Outil :** Claude Code CLI
**Commande :** `/design`
**Durée estimée :** 20–30 min
**Livrable :** `docs/design.md` complété + tokens dans `globals.css`

### Ce que fait la commande
- Vérifie que `docs/product.md` est rempli — sinon refuse de continuer
- Vérifie que `docs/context/refs.md` existe — sinon demande les références et s'arrête
- Lit les skills Impeccable (typography, color, spatial) avant de proposer quoi que ce soit
- Propose 2 palettes OKLCH distinctes avec justification secteur
- Présente le résumé structuré (palettes + typographie + radius)
- Attend votre validation explicite avant d'écrire un seul fichier

### Votre validation
Répondez "go palette A" ou "go palette B" (ou demandez des ajustements).
Claude écrit ensuite :
- `docs/design.md`
- `src/app/globals.css` (tokens OKLCH + polices chargées)
- `src/app/layout.tsx` (polices Google Fonts)
- `src/lib/constants/colors.ts` (THEME_META)

- [ ] `docs/feedback.md` mis à jour si friction ou insight notable durant cette phase

**STOP. Ne lancez pas `/build` avant d'avoir vu le rendu dans le navigateur.**
Lancez `pnpm dev` et vérifiez visuellement que les couleurs et polices sont correctes.

---

## Phase 3 — Développement

**Outil :** Claude Code CLI
**Commande :** `/build [section]`
**Durée estimée :** selon complexité
**Livrable :** composants codés, un par commit

### Ordre de développement recommandé
```
1. header.tsx + footer.tsx (navigation réelle, NAP, CTA)
2. Hero section (section la plus critique visuellement)
3. Sections de contenu (dans l'ordre de l'arborescence)
4. Pages secondaires
5. Formulaire de contact
6. SEO + Schema JSON-LD
```

### Ce que fait la commande
Pour chaque composant :
- Vérifie la présence des tokens dans `docs/design.md`
- Cite la règle Impeccable la plus pertinente avant de coder
- Cite l'anti-pattern le plus probable à éviter
- Code le composant
- Vérifie la checklist SKILL.md mentalement

**Un composant = un commit.** Ne jamais accumuler plusieurs composants dans la même session
sans commit intermédiaire — vous perdez la traçabilité et le contrôle.

### Après chaque page complète
```bash
pnpm run impeccable
```
Corrigez tous les problèmes détectés avant de passer à la page suivante.

Dans Claude Code :
```
/impeccable audit [nom de la page]
/impeccable critique [nom de la page]
```

---

## Phase 4 — Audit & livraison

**Commandes :** `/impeccable audit` · `/impeccable polish` · `/impeccable harden`

### Checklist technique avant livraison
- [ ] `docs/feedback.md` complété — bugs, frictions, améliorations, ce qui a bien fonctionné
- [ ] `docs/feedback.md` remonté au template Mobem (PR ou message à l'équipe)
- [ ] `pnpm run impeccable` — zéro erreur
- [ ] Lighthouse ≥ 90 (Performance · Accessibilité · SEO · Best Practices)
- [ ] Mobile 375px — pas d'overflow horizontal
- [ ] Dark mode testé — tous les tokens résolus
- [ ] `tsc --noEmit` passe propre
- [ ] Aucune couleur hardcodée — uniquement `var(--...)`
- [ ] Toutes les images ont `alt` + `width` + `height`
- [ ] Focus visible sur tous les éléments interactifs
- [ ] Schema JSON-LD validé (Google Rich Results Test)
- [ ] NAP cohérent sur toutes les pages

### Checklist RGAA (niveau AA minimum)
- [ ] Contraste texte : 4.5:1 minimum (vérifier avec OKLCH Contrast Checker)
- [ ] Contraste UI (boutons, inputs) : 3:1 minimum
- [ ] Balises sémantiques — pas de div soup (`<main>`, `<nav>`, `<article>`, `<section>`)
- [ ] Ordre de lecture logique dans le DOM
- [ ] Aria uniquement si le HTML natif ne suffit pas
- [ ] Formulaires : labels visibles, messages d'erreur explicites
- [ ] Navigation au clavier complète

### Commande finale
```
/impeccable polish
```
Passe de cohérence globale avant de livrer — alignement typographique, espacement,
hiérarchie visuelle, micro-interactions.

---

## Référence rapide — Commandes Claude Code

| Commande | Phase | Ce qu'elle fait |
|----------|-------|-----------------|
| `/strategy` | 1 | Lit le brief, remplit docs/product.md |
| `/design` | 2 | Propose palettes, remplit docs/design.md + globals.css |
| `/build [section]` | 3 | Code un composant selon la DA validée |
| `/figma` | 1.5 ou 3 | **Usage A** : maquette Figma pour validation client après `/design`. **Usage B** : implémentation depuis specs Figma pendant `/build`. **Usage C** : Code Connect pour lier composants code ↔ Figma. |
| `/impeccable teach` | 1–2 ou reprise | Crée/rafraîchit le contexte impeccable (PRODUCT.md + DESIGN.md). Inutile si `/strategy` + `/design` ont été faits — impeccable lit `docs/product.md` et `docs/design.md` automatiquement. Utile pour reprendre un projet existant sans contexte. |
| `/impeccable shape [section]` | 3 | Planifie UX/UI avant de coder |
| `/impeccable audit [page]` | 3–4 | Audit technique post-génération |
| `/impeccable critique [page]` | 3–4 | Review design et hiérarchie |
| `/impeccable polish` | 4 | Passe finale avant livraison |
| `/impeccable harden` | 4 | Edge cases, erreurs, i18n |

---

## Erreurs fréquentes à éviter

**Déplacer le dossier projet après `pnpm install`**
→ pnpm stocke les modules avec des chemins absolus dans le virtual store. Si le dossier est déplacé ou renommé, les imports cassent silencieusement.
→ Fix : `Remove-Item node_modules -Recurse -Force && pnpm install` (PowerShell) ou `rm -rf node_modules && pnpm install` (bash) depuis le nouveau chemin.

**`pnpm install` se termine avec `ERR_PNPM_UNEXPECTED_VIRTUAL_STORE`**
→ Le virtual store est corrompu ou pointe vers un ancien chemin.
→ Fix : `rm -rf node_modules && pnpm install`

**Tout faire dans une seule session CLI**
→ Le contexte des skills se dilue. Résultat : composants génériques.
→ Fix : 3 sessions distinctes, une par phase.

**Lancer `/design` sans références visuelles**
→ Claude génère une palette "plausible" mais déconnectée du client.
→ Fix : `docs/context/refs.md` obligatoire avant `/design`.

**Valider la palette sans lancer `pnpm dev`**
→ Les valeurs OKLCH sur papier ne donnent pas la même impression que dans le navigateur.
→ Fix : toujours vérifier visuellement avant de passer au code.

**Accumuler des composants sans audit intermédiaire**
→ Les anti-patterns s'accumulent et deviennent coûteux à corriger.
→ Fix : `pnpm run impeccable` après chaque page.
