# Mobem Starter Kit

Template repository pour les projets clients Mobem Solutions.
Stack : **Next.js 16** · **Tailwind CSS 4** · **TypeScript strict** · **Framer Motion**
Cible : artisans · professions libérales · TPE/PME locales françaises

---

## Démarrage rapide

```bash
# 1. Cloner le boilerplate
git clone <url> mon-projet-client
cd mon-projet-client

# 2. Supprimer l'historique du boilerplate
Remove-Item -Recurse -Force .git                                # PowerShell
# rm -rf .git                                                   # bash
git init && git add . && git commit -m "init: boilerplate Mobem Solutions"

# 3. Installer les dépendances
pnpm install && pnpm audit

# 4. Configurer l'environnement
cp .env.example .env.local
# Remplir .env.local avec les vraies valeurs (ne jamais commiter)

# 5. Remplir siteConfig.ts
# src/lib/siteConfig.ts — nom, téléphone, adresse, secteur, etc.

# 6. Lancer le serveur de dev
pnpm dev   # → http://localhost:3001
```

---

## Workflow complet

Voir **[docs/workflow.md](docs/workflow.md)** — guide pas à pas, phase par phase.

| Phase | Commande | Livrable |
|-------|----------|----------|
| 0 | — (vous) | `docs/context/` — brief · refs · contraintes |
| 1 | `/strategy` | `docs/product.md` — arborescence · audience · skill/section |
| 2 | `/design` | `docs/design.md` · `globals.css` — palette OKLCH · typo · radius |
| 3 | `/build` | Sections codées — OG · favicon · sitemap · FAQ · TrustBadges |
| 3.5 | `/contact-setup` | Route API contact · Resend · honeypot · 2 emails |
| 3.6 | `/cms` | Sanity CMS — si contenu éditable par le client |
| 4–4.5 | `/impeccable` · `/legal` | Audit qualité · pages légales |
| 4.7 | `/qa` | Tests navigateur — parcours visiteur · mobile · formulaire |
| 5 | `launch-runbook` | DNS · GBP · surveillance J+1/J+3/J+7 · handoff client |

**Règle absolue :** ne jamais passer à l'étape suivante sans valider la précédente.
Chaque phase = une session Claude Code distincte.

---

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx           Layout racine — metadata · skip link · ThemeProvider
│   ├── page.tsx             Page d'accueil
│   ├── not-found.tsx        Page 404 brandée
│   ├── error.tsx            Error boundary (stub Sentry)
│   ├── loading.tsx          Skeleton Suspense
│   ├── icon.tsx             Favicon dynamique depuis siteConfig
│   ├── opengraph-image.tsx  OG image (partage WhatsApp/LinkedIn)
│   ├── sitemap.ts           Sitemap XML
│   ├── robots.ts            robots.txt
│   ├── globals.css          Tokens OKLCH · polices · dark mode
│   └── api/contact/         Route API formulaire (Resend + Zod)
├── components/
│   ├── ui/
│   │   ├── floating-contact.tsx   CTA fixe WhatsApp + téléphone
│   │   ├── trust-badges.tsx       Certifications (RGE, RPPS, Barreau…)
│   │   └── ...                    Button · Input · Card · Lightbox gallery
│   ├── layout/              Header · Footer
│   ├── sections/            Hero · Services · Réalisations · FAQ · Contact
│   └── providers/           ThemeProvider (next-themes)
├── lib/
│   ├── siteConfig.ts        ★ Source de vérité — NAP · zones · avis · certifs
│   ├── utils.ts             cn() — clsx + tailwind-merge
│   └── sanity/              Client Sanity + requêtes GROQ (si /cms activé)
└── types/
    └── plausible.d.ts       Type window.plausible pour les custom events

docs/
├── workflow.md              ★ Guide complet — phase par phase
├── product.md               Stratégie produit (rempli par /strategy)
├── design.md                Système de design (rempli par /design)
├── handoff.md               Guide de passation client (à compléter avant livraison)
├── feedback.md              Bugs · frictions · améliorations du template
└── context/                 Brief client + refs visuelles (gitignored)
```

---

## Commandes Claude Code

### Obligatoires

| Commande | Phase | Rôle |
|----------|-------|------|
| `/strategy` | 1 | Lit `docs/context/`, remplit `docs/product.md` |
| `/design` | 2 | Propose palettes OKLCH, remplit `docs/design.md` + `globals.css` |
| `/build [section]` | 3 | Code les composants selon la DA validée |
| `/contact-setup` | 3.5 | Formulaire de contact production-ready (Resend + Zod + honeypot) |
| `/impeccable audit` | 3–4 | Audit qualité après chaque page |
| `/impeccable polish` | 4 | Passe finale avant livraison |
| `/qa` | 4.7 | Tests navigateur sur URL Vercel — parcours visiteur · mobile · formulaire |

### Optionnelles

| Commande | Quand |
|----------|-------|
| `/cms` | Contenu éditable par le client (galerie, blog, services) |
| `/legal` | Pages légales françaises — mentions légales · confidentialité · CGV |
| `/figma` | Implémentation depuis maquettes Figma existantes |

---

## Variables d'environnement

Copier `.env.example` → `.env.local` et remplir. Ne jamais commiter `.env.local`.

| Variable | Requis | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Oui | URL de production (`https://client.fr`) |
| `RESEND_API_KEY` | Si formulaire | Email transactionnel — resend.com |
| `CONTACT_EMAIL_TO` | Si formulaire | Email de destination des leads |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Si CMS | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Si CMS | `production` |
| `SANITY_API_TOKEN` | Si CMS | Token write Sanity — jamais `NEXT_PUBLIC_` |
| `UPSTASH_REDIS_REST_URL` | Optionnel | Rate limiting Upstash |
| `UPSTASH_REDIS_REST_TOKEN` | Optionnel | Rate limiting Upstash |
| `SENTRY_DSN` | Optionnel | Monitoring d'erreurs Sentry |

---

## Design System — Référence rapide

Palette et typographie définies par `/design` dans `docs/design.md` + `globals.css`.
Les valeurs ci-dessous sont les **placeholders** du boilerplate — les remplacer à chaque projet.

### Tokens CSS (globals.css)
```css
--background : oklch(0.973 0.003 80)    /* Paper ivory  */
--foreground : oklch(0.07 0 0)          /* Ink          */
--signal     : oklch(0.605 0.203 27.5)  /* Accent CTA   */
--border     : oklch(0.90 0 0)          /* Règle grise  */
```

### Grille 8pt
```
xs:8 · sm:16 · md:24 · lg:32 · xl:48 · 2xl:64 · 3xl:96 · hero:128px
```

### Motion
```typescript
const EASE = [0.25, 0.1, 0.25, 1] as const
// Micro: 200ms · Standard: 300ms · Macro: 400ms
// Expo Out [0.22, 1, 0.36, 1] pour les grands éléments (hero H1)
```

---

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement (port 3001) |
| `pnpm build` | Build de production + vérification TypeScript |
| `pnpm start` | Serveur de production local |
| `pnpm lint` | ESLint |
| `pnpm audit` | Audit de sécurité des dépendances |

---

## CI/CD

**CI** — GitHub Actions tourne automatiquement sur chaque push et PR :
- `pnpm build` — TypeScript strict + compilation Next.js
- `pnpm lint` — ESLint
- `pnpm audit` — vulnérabilités dépendances (niveau modéré bloquant)

Voir `.github/workflows/ci.yml`.

**CD** — Vercel déploie automatiquement :
- Push sur `main` → déploiement de production
- Push sur `review/**` → URL de preview client (pour Ruttl)

---

## Fonctionnalités optionnelles — installation

```bash
# Formulaire de contact
pnpm add resend zod

# CMS Sanity (galerie réalisations éditable)
pnpm add @sanity/client next-sanity @sanity/image-url
pnpm add -D sanity

# Galerie lightbox
pnpm add yet-another-react-lightbox

# Rate limiting (formulaire sous forte charge)
pnpm add @upstash/ratelimit @upstash/redis
```

Voir [docs/workflow.md](docs/workflow.md) pour les instructions complètes d'activation.

---

## Règles IA

| Fichier | Contenu |
|---------|---------|
| `CLAUDE.md` | Identité Mobem · priorités · sécurité OWASP · performance |
| `SKILL.md` | Design system complet · patterns · anti-patterns · composants |

Priorité de lecture pour les décisions design : `docs/design.md` > `SKILL.md` > `CLAUDE.md`
