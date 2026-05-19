# docs/context/ — Brief Client

> Ce dossier contient tous les fichiers de référence fournis par le client.
> Il est ignoré par git (voir `.gitignore`) pour protéger les données confidentielles.

## Quoi déposer ici

- `brief.pdf` ou `brief.md` — le brief client (PDF, Word, email copié-collé, notes)
- `refs.md` — références visuelles (URLs de sites aimés, sites à éviter, ambiance)
- `references/` — screenshots de sites concurrents ou de références visuelles
- `assets/` — logo brut, photos, documents de marque fournis par le client
- `notes.md` — notes de réunion, échanges Slack/email pertinents

## Utilisation

1. Remplissez ce dossier **avant** d'ouvrir Claude Code
2. Lancez `/strategy` → lit `docs/context/` et remplit `docs/product.md`
3. Lancez `/design` → lit `docs/product.md` + `docs/context/refs.md` et propose la DA

Plus ce dossier est riche, plus la stratégie et le design proposés seront pertinents.

## Confidentialité

Ce dossier est listé dans `.gitignore`. Les fichiers clients ne sont jamais commités.
