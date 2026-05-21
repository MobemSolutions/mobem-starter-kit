---
description: Phase 3.6 — Intégration Sanity CMS pour les contenus éditables par le client (réalisations, services). À lancer si le client veut mettre à jour son portfolio sans développeur.
---

# /cms — CMS Headless Sanity

## Quand utiliser cette commande

Lancer `/cms` si le projet inclut du contenu que le client devra mettre à jour lui-même :
- Galerie de réalisations (ajout/suppression de photos de chantiers)
- Articles de blog ou conseils secteur
- Liste de services avec descriptions et tarifs

**Ne pas lancer** sur un site vitrine entièrement statique — le CMS ajoute de la complexité et une dépendance externe non nécessaire si le contenu ne change jamais.

## Prérequis — vérifications bloquantes

- `docs/product.md` précise quels contenus sont "éditables par le client"
- Compte Sanity créé sur sanity.io (plan gratuit : 10 GB assets, 500 k req API/mois)
- Le composant visuel de la section ciblée existe déjà (ex: `sections/realisations.tsx`)

## Ordre de lecture

1. `docs/product.md` — sections éditables + types de contenu requis
2. `CLAUDE.md` § Sécurité — gestion des secrets (SANITY_API_TOKEN = write, jamais NEXT_PUBLIC_)

---

## Étape 1 — Créer le projet Sanity

```bash
# Depuis la racine du projet Next.js
pnpm create sanity@latest --project-id [REMPLACER] --dataset production
```

Ou via le dashboard sanity.io → "New project".

Récupérer le `projectId` affiché dans le dashboard Sanity.

## Étape 2 — Dépendances

```bash
pnpm add @sanity/client next-sanity @sanity/image-url
pnpm add -D sanity
pnpm audit
```

## Étape 3 — Variables d'environnement

`.env.local` (jamais en dur) :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=skXXXXXXXX   # token write — JAMAIS NEXT_PUBLIC_
```

`.env.example` (sans valeur, commité) :
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
```

## Étape 4 — Client Sanity

`src/lib/sanity/client.ts`

```typescript
import 'server-only'
import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn:    process.env.NODE_ENV === 'production',
  token:     process.env.SANITY_API_TOKEN,
})
```

`import 'server-only'` obligatoire — le token d'écriture ne doit jamais atteindre le client.

## Étape 5 — Schémas Sanity

`sanity.config.ts` (racine du projet) :

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { realisationSchema } from './src/lib/sanity/schemas/realisation'

export default defineConfig({
  name:    'default',
  title:   'Studio [NOM CLIENT]',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset:   'production',
  plugins: [structureTool(), visionTool()],
  schema:  { types: [realisationSchema] },
})
```

`src/lib/sanity/schemas/realisation.ts` :

```typescript
import { defineType, defineField } from 'sanity'

export const realisationSchema = defineType({
  name:  'realisation',
  title: 'Réalisation',
  type:  'document',
  fields: [
    defineField({
      name:       'titre',
      title:      'Titre du chantier',
      type:       'string',
      validation: R => R.required().max(80),
    }),
    defineField({
      name:  'description',
      title: 'Description courte',
      type:  'text',
      rows:  3,
    }),
    defineField({
      name:  'images',
      title: 'Photos',
      type:  'array',
      of:    [{ type: 'image', options: { hotspot: true } }],
      validation: R => R.required().min(1),
    }),
    defineField({
      name:  'date',
      title: 'Date de réalisation',
      type:  'date',
    }),
    defineField({
      name:    'categorie',
      title:   'Catégorie',
      type:    'string',
      options: {
        list: [
          // TODO: adapter aux types de prestations du client
          { title: 'Installation', value: 'installation' },
          { title: 'Rénovation',   value: 'renovation'   },
          { title: 'Urgence',      value: 'urgence'       },
        ],
      },
    }),
  ],
  preview: {
    select: { title: 'titre', media: 'images.0' },
  },
  orderings: [
    { title: 'Date (récent d\'abord)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
})
```

## Étape 6 — Requêtes GROQ typées

`src/lib/sanity/queries.ts` :

```typescript
import { sanityClient } from './client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Builder d'URL images
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: SanityImageSource) => builder.image(source)

// Type des données
export type Realisation = {
  _id:         string
  titre:       string
  description: string | null
  images:      SanityImageSource[]
  date:        string | null
  categorie:   string | null
}

// Requête principale — Server Component
export async function getRealisations(): Promise<Realisation[]> {
  return sanityClient.fetch(
    `*[_type == "realisation"] | order(date desc) {
      _id, titre, description, images, date, categorie
    }`,
    {},
    { next: { revalidate: 3600 } } // revalidation toutes les heures
  )
}
```

## Étape 7 — Composant Server Component

Remplacer le tableau statique dans `src/components/sections/realisations.tsx` :

```typescript
// Server Component — pas de 'use client'
import { getRealisations, urlFor } from '@/lib/sanity/queries'
import Image from 'next/image'

export async function RealisationsSection() {
  const realisations = await getRealisations()

  return (
    <section>
      {/* ... structure existante ... */}
      {realisations.map(r => (
        <article key={r._id}>
          {r.images[0] && (
            <Image
              src={urlFor(r.images[0]).width(800).height(600).auto('format').url()}
              alt={r.titre}
              width={800}
              height={600}
            />
          )}
          <h3>{r.titre}</h3>
          {r.description && <p>{r.description}</p>}
        </article>
      ))}
    </section>
  )
}
```

## Étape 8 — Déployer le Studio Sanity

Option recommandée : Studio hébergé sur sanity.io (zéro infrastructure) :

```bash
npx sanity deploy
# → Studio disponible sur https://studio.sanity.io/[project-id]
```

Le client se connecte avec son compte email Sanity (compte gratuit).
Inviter le client : sanity.io → Project → Members → Invite (rôle Editor, pas Admin).

## Étape 9 — next.config.mjs — domaine Sanity pour les images

```javascript
images: {
  remotePatterns: [
    { protocol: 'https', hostname: 'cdn.sanity.io' },
    // ... autres domaines existants
  ],
},
```

## Checklist finale

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` + `SANITY_API_TOKEN` dans `.env.local`
- [ ] `.env.example` mis à jour (sans valeur)
- [ ] `import 'server-only'` en tête de `src/lib/sanity/client.ts`
- [ ] `revalidate: 3600` sur les requêtes GROQ (ou ISR selon la fréquence de mise à jour)
- [ ] `cdn.sanity.io` ajouté dans `next.config.mjs` → `remotePatterns`
- [ ] Studio déployé + client invité avec le rôle Editor
- [ ] Au moins 1 réalisation créée dans le Studio → affichée sur le site

## Schémas optionnels selon le projet

| Schéma | Quand | Champs clés |
|--------|-------|-------------|
| `service` | Tarifs ou descriptions de services éditables | titre, description, prix (optionnel), icon |
| `temoignage` | Avis clients gérés en CMS (vs hardcodés) | auteur, note, texte, date, verifie |
| `article` | Blog de conseils secteur (SEO longue traîne) | titre, slug, contenu (block), image, categorie |
| `faq` | FAQ éditable par le client | question, reponse, categorie |
