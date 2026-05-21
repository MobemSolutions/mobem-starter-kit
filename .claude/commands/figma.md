---
description: Intégration Figma — validation client et implémentation design-to-code. Deux usages selon la phase du projet.
---

# /figma — Intégration Figma

## Prérequis

Vérifie que `.mcp.json` existe à la racine avec une `FIGMA_API_KEY` valide.
Si absent : copier `.mcp.json.example` → `.mcp.json` et renseigner la clé.

---

## Usage A — Validation client (Phase 2, après `/design`)

**Quand :** la palette et la typographie sont validées dans `docs/project/design.md`, mais le client
a besoin de voir un visuel dans Figma avant de donner son feu vert final.

**Ce que ça fait :**
1. Lire `docs/project/design.md` pour extraire palette, typographie, radius, motion dials
2. Lire `docs/project/product.md` pour l'arborescence et les sections clés
3. Créer un fichier Figma : page d'accueil simplifiée avec les vrais tokens (couleurs, polices, espacements)
4. Fournir le lien Figma au client pour validation et commentaires

**Commande à invoquer :**
```
/figma-generate-design
```

Présenter d'abord ce brief à l'IA Figma :
```
Créer une maquette de page d'accueil pour [nom client] en utilisant :
- Palette : [extraire de docs/project/design.md]
- Typographie : [extraire de docs/project/design.md]
- Sections : [extraire de docs/project/product.md]
- Ton : [extraire de docs/project/product.md]
Objectif : validation client, pas production.
```

---

## Usage B — Implémentation design-to-code (Phase 3, pendant `/build`)

**Quand :** le client ou le designer fournit un lien Figma avec des maquettes précises.

**Ce que ça fait :**
1. Extraire les specs exactes depuis le lien Figma (layout, couleurs, espacements, typographie)
2. Implémenter le composant avec précision sans interprétation

**Workflow :**
1. Obtenir le lien Figma du composant/section à implémenter
2. Lancer `/figma-use` (obligatoire avant tout appel `use_figma`)
3. Utiliser `get_design_context` avec le lien pour extraire les specs
4. Coder le composant à partir des specs exactes

**Note :** `get_design_context` simplifie les données Figma pour ne garder que
les informations layout et styling pertinentes pour le code.

---

## Usage C — Sync code → Figma (Code Connect)

**Quand :** le design system est stabilisé et on veut lier les composants code aux composants Figma.

```
/figma-code-connect
```

Associe `src/components/ui/button.tsx` → composant Button Figma, etc.
Utile pour les équipes avec un designer qui travaille en parallèle.

---

## Liens utiles

- Créer un token Figma : Figma → Settings → Security → Personal access tokens
- Format lien : `https://www.figma.com/design/[fileKey]/[fileName]?node-id=[nodeId]`
