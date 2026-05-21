/** @type {import('@lhci/cli').LhrConfig} */
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm start',
      startServerReadyPattern: 'Ready on',
      url: ['http://localhost:3000'],
      numberOfRuns: 1,
      settings: {
        chromeFlags: '--no-sandbox --disable-dev-shm-usage',
      },
    },
    assert: {
      assertions: {
        // Performance peut varier en CI (CPU throttling) → warn pour éviter les faux positifs
        'categories:performance':    ['warn',  { minScore: 0.9 }],
        // Accessibilité et SEO sont déterministes → bloquants
        'categories:accessibility':  ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn',  { minScore: 0.9 }],
        'categories:seo':            ['error', { minScore: 0.9 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
