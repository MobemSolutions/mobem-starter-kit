# docs/context/ — Brief Client

> Ce dossier contient tous les fichiers de référence fournis par le client.
> Il est ignoré par git (voir `.gitignore`) pour protéger les données confidentielles.

## Quoi déposer ici

- `brief.pdf` ou `brief.md` — le brief client (PDF, Word, email copié-collé, notes)
- `references/` — screenshots de sites concurrents ou de références visuelles
- `assets/` — logo brut, photos, documents de marque fournis par le client
- `notes.md` — notes de réunion, échanges Slack/email pertinents

## Utilisation

Le prompt d'initialisation (`docs/prompt.md`) demande à l'IA de lire ce dossier
avant de générer `docs/product.md` et `docs/design.md`.

Plus ce dossier est riche, plus la stratégie et le design proposés seront pertinents.

## Confidentialité

Ce dossier est listé dans `.gitignore`. Les fichiers clients ne sont jamais commités.
