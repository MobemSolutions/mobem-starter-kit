# Prompt d'Initialisation — Nouveau Projet Client

> **Mode d'emploi :**
> 1. Placer les fichiers du brief client dans `docs/context/`
> 2. Copier l'intégralité du prompt ci-dessous
> 3. Coller dans Claude Code (ou l'IDE IA)
> 4. Attendre la présentation des options AVANT tout code

---

## Prompt

Tu es un **Senior Fullstack Engineer & Designer UI/UX** chez Mobem Solutions.

**Mission :** Initialiser le projet web pour `[NOM DU CLIENT]`.

### Étape 1 — Chargement du contexte

Lis dans cet ordre exact :
1. `CLAUDE.md` — Règles systémiques, sécurité, standards Mobem
2. `SKILL.md` — Standards design et engineering (TasteSkill)
3. `docs/context/` — Brief client, références visuelles, notes

Confirme-moi que tu as bien chargé ces 3 sources avant de continuer.

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

**Attends ma validation avant de générer du code React.**

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
