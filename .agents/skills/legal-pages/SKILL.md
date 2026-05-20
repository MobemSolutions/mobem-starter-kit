---
name: legal-pages
description: "Generate compliant French legal pages for client websites: mentions légales (LCEN), politique de confidentialité (RGPD/CNIL), CGV (Code de la consommation). Adapted for artisans, micro-entrepreneurs, TPE/PME. Triggers on: legal pages, mentions légales, CGV, politique de confidentialité, RGPD, CNIL, conditions générales, mentions obligatoires, legal compliance."
category: legal
catalog_summary: "Pages légales françaises : mentions légales, politique de confidentialité, CGV"
display_order: 1
---

# Legal Pages — Pages Légales Françaises

Génère les pages légales obligatoires et recommandées pour les sites clients artisan/TPE.

**Important** : ces contenus sont des points de départ solides, pas des avis juridiques. Recommander systématiquement une relecture par un avocat pour les CGV, surtout si B2C.

---

## Mapping statut juridique → contenu obligatoire

| Statut | TVA | Décennale | CGV |
|--------|-----|-----------|-----|
| Micro-entrepreneur | Franchise art. 293 B si CA < seuil → "TVA non applicable" dans CGV | Oui si travaux bâtiment | Oui (B2C) |
| EI / EURL | Franchise ou assujetti selon CA | Oui si BTP | Oui (B2C) |
| SARL / SAS | Assujetti (sauf franchise) → 10 % travaux logement / 20 % autres | Oui si BTP | Oui (B2C) |
| Profession libérale | Variable — vérifier | Non | Conditions d'honoraires (pas de CGV standard) |

**Secteurs déclenchant la décennale obligatoire :**
plomberie · chauffage · électricité · maçonnerie · couverture · carrelage · menuiserie · peinture bâtiment · charpente · serrurerie · plâtrerie · isolation · étanchéité · VRD · terrassement · génie climatique

---

## Pages couvertes

| Page | Obligation | Base légale |
|------|-----------|------------|
| Mentions légales | **Obligatoire** tout site web | LCEN art. 6, loi n° 2004-575 |
| Politique de confidentialité | **Obligatoire** si collecte données perso | RGPD 2016/679 + Loi 78-17 |
| CGV | **Obligatoire** B2C, recommandée B2B | Code conso L.111-1 + s. |

---

## Données à collecter — lire docs/product.md + docs/context/

### Identité du professionnel
- [ ] Nom / Prénom ou Raison sociale complète
- [ ] Forme juridique (EI, micro-entrepreneur, EURL, SARL, SAS…)
- [ ] Adresse complète du siège social
- [ ] Téléphone professionnel
- [ ] Email professionnel
- [ ] SIRET (14 chiffres — demander si absent)
- [ ] Inscription : RCS Ville B XXX XXX XXX (SARL/SAS) **ou** RM Ville XXX XXX XXX (artisan inscrit)
- [ ] N° TVA intracommunautaire : FR XX XXX XXX XXX (si assujetti — omettre si franchise TVA)
- [ ] Capital social (SARL/SAS uniquement)

### Hébergeur
- [ ] Nom (Vercel Inc., OVH SAS, Infomaniak Network SA, Netlify Inc…)
- [ ] Adresse siège (indispensable pour mentions légales)
- [ ] Site web hébergeur

### Assurance (artisans du bâtiment — obligatoire art. L.243-2 Code assurances)
- [ ] Assureur décennale, n° de police, activités couvertes, zone géographique
- [ ] Assureur RCP, n° de police

### Services & conditions commerciales
- [ ] Liste des services/prestations
- [ ] Mode de tarification (devis, taux horaire, forfait)
- [ ] Acompte habituel (%)
- [ ] Modes de paiement acceptés
- [ ] Zone d'intervention géographique
- [ ] Délais d'intervention habituels

### Infrastructure du site
- [ ] Formulaire de contact ? (champs collectés)
- [ ] Outil analytics ? (Google Analytics, Plausible, Umami, Matomo…)
- [ ] Cookies marketing/publicité ?
- [ ] Hébergeur UE ou hors UE ? (Vercel = USA → clause transfert obligatoire)

---

## Page 1 — Mentions légales

**Base légale** : LCEN art. 6, I, 1° et 2° (loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique)

### Template

```markdown
## Éditeur du site

**[Nom / Raison sociale]**
[Forme juridique][, au capital de X €] — SIRET : [14 chiffres]
[RCS Ville B XXX XXX XXX] *ou* [RM Ville XXX XXX XXX]
Siège social : [adresse complète]
Tél. : [numéro]
Email : [email professionnel]
[N° TVA : FR XX XXX XXX XXX] *(omettre si franchise de TVA)*

## Directeur de la publication

[Nom Prénom], [qualité (gérant, auto-entrepreneur, président…)]

## Hébergeur

[Nom de l'hébergeur]
[Adresse du siège social]
Site : [URL]

## Propriété intellectuelle

Le contenu de ce site (textes, images, logo, structure) est la propriété exclusive
de [Nom] et est protégé par le droit d'auteur. Toute reproduction, même partielle,
sans autorisation écrite préalable est interdite.

## Assurance professionnelle *(artisans du bâtiment uniquement)*

[Nom] est assuré en responsabilité civile décennale auprès de **[assureur]**,
police n° [numéro], pour les activités de [description], couvrant le territoire [zone géographique].
```

### Cas particuliers

| Situation | Adaptation |
|-----------|-----------|
| Micro-entrepreneur | Supprimer capital social, RCS ou RM selon activité |
| Franchise de TVA (CA < seuil) | Omettre N° TVA, ajouter "TVA non applicable — art. 293 B CGI" dans CGV |
| Artisan bâtiment | Mention assurance décennale **obligatoire** |
| SIRET absent du brief | Bloquer — demander avant de générer |

---

## Page 2 — Politique de confidentialité

**Base légale** : RGPD art. 13 (Règlement 2016/679) + Loi Informatique et Libertés n° 78-17 modifiée + Recommandations CNIL

### Template

```markdown
## Responsable de traitement

**[Nom / Raison sociale]**
[Adresse] — [email]

## Données collectées et traitements

### Formulaire de contact
- **Données** : nom, prénom, email, téléphone, message
- **Finalité** : traitement de votre demande et réponse
- **Base légale** : intérêt légitime (art. 6.1.f RGPD)
- **Conservation** : 3 ans à compter du dernier contact
- **Destinataires** : [Nom du prestataire] uniquement — aucune vente ni partage

### Cookies et traceurs

#### Cookies strictement nécessaires *(pas de consentement requis)*
Ces cookies assurent le bon fonctionnement du site. Désactivables via les paramètres navigateur.

[ADAPTER SELON L'OUTIL ANALYTICS RÉEL :]

#### *Si Google Analytics (GA4)*
- **Google Analytics** — éditeur : Google LLC (Mountain View, USA)
- Finalité : mesure d'audience (pages vues, origine du trafic)
- Transfert hors UE : oui, vers les États-Unis (clauses contractuelles types UE–USA)
- Conservation : 13 mois (durée recommandée CNIL)
- Désactivation : [Google Analytics Opt-out](https://tools.google.com/dlpage/gaoptout)

#### *Si Plausible / Umami / Matomo auto-hébergé EU*
- **[Outil]** — aucune donnée personnelle collectée, aucun cookie déposé
- Données entièrement anonymisées — aucun consentement requis

## Vos droits

Conformément au RGPD, vous disposez des droits suivants :

| Droit | Article | Description |
|-------|---------|-------------|
| Accès | Art. 15 | Obtenir copie de vos données |
| Rectification | Art. 16 | Corriger des données inexactes |
| Effacement | Art. 17 | Demander la suppression |
| Limitation | Art. 18 | Limiter certains traitements |
| Portabilité | Art. 20 | Recevoir vos données (format structuré) |
| Opposition | Art. 21 | Vous opposer au traitement |

Pour exercer ces droits : **[email]**
Réponse sous 1 mois (délai légal RGPD art. 12.3).

Vous pouvez également déposer une réclamation auprès de la **CNIL** :
www.cnil.fr — 3 Place de Fontenoy — TSA 80715 — 75334 Paris Cedex 07

## Sécurité

Les données sont hébergées sur des serveurs sécurisés. Elles ne sont jamais
revendues ni cédées à des tiers à des fins commerciales.

*Dernière mise à jour : [date]*
```

### Règles CNIL à respecter

| Outil analytics | Traitement requis |
|----------------|------------------|
| Google Analytics sans anonymisation | Consentement obligatoire (bandeau CNIL) |
| Google Analytics avec IP anonymisée + serveur EU | Accepté sans consentement (position CNIL 2023) |
| Plausible / Umami / Fathom | Aucun consentement requis — recommandé |
| Matomo auto-hébergé + anonymisation | Aucun consentement requis |

- **DPO non requis** pour micro-entrepreneurs / artisans (seuil art. 37 RGPD non atteint)
- **Formulaire contact** = base légale intérêt légitime valide (pas besoin de consentement)
- Si hébergeur hors UE (Vercel, Netlify, AWS US) : mentionner le transfert + CCT

---

## Page 3 — Conditions Générales de Vente (CGV)

**Base légale** :
- L.111-1 à L.111-8 Code de la consommation (information précontractuelle)
- L.221-1 à L.221-28 (contrats hors établissement, droit de rétractation)
- L.217-1 à L.217-20 (garantie légale de conformité)
- L.611-1 à L.616-3 (médiation — obligatoire B2C)
- Code civil art. 1792 (garantie décennale bâtiment)

### Template artisan de service

```markdown
**[Nom / Raison sociale]** — [Adresse] — SIRET [xxx] — [RCS/RM]
Ci-après "le Prestataire"

*Applicables à tout devis accepté à compter du [date].*

## Article 1 — Champ d'application

Les présentes CGV régissent les relations contractuelles entre le Prestataire et
tout client (particulier ou professionnel) ayant accepté un devis.

## Article 2 — Devis et formation du contrat

Toute intervention fait l'objet d'un devis préalable gratuit, valable [30] jours.
L'acceptation du devis (signature + mention manuscrite "Bon pour accord") constitue
la formation du contrat.
Un acompte de [30] % est demandé à la signature du devis pour toute commande
supérieure à [500] €.

## Article 3 — Prix et TVA

Les prix sont indiqués [hors taxes (HT) / toutes taxes comprises (TTC)].

*[Choisir selon situation fiscale :]*

**Franchise de TVA** :
TVA non applicable — article 293 B du Code Général des Impôts.

**Assujetti à la TVA** :
TVA au taux de 10 % pour les travaux d'amélioration, de transformation ou d'aménagement
de logements achevés depuis plus de 2 ans (art. 279-0 bis CGI) — 20 % pour les autres
prestations.

## Article 4 — Conditions de paiement

- Solde dû à réception de la facture / à la fin de l'intervention
- Modes acceptés : virement bancaire, chèque à l'ordre de [Nom], espèces
  (limite légale : 1 000 € entre professionnels, 3 000 € avec les particuliers)
- Tout retard de paiement entraîne des pénalités au taux d'intérêt légal en vigueur,
  majorées d'une indemnité forfaitaire de recouvrement de 40 € (art. L.441-10 Ccom)

## Article 5 — Délais d'intervention

Les délais communiqués lors du devis sont donnés à titre indicatif.
Le Prestataire s'engage à informer le client de tout retard prévisible dès qu'il en a
connaissance. Sauf faute intentionnelle ou négligence grave, aucun retard ne peut
donner lieu à des dommages et intérêts.

## Article 6 — Droit de rétractation (clients particuliers — contrats hors établissement)

*[Choisir selon le type de service :]*

**Service à domicile exécuté immédiatement (urgence, dépannage)** :
Conformément à l'article L.221-28, 1° du Code de la consommation, le droit de
rétractation ne s'applique pas aux contrats de fourniture de services dont l'exécution
a commencé, avec l'accord exprès du consommateur, avant l'expiration du délai de
rétractation de 14 jours.

**Service planifié (travaux non urgents)** :
Le client particulier dispose d'un délai de 14 jours calendaires à compter de la
signature du contrat pour exercer son droit de rétractation (art. L.221-18 Ccom).
Ce droit s'exerce par l'envoi du formulaire de rétractation légal (annexe au bon de
commande ou téléchargeable sur le site du Service Public) par email ou courrier
recommandé avec accusé de réception.

## Article 7 — Garanties

**Garantie légale de conformité** (art. L.217-3 Ccom) : 2 ans à compter de la livraison
pour les biens mobiliers fournis.

**Garantie des vices cachés** (art. 1641 Code civil) : 2 ans à compter de la découverte
du vice. Le Prestataire ne peut être tenu responsable des vices dont il n'avait pas
connaissance et que la nature du contrat ne lui imposait pas de rechercher.

*[Artisans du bâtiment uniquement :]*

**Garantie décennale** (art. 1792 Code civil) : 10 ans pour les dommages qui compromettent
la solidité de l'ouvrage ou le rendent impropre à sa destination.

**Garantie de parfait achèvement** (art. 1792-6) : 1 an après réception des travaux,
couvrant tous les désordres signalés dans le procès-verbal de réception.

**Garantie biennale** (art. 1792-3) : 2 ans pour les éléments d'équipement dissociables
de l'ouvrage.

## Article 8 — Responsabilité

La responsabilité du Prestataire est limitée aux dommages directs et prévisibles.
Elle est garantie par l'assurance responsabilité civile professionnelle souscrite
auprès de [assureur], police n° [numéro].

## Article 9 — Médiation des litiges *(obligatoire B2C art. L.616-1 Ccom)*

En cas de litige non résolu à l'amiable, le consommateur peut recourir gratuitement
à un médiateur de la consommation :

**[Nom du médiateur]**
[Adresse]
[Site web]

*Exemples selon secteur :*
- Artisans du bâtiment : Médiation de la Consommation — www.mediation-btpro.fr
- Général : MEDICYS — www.medicys.fr / CM2C — www.cm2c.net

Le consommateur peut également utiliser la plateforme européenne de règlement en ligne
des litiges : https://ec.europa.eu/consumers/odr

En cas d'échec de la médiation, les tribunaux compétents sont ceux du lieu de domicile
du consommateur (art. R.631-3 Ccom) ou du lieu d'exécution de la prestation.

## Article 10 — Droit applicable

Les présentes CGV sont soumises au droit français. En l'absence de résolution amiable,
le litige sera porté devant les juridictions françaises compétentes.

*Dernière mise à jour : [date]*
```

---

## Checklist avant livraison client

### Mentions légales
- [ ] SIRET renseigné (14 chiffres)
- [ ] RCS ou RM selon forme juridique
- [ ] Adresse complète de l'hébergeur (pas juste le nom)
- [ ] Assurance décennale si artisan bâtiment

### Politique de confidentialité
- [ ] Cookies réels du site listés (pas de liste générique)
- [ ] Hébergeur hors UE → clause transfert mentionnée
- [ ] Google Analytics → opt-out + mention transfert USA
- [ ] Email contact pour exercice des droits renseigné

### CGV
- [ ] Médiateur de la consommation désigné (non optionnel en B2C)
- [ ] Taux TVA correct (franchise vs assujetti, 10% vs 20%)
- [ ] Droit de rétractation adapté (urgence vs planifié)
- [ ] Garantie décennale mentionnée si bâtiment

### Toutes les pages
- [ ] Date "Dernière mise à jour" renseignée
- [ ] Recommandation de relecture par un avocat transmise au client

---

## Ce qui n'est PAS couvert

- CGU d'application web ou SaaS
- Contrats de sous-traitance
- Contrats de travail / mentions RH
- Dépôts de marques INPI
- Baux commerciaux
- Conformité RGPD pour les traitements complexes (DPO, analyses d'impact lourdes)

Pour ces cas : orienter vers un avocat spécialisé ou un service en ligne (Captain Contrat, Legalstart).
