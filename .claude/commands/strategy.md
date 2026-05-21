---
description: Phase 1 — Stratégie produit. Lit docs/context/ et remplit docs/project/product.md. Aucun code, aucune palette.
---

# /strategy — Stratégie Produit

## Prérequis

Avant toute chose, vérifie que `docs/context/` n'est pas vide.
Si le dossier est vide ou ne contient pas de brief lisible : **STOP**.
Demande : "Pouvez-vous déposer le brief client dans docs/context/ avant de continuer ?"

## Preuve de lecture obligatoire

Lis `docs/context/` en entier (tous les fichiers présents).
Si `docs/context/discovery-report.md` existe : le lire en priorité — il contient les audiences, la concurrence et les territoires de marque qui alimentent directement `docs/project/product.md`.

Puis, avant de remplir quoi que ce soit, réponds à ces 3 questions en une phrase chacune :

1. Quel est le problème business concret que ce site résout pour le client ?
2. Qui est l'audience principale et quelle est sa caractéristique la plus distinctive ?
3. Quelle est la contrainte ou opportunité la plus importante à garder en tête sur ce projet ?

Si tu ne peux pas répondre précisément aux 3 questions : le brief est insuffisant.
Indique ce qui manque et demande au client de compléter `docs/context/`.

## Mission

Remplis `docs/project/product.md` en suivant exactement la structure du template.

Pour chaque section :
- Déduis l'information du brief
- Si l'information est absente ou ambiguë : note **⚠️ À confirmer avec le client**
- Ne pas inventer — ne pas extrapoler au-delà du brief

## Arborescence

Propose une arborescence de **3 à 7 pages** adaptée au secteur et aux objectifs.

Format attendu :
```
/               — [rôle en 1 phrase]
/services       — [rôle en 1 phrase]
/contact        — [rôle en 1 phrase]
```

Justifie chaque page par rapport aux objectifs business identifiés.
Ne propose pas de pages "standard" sans lien avec le brief.

## Livrables

### 1. docs/project/product.md complété

### 2. Tableau "Skill par section"

En fin de `/strategy`, avant tout `/design`, produire ce tableau pour éviter les rewrites post-code :

```
| Section     | Skill esthétique recommandé  | Justification                              |
|-------------|-----------------------------|--------------------------------------------|
| Hero        | gpt-taste / high-end        | Impact visuel prioritaire                  |
| Services    | gpt-taste / minimalist      | ...                                        |
| Prestations | industrial-brutalist         | Data-dense, liste structurée               |
| Contact     | même que hero               | Cohérence                                  |
```

Justifier par la nature du contenu (impact visuel vs data-dense) et le secteur client. Ce tableau évite 30–60 min de rewrite si le skill est changé après le code.

### 3. Décision reviews — hardcodé vs API

Documenter dans `docs/project/product.md` § Reviews :
- Artisans / TPE avec < 150 avis et budget < 150€/mois → **copier les vrais avis en dur** (coût zéro, SEO direct, fiabilité maximale)
- Cas avec besoin de mise à jour régulière → API Google Places ou Trustpilot

## STOP

**N'écris aucun code. Aucune palette. Aucun token. Aucun composant.**

Présente `docs/project/product.md` et attends la validation explicite avant de continuer.
La commande suivante est `/design` — uniquement après validation.