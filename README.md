# Mobem Starter Kit

Template repository pour les projets clients Mobem Solutions.
Stack : **Next.js 16** · **Tailwind CSS 4** · **TypeScript strict** · **Framer Motion**
Design : **TasteSkill** intégré nativement via `SKILL.md` · Figma MCP supporté

---

## Démarrage rapide

```bash
# 1. Cloner le boilerplate
git clone <url> mon-projet-client
cd mon-projet-client

# 2. Supprimer l'historique du boilerplate (PowerShell)
Remove-Item -Recurse -Force .git
git init && git add . && git commit -m "init: boilerplate Mobem Solutions"

# 3. Installer les dépendances
pnpm install && pnpm audit

# 4. Configurer l'environnement
cp .env.local.example .env.local

# 5. Lancer le serveur de dev
pnpm dev   # → http://localhost:3001
```

---

## Workflow complet

Voir **[docs/workflow.md](docs/workflow.md)** — guide pas à pas, commande par commande.

```
Brief client → docs/prompt.md → validation → code → audit → livraison
```

**Étapes clés :**
1. Déposer le brief dans `docs/context/`
2. Copier `docs/prompt.md` dans Claude Code
3. Valider la stratégie + la palette OKLCH avec le client
4. Builder section par section (une section = un commit)
5. Audit Lighthouse ≥ 90 avant livraison

---

## Structure du projet

```
src/
├── app/                 Next.js App Router (layouts, pages, API routes)
├── components/
│   ├── ui/              Composants atomiques (Button, Card, Badge, Input)
│   ├── layout/          Header, Footer
│   ├── sections/        Sections de pages (Hero, Contact, ...)
│   └── providers/       ThemeProvider (next-themes)
├── lib/
│   ├── utils.ts         cn() — clsx + tailwind-merge
│   └── constants/       Design tokens TypeScript (couleurs, espacements, typo)
├── types/               Types partagés
└── hooks/               Hooks React (useIsMobile, ...)

docs/
├── prompt.md            ★ Prompt d'initialisation client — copier-coller dans Claude Code
├── workflow.md          Guide complet — commande par commande
├── product.md           Stratégie produit (source de vérité — vide jusqu'à l'init)
├── design.md            Système de design (source de vérité — vide jusqu'à l'init)
├── context/             Brief client + références visuelles (ignoré par git)
└── templates/           Templates vierges pour l'initialisation
```

---

## Règles IA actives

| Fichier | Outil | Contenu |
|---------|-------|---------|
| `CLAUDE.md` | Claude Code | Identité Mobem, priorités, sécurité OWASP, performance |
| `SKILL.md` | Tout AI IDE | Design system complet, patterns, anti-patterns |
| `.mcp.json` | Claude Code | Serveur Figma MCP (nécessite `FIGMA_API_KEY`) |

Ces fichiers sont lus automatiquement à chaque session Claude Code.

**Priorité de lecture :** `docs/design.md` > `SKILL.md` > `CLAUDE.md` pour les décisions design.

---

## Variables d'environnement

| Variable | Requis | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Oui | URL de production (`https://client.fr`) |
| `RESEND_API_KEY` | Non | Email transactionnel (si formulaire activé) |
| `FIGMA_API_KEY` | Non | Sync Figma MCP ↔ code |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Non | CMS (si blog/catalogue activé) |

---

## Design System — Référence rapide

### Typographie
```
Display : font-display italic  → DM Serif Display — clamp(2rem, 5vw, 3.5rem)
Body    : font-sans            → Inter 400/500    — 1rem / line-height 1.6
Label   : font-mono            → JetBrains Mono   — 0.75rem uppercase tracking-wide
```

### Spacing 8pt
```
xs:8 · sm:16 · md:24 · lg:32 · xl:48 · 2xl:64 · 3xl:96 · hero:128px
```

### Motion
```typescript
const EASE = [0.25, 0.1, 0.25, 1] as const
// Micro: 200ms · Standard: 300ms · Macro: 400ms
```

### Couleurs — Placeholders par défaut (remplacer à l'init)
```css
--background : oklch(0.973 0.003 80)    /* Paper ivory  */
--foreground : oklch(0.07 0 0)          /* Ink          */
--signal     : oklch(0.605 0.203 27.5)  /* Accent — CTA */
--border     : oklch(0.90 0 0)          /* Règle grise  */
```

---

## Scripts

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement (port 3001) |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production local |
| `pnpm type-check` | TypeScript strict |
| `pnpm lint` | ESLint |
| `pnpm audit` | Audit de sécurité npm |

---

## Activer les fonctionnalités optionnelles

```bash
# CMS Sanity
pnpm add sanity next-sanity @sanity/image-url

# Email Resend
pnpm add resend @react-email/components @react-email/render

# Analytics Vercel
pnpm add @vercel/analytics @vercel/speed-insights

# Rate limiting (endpoints API publics)
pnpm add @upstash/ratelimit @upstash/redis
```

Voir [docs/workflow.md](docs/workflow.md) pour les instructions complètes d'activation.
