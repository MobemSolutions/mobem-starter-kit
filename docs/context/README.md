# docs/context/ — Brief Client

> Ce dossier contient tous les fichiers de référence fournis par le client.
> Il est ignoré par git (voir `.gitignore`) pour protéger les données confidentielles.

## Quoi déposer ici

### Fichiers obligatoires
- `contraintes.md` — budget, délai, KPIs, SEO mots-clés, NAP, contraintes techniques, RGAA requis *(plus utile qu'un brief générique)*
- `refs.md` — références visuelles (URLs de sites aimés, sites à éviter, ambiance)

### Fichiers optionnels
- `brief.pdf` ou `brief.md` — brief client brut (PDF, Word, email copié-collé)
- `discovery-report.md` — rapport brand-discovery (audiences, concurrents, territoires de marque) — généré par le skill `brand-discovery`
- `references/` — screenshots de sites concurrents ou de références visuelles
- `assets/` — logo brut, photos originales, documents de marque fournis par le client (**ici = bruts gitignorés**)
- `notes.md` — notes de réunion, échanges Slack/email pertinents

## Ordre de lecture dans le workflow

1. Remplissez ce dossier **avant** d'ouvrir Claude Code
2. Lancez `/strategy` → lit tout `docs/context/` et remplit `docs/project/product.md`
3. Lancez `/design` → lit `docs/project/product.md` + `refs.md` et propose la DA

Plus ce dossier est riche (surtout `contraintes.md` et `refs.md`), plus les outputs seront pertinents.

## Flux des images

```
docs/context/assets/     ← originaux bruts reçus du client (gitignored)
        ↓ redimensionner + renommer en kebab-case
public/images/client/    ← images optimisées utilisées dans le code (commité)
```

Si le projet a un CMS Sanity : uploader directement dans le Studio (Phase 3.6), ne pas passer par `public/`.

## Confidentialité

Ce dossier est listé dans `.gitignore`. Les fichiers clients ne sont jamais commités.
