# Workflow Mobem Solutions — Guide complet

> Commande par commande, outil par outil. De zéro à production.

```
Brief client → prompt.md → product.md + design.md → [validation] → code → audit → livraison
```

---

## 0. Setup machine — Une seule fois

### Prérequis

```bash
node --version   # ≥ 20 LTS (https://nodejs.org)
pnpm --version   # ≥ 9
```

```bash
# Installer pnpm si absent
npm install -g pnpm
```

### Extensions VSCode (installer une par une)

| Extension | ID | Pourquoi |
|-----------|-----|----------|
| Claude Code | `anthropic.claude-code` | IA principale |
| Tailwind CSS IntelliSense | `bradlc.vscode-tailwindcss` | Autocomplétion classes |
| Pretty TypeScript Errors | `yoavbls.pretty-ts-errors` | Erreurs lisibles |
| Error Lens | `usernamehw.errorlens` | Erreurs inline |

### Configuration Figma MCP (optionnel)

1. Aller sur figma.com → Account Settings → Personal access tokens
2. Créer un token avec scope `File content: Read`
3. Copier la valeur `figd_xxxx`
4. L'ajouter dans `.env.local` après la création du projet :
   ```
   FIGMA_API_KEY=figd_xxxxxxxxxxxxxxxxxxxx
   ```

Le fichier `.mcp.json` à la racine du projet configure automatiquement le serveur Figma dans Claude Code.

---

## 1. Créer un nouveau projet client

```bash
# Cloner le boilerplate
git clone <URL_DU_BOILERPLATE> nom-du-client
cd nom-du-client

# Supprimer l'historique git du boilerplate
# Windows (PowerShell) :
Remove-Item -Recurse -Force .git
# macOS / Linux :
# rm -rf .git

# Initialiser un nouveau repo propre
git init
git add .
git commit -m "init: boilerplate Mobem Solutions"

# Installer les dépendances
pnpm install

# Audit de sécurité immédiat
pnpm audit

# Configurer l'environnement
cp .env.local.example .env.local
# Éditer .env.local — mettre la vraie URL du projet

# Vérifier que tout compile
pnpm type-check

# Lancer le serveur de dev
pnpm dev
# → http://localhost:3001
```

---

## 2. Initialisation stratégie (Phase Analyse)

> **Règle absolue :** AUCUN code React avant validation de product.md + design.md.

### Étape 2.1 — Déposer le brief client

Placer dans `docs/context/` :
- Le brief (PDF, Word, ou `notes.md` avec les échanges emails)
- Screenshots de références visuelles ou concurrents
- Logo brut si déjà fourni

```bash
# Exemple avec un fichier PDF
# Copier le brief dans docs/context/brief.pdf
# Copier les refs dans docs/context/references/
```

### Étape 2.2 — Lancer le prompt d'initialisation

1. Ouvrir Claude Code dans le projet (`cmd+shift+p` → "Claude Code: Open")
2. Ouvrir `docs/prompt.md`
3. Copier l'intégralité du prompt (section "## Prompt" jusqu'à la fin)
4. Coller dans Claude Code
5. Remplacer `[NOM DU CLIENT]` par le vrai nom
6. Si le brief est texte : coller après `[COLLER LE BRIEF CLIENT ICI]`
7. Si le brief est un fichier : écrire `Le brief est dans docs/context/brief.pdf` à la place

**Claude va produire :**
- `docs/product.md` — Stratégie produit complète
- `docs/design.md` — Design system + 2 options de palettes OKLCH

### Étape 2.3 — Validation client (avant tout code)

Présenter au client :
- [ ] Arborescence de pages proposée
- [ ] Palette A vs Palette B (partager les valeurs OKLCH)
- [ ] Typographie + radius retenus
- [ ] Fonctionnalités incluses / exclues du périmètre

**→ Obtenir une validation écrite (email ou message) avant de continuer.**

---

## 3. Configuration du design system (Phase Design)

> Après validation client.

### Étape 3.1 — Appliquer la palette choisie

Dans Claude Code :
```
Applique la Palette [A ou B] validée dans src/app/globals.css.
Synchronise ensuite src/lib/constants/colors.ts.
Confirme les valeurs OKLCH appliquées.
```

### Étape 3.2 — Vérification visuelle

```bash
pnpm dev
# → http://localhost:3001
```

Dans Chrome DevTools :
- F12 → Elements → `:root` → vérifier les custom properties CSS
- Toggle dark mode : cliquer le bouton dans le header
- Passer en mode responsive 375px : F12 → icône mobile → "375 × 812"

---

## 4. Développement par section (Phase Build)

> **Règle :** une section = un commit. Approche incrémentale obligatoire.

### Ordre recommandé

1. Header + navigation
2. Hero (premier écran visible)
3. Section cœur de métier (services / prestations)
4. Preuves sociales (réalisations, témoignages, stats)
5. Confiance / À propos
6. Formulaire de contact
7. Footer

### Cycle par section

**1 — Demander à Claude Code**
```
Crée la section [NOM] selon docs/product.md section [X] et docs/design.md.
Utilise les tokens CSS custom properties (var(--...)), jamais de couleurs hardcodées.
Respecte la grille 8pt et les règles de SKILL.md.
```

**2 — Vérifier TypeScript**
```bash
pnpm type-check
# Doit retourner : "Found 0 errors"
```

**3 — Vérifier le build**
```bash
pnpm build
# Doit se terminer sans erreur TypeScript ni erreur Next.js
```

**4 — Tester visuellement**
```bash
pnpm dev
```
Checklist par section :
- [ ] Mobile 375px — aucun overflow horizontal
- [ ] Tablette 768px — grille correcte
- [ ] Dark mode — tous les tokens résolus
- [ ] Navigation clavier (Tab) — focus visible

**5 — Commiter**
```bash
git add src/components/sections/ma-section.tsx
git commit -m "feat: section [NOM] — [description 1 ligne]"
```

---

## 5. Intégration Figma MCP (optionnel)

> Permet la synchronisation bidirectionnelle design ↔ code.

### Setup (si pas fait à l'étape 0)

```bash
# Vérifier que le token est dans .env.local
# FIGMA_API_KEY=figd_xxxx

# Relancer Claude Code — le serveur MCP se charge automatiquement
# via .mcp.json à la racine du projet
```

### Design → Code (implémenter une maquette Figma)

Dans Claude Code :
```
Implémente le composant Hero tel que défini dans ce fichier Figma :
[URL DU FICHIER FIGMA]
Respecte les tokens de docs/design.md et les règles de SKILL.md.
Adapte les couleurs pour utiliser les CSS custom properties (var(--...)).
```

### Code → Figma (exporter la palette pour le client)

Dans Claude Code :
```
Crée un fichier Figma contenant :
- La palette OKLCH de docs/design.md sous forme de color styles
- Les espacements 8pt sous forme de styles de grille
- Les variantes de typographie (Display, Body, Label)
```

### Partager avec le client

Le fichier Figma généré peut être partagé avec le client en lecture seule :
- Figma → Share → "Anyone with the link" → "can view"
- Le client peut commenter directement sur les designs

---

## 6. Contrôle qualité (Phase Audit)

> À faire avant toute livraison client — dans l'ordre.

### 6.1 TypeScript

```bash
pnpm type-check
# Cible : 0 erreur
```

### 6.2 Build de production

```bash
pnpm build
# Cible : aucune erreur, aucun warning critique
```

### 6.3 Sécurité

```bash
pnpm audit
# Cible : 0 vulnérabilité high/critical
```

Dans Claude Code — lancer le prompt d'audit sécurité :
```
[Copier le prompt depuis CLAUDE.md § "Prompt d'audit prédéploiement"]
```

### 6.4 Lighthouse

```bash
# Démarrer le serveur de production
pnpm build && pnpm start
# → http://localhost:3001

# Option A : Chrome DevTools
# F12 → Lighthouse → "Analyze page load"
# Sélectionner : Performance · Accessibility · Best Practices · SEO
# Mode : Desktop + Mobile

# Option B : CLI
npx lighthouse http://localhost:3001 --output=html --output-path=./lighthouse-report.html
# Ouvrir lighthouse-report.html dans le navigateur
```

**Cibles minimum avant livraison :**
| Métrique | Cible |
|----------|-------|
| Performance | ≥ 90 |
| Accessibility | ≥ 90 |
| Best Practices | ≥ 90 |
| SEO | ≥ 90 |

### 6.5 Checklist visuelle finale

```
Mobile 375px
  [ ] Aucun overflow horizontal (inspecter body width)
  [ ] Textes lisibles (taille ≥ 16px, contraste WCAG AA)
  [ ] CTAs touchables (min 44×44px)
  [ ] Images non coupées, aspect-ratio correct

Dark mode
  [ ] Toggle fonctionne (bouton header)
  [ ] Tous les éléments visibles
  [ ] Signal accent visible sur fond sombre
  [ ] Aucun texte blanc sur fond blanc

Accessibilité
  [ ] Navigation au clavier complète (Tab, Shift+Tab, Enter)
  [ ] Focus ring visible sur tous les interactifs
  [ ] Toutes les images ont un alt text
  [ ] Formulaires avec labels explicites
  [ ] Pas de contenu uniquement par la couleur

SEO
  [ ] Title et description dans chaque page.tsx
  [ ] OG image présente (/public/og-image.png — 1200×630px)
  [ ] JSON-LD LocalBusiness si artisan/PME
  [ ] robots.ts et sitemap.ts à jour
```

---

## 7. Livraison (Phase Production)

### Déploiement Vercel (recommandé)

```bash
# Installer Vercel CLI (une seule fois)
pnpm add -g vercel

# Première mise en ligne
vercel
# Suivre le wizard :
# → Link to existing project? N
# → Project name: nom-du-client
# → Directory: ./ (défaut)
# → Override settings? N

# Déploiements suivants
vercel --prod
```

### Variables d'environnement Vercel

Dashboard Vercel → Project → Settings → Environment Variables :

| Variable | Environnement | Valeur |
|----------|---------------|--------|
| `NEXT_PUBLIC_SITE_URL` | Production | `https://nomduclient.fr` |
| `RESEND_API_KEY` | Production | `re_xxxx` (si email activé) |
| `FIGMA_API_KEY` | Production | `figd_xxxx` (si Figma MCP activé) |

### Checklist de livraison

```
Technique
  [ ] pnpm type-check → 0 erreur
  [ ] pnpm build → success
  [ ] pnpm audit → 0 high/critical
  [ ] Lighthouse ≥ 90 sur toutes les métriques (build prod)
  [ ] Aucun console.log en production

Domaine & SSL
  [ ] Domaine custom configuré dans Vercel
  [ ] HTTPS actif (automatique Vercel)
  [ ] Redirects www → non-www (ou inverse)

Contenu
  [ ] Zéro placeholder [NOM CLIENT] restant dans le code
  [ ] Formulaire de contact testé (vraie réception d'email)
  [ ] OG image testée sur opengraph.xyz
  [ ] Toutes les images en production chargent correctement

Documentation
  [ ] docs/product.md à jour avec les choix finaux
  [ ] docs/design.md à jour avec la palette retenue
  [ ] README.md mis à jour si besoin
```

---

## 8. Activer les fonctionnalités optionnelles

### CMS Sanity (blog, portfolio, catalogue)

```bash
pnpm add sanity next-sanity @sanity/image-url
```

Décommenter dans `.env.local` :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=skxxxx
```

### Email transactionnel Resend

```bash
pnpm add resend @react-email/components @react-email/render
```

Créer `src/app/api/contact/route.ts` avec validation Zod + `import 'server-only'`.

### Analytics Vercel

```bash
pnpm add @vercel/analytics @vercel/speed-insights
```

Dans `src/app/layout.tsx` :
```tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
// Ajouter <Analytics /> et <SpeedInsights /> dans le JSX
```

### Rate limiting (endpoints API publics)

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

Créer `src/middleware.ts`. Variables requises :
```
UPSTASH_REDIS_REST_URL=https://xxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=AXxxxx
```

---

## 9. Référence rapide des commandes

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Serveur de développement → http://localhost:3001 |
| `pnpm build` | Build de production |
| `pnpm start` | Serveur de production local |
| `pnpm type-check` | TypeScript strict — doit passer clean |
| `pnpm lint` | ESLint |
| `pnpm audit` | Audit des vulnérabilités npm |
| `vercel --prod` | Déploiement en production |

---

## 10. Commandes Claude Code utiles (dans l'IDE)

```
# Initialisation
"Lis CLAUDE.md, SKILL.md et docs/context/ puis lance l'initialisation"

# Design
"Applique la Palette A de docs/design.md dans globals.css et constants/colors.ts"

# Build
"Crée la section [NOM] selon docs/product.md et docs/design.md — respecte SKILL.md"

# Audit
"Audite le repo selon le prompt d'audit de CLAUDE.md"

# Figma
"Implémente ce composant Figma [URL] en respectant docs/design.md"
"Exporte la palette de docs/design.md vers un nouveau fichier Figma"
```
