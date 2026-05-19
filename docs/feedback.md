# Feedback projet → template

> Remplir au fil du projet, pas seulement à la fin.
> Chaque entrée remonte au template Mobem pour amélioration continue.
>
> Format : date · sévérité · description courte · fix suggéré (si connu)
> Sévérités : 🔴 bloquant · 🟡 friction · 🟢 amélioration · ✅ ce qui a bien fonctionné

---

## Infos projet

| Champ | Valeur |
|-------|--------|
| Client | — |
| Secteur | — |
| Date de début | — |
| Date de livraison | — |
| Développeur | — |

---

## 🔴 Bugs

Problèmes qui ont cassé quelque chose ou forcé un contournement.

<!--
Exemple :
- 2025-03-12 · `use-mobile.ts` déclenche un rerender infini sur iOS Safari
  quand la barre d'adresse se rétracte. Fix : debounce de 100ms sur le resize listener.
-->

---

## 🟡 Frictions workflow

Étapes qui ont ralenti sans raison, commandes qui ont mal fonctionné, docs manquantes.

<!--
Exemples :
- `/design` a ignoré `docs/context/refs.md` et proposé une palette par défaut
  → ajouter dans le prompt /design : "cite l'URL #1 de refs.md et explique comment elle influence la palette"

- `siteConfig.nav` ne supporte pas les sous-menus → bloquant pour les clients avec 6+ pages,
  doit être prévu dans le type NavItem dès le template
-->

---

## 🟢 Améliorations

Composants, patterns ou règles à ajouter/modifier dans le template.

<!--
Exemples :
- Ajouter un composant `<Testimonial />` dans les sections de base —
  demandé sur 3 projets consécutifs, toujours recréé from scratch

- `globals.css` : ajouter une variable `--radius-card` utilisée automatiquement
  par le composant Card, évite de chercher la valeur dans design.md

- CLAUDE.md § Performance : préciser que `next/image` doit avoir `sizes` en plus
  de `width`/`height` pour les images responsive — oublié systématiquement
-->

---

## ✅ Ce qui a bien fonctionné

Patterns, règles ou décisions à conserver absolument.

<!--
Exemples :
- La séparation /strategy → /design → /build en sessions distinctes
  a vraiment réduit les composants génériques par rapport au workflow tout-en-un

- siteConfig.ts comme source de vérité unique : zéro placeholder oublié dans le footer

- La règle "un composant = un commit" a rendu les reviews client 3× plus rapides
-->

---

## 📝 Changements proposés au template

Modifications précises à répercuter dans les fichiers du template.

<!--
Format :
  Fichier cible · ligne approximative · description du changement

Exemples :
- `src/lib/config/site.ts` · ajouter `phone` et `address` pour le schema JSON-LD LocalBusiness
- `CLAUDE.md` § Sécurité · préciser que `import 'server-only'` est requis dans les actions serveur, pas seulement les routes API
- `docs/workflow.md` Phase 2 · ajouter : vérifier le contraste des palettes OKLCH avec https://oklch.com avant validation
- `src/components/layout/footer.tsx` · ajouter un slot optionnel pour les réseaux sociaux
-->
