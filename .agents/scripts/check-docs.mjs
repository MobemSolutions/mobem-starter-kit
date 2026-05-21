#!/usr/bin/env node
/**
 * PreToolUse hook — vérifie que docs/project/design.md est rempli
 * avant toute écriture dans src/.
 * Avertissement uniquement (exit 0) — ne bloque pas.
 */

import { readFileSync, existsSync } from 'node:fs'

let input = ''
process.stdin.setEncoding('utf8')
process.stdin.on('data', chunk => { input += chunk })
process.stdin.on('end', () => {
  try {
    const { tool_input } = JSON.parse(input)
    const filePath = tool_input?.file_path ?? ''

    const inSrc = filePath.includes('/src/') || filePath.includes('\\src\\')
    if (!inSrc) process.exit(0)

    const designPath = 'docs/project/design.md'
    const isPlaceholder =
      !existsSync(designPath) ||
      readFileSync(designPath, 'utf8').includes('Ce fichier est vide')

    if (isPlaceholder) {
      process.stderr.write(
        '⚠️  docs/project/design.md est vide — lancer /design et valider la palette avant de modifier src/\n'
      )
    }
  } catch {
    // Ne pas bloquer si le parsing échoue
  }
  process.exit(0)
})
