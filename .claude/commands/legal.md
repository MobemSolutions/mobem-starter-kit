---
description: Phase 4.5 — Génère les pages légales françaises adaptées au statut juridique du client. Lit docs/project/product.md, applique le mapping statut → contenu, liste les TODO bloquants avant mise en ligne.
---

# /legal — Pages Légales Françaises

## Prérequis — vérifications bloquantes

Lis `docs/project/product.md`. Avant de générer quoi que ce soit, extrais et confirme ces 4 variables :

```
Statut juridique  : [micro-entrepreneur / EI / EURL / SARL / SAS / profession libérale]
Secteur           : [ex: plomberie, maçonnerie, électricité, consulting, coiffure…]
Type de clientèle : [B2C / B2B / mixte]
Zone d'intervention : [département, région, nationale]
```

Si l'une de ces 4 variables est absente de `docs/project/product.md` : **STOP**.
Demande les informations manquantes avant de continuer.

## Ordre de lecture obligatoire

1. `docs/project/product.md` — identité, statut, secteur, services, zone
2. `docs/context/contraintes.md` — contraintes légales spécifiques si présentes
3. `.agents/skills/legal-pages/SKILL.md` — templates et règles légales

## Étape 1 — Mapping statut → contenu obligatoire

En fonction du statut extrait, appliquer ce tableau **avant** de générer les pages :

| Variable | Micro-entrepreneur | SARL / SAS | Profession libérale |
|----------|-------------------|------------|---------------------|
| **TVA** | Franchise art. 293 B si CA < seuil → mention "TVA non applicable" dans CGV | Assujetti (sauf franchise) → taux 10% ou 20% selon prestation | Variable — vérifier si assujetti |
| **Décennale** | Obligatoire si travaux bâtiment (plomberie, maçonnerie, électricité, menuiserie…) | Obligatoire si BTP | Non applicable |
| **CGV** | Obligatoires (B2C) | Obligatoires (B2C) | Conditions d'honoraires (pas de CGV standard) |
| **Capital social** | Omettre | Mentionner | Omettre |
| **RCS / RM** | RM si artisan inscrit au répertoire des métiers | RCS | Non applicable |

Règle BTP / décennale : si le secteur contient l'un de ces mots → décennale obligatoire :
`plombier · chauffagiste · électricien · maçon · couvreur · carreleur · menuisier · peintre bâtiment · charpentier · serrurier · platrier · isolation · étanchéité · VRD · terrassement · génie climatique`

## Étape 2 — Collecte des informations manquantes

Après lecture de `docs/project/product.md`, liste les informations manquantes et demande-les **en une seule fois** :

```
Informations manquantes pour les pages légales :
- [ ] SIRET (14 chiffres) — BLOQUANT
- [ ] Hébergeur du site — BLOQUANT (Vercel Inc. si déploiement Vercel)
- [ ] Outil analytics — à préciser (Google Analytics, Plausible, aucun…)
- [ ] Médiateur de la consommation désigné — BLOQUANT si B2C
- [ ] Assurance décennale (assureur + n° police) — BLOQUANT si BTP
- [ ] Assurance RCP (assureur + n° police) — recommandé
- [ ] Acompte habituel (%) — pour CGV
- [ ] Modes de paiement acceptés — pour CGV
```

Pour les éléments **BLOQUANTS** : ne pas générer les pages sans eux — laisser `TODO: [BLOQUANT — info requise]` visible et signalé.
Pour les autres : laisser `TODO: [info manquante]` et continuer.

## Étape 3 — Génération des pages

Génère les pages dans cet ordre, adaptées au statut :

### 1. Mentions légales → `src/app/mentions-legales/page.tsx`
Toujours générée. Adapter selon statut :
- Micro-entrepreneur / EI : pas de capital social, RM si artisan inscrit, TVA franchise si applicable
- SARL / SAS : capital social + RCS
- Hébergeur Vercel : `Vercel Inc. — 340 Pine Street, Suite 701 — San Francisco, CA 94104, USA — vercel.com`

### 2. Politique de confidentialité → `src/app/confidentialite/page.tsx`
Toujours générée. Adapter selon l'outil analytics détecté dans `docs/project/product.md` ou `docs/context/` :
- Google Analytics → mention transfert USA + opt-out obligatoire
- Plausible / Umami / Matomo EU → "aucun cookie déposé, aucun consentement requis"
- Vercel Analytics → mentionner (données hébergées USA)
- Aucun analytics → section cookies simplifiée

### 3. CGV → `src/app/cgv/page.tsx`
- **B2C** : obligatoire — adapter selon statut TVA (franchise ou assujetti), secteur (urgence ou planifié pour rétractation), présence BTP (garantie décennale)
- **B2B uniquement** : générer une version allégée (pas de droit de rétractation, pas de médiation conso obligatoire)
- **Profession libérale** : renommer en "Conditions d'honoraires", adapter le template

## Format technique

Chaque page est un **Server Component statique** :

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '[Titre] | [Nom client]',
  description: '[Description courte]',
  robots: { index: false, follow: false },
}

export default function [Nom]Page() {
  return (
    <main className="mx-auto max-w-[800px] px-6 py-16">
      <article className="prose prose-sm max-w-none">
        {/* contenu */}
      </article>
    </main>
  )
}
```

Règles :
- `robots: { index: false, follow: false }` systématique — ces pages ne doivent pas être indexées
- Contenu en JSX pur — pas de `dangerouslySetInnerHTML`, pas de markdown côté client
- Aucun `'use client'`
- Titres : `<h1>`, `<h2>`, `<h3>` natifs — pas de composants UI
- Liens externes : `<a href="..." target="_blank" rel="noopener noreferrer">`

## Étape 4 — Footer

Ajoute les liens dans `src/components/layout/footer.tsx` :

```tsx
<nav aria-label="Liens légaux" className="flex gap-4 text-sm text-(--muted-foreground)">
  <a href="/mentions-legales">Mentions légales</a>
  <a href="/confidentialite">Politique de confidentialité</a>
  {/* CGV ou Conditions d'honoraires selon statut */}
  <a href="/cgv">CGV</a>
</nav>
```

## Étape 5 — Checklist de conformité par statut

Après génération, afficher la checklist adaptée :

### Pour tous les statuts
- [ ] SIRET renseigné (pas de `TODO:` sur cette ligne)
- [ ] Hébergeur avec adresse complète
- [ ] Email exercice des droits RGPD renseigné
- [ ] Date "Dernière mise à jour" renseignée
- [ ] Liens footer ajoutés

### Micro-entrepreneur / EI
- [ ] Mention "TVA non applicable — art. 293 B CGI" présente si franchise
- [ ] RM ou RCS selon activité (artisan → RM ; commerçant → RCS ; libéral → ni l'un ni l'autre)
- [ ] Assurance décennale mentionnée si secteur BTP

### SARL / SAS
- [ ] Capital social mentionné
- [ ] N° TVA intracommunautaire si assujetti
- [ ] Taux TVA correct dans CGV (10 % travaux logement > 2 ans / 20 % autres)

### B2C (toujours)
- [ ] Médiateur de la consommation désigné et coordonnées complètes
- [ ] Droit de rétractation adapté (urgence/dépannage ≠ travaux planifiés)
- [ ] Lien plateforme ODR européenne : https://ec.europa.eu/consumers/odr

### BTP / Décennale
- [ ] Assureur décennale + n° police + activités couvertes + zone géographique
- [ ] Garanties bâtiment (décennale / biennale / parfait achèvement) dans CGV

## Étape 6 — TODO bloquants avant mise en ligne

Terminer en listant uniquement les `TODO: [BLOQUANT]` restants dans les fichiers générés :

```
⛔ TODO BLOQUANTS — à résoudre avant mise en ligne :
- mentions-legales : SIRET manquant
- cgv : médiateur de la consommation non renseigné
- confidentialite : email exercice des droits RGPD manquant
[liste exhaustive]

⚠️ TODO non bloquants (peuvent être complétés après lancement) :
- [liste]
```

## STOP — Rappel final

> "Pages légales générées et adaptées au statut [statut extrait].
> Les `TODO: [BLOQUANT]` listés ci-dessus doivent être résolus **avant la mise en ligne**.
> **Je recommande une relecture par un avocat**, en particulier pour les CGV si vous intervenez chez des particuliers.
> Ces documents sont des points de départ solides — pas des avis juridiques."
