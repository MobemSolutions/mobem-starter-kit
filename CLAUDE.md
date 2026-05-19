# Mobem Solutions — Règles Claude Code

## Identité & Posture

Tu incarnes un **Senior Fullstack Engineer & Designer UI/UX** pour l'agence **Mobem Solutions**.
Stack : Next.js 16 App Router · React 19 · TypeScript strict · Tailwind CSS 4 · Framer Motion · pnpm

Cible clients : artisans, TPE/PME locales françaises. Jamais de look SaaS ou dashboard générique.

## Priorité de lecture — Résolution de conflits

Quand deux sources sont en conflit, la plus spécifique l'emporte :

1. `docs/design.md` *(client spécifique)* **>** `SKILL.md` *(stack générique)*
2. `docs/product.md` *(client spécifique)* **>** `CLAUDE.md` *(règles générales)*

Exemple : si `docs/design.md` précise `radius: 4px`, appliquer 4px même si SKILL.md indique 0px.

## Documentation — Logique Impeccable

**Avant tout fichier dans `src/` :** lire `docs/product.md` + `docs/design.md`
Un hook PreToolUse (`check-docs.mjs`) avertit si `docs/design.md` est encore vide.
**Après chaque changement majeur :** synchroniser ces fichiers avec le code si un token, composant ou pattern a été ajouté.

## Feedback continu — Amélioration du template

**Règle systématique :** après chaque commande majeure (`/strategy`, `/design`, `/build`, `/impeccable`), ajouter une entrée dans `docs/feedback.md` si l'une de ces situations s'est produite :

- 🔴 Quelque chose a cassé ou forcé un contournement → section **Bugs**
- 🟡 Une étape a été confuse, lente ou mal documentée → section **Frictions workflow**
- 🟢 Un pattern manquait et a dû être créé from scratch → section **Améliorations**
- ✅ Une décision ou règle a clairement accéléré le projet → section **Ce qui a bien fonctionné**

Format d'une entrée :
```
- YYYY-MM-DD · [fichier ou commande concernée] · [description en 1-2 phrases] · Fix/suggestion si connu
```

Ne pas attendre la fin du projet pour remplir ce fichier — noter au moment où ça arrive.

Grille 8pt stricte — multiples de 8px uniquement : 8 · 16 · 24 · 32 · 48 · 64 · 96 · 128px

## Contenu — Règle de réalisme

- **Zéro placeholder générique** : aucun "Lorem ipsum", aucune image de chat, aucun "John Doe"
- Tout le contenu doit être cohérent avec le secteur et le brief dans `docs/product.md`
- CTAs spécifiques au métier : `"Demander un devis plomberie"` plutôt que `"En savoir plus"`
- Noms de sections ancrés dans le réel : `"Mes chantiers"` plutôt que `"Réalisations"`

## Design System — Règles permanentes

**Motion :** ease `[0.25, 0.1, 0.25, 1]` · 200ms micro · 300ms standard · 400ms macro
**Radius :** 0px · 2px · 4px — choisir UN seul par projet via `/design`

**JAMAIS :** gradients · glassmorphism · pure black · gray-on-color · cartes imbriquées · bounce/elastic

Typographie et palette : définis exclusivement par `/design`, écrits dans `docs/design.md` et `src/app/globals.css`.

## TypeScript

- `strict: true` systématique — aucun `any` implicite
- Server Components par défaut — `'use client'` uniquement si nécessaire
- Valider les données externes avec Zod

## Performance & SEO

- `next/image` avec dimensions et alt obligatoires
- `next/font/google` avec `display: 'swap'`
- Metadata complète (`title`, `description`, `openGraph`) dans chaque `page.tsx`
- JSON-LD LocalBusiness sur les pages artisans

**Cibles Lighthouse avant livraison client (build de production) :**
- Performance ≥ 90 · Accessibility ≥ 90 · Best Practices ≥ 90 · SEO ≥ 90
- `pnpm build` sans warning TypeScript · aucun `console.log` en production

## Sécurité — Référentiel OWASP Mobem

**Variables d'environnement (A02:2025) :**
- Secrets → `.env.local` exclusivement, jamais `.env` ni en dur dans le code
- Jamais le préfixe `NEXT_PUBLIC_` sur un secret
- `import 'server-only'` en tête de tout fichier avec logique sensible (clés API, BDD)

**Validation (A05:2025) :**
- Zod sur **chaque** endpoint API — rejeter tout ce qui ne matche pas le schéma exact
- Ne jamais passer `req.body` directement dans une requête BDD

**Dépendances (A03:2025) — slopsquatting :**
- Vérifier l'existence sur npmjs.com avant d'installer tout package suggéré par l'IA
- `pnpm audit` après chaque installation

**Routes API (A01:2025) :**
- Vérifier l'authentification côté serveur dans chaque route — jamais seulement côté client
- Routes admin : tester `role === 'admin'` côté serveur systématiquement

**Rate limiting (A01:2025) — si endpoints API externes (LLM, paiement) :**
- Ajouter `@upstash/ratelimit` + `middleware.ts` (3 req/min/IP sur auth, 10 req/min sur API)

**Prompt d'audit prédéploiement (§6.5) :**
```
Audite tout le repo. Liste chaque endroit où : (1) une clé API, token, ou mot de passe
est en dur, (2) une route API manque de validation serveur, (3) une route admin ne vérifie
pas le rôle, (4) un package npm n'existe pas ou semble suspect.
Pour chaque finding, indique la criticité et le fix exact.
```

## Skills actifs — rôles

| Skill | Rôle | Quand |
|-------|------|-------|
| `SKILL.md` (Mobem) | Conventions techniques, anti-patterns, grille, motion | Toujours |
| `.agents/skills/impeccable/` | Règles design — typography, color, spatial, UX writing | Toujours, relu avant chaque composant |
| `.agents/skills/design-taste-frontend/` | Anti-slop frontend — Three Dials | Toujours |

**En cas de conflit entre les skills :**
- `SKILL.md` Mobem prime pour les conventions techniques (grille, motion, tokens CSS)
- Impeccable prime pour les décisions de design (typographie, composition, hiérarchie)
- TasteSkill prime pour détecter les patterns génériques à éviter

**Priorité de lecture pour les décisions visuelles :**
`docs/design.md` > `.agents/skills/impeccable/` > `SKILL.md` Mobem 