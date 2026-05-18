/**
 * Mobem OKLCH Color System
 * Perceptually uniform colors — no pure black/white, always chromatically tinted.
 * Reference: docs/design.md#color-system
 */

export const COLORS = {
  /** Main text, primary backgrounds */
  ink:    'oklch(0.07 0 0)',
  /** Main background, light mode */
  paper:  'oklch(0.973 0.003 80)',
  /** CTA accent — ONE per page max */
  signal: 'oklch(0.605 0.203 27.5)',
  /** 1px horizontal rules, input borders */
  border: 'oklch(0.90 0 0)',
  /** Secondary text (WCAG AA on paper) */
  mutedFg: 'oklch(0.46 0 0)',
  /** Surface secondary / hover states */
  secondary: 'oklch(0.95 0 0)',
  /** Dark mode background — warm, NOT pure black */
  charbon: 'oklch(0.115 0.010 55)',
  /** Dark mode text — warm cream */
  cream: 'oklch(0.965 0.005 80)',
} as const

export type ColorToken = keyof typeof COLORS

/** HEX approximations — for meta tags, OG images, Framer Motion inline styles */
export const HEX = {
  ink:    '#0D0D0D',
  paper:  '#F7F7F5',
  signal: '#E63946',
  border: '#E2E2E2',
  charbon: '#1A1814',
  cream:  '#F5F4F0',
} as const
