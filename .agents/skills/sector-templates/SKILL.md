# Skill — Templates sectoriels Mobem

> **Quand activer :** Phase 3 — au début de `/build`, après validation de `docs/project/design.md`.
> Ce skill encode les patterns validés par l'étude de marché Mobem V3 pour les 3 secteurs Tier 1.
> Chaque template définit l'ordre des sections, les CTAs sectoriels, les composants à utiliser et les schémas JSON-LD.

---

## RÈGLE DE PRIORITÉ

```
docs/project/product.md  >  docs/project/design.md  >  ce SKILL.md
```

Si `product.md` définit une structure différente, elle prime. Ce skill est un point de départ, pas une prescription rigide.

---

## TIER 1 — NOTAIRES / JURISTES / GESTION DE PATRIMOINE

**Score Mobem : 9.1/10** · Ticket création : 4 500–8 000€ · Maintenance : 350–600€/mois

### Psychologie client

Le notaire ou juriste cherche trois choses : **crédibilité institutionnelle**, **présence locale qualifiée**, **absence de fautes** (orthographe, ton, juridique). Il a un réseau et une réputation — le site ne doit pas la dégrader.

Ton : sobre, confiant, professionnel sans être froid. Pas de superlatifs. Pas de "Meilleur notaire de [ville]". Plutôt : "Votre étude notariale à [ville] depuis [N] ans."

### Structure de sections recommandée

```
1. Hero            — Accroche institutionnelle + zone géographique + CTA téléphone
2. Services        — 4-6 domaines : droit immobilier · successions · droit des sociétés · droit de la famille
3. TrustBadges     — Chambre des notaires · certifications professionnelles (variant 'chips')
4. ROITeaser       — 2 arguments max : "1 dossier = 1 500–5 000€ d'honoraires" · "Site remboursé en 2–3 mois"
5. BeforeAfter     — Cas client si disponible (anonymisé) · sinon : section Chiffres clés
6. À propos        — Présentation de l'étude, ancienneté, équipe, valeurs
7. BookingCTA      — mode: 'phone' ou 'calendly' · jamais Doctolib (secteur juridique)
8. FAQ             — 4-6 questions réelles (homolagation, délais, honoraires)
9. Contact         — Formulaire simple + carte Google Maps embedded
```

### siteConfig recommandé

```typescript
sector: 'notaire',
schemaType: 'LegalService',
clientType: 'B2C+B2B',
bookingMode: 'phone',   // ou 'calendly' si l'étude notariale prend RDV en ligne
certifications: [
  "Chambre des notaires de [Département]",
  // ex: "Chambre des notaires de Loire-Atlantique"
],
roiArgs: ROI_ARGS_PAR_SECTEUR['notaire'],   // depuis src/lib/schema
aidesPubliques: [],                           // pas d'aides publiques pertinentes pour le notaire
```

### JSON-LD à injecter

```typescript
import { generateLegalServiceSchema } from '@/lib/schema'

const schema = generateLegalServiceSchema(siteConfig, {
  legalName: 'Étude notariale [Nom]',
  serviceTypes: ['Vente immobilière', 'Succession', 'Droit des sociétés', 'Droit de la famille'],
  chamberName: 'Chambre des notaires de [Département]',
})
```

### CTAs sectoriels — copie recommandée

- Hero : "Prendre rendez-vous" / "Nous appeler"
- Services : "En savoir plus" (jamais "Acheter" ou "Commander")
- Contact : "Contacter l'étude" / "Demander un entretien"

### Palette cohérente avec la perception sectorielle

- Direction : `minimalist-ui` ou `high-end-visual-design`
- Couleurs adaptées : tons neutres (crème, anthracite), or discret — jamais rouge/orange (signal d'alerte)
- Typographie : serif pour les titres (autorité, tradition), sans-serif sobre pour le corps

### Anti-patterns à éviter absolument

- ❌ "Devis gratuit" (trop commercial pour ce secteur)
- ❌ Emoji dans les titres ou les services
- ❌ Tarifs affichés sur le site (honoraires variables, réglementés)
- ❌ Témoignages inventés (déontologie stricte)
- ❌ Photos de stock de salles d'audience ou de robes noires

---

## TIER 1 — SANTÉ LIBÉRALE + ESTHÉTIQUE MÉDICALE

**Score Mobem : 8.8/10** · Ticket création : 3 000–8 000€ · Maintenance : 200–500€/mois

### Psychologie client

Le praticien de santé est soumis à l'Ordre. Il a peur de faire une faute déontologique. Angle : "votre site n'est pas de la publicité — c'est de l'information de santé publique".

L'esthétique médicale non-conventionnée est différente : marge 35–50%, pas de plafond tarifaire, public premium. Traiter comme un site de luxe discret.

Ton santé libérale : rassurant, professionnel, humain. Ton esthétique médicale : élégant, sobre, premium.

### Structure de sections — Santé libérale (kiné, médecin, ostéo)

```
1. Hero            — Accroche + spécialité + ville + CTA "Prendre rendez-vous"
2. Services        — Spécialités et approches (sans jargon médical excessif)
3. BookingCTA      — mode: 'doctolib' · bouton signal · argument "sans attente"
4. TrustBadges     — RPPS · Conventionné secteur 1 · Diplômes (variant 'chips')
5. ROITeaser       — "150–300€/mois économisés sur Doctolib" (pour MOBEM, pas le site client)
                     Pour le site client : section Accessibilité / Remboursement
6. Équipe          — Photo + bio courte + formations
7. Localisation    — Adresse, transports, parking, accessibilité PMR
8. FAQ             — Délais RDV · Remboursements · Mutuelle · Accès
9. Contact / RDV   — Formulaire simple + téléphone
```

### Structure de sections — Esthétique médicale

```
1. Hero            — Accroche premium + résultat attendu + CTA discret
2. Prestations     — Grid photos avant/après (vraies photos obligatoires — pas de stock)
3. Approche        — Philosophie médicale, sécurité, résultats naturels
4. TrustBadges     — Diplômes · Ordres · Certifications produits (Allergan, Galderma…)
5. Galerie         — Résultats réels (avec consentement patient écrit obligatoire)
6. Tarifs          — Fourchettes de prix si le client accepte (optionnel)
7. BookingCTA      — mode: 'calendly' ou 'phone' · consultation initiale
8. FAQ             — Douleur · Durée · Naturel vs artificiel · Prix
```

### siteConfig recommandé — Santé libérale

```typescript
sector: 'sante',
schemaType: 'MedicalBusiness',
clientType: 'B2C',
bookingMode: 'doctolib',  // ou 'calendly' si pas Doctolib
certifications: [
  'RPPS: 10XXXXXXXXX',   // Numéro RPPS obligatoire pour la crédibilité
  'Conventionné secteur 1', // ou 'Non conventionné' selon le cas
  'DEA [spécialité]',    // ex: 'DEA Kinésithérapie'
],
roiArgs: ROI_ARGS_PAR_SECTEUR['sante'],
aidesPubliques: [],       // pas d'aides publiques pour les soins (remboursement SS = autre logique)
```

### JSON-LD à injecter

```typescript
import { generateMedicalBusinessSchema } from '@/lib/schema'

const schema = generateMedicalBusinessSchema(siteConfig, {
  medicalSpecialty: 'Physiotherapy',  // ou 'GeneralPractice', 'Dermatology', etc.
  rppsNumber: '10XXXXXXXXX',
  isAccepted: true,  // Conventionné SS
  availableServices: ['Kinésithérapie', 'Bilan postural', 'Rééducation sportive'],
})
```

### Règles déontologiques à respecter

- Pas de "meilleur", "numéro 1", ni superlatifs comparatifs
- Les honoraires ne sont pas de la publicité — formuler en "information"
- Les photos avant/après : **consentement écrit obligatoire** (demander au client)
- Pas de promesse de guérison ("traite", "guérit") — préférer "accompagne", "soulage"

### CTAs sectoriels — copie recommandée

- Hero : "Prendre rendez-vous" / "Réserver en ligne"
- Services : "En savoir plus" / "Nous consulter"
- Doctolib : "Prendre rendez-vous sur Doctolib" (libellé officiel conseillé)

---

## TIER 1 — INSTALLATEURS RGE (SOLAIRE / PAC / ISOLATION)

**Score Mobem : 8.9/10** · Ticket création : 3 000–6 000€ · Maintenance : 150–300€/mois

### Psychologie client

Le prospect RGE a une peur principale : **se faire arnaquer** (marché saturé d'escrocs post-MaPrimeRénov'). Le site doit être un rempart contre la méfiance : certifications visibles, avis réels, photos de vrais chantiers, entrepreneur local.

Double moteur commercial : les aides publiques (MaPrimeRénov', CEE) font que le carnet de commandes est structurellement plein — le site sert à **filtrer les prospects qualifiés**, pas à en générer en masse.

Ton : direct, concret, chiffré. "12 000€ économisés sur votre facture d'énergie" vaut mieux que "solutions durables pour votre confort".

### Structure de sections recommandée

```
1. Hero            — Accroche ROI + zone géographique + CTA "Devis gratuit"
2. AidesPubliques  — MaPrimeRénov' · CEE · Éco-PTZ · Chèque énergie
                     (composant AidesPubliques — src/components/sections/aides-publiques.tsx)
3. Services        — PAC · Solaire · Isolation · VMC (avec économies mensuelles chiffrées)
4. TrustBadges     — RGE · QualiPAC · Qualibat · Garantie décennale (variant 'cards' avec logos)
5. ROITeaser       — 3 arguments : "+12 000€ CA par chantier" · "×5 ROI maintenance" · "10 000€ MaPrimeRénov'"
6. Chantiers       — Photos réelles de chantiers terminés (jamais de stock)
7. BeforeAfter     — Métriques avant/après : facture énergie · température · leads obtenus
8. BookingCTA      — mode: 'form' · quoteFormEnabled: true · serviceLabel: "Installation [PAC/Solaire]"
9. Zone d'intervention — Carte ou liste des communes couvertes
10. FAQ            — Aides · Délais · Label RGE · Entretien · Garanties
```

### siteConfig recommandé

```typescript
sector: 'rge',
schemaType: 'HomeAndConstructionBusiness',
clientType: 'B2C',
bookingMode: 'form',
quoteFormEnabled: true,
certifications: [
  'RGE QualiPAC',        // certifications RGE spécifiques à ses installations
  'Qualibat RGE',
  'Garantie décennale',
  'RC Pro',
],
roiArgs: ROI_ARGS_PAR_SECTEUR['rge'],
aidesPubliques: [
  ...AIDES_PUBLIQUES_PAR_SECTEUR['rge'],
  ...AIDES_PUBLIQUES_PAR_SECTEUR['_tous'],
],
```

### JSON-LD à injecter

```typescript
import { generateHomeAndConstructionSchema } from '@/lib/schema'

const schema = generateHomeAndConstructionSchema(siteConfig, {
  rgeLabels: ['QualiPAC', 'Qualibat RGE'],
  services: ['Installation pompe à chaleur', 'Panneaux solaires', 'Isolation thermique'],
  guarantees: ['Garantie décennale', 'Assurance RC Pro'],
})
```

### Landing page MaPrimeRénov' (upsell Sprint 3)

L'étude recommande une landing page dédiée comme upsell après la création du site.
Structure : Explication des aides → Calculatrice d'économies → Formulaire de demande → Témoignages.
URL cible : `/maprimereno` ou `/aides-renovation-energetique-[ville]`
Requête SEO cible : "aide rénovation énergétique [ville]" (100–500 recherches/mois, quasi aucun concurrent).

### CTAs sectoriels — copie recommandée

- Hero : "Obtenir mon devis gratuit" / "Calculer mes aides"
- AidesPubliques : "Vérifier mon éligibilité"
- Services : "Demander un devis [PAC/Solaire]"
- FAQ : "Poser ma question"

### Anti-patterns à éviter

- ❌ "Économies garanties" (engagement non tenu = risque juridique)
- ❌ Photos de panneaux solaires génériques (stock) — chantiers du client uniquement
- ❌ Formulaire avec trop de champs (nom, prénom, adresse, surface, type de logement…) — 3 champs max pour le premier contact

---

## TIER 2 — ARTISANS BTP QUALIFIÉS (RÉFÉRENCE RAPIDE)

**Score Mobem : 6.8/10** · Filtres renforcés obligatoires (10+ ans, 4.0+ étoiles, carnet 2 mois)

### Structure simplifiée

```
1. Hero        — Métier + ville + CTA "Devis gratuit"
2. Services    — 4-6 prestations avec photos chantiers réels
3. TrustBadges — Qualibat · labels qualité · années d'expérience
4. Chantiers   — Portfolio avec photos avant/après
5. Avis Google — Intégration ou copie des vrais avis (noter les étoiles)
6. BookingCTA  — mode: 'form' ou 'phone'
7. Zone        — Communes couvertes
8. Contact     — Formulaire + téléphone
```

### siteConfig recommandé

```typescript
sector: 'artisan-btp',
schemaType: 'HomeAndConstructionBusiness',
bookingMode: 'form',
certifications: ['Qualibat', 'Garantie décennale', 'RC Pro'],
roiArgs: ROI_ARGS_PAR_SECTEUR['artisan-btp'],
```

---

## RÈGLES COMMUNES À TOUS LES SECTEURS

### Contenu — Jamais de placeholder

- Photos : photos réelles du client — chantiers, équipe, locaux. Jamais de stock.
- Témoignages : vrais avis Google copiés avec accord du client. Jamais inventés.
- Chiffres : issus de vrais résultats. Si pas encore de cas clients, ne pas afficher la section BeforeAfter.
- CTAs : spécifiques au métier — "Demander un devis PAC" · "Prendre rendez-vous kiné" · "Contacter l'étude"

### Navigation — Structure recommandée

| Page | URL | Notes |
|------|-----|-------|
| Accueil | `/` | Sections principales |
| Services | `/#services` ou `/services` | Si 6+ services |
| Réalisations | `/realisations` | Si galerie importante |
| À propos | `/a-propos` | Optionnel |
| Contact | `/#contact` ou `/contact` | Formulaire |
| Mentions légales | `/mentions-legales` | Obligatoire |
| Confidentialité | `/confidentialite` | Obligatoire |

### Metadata SEO — Formule par secteur

| Secteur | Title | Description |
|---------|-------|-------------|
| Notaire | `Étude notariale [Nom] — [Ville] | [Domaines]` | "Étude notariale à [ville] depuis [N] ans. Vente immobilière, successions, droit de la famille. Contactez-nous." |
| Santé | `[Spécialité] [Prénom Nom] — [Ville] | Rdv en ligne` | "[Spécialité] à [ville]. Conventionné secteur 1. Prenez rendez-vous en ligne ou par téléphone." |
| RGE | `Installateur [PAC/Solaire] RGE — [Ville] | Devis gratuit` | "Installation [PAC/solaire] par artisan RGE certifié à [ville]. MaPrimeRénov' acceptée. Devis gratuit." |
| Artisan | `[Métier] [Ville] — [Nom] | Devis gratuit` | "[Métier] à [ville] depuis [N] ans. Qualibat, garantie décennale. Devis gratuit sous 48h." |

### FAQ — Questions types par secteur (Schema.org FAQPage)

```typescript
import { generateFAQSchema } from '@/lib/schema'

// Notaire
const faqNotaire = generateFAQSchema([
  { q: 'Quel est le délai moyen pour une vente immobilière ?', a: 'En général 3 à 4 mois entre le compromis et l\'acte authentique.' },
  { q: 'Quels sont vos honoraires ?', a: 'Les honoraires notariaux sont réglementés par décret. Nous vous fournirons un devis détaillé lors de notre entretien.' },
])

// Santé
const faqSante = generateFAQSchema([
  { q: 'Êtes-vous conventionné Sécurité Sociale ?', a: 'Oui, je suis conventionné secteur 1. Les séances sont remboursées sur prescription médicale.' },
  { q: 'Comment prendre rendez-vous ?', a: 'Directement en ligne sur Doctolib ou par téléphone.' },
])

// RGE
const faqRge = generateFAQSchema([
  { q: 'Êtes-vous certifié RGE ?', a: 'Oui, nous sommes certifiés QualiPAC et Qualibat RGE, conditions obligatoires pour bénéficier de MaPrimeRénov\'.' },
  { q: 'Peut-on cumuler MaPrimeRénov\' et CEE ?', a: 'Oui, les deux aides sont cumulables. Nous vous aidons à monter le dossier de demande.' },
])
```

---

## QUAND MIXER LES TEMPLATES

Un projet peut combiner deux Tier si le client opère dans deux domaines :
- Notaire + gestion de patrimoine → LegalService + ProfessionalService (2 schémas JSON-LD)
- Médecin + esthétique médicale → MedicalBusiness (1 schéma, section esthétique séparée)
- Artisan BTP + RGE → HomeAndConstructionBusiness (1 schéma, certifications RGE + BTP)

Règle : ne **jamais** mélanger deux skills d'esthétique sur la **même** section. Mélanger des templates de secteurs différents sur des sections différentes est autorisé.
