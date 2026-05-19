export const TYPOGRAPHY = {
  fonts: {
    display: 'var(--font-display)',
    body:    'var(--font-sans)',
    mono:    'var(--font-mono)',
  },

  scale: {
    hero: 'clamp(2.5rem, 6vw, 5rem)',
    h1:   'clamp(2rem, 5vw, 3.5rem)',
    h2:   'clamp(1.5rem, 3vw, 2.25rem)',
    h3:   '1.25rem',
    body: '1rem',
    sm:   '0.875rem',
    xs:   '0.75rem',
    mono: '0.8125rem',
  },

  lineHeight: {
    tight:   '1.1',
    snug:    '1.3',
    normal:  '1.6',
    relaxed: '1.75',
  },

  weights: {
    regular:  '400',
    medium:   '500',
    semibold: '600',
  },

  letterSpacing: {
    tight:  '-0.02em',
    normal: '0em',
    wide:   '0.05em',
    wider:  '0.1em',
    widest: '0.15em',
  },
} as const

export type TypographyScale = keyof typeof TYPOGRAPHY.scale

export const MOTION = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  duration: {
    micro:    0.2,
    standard: 0.3,
    macro:    0.4,
  },
  stagger: {
    children: 0.08,
  },
} as const
