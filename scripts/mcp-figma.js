#!/usr/bin/env node
import { readFileSync } from 'fs'
import { spawn } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '..', '.env.local')

let apiKey = ''
try {
  const content = readFileSync(envPath, 'utf-8')
  const match = content.match(/^FIGMA_API_KEY=(.+)$/m)
  if (match) apiKey = match[1].trim().replace(/^["']|["']$/g, '')
} catch { /* .env.local absent — le serveur MCP échouera avec une erreur auth */ }

const isWin = process.platform === 'win32'
const child = spawn(
  isWin ? 'cmd' : 'npx',
  isWin
    ? ['/c', 'npx', '-y', 'figma-developer-mcp', '--stdio']
    : ['-y', 'figma-developer-mcp', '--stdio'],
  {
    env: { ...process.env, FIGMA_API_KEY: apiKey },
    stdio: 'inherit',
  }
)

child.on('exit', (code) => process.exit(code ?? 0))
