import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/siteConfig'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

// Génère les initiales du nom client (1-2 lettres)
// TODO: remplacer les couleurs par celles de docs/design.md après /design
export default function Icon() {
  const initials = siteConfig.name
    .split(' ')
    .filter(w => w.length > 0 && !['&', 'et', 'de', 'du', 'la', 'le', 'les'].includes(w.toLowerCase()))
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'oklch(0.18 0.02 55)', // TODO: aligner avec --background dark de globals.css
        color: 'oklch(0.97 0.003 80)',      // TODO: aligner avec --foreground de globals.css
        fontSize: initials.length === 1 ? 18 : 14,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      }}
    >
      {initials}
    </div>,
    { ...size }
  )
}
