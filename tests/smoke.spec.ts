import { test, expect } from '@playwright/test'

// ---------------------------------------------------------------------------
// Routes de base
// ---------------------------------------------------------------------------

test('homepage loads', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.locator('main')).toBeAttached()
})

test('sitemap.xml is served', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('xml')
})

test('robots.txt is served', async ({ request }) => {
  const response = await request.get('/robots.txt')
  expect(response.status()).toBe(200)
  const body = await response.text()
  expect(body).toContain('User-Agent')
})

test('contact API rejects missing body', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {},
    headers: { 'Content-Type': 'application/json' },
  })
  expect(response.status()).toBe(400)
})

// ---------------------------------------------------------------------------
// Pages Sprint 3 — /audit-digital
// ---------------------------------------------------------------------------

test('/audit-digital loads', async ({ page }) => {
  const response = await page.goto('/audit-digital')
  expect(response?.status()).toBe(200)
  await expect(page.locator('main')).toBeAttached()
})

test('/audit-digital has JSON-LD', async ({ page }) => {
  await page.goto('/audit-digital')
  const scripts = await page.locator('script[type="application/ld+json"]').all()
  expect(scripts.length).toBeGreaterThanOrEqual(1)
})

test('/audit-digital CTA links to #contact', async ({ page }) => {
  await page.goto('/audit-digital')
  const cta = page.getByRole('link', { name: /audit gratuit/i }).first()
  await expect(cta).toBeAttached()
  await expect(cta).toHaveAttribute('href', '#contact')
})

// ---------------------------------------------------------------------------
// Pages Sprint 3 — /marque-employeur
// ---------------------------------------------------------------------------

test('/marque-employeur loads', async ({ page }) => {
  const response = await page.goto('/marque-employeur')
  expect(response?.status()).toBe(200)
  await expect(page.locator('main')).toBeAttached()
})

test('/marque-employeur lists open positions', async ({ page }) => {
  await page.goto('/marque-employeur')
  const list = page.getByRole('list').filter({ has: page.getByRole('link', { name: /postuler/i }) })
  await expect(list.getByRole('listitem').first()).toBeAttached()
})

// ---------------------------------------------------------------------------
// Pages Sprint 3 — /[secteur] (smoke sur les 3 slugs générés)
// ---------------------------------------------------------------------------

for (const slug of ['kinesitherapeute', 'notaire', 'installateur-pac']) {
  test(`/${slug} loads`, async ({ page }) => {
    const response = await page.goto(`/${slug}`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('main')).toBeAttached()
  })

  test(`/${slug} has JSON-LD FAQ schema`, async ({ page }) => {
    await page.goto(`/${slug}`)
    const scripts = await page.locator('script[type="application/ld+json"]').all()
    let hasFaq = false
    for (const script of scripts) {
      const text = await script.textContent()
      if (text?.includes('FAQPage')) {
        hasFaq = true
        break
      }
    }
    expect(hasFaq).toBe(true)
  })

  test(`/${slug} h1 is non-empty`, async ({ page }) => {
    await page.goto(`/${slug}`)
    const h1 = page.locator('h1')
    await expect(h1).toBeAttached()
    const text = await h1.textContent()
    expect(text?.trim().length).toBeGreaterThan(10)
  })
}

// ---------------------------------------------------------------------------
// Sitemap — vérifier que les nouvelles URLs y figurent
// ---------------------------------------------------------------------------

test('sitemap includes /audit-digital', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  const body = await response.text()
  expect(body).toContain('/audit-digital')
})

test('sitemap includes sector pages', async ({ request }) => {
  const response = await request.get('/sitemap.xml')
  const body = await response.text()
  expect(body).toContain('/kinesitherapeute')
  expect(body).toContain('/notaire')
  expect(body).toContain('/installateur-pac')
})
