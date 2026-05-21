import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  const response = await page.goto('/')
  expect(response?.status()).toBe(200)
  await expect(page.locator('main')).toBeVisible()
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
  expect(body).toContain('User-agent')
})

test('contact API rejects missing body', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {},
    headers: { 'Content-Type': 'application/json' },
  })
  expect(response.status()).toBe(400)
})
