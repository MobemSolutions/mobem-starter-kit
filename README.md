# Mobem Starter Kit

Template repository pour les projets clients Mobem Solutions.
Stack : **Next.js 16** · **Tailwind CSS 4** · **TypeScript strict** · **Framer Motion**
Design : **Impeccable** + **TasteSkill** intégrés nativement via `.clinerules` et `SKILL.md`

---

## Installation

```bash
# 1. Cloner le boilerplate
git clone <url> mon-projet-client
cd mon-projet-client

# 2. Installer les dépendances
pnpm install

# 3. Copier les variables d'environnement
cp .env.local.example .env.local

# 4. Lancer le serveur de développement
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Variables d'environnement

| Variable | Requis | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Oui | URL de production (ex: `https://client.fr`) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Non | ID projet Sanity (si CMS activé) |
| `RESEND_API_KEY` | Non | Clé API Resend (si email activé) |

---

## Structure du projet

```
src/
├── app/                 Next.js App Router (layouts, pages, API routes)
├── components/
│   ├── ui/              Composants atomiques (Button, Card, Badge, Input)
│   ├── layout/          Header, Footer
│   ├── sections/        Sections de pages (Hero, Contact, ...)
│   └── providers/       ThemeProvider
├── lib/
│   ├── utils.ts         cn() helper
│   └── constants/       Design tokens TypeScript (couleurs, espacements, typo)
├── types/               Types partagés
└── hooks/               Hooks React (useIsMobile, ...)

docs/
├── product.md           Stratégie produit (source de vérité)
├── design.md            Système de design (source de vérité)
└── templates/           Templates vierges pour nouveaux clients
```

---

## Workflow — Nouveau Client

### Étape 1 — Lire le brief client

Collecter : nom, secteur, objectifs, cible, pages souhaitées, budget, références visuelles.

### Étape 2 — Prompt d'initialisation IA

Coller ce prompt dans Claude Code (ou Cline) avec le brief client :

```
# Prompt Mobem — Initialisation Nouveau Client

Lis attentivement le brief client ci-dessous.

Génère ensuite ces 4 livrables :

1. `docs/product.md` — En remplissant `docs/templates/product.template.md` avec les 
   informations du brief. Propose une arborescence de pages Next.js adaptée au secteur.

2. `docs/design.md` — En remplissant `docs/templates/design.template.md`. 
   Propose 3 options de palettes OKLCH adaptées au secteur et à l'ambiance souhaitée.
   Recommande un rayon de bordure cohérent avec le positionnement.

3. Adapte `src/app/globals.css` — Remplace les tokens OKLCH Mobem par la palette 
   choisie pour le client. Garde la structure @theme et les variables CSS custom.

4. Adapte `src/lib/constants/colors.ts` — Reflète les nouveaux tokens.

Enfin, liste les sections à créer dans `src/components/sections/` selon la structure 
de pages proposée.

---
Brief client :
[COLLER LE BRIEF ICI]
```

### Étape 3 — Workflow Impeccable

Une fois le brief traduit en docs, utiliser les commandes Impeccable pour construire :

```bash
# Installer Impeccable (une seule fois par machine)
npx impeccable install  # ou voir https://github.com/pbakaus/impeccable

# Dans Claude Code / Cline :
/impeccable shape      → Planifier l'UX/architecture avant de coder
/impeccable audit      → Vérifier la qualité après chaque section
/impeccable polish     → Affiner avant livraison client
/impeccable animate    → Ajouter les animations Framer Motion
/impeccable critique   → Revue globale UX avant livraison
```

### Étape 4 — Build & vérification

```bash
pnpm type-check   # TypeScript strict — doit passer clean
pnpm build        # Build de production
pnpm start        # Tester le build en local
```

---

## Design System — Références rapides

### Typographie
```
Display : font-display italic  (DM Serif Display)
Body    : font-sans            (Inter 400/500)
Label   : font-mono            (JetBrains Mono)
```

### Tokens couleurs (light mode)
```css
--background : oklch(0.973 0.003 80)    /* Paper ivory  */
--foreground : oklch(0.07 0 0)          /* Ink          */
--signal     : oklch(0.605 0.203 27.5)  /* Accent rouge */
--border     : oklch(0.90 0 0)          /* Règle grise  */
```

### Espacement 8pt
```
xs:8 · sm:16 · md:24 · lg:32 · xl:48 · 2xl:64 · 3xl:96 · hero:128px
```

### Motion
```typescript
ease: [0.25, 0.1, 0.25, 1]   // EASE_MOBEM
Micro: 200ms · Standard: 300ms · Macro: 400ms
```

---

## Activer les fonctionnalités optionnelles

### CMS Sanity
```bash
pnpm add sanity next-sanity @sanity/image-url
# Puis décommenter la config dans .env.local.example
```

### Email Resend
```bash
pnpm add resend @react-email/components @react-email/render
```

### Analytics Vercel
```bash
pnpm add @vercel/analytics @vercel/speed-insights
# Ajouter <Analytics /> et <SpeedInsights /> dans app/layout.tsx
```

---

## Scripts utiles

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement |
| `pnpm build` | Build de production |
| `pnpm type-check` | Vérification TypeScript |
| `pnpm lint` | ESLint |

---

## Règles IA actives

Ce boilerplate inclut 3 niveaux de guidance IA :

| Fichier | Outil | Contenu |
|---------|-------|---------|
| `.clinerules` | Cline | Identité Mobem, logique Impeccable, standard TasteSkill |
| `CLAUDE.md` | Claude Code | Version condensée des mêmes règles |
| `SKILL.md` | Tout AI IDE | Design system complet, patterns, anti-patterns |

Ces fichiers sont lus automatiquement par les AI coding assistants à chaque session.
