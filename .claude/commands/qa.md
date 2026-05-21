---
description: Phase 4.7 — Tests navigateur du parcours critique. Lit docs/project/product.md pour générer une checklist de test spécifique au site, puis guide le test de chaque page et du formulaire de contact.
---

# /qa — Tests Navigateur

## Ce que fait cette commande

Lit `docs/project/product.md` pour connaître les pages et sections du site, puis produit une checklist de test adaptée à CE projet (pas une liste générique). Guide ensuite le test du parcours visiteur complet.

À lancer sur l'URL de preview Vercel (pas en `pnpm dev`) — les comportements prod et dev diffèrent.

## Ordre de lecture

1. `docs/project/product.md` — arborescence, sections, formulaire, CTAs réels

## Étape 1 — Générer la checklist spécifique au site

Depuis `docs/project/product.md`, extraire :
- Toutes les pages de l'arborescence
- Tous les CTAs identifiés (texte exact + destination)
- Les sections avec interactions (formulaire, accordéon FAQ, cartes cliquables…)
- Le numéro de téléphone et l'email (pour vérifier les liens `tel:` et `mailto:`)

Puis produire une checklist au format :

```
URL testée : https://[projet]-git-review-[...].vercel.app
Date : YYYY-MM-DD
Navigateur : [Chrome / Safari / Firefox]

PARCOURS CRITIQUE — visiteur type
  [ ] Page d'accueil se charge sans erreur visible
  [ ] Hero : CTA principal "[texte exact du CTA]" → mène vers [destination]
  [ ] Section services : tous les éléments s'affichent
  [ ] Section FAQ : les accordéons s'ouvrent/ferment
  [ ] Page /[slug] : se charge, contenu complet
  [ ] ...

FORMULAIRE DE CONTACT — test réel
  [ ] Formulaire visible et accessible
  [ ] Soumission avec données valides → message de succès affiché
  [ ] Email reçu côté professionnel (vérifier boîte + spams)
  [ ] Email de confirmation reçu côté visiteur
  [ ] Soumission avec champ email invalide → erreur affichée sous le champ
  [ ] Bouton submit désactivé pendant l'envoi (pas de double-soumission)

LIENS & NAVIGATION
  [ ] Tous les liens de navigation mènent au bon endroit
  [ ] Lien téléphone (tel:[numéro]) → déclenche l'appel sur mobile
  [ ] Lien email (mailto:[email]) → ouvre le client mail
  [ ] Lien footer mentions légales → /mentions-legales
  [ ] Lien footer confidentialité → /confidentialite
  [ ] Aucun lien brisé (404) détecté

MOBILE 375px (Chrome DevTools → iPhone SE)
  [ ] Pas d'overflow horizontal sur aucune page
  [ ] Hero lisible et CTA cliquable
  [ ] Navigation mobile fonctionne (menu burger si présent)
  [ ] Formulaire utilisable au doigt (champs assez grands)
  [ ] Images non déformées

CONSOLE NAVIGATEUR (F12 → Console)
  [ ] Zéro erreur rouge sur la page d'accueil
  [ ] Zéro erreur rouge sur les pages secondaires
  [ ] Zéro warning critique (ignorer les warnings Framer Motion HMR)

DARK MODE (si implémenté)
  [ ] Toggle dark mode → tous les tokens résolus (pas de texte blanc sur fond blanc)
  [ ] Images et logos lisibles en dark mode
```

## Étape 2 — Tester et noter les résultats

Pour chaque item : cocher ✅ ou noter ❌ avec une description précise du problème.

Format pour les bugs trouvés :
```
❌ [Page / Section] — [description du problème]
   Reproduction : [étapes exactes]
   Priorité : BLOQUANT | Majeur | Mineur
```

## Étape 3 — Corriger les bugs BLOQUANTS

Pour chaque bug BLOQUANT :
1. Identifier la cause dans le code
2. Corriger
3. Repousser sur la branche review → Vercel rebuild automatique
4. Retester l'item spécifique

Les bugs Mineurs : documenter dans `docs/project/feedback.md` pour après livraison.

## Étape 4 — Rapport final

```
QA — Rapport [nom du projet] — [date]
URL testée : [URL]

✅ [N] tests passés
❌ [N] bugs trouvés — [N] bloquants corrigés, [N] mineurs documentés

Parcours critique : ✅ / ❌
Formulaire de contact : ✅ / ❌
Mobile 375px : ✅ / ❌
Console : ✅ / ❌

Verdict : PRÊT À LIVRER / CORRECTIONS REQUISES
```

## STOP si bugs BLOQUANTS non résolus

Ne pas passer à `/impeccable polish` ni à `/legal` tant qu'un bug BLOQUANT est ouvert.
