---
description: Phase 1 — Stratégie produit. Lit docs/context/ et remplit docs/product.md. Aucun code, aucune palette.
---

# /strategy — Stratégie Produit

## Prérequis

Avant toute chose, vérifie que `docs/context/` n'est pas vide.
Si le dossier est vide ou ne contient pas de brief lisible : **STOP**.
Demande : "Pouvez-vous déposer le brief client dans docs/context/ avant de continuer ?"

## Preuve de lecture obligatoire

Lis `docs/context/` en entier (tous les fichiers présents).

Puis, avant de remplir quoi que ce soit, réponds à ces 3 questions en une phrase chacune :

1. Quel est le problème business concret que ce site résout pour le client ?
2. Qui est l'audience principale et quelle est sa caractéristique la plus distinctive ?
3. Quelle est la contrainte ou opportunité la plus importante à garder en tête sur ce projet ?

Si tu ne peux pas répondre précisément aux 3 questions : le brief est insuffisant.
Indique ce qui manque et demande au client de compléter `docs/context/`.

## Mission

Remplis `docs/product.md` en suivant exactement la structure du template.

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

## Livrable

`docs/product.md` complété.

## STOP

**N'écris aucun code. Aucune palette. Aucun token. Aucun composant.**

Présente `docs/product.md` et attends la validation explicite avant de continuer.
La commande suivante est `/design` — uniquement après validation.