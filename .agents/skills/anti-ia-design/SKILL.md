# Skill — Anti-IA Design · Authenticité & Signal Humain

> **Quand activer :** Toujours. Ce skill est une grille de lecture permanente — relu avant chaque composant, chaque section, chaque décision de contenu.
>
> **Objectif :** produire des interfaces que personne ne peut attribuer à une IA générative.
> La cible : qu'un designer humain senior regarde le site et dise *"c'est du vrai travail"*.

---

## PHILOSOPHIE CENTRALE

L'IA générative produit de la **moyenne statistique**. Elle optimise pour la cohérence globale, la symétrie, la complétude. Le résultat est propre, professionnel — et immédiatement reconnaissable comme généré.

Le design humain fait le contraire : **il choisit**. Il sacrifie la complétude pour l'emphase, la symétrie pour le rythme, la cohérence pour la personnalité.

**Règle fondamentale :** si un choix de design pourrait s'appliquer à 10 000 sites différents sans modification, ce n'est pas un choix — c'est un défaut.

---

## PARTIE 1 — SIGNAUX IA DANS LA TYPOGRAPHIE

### 1.1 Polices à bannir définitivement

Ces polices sont des marqueurs IA statistiquement certains. Leur présence déclenche immédiatement la reconnaissance :

| Police | Pourquoi c'est un signal IA |
|--------|---------------------------|
| **Inter** | Police par défaut de Tailwind, Figma, et la moitié des générateurs IA. Omniprésente. |
| **Geist** | Police de Vercel — présente dans tous les starters Next.js générés. |
| **Outfit** | Favorite des "modern clean UI" générés. Aucune personnalité. |
| **DM Sans** | Surutilisée dans les maquettes Figma auto-générées 2022–2024. |
| **JetBrains Mono** | Monospace par défaut des interfaces générées avec accent tech. |
| **Plus Jakarta Sans** | Variante "premium" des maquettes IA. Trop générique. |
| **Nunito** | Tout site généré avec un ton "friendly" utilise Nunito. |
| **Poppins** | Massivement présente dans les thèmes WordPress générés + IA. |
| **Raleway** | Signal fort d'une maquette générée avec un brief "élégant". |

**Alternative :** choisir une police avec une vraie histoire ou une vraie contrainte formelle. Exemples acceptables : Cormorant Garamond, Libre Baskerville, Space Grotesk, Playfair Display, Syne, Cabinet Grotesk, Instrument Serif, Be Vietnam Pro (si contexte spécifique), Fraunces.

### 1.2 Hiérarchie typographique générique

Signaux à éliminer :

- **Taille h1 systématiquement ≥ 60px en clamp** — toujours le même ramp sans raison formelle
- **Toutes les sections avec le même poids de titre** — pas de variation intentionnelle
- **Lettre-espacement `tracking-widest` sur les labels** — présent dans 90% des designs générés comme signal de "sophistication"
- **Body text toujours en `text-base` / `text-sm`** — aucune variation dans la densité de lecture
- **`font-semibold` sur tous les titres** — sans jamais varier vers `font-light` ou `font-bold` selon la section

**Correction :** introduire des variations intentionnelles. Un titre peut être plus petit que le corps s'il est en petites capitales. Un sous-titre peut être plus lourd que le titre si la hiérarchie le justifie.

### 1.3 Copie textuelle — signaux IA immédiats

Ces formulations sont des marqueurs certains de génération IA :

| Formulation | Remplacement humain |
|------------|-------------------|
| "Solutions innovantes" | Ce que fait concrètement le client |
| "Expertise reconnue" | Nombre d'années, nombre de projets, chiffres réels |
| "Approche sur-mesure" | Description de la méthode réelle |
| "Accompagnement personnalisé" | Ce que ça signifie concrètement |
| "Nous mettons notre savoir-faire à votre service" | Supprimer. Toujours. |
| "Faites confiance à nos experts" | Nom, prénom, spécialité, années |
| "Votre satisfaction est notre priorité" | Supprimer. Toujours. |
| "N'hésitez pas à nous contacter" | Action précise : "Appelez le [numéro]" |
| "Découvrez nos services" | "Voir [les installations PAC]" |
| "En savoir plus" (seul CTA) | CTA spécifique au contexte |
| "Bienvenue sur notre site" | Supprimer. Toujours. |
| Listes de 3 features avec un emoji par item | — voir section Icônes |

---

## PARTIE 2 — SIGNAUX IA DANS LA MISE EN PAGE

### 2.1 Symétrie pathologique

L'IA produit de la symétrie parfaite parce que c'est la moyenne statistique la plus safe.

**Signaux :**
- Toutes les sections en grille `grid-cols-3` avec des cards identiques en hauteur
- Hero centré, deux colonnes centrées, footer centré — tout est centré
- Padding identique sur toutes les sections (`py-24` partout)
- Même rythme de blancs du haut en bas de la page

**Corrections humaines :**
- Alterner les alignements : une section texte à gauche, suivante à droite, une section pleine largeur
- Varier délibérément les paddings : hero peut avoir `py-32`, section suivante `py-12`, puis `py-20`
- Rompre la grille : une section hors-grille, un élément qui déborde intentionnellement
- Une section sans titre — juste du contenu dense

### 2.2 Cards identiques en hauteur forcée

Signe caractéristique des grilles générées : toutes les cards font exactement la même hauteur via `h-full` ou `min-h-[200px]`.

**Correction :** laisser les cards prendre leur hauteur naturelle. Si les contenus sont inégaux, c'est humain. Si la grille a une card plus haute que les autres, ça donne du rythme.

### 2.3 Section hero "standard"

Le hero généré a toujours :
- Titre h1 centré, 60–72px
- Sous-titre de 1–2 lignes centré
- Deux boutons côte à côte (primary + outline)
- Image ou gradient en fond

**Corrections :**
- Aligner à gauche (plus de confiance, moins de magazine)
- Un seul CTA (le second dilue l'action)
- Pas de sous-titre si le titre est assez fort
- Si image : photo réelle du client, pas de stock
- Envisager un hero asymétrique : texte occupe 60% de la largeur, photo recadrée brutalement sur les 40% restants

### 2.4 Features sections en grille 3 colonnes

La grille `grid-cols-3` avec icône + titre + description est le pattern le plus générique du web.

**Alternatives :**
- Liste avec séparateurs horizontaux (`divide-y`) — plus lisible, moins "landing page SaaS"
- Deux colonnes inégales (40%/60%)
- Accordéon ou FAQ à la place d'une grille de features
- Texte dense sans icônes

### 2.5 Section "Pourquoi nous choisir" / "Nos valeurs"

Cette section existe dans 95% des sites générés et ne dit jamais rien de différenciant.

**Règle :** si la section s'appelle "Pourquoi nous ?" ou "Nos valeurs" ou "Notre mission", la supprimer ou la remplacer par quelque chose de concret :
- Un cas client réel (BeforeAfter)
- Un processus étape par étape avec des délais réels
- Un témoignage unique et long (pas un carrousel de 5 lignes)

---

## PARTIE 3 — SIGNAUX IA DANS LES COULEURS ET LES EFFETS

### 3.1 Gradients

**Bannir absolument :**
- `bg-gradient-to-r from-blue-500 to-purple-600` (signal tech SaaS)
- Gradients de couleur sur les boutons
- Gradients de fond sur les sections hero
- Mesh gradients / aurora gradients / glassmorphism

**Autoriser uniquement :**
- Gradient de fond vers transparent sur une photo (vignette sombre, jamais coloré)
- `bg-gradient-to-b from-(--background) to-transparent` pour fondre une section

### 3.2 Glassmorphism

Bannir complètement :
- `backdrop-blur` sur des cards
- `bg-white/10` avec blur pour des panneaux
- Cards semi-transparentes sur fond coloré

### 3.3 Ombres génériques

L'IA utilise `shadow-lg` ou `shadow-xl` systématiquement sur les cards.

**Règle :** pas d'ombre sur les cards — utiliser des bordures (`border`) à la place. Les ombres portées sur fond blanc sont un signal fort des maquettes générées 2020–2024.

### 3.4 Couleurs signal trop vives

Les IA ont tendance à choisir des accents en `oklch(0.65 0.22 250)` (bleu électrique) ou `oklch(0.60 0.28 30)` (orange vif) — des couleurs "safe" qui fonctionnent sur tout fond.

**Correction :** choisir une couleur signal contrainte par le secteur et la personnalité du client. Une couleur qui ne marcherait pas pour un autre client dans un autre secteur.

### 3.5 Dark mode non motivé

Implémenter le dark mode "parce que c'est dans le starter" sans que le client en ait besoin = signal IA. La plupart des sites artisans/PME n'en ont pas besoin et leur audience ne l'active pas.

**Règle :** ne proposer le dark mode que si le client le demande ou si le secteur le justifie (agences, tech, gaming).

---

## PARTIE 4 — SIGNAUX IA DANS LES IMAGES ET ICÔNES

### 4.1 Photos de stock génériques

Ordre de gravité :
1. 🔴 Photos de stock de personnes souriantes qui ne sont pas le client → bannir
2. 🔴 Photos Unsplash de "bureau moderne avec MacBook" → bannir
3. 🔴 Illustrations vectorielles 3D isométriques → bannir
4. 🟡 Photos de stock de chantiers/équipements sans lien avec le client → éviter
5. 🟢 Photos réelles du client, de son équipe, de ses chantiers → toujours privilégier

**Si le client n'a pas de photos :** utiliser des photos d'ambiance très génériques en noir et blanc, avec un traitement graphique fort qui assume l'absence de contenu spécifique. Mieux vaut une photo en noir et blanc que 20 photos de stock colorées.

### 4.2 Icônes Lucide React partout

Lucide React est bien — mais l'utiliser pour illustrer **chaque** feature, **chaque** service, **chaque** avantage est un signal fort des designs générés.

**Règle :** les icônes ne remplacent pas le contenu. Elles le complètent si elles apportent une information visuelle distincte. Un service de plomberie n'a pas besoin d'une icône de clé à molette — il a besoin d'une photo de tuyau.

**Signaux d'abus :**
- Section de 6 features avec 6 icônes différentes de la même taille sur fond coloré
- Icônes dans les bullets de listes (transforme le texte en présentation PowerPoint)
- Icône de checkmark vert sur chaque "avantage" (pattern landing page SaaS universel)

### 4.3 Illustrations générées par IA

Bannir toute illustration produite par Midjourney, DALL-E, Ideogram, etc. pour les éléments de contenu. Elles sont identifiables et détruisent la crédibilité d'un professionnel libéral.

Exception autorisée : illustrations abstraites géométriques très simples utilisées comme éléments décoratifs si elles sont cohérentes avec la palette.

---

## PARTIE 5 — SIGNAUX IA DANS LES ANIMATIONS

### 5.1 Animations bounce/elastic

Les bibliothèques d'animation IA par défaut utilisent des easing élastiques ou des rebonds.

**Bannir :**
- `spring({ stiffness: 300, damping: 10 })` sur des éléments UI
- Animations bounce sur les cards au hover
- Entrées en "pop" avec scale > 1.05
- `type: "spring"` sans raison formelle

**Autoriser :**
- `ease: [0.25, 0.1, 0.25, 1]` — cubic-bezier standard Mobem
- `ease: [0.4, 0, 0.2, 1]` — Material Design ease (alternatif)
- Transitions linéaires pour les opacités
- Scale max 1.02 au hover (micro-feedback, pas de bounce)

### 5.2 Animations d'entrée sur tout

L'IA anime chaque élément à l'entrée : chaque titre, chaque paragraphe, chaque card a un `initial={{ opacity: 0, y: 20 }}`.

**Règle :** les animations d'entrée sont réservées aux **sections**, pas aux éléments individuels. Un paragraphe n'a pas besoin d'animation d'entrée. Une card dans une grille n'a pas besoin d'entrer en stagger si le contenu est déjà visible à l'arrivée sur la page.

**Ratio sain :** max 3–4 éléments animés par page. Au-delà, le site devient un spectacle au lieu d'un outil.

### 5.3 Parallaxe décorative

Les effets de parallaxe sur les sections hero sont un signal fort des templates générés 2022–2023. Ils ralentissent le site et n'apportent rien.

**Bannir :** `useScroll` + `useTransform` pour déplacer des images ou des titres au scroll sauf si le design le demande explicitement et de manière justifiée.

---

## PARTIE 6 — SIGNAUX IA DANS LA STRUCTURE DES PAGES

### 6.1 La page parfaitement complète

L'IA génère des pages exhaustives : hero + about + services + stats + testimonials + FAQ + CTA + footer. Tout y est. C'est suspect.

**Règle humaine :** chaque section doit justifier sa présence. Si le client n'a pas de témoignages, ne pas créer une section vide avec des placeholders. Si le client n'a pas de stats, ne pas inventer des chiffres ronds.

### 6.2 Les "stats impressive" en bandeau

Section invariante dans les designs générés : 3–4 chiffres ronds en grand (`10 000+`, `98%`, `15 ans`) sur fond sombre ou coloré.

**Règle :** si le client a de vrais chiffres — les utiliser. Si ce sont des estimations vagues, supprimer la section. Un "15 ans d'expérience" est acceptable. Un "98% de satisfaction" sans source ne l'est pas.

### 6.3 Le footer "complet"

Le footer généré a toujours : logo + description + navigation complète + réseaux sociaux + newsletter + mentions légales. Sur 4–5 colonnes.

**Alternative humaine :** un footer simple, sur 2 colonnes max. Informations NAP (nom, adresse, téléphone) + liens légaux. Pour un artisan : le footer qui convertit est celui avec le téléphone en gros.

### 6.4 La section CTA de fin de page

"Prêt à démarrer votre projet ? Contactez-nous dès maintenant." avec un bouton sur fond coloré.

C'est le pattern de fin de page le plus commun des sites générés.

**Alternative :** finir sur une information utile (horaires, zone d'intervention, dernière réalisation) ou sur un CTA spécifique au contexte du prospect ("Votre chaudière tombe en panne ? Appelez le [numéro] — intervention sous 2h").

---

## PARTIE 6B — SIGNAUX IA SUPPLÉMENTAIRES (terrain 2026)

Ces patterns ont été identifiés sur des projets réels. Ils sont subtils mais immédiatement reconnaissables par un designer senior.

### 6B.1 `font-mono` sur contenu public

Dates, labels, coordonnées, numéros en police mono = look "startup dev / terminal". Signal fort que le site a été généré pour un public tech, pas pour un artisan ou professionnel libéral.

**Règle :** `font-mono` est réservé aux pages `/design` et aux outils dev internes uniquement.  
**Correction :** `font-sans` + `font-style: italic` si besoin de distinction éditoriale.

### 6B.2 Pill badge `rounded-full border` au-dessus des titres

Pattern shadcn/Vercel 2025 : `inline-flex px-4 py-2 rounded-full border` avec un dot coloré + label uppercase, placé juste au-dessus du H1 comme "catégorie" de section.

**Bannir :** le conteneur visuel lui-même — badge pill avec bordure arrondie comme étiquette de section.  
**Correction :** un simple `<p>` en uppercase + tracking-widest, sans conteneur, sans border, sans dot. Zéro chrome visuel.

### 6B.3 Numérotation décorative sur les éléments répétés

`01`, `02`, `03` — ou `§ 01`, ou `01 → 05` sur chaque step, liste, FAQ, service. La numérotation décorative est devenue le signal le plus reconnaissable des interfaces IA générées en 2025.

**Bannir :** tout chiffre décoratif sur les listes, services, étapes. Les chiffres décoratifs ne font que répéter l'ordre visuel déjà évident.  
**Alternatives acceptables :** bordure gauche colorée, séparateur horizontal, dot signal, ou rien du tout — l'ordre spatial suffit.

### 6B.4 Coordonnées GPS en décoration

`45°45'44"N · 4°50'48"E` dans un bloc d'adresse fait immédiatement "portfolio web développeur". Incompatible avec un cabinet médical, un notaire, ou un artisan.

**Bannir :** coordonnées GPS, fuseau horaire, altitude — toute métadonnée technique dans une section adresse.  
**Correction :** adresse textuelle + "À 5 min du centre-ville" ou indication de transport. C'est utile. Les degrés minutes secondes ne le sont pas.

### 6B.5 Tirets em-dash appariés autour des labels

`— Titre —` ou `— Label —` utilisés pour encadrer un intitulé de section. Tic IA immédiatement reconnaissable — le cerveau humain ne fait jamais ça typographiquement.

**Bannir :** tout tiret em-dash encadrant un label. Jamais de tirets symétriques autour d'un mot.  
**Seul séparateur autorisé entre deux éléments :** point médian `·`. Ex : `Mobem · Nantes · 2026`.

### 6B.6 Gradient texte sur les titres

`bg-clip-text text-transparent bg-gradient-to-r` sur un `<h1>` ou `<h2>` = template générique parmi les plus répandus. Présent dans 40% des starters Next.js et dans 80% des outputs GPT-4o sur UI.

**Interdit** sauf validation explicite dans `docs/project/design.md` (contexte premium, après test réel).  
**Correction :** couleur unie signal ou foreground. La couleur n'a pas besoin d'être un dégradé pour être forte.

---

## PARTIE 7 — CHECKLIST ANTI-IA AVANT LIVRAISON

Parcourir cette liste section par section avant chaque livraison client.

### Typographie
- [ ] La police choisie n'est dans aucune des polices bannies
- [ ] La hiérarchie typographique varie intentionnellement entre les sections
- [ ] Aucune formulation générique ("solutions innovantes", "expertise reconnue") dans le copy
- [ ] `font-mono` absent du contenu public (dates, labels, coordonnées) — réservé aux outils dev
- [ ] Aucun gradient texte (`bg-clip-text text-transparent`) sur les titres sans validation explicite

### Mise en page
- [ ] Au moins une rupture de symétrie volontaire sur la page
- [ ] Les paddings varient entre les sections (pas tous `py-24`)
- [ ] Pas de section "Pourquoi nous ?" ou "Nos valeurs" sans contenu spécifique
- [ ] Aucun pill badge `rounded-full border` au-dessus des titres — remplacé par `<p>` uppercase nu
- [ ] Aucune numérotation décorative `01/02/03` sur les listes, services ou étapes
- [ ] Aucune coordonnée GPS (`48°N · 2°E`) dans les blocs adresse
- [ ] Aucun tiret em-dash appairés `— Titre —` — seul séparateur autorisé : `·`

### Couleurs & effets
- [ ] Zéro gradient coloré
- [ ] Zéro glassmorphism / backdrop-blur sur les cards
- [ ] Zéro `shadow-lg` sur les cards (utiliser des bordures)
- [ ] La couleur signal n'est pas un bleu ou orange générique

### Images & icônes
- [ ] Toutes les photos sont réelles (pas de stock de personnes souriantes)
- [ ] Les icônes ne remplacent pas le contenu textuel
- [ ] Pas d'illustrations générées par IA dans les sections de contenu

### Animations
- [ ] Aucune animation bounce/spring/elastic sur des éléments UI
- [ ] Max 3–4 éléments animés par page
- [ ] `prefers-reduced-motion` respecté

### Contenu
- [ ] Toutes les métriques affichées sont réelles (pas de stats inventées)
- [ ] Les témoignages sont de vrais avis Google (pas de lorem ipsum)
- [ ] Les CTAs sont spécifiques au contexte (pas "En savoir plus")

### Structure
- [ ] Chaque section justifie sa présence (ne pas garder une section vide ou filler)
- [ ] Le footer n'excède pas 2 colonnes pour les artisans/TPE
- [ ] Le CTA de fin de page est spécifique, pas générique

---

## PARTIE 8 — HEURISTIQUE RAPIDE : LE TEST DES 5 SECONDES

Avant de valider un composant ou une section, poser cette question :

> **"Est-ce que ce rendu pourrait s'appliquer mot pour mot, pixel pour pixel, à 500 autres sites de [plombiers / kinés / notaires] sans modification ?"**

Si la réponse est oui → recommencer.

**L'objectif est une interface qui ne ressemble à aucun autre site du même secteur.**

Ce n'est pas de l'originalité pour l'originalité : c'est de la **spécificité**. Un site de notaire à Nantes doit ressembler à CE notaire à Nantes — pas à l'idée générique qu'une IA se fait d'un notaire.

---

## SOURCES & RÉFÉRENCES

- Impeccable skill (`.agents/skills/impeccable/`) — décisions typographiques et composition
- Design Taste Frontend skill (`.agents/skills/design-taste-frontend/`) — Three Dials anti-slop
- CLAUDE.md § Design System — polices interdites, interdictions permanentes
- SKILL.md Mobem — grille 8pt, motion, composants de base
- Étude de marché Mobem V3 — "le positionnement gagnant est l'orientation résultat, pas technologie" (s'applique aussi au design : fonctionnel et vrai plutôt que impressionnant et générique)
