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

- 2026-05-21 · `pnpm-lock.yaml` · Lockfile désynchronisé après suppression de packages — CI bloqué sur `ERR_PNPM_OUTDATED_LOCKFILE`. Le lockfile n'avait pas été rekommité après `pnpm remove`. Fix : toujours commiter `pnpm-lock.yaml` immédiatement après tout `pnpm add` ou `pnpm remove`. À ajouter dans `docs/workflow.md` § Erreurs fréquentes.

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

- 2026-05-27 · `src/components/sections/` · Sprint 2 — 5 nouveaux composants : `TrustBadges` (3 variants : chips/cards/inline), `AidesPubliques` (server component), `ROITeaser` (counters animés useInView), `BeforeAfter` (cas clients chiffrés + citations), `BookingCTA` (multi-mode : doctolib/calendly/thefork/form/phone/whatsapp). Tous typés TypeScript strict, build propre.
- 2026-05-27 · `.agents/skills/sector-templates/SKILL.md` · Sprint 2 — Nouveau skill avec templates complets pour les 3 secteurs Tier 1 (notaire, santé, RGE) + Tier 2 artisan BTP. Inclut : ordre des sections, siteConfig recommandé, JSON-LD à injecter, CTAs sectoriels, anti-patterns, FAQ types, règles déontologiques.
- 2026-05-27 · `src/lib/siteConfig.ts` · Sprint 1 étude de marché — ajout de `SectorType`, `BookingMode`, `RoiArg`, `AidePublique` + champs `roiArgs`, `aidesPubliques`, `bookingMode`, `careerPageEnabled`. L'ancien `sector: string` est maintenant un union type exhaustif des Tier 1/2/3. Backward-compatible.
- 2026-05-27 · `src/lib/schema/index.ts` · Nouveau — 6 générateurs JSON-LD sectoriels (LegalService, MedicalBusiness, HomeAndConstruction, FoodEstablishment, LodgingBusiness, LocalBusiness) + `generateSpeakableSchema()` pour GEO + `generateFAQSchema()` + données de référence `ROI_ARGS_PAR_SECTEUR` et `AIDES_PUBLIQUES_PAR_SECTEUR`. À appeler via `generateSchemaFromConfig(siteConfig)` dans layout.tsx.
- 2026-05-27 · `.agents/skills/qualification-client/SKILL.md` · Nouveau skill — filtres de qualification 5 étapes + matrice sectorielle Tier 1/2/3 + arguments ROI par secteur + réponses aux 5 objections + pipeline commercial 5 étapes + aides publiques par secteur. Activer en Phase 0.5 avant toute session `/strategy`.
- 2026-05-27 · `docs/workflow.md` · Phase 0.5 ajoutée (qualification client), Phase 4 GEO rendu obligatoire (chemin critique), Phase 5 enrichie avec capture métriques J+0 (construction cas clients) + template email avis Google.
- 2026-05-27 · `CLAUDE.md` · JSON-LD mis à jour vers schémas sectoriels (`generateSchemaFromConfig`), `speakable` GEO ajouté, skill `qualification-client` ajouté en Phase 0.5, `seo-aeo-geo` rendu obligatoire.
- 2026-05-27 · `src/app/[secteur]/` · Sprint 3 — Route dynamique sectorielle : `sector-data.ts` (interface `SectorPageData`, `SECTOR_SLUGS`, 3 exemples complets : kinésithérapeute/notaire/installateur-PAC) + `page.tsx` (generateStaticParams, generateMetadata, JSON-LD FAQ+speakable, layout éditorial asymétrique anti-IA). Build statique propre, 3 URLs générées.
- 2026-05-27 · `src/app/audit-digital/page.tsx` · Sprint 3 — Landing page Audit Digital 360° (porte d'entrée commerciale recommandée étude de marché). Structure : hero inversé avec chiffre 94% isolé, grille 2×3 des 6 axes analysés, 3 étapes numérotées, ROITeaser 3 engagements, FAQ, BookingCTA form. Page statique, JSON-LD FAQ+speakable.
- 2026-05-28 · `src/app/sitemap.ts` · Sprint 4 — Sitemap mis à jour : importe `SECTOR_SLUGS` dynamiquement, inclut `/audit-digital` (priority 0.9), `/marque-employeur` (0.7) et toutes les pages sectorielles (0.8). Ajouter un slug dans `SECTOR_SLUGS` le met automatiquement dans le sitemap.
- 2026-05-28 · `tests/smoke.spec.ts` · Sprint 4 — 14 nouveaux smoke tests Playwright : chargement 200 + JSON-LD présent + H1 non-vide pour les 3 slugs `/[secteur]`, chargement `/audit-digital` et `/marque-employeur`, vérification sitemap. Couvre le chemin critique de chaque page Sprint 3.
- 2026-05-27 · `src/app/marque-employeur/page.tsx` · Sprint 3 — Template marque employeur (niche "la moins saturée" per étude de marché : 87% PME peinent à recruter). Valeurs authentiques, témoignages avec friction, postes ouverts avec détail métier, FAQ recrutement, CTA candidature. Adapté pour usage Mobem et clonage client.

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
