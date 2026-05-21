/**
 * Mobem 8pt Grid System
 * All spacing values are strict multiples of 8px.
 * Reference: docs/project/design.md#spacing
 */

export const SPACING = {
  xs:   { rem: '0.5rem', px: 8   },
  sm:   { rem: '1rem',   px: 16  },
  md:   { rem: '1.5rem', px: 24  },
  lg:   { rem: '2rem',   px: 32  },
  xl:   { rem: '3rem',   px: 48  },
  '2xl':{ rem: '4rem',   px: 64  },
  '3xl':{ rem: '6rem',   px: 96  },
  hero: { rem: '8rem',   px: 128 },
} as const

export type SpacingToken = keyof typeof SPACING

export const GRID = {
  base: 8,
  maxWidth: '1280px',
  containerPadding: '1.5rem', /* 24px — md spacing */
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const
