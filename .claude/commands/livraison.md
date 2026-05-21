---
description: Phase 5.5 — Génère le document de livraison client (.docx) et clôture le projet. Vérifie docs/delivery/livraison-config.json, génère le .docx via pnpm livraison, puis rappelle les étapes de clôture (release GitHub, handoff client).
---

# /livraison — Document de livraison client

À utiliser en Phase 5.5, une fois le site en ligne et la surveillance J+7 terminée.

## Ordre de lecture obligatoire

1. `docs/delivery/livraison-config.json` — vérifier que tous les champs sont remplis
2. `.agents/skills/docx/SKILL.md` — règles de génération .docx si le script doit être modifié
3. `docs/project/handoff.md` — vérifier qu'il est complété avant d'envoyer

## Étape 1 — Vérifier livraison-config.json

Lire `docs/delivery/livraison-config.json` et vérifier qu'aucune valeur n'est encore à `TODO:`.

Champs à compléter en priorité :
- `client_nom`, `client_nom_slug`, `client_url`, `client_email`
- `date_livraison` (laisser vide = date du jour automatique)
- `dev_nom`, `dev_email`
- `registrar`, `registrar_url`, `date_renouvellement`
- `plausible_url`
- `sanity_url` (vider la valeur si pas de CMS : `""`)
- `scores` — remplir depuis PageSpeed Insights sur l'URL de production (pas en local)
- `fonctionnalites` — adapter à ce qui a réellement été livré
- `notes` — laisser vide ou ajouter une note pour le client

Si des champs `TODO:` restent : **STOP**. Lister les champs manquants et demander les valeurs en une seule fois.

## Étape 2 — Générer le document

```bash
pnpm livraison
# → docs/delivery/livraisons/livraison-[client].docx
```

## Étape 3 — Vérifier le document généré

Ouvrir le `.docx` avec Word, LibreOffice ou Google Docs et vérifier :
- Les scores sont corrects et lisibles
- Les accès sont complets (aucun `—` là où une vraie valeur est attendue)
- Le nom du client est correct en page de couverture
- L'appendice technique reflète la stack réelle du projet

## Étape 4 — Clôture du projet

Après avoir envoyé le document au client :

```bash
# Taguer la version finale
git tag v1.0.0
git push origin v1.0.0

# Créer la release GitHub
gh release create v1.0.0 --title "v1.0.0 — Livraison [Client]" --notes "Site livré le [date]"
```

Checklist de clôture :
- [ ] `docs/delivery/livraisons/livraison-[client].docx` envoyé au client
- [ ] `docs/project/handoff.md` complété et transmis
- [ ] `docs/project/feedback.md` à jour — bugs restants, frictions, améliorations
- [ ] Projet Ruttl archivé (limite plan gratuit : 1 actif)
- [ ] Accès Vercel / domaine transmis avec le document

## Structure du document généré

**Partie client :**
- 01 Ce qui est livré — liste des fonctionnalités
- 02 Performances — scores Lighthouse (4 métriques) + Core Web Vitals (LCP · INP · CLS)
- 03 Vos accès — hébergement · domaine · analytics · CMS (si activé)
- 04 Vos outils — formulaire · Plausible · Sanity Studio (si CMS) · Google Business
- 05 Contact & support — coordonnées développeur + procédure d'urgence
- 06 Après le lancement — calendrier d'actions recommandées

**Appendice technique :**
- A Infrastructure & stack — tableau des technologies
- B Résultats des tests — smoke tests Playwright + scores Lighthouse CI
- C Commandes essentielles — développement · tests · déploiement
