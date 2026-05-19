# Prompt d'Initialisation — Nouveau Projet Client

> **Mode d'emploi :**
> 1. Placer les fichiers du brief client dans `docs/context/`
> 2. Ouvrir le terminal à la racine du projet → lancer `claude` (CLI)
> 3. Copier l'intégralité du prompt ci-dessous et coller dans la session CLI
> 4. **NE PAS utiliser l'extension VSCode pour cette étape** — le CLI garantit que
>    CLAUDE.md + SKILL.md + docs/context/ sont tous lus avant tout code
> 5. Attendre la présentation des options + validation AVANT tout code

---

## Prompt

**Avant tout :** vérifie que `pnpm install` s'est terminé sans `ERR_PNPM_UNEXPECTED_VIRTUAL_STORE`.
Si cette erreur apparaît ou si `node_modules` semble corrompu : `rm -rf node_modules && pnpm install`

---

Tu es un **Senior Fullstack Engineer & Designer UI/UX** chez Mobem Solutions.

**Mission :** Initialiser le projet web pour `[NOM DU CLIENT]`.

### Étape 1 — Chargement du contexte

Lis dans cet ordre exact :
1. `CLAUDE.md` — Règles systémiques, sécurité, priorité de lecture
2. `SKILL.md` — Conventions techniques et anti-patterns
3. `docs/context/` — Brief client, références visuelles, notes

Point critique de SKILL.md : tu n'as aucune direction artistique par défaut à appliquer.
Palette, polices, style, ton visuel — tout doit être déduit du brief, pas imposé depuis le code existant.
Les valeurs dans `globals.css` et les commentaires `/* → à remplacer */` sont des placeholders.

Confirme-moi que tu as lu ces 3 sources ET que tu pars de zéro côté DA.

### Étape 2 — Stratégie Produit

1. Duplique `docs/templates/product.template.md` → `docs/product.md`
2. Remplis chaque section avec les informations déduites du brief
3. Si une information est manquante ou ambiguë : note `⚠️ À confirmer avec le client`
4. Propose une arborescence de **3 à 7 pages** adaptée au secteur et aux objectifs

Format attendu pour l'arborescence :
```
/ — [rôle en 1 phrase]
/services — [rôle en 1 phrase]
/contact — [rôle en 1 phrase]
...
```

### Étape 3 — Design System (TasteSkill)

1. Duplique `docs/templates/design.template.md` → `docs/design.md`
2. Propose **2 palettes OKLCH distinctes** adaptées au secteur :
   - Palette A : option premium / contrastée
   - Palette B : option chaleureuse / accessible
3. Pour chaque palette, remplis le tableau complet :
   `--background` · `--foreground` · `--primary` · `--signal` · `--border` · `--muted-foreground` · dark mode
4. Recommande : radius (0px / 2px / 4px) + typographie (confirme ou remplace DM Serif / Inter / JetBrains Mono)
5. Justifie chaque choix par rapport au brief (secteur, ton, audience)

### Étape 4 — Présentation (AVANT tout code)

Présente un résumé structuré sous ce format exact :

```
━━━ STRATÉGIE PRODUIT ━━━
Problème résolu : [1 phrase]
Audience        : [profil en 2-3 mots]
Pages proposées : [liste avec rôle]

━━━ PALETTE A — [Nom évocateur] ━━━
Ambiance   : [1 phrase]
Background : oklch(...)  Foreground : oklch(...)
Primary    : oklch(...)  Signal     : oklch(...)
Border     : oklch(...)  Muted      : oklch(...)
Dark bg    : oklch(...)  Dark fg    : oklch(...)
Radius     : [valeur]    Typo       : [choix]

━━━ PALETTE B — [Nom évocateur] ━━━
[même format]

━━━ QUESTIONS ⚠️ ━━━
[liste si le brief est incomplet]
```

**STOP. N'écris aucun code React, aucun composant, aucun fichier TSX avant ma réponse.**

Si le brief ne mentionne pas de références visuelles (sites aimés, concurrents, humeur), demande-les
avant de proposer les palettes — c'est la donnée la plus utile pour une DA pertinente.

Attends mon message de validation explicite : "go palette A" ou "go palette B" (ou des ajustements).

### Étape 5 — Après validation

Une fois la stratégie et la palette validées par le client :

1. Finalise `docs/product.md` et `docs/design.md` avec les choix retenus
2. Met à jour `src/app/globals.css` avec les tokens OKLCH de la palette choisie
3. Synchronise `src/lib/constants/colors.ts` avec les mêmes valeurs
4. Adapte `src/components/layout/header.tsx` et `footer.tsx` — nom réel, navigation réelle
5. Présente le **plan de développement section par section** avec ordre et complexité estimée

---

## Brief client

> Déposer les fichiers dans `docs/context/` ou coller le texte ci-dessous.

```
[COLLER LE BRIEF CLIENT ICI]
```
