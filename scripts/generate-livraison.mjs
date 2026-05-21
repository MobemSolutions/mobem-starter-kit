#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const docsDir = join(root, 'docs')

const configPath = join(docsDir, 'livraison-config.json')
const templatePath = join(docsDir, 'livraison.html')

if (!existsSync(configPath)) {
  console.error('❌ docs/livraison-config.json introuvable. Copier le fichier et remplir les valeurs.')
  process.exit(1)
}

const config = JSON.parse(readFileSync(configPath, 'utf-8'))

// Date auto si non renseignée
if (!config.date_livraison) {
  config.date_livraison = new Date().toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'long', year: 'numeric'
  })
}

let html = readFileSync(templatePath, 'utf-8')

// Remplacer les listes (fonctionnalités)
if (Array.isArray(config.fonctionnalites)) {
  const items = config.fonctionnalites.map(f => `      <li>${f}</li>`).join('\n')
  html = html.replaceAll('{{FONCTIONNALITES}}', items)
}

// Bloc notes optionnel
const notesBloc = config.notes
  ? `<div class="note"><strong>Notes :</strong> ${config.notes}</div>`
  : ''
html = html.replaceAll('{{NOTES_BLOC}}', notesBloc)

// Remplacer tous les autres placeholders
const skip = new Set(['fonctionnalites', 'notes'])
for (const [key, value] of Object.entries(config)) {
  if (skip.has(key)) continue
  html = html.replaceAll(`{{${key.toUpperCase()}}}`, value ?? '')
}

const slug = (config.client_nom_slug || 'client').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
const outName = `livraison-${slug}.html`
const outPath = join(docsDir, outName)

writeFileSync(outPath, html, 'utf-8')
console.log(`✅ Document généré : docs/${outName}`)
console.log(`   Ouvrir dans le navigateur → Imprimer → Enregistrer en PDF`)
