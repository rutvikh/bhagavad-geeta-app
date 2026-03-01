import { test, expect } from '@playwright/test'

// ── Home — Verse of the Day ───────────────────────────────────────────────────

test.describe('Home — Verse of the Day', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/verse-of-the-day')
    // Wait for actual verse content — not the loading skeleton
    await page.locator('.sanskrit').first().waitFor({ timeout: 15000 })
  })

  test('verse card renders with Sanskrit text', async ({ page }) => {
    const sanskrit = page.locator('.sanskrit').first()
    await expect(sanskrit).not.toBeEmpty()
  })

  test('audio player is present', async ({ page }) => {
    const playBtn = page.getByRole('button', { name: /play/i })
    await expect(playBtn).toBeVisible()
  })

  test('speed select is present with 6 options', async ({ page }) => {
    const select = page.getByRole('combobox', { name: /playback speed/i })
    await expect(select).toBeVisible()
    const options = select.locator('option')
    await expect(options).toHaveCount(6)
  })

  test('speed select defaults to 1×', async ({ page }) => {
    const select = page.getByRole('combobox', { name: /playback speed/i })
    await expect(select).toHaveValue('1')
  })
})

// ── Chapter page ──────────────────────────────────────────────────────────────

test.describe('Chapter 2 page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/chapter/2')
  })

  test('chapter heading renders', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /Chapter 2/i })).toBeVisible()
  })

  test('featured verse preview renders', async ({ page }) => {
    // Central Verse section should appear
    const section = page.getByText('Central Verse')
    await expect(section).toBeVisible({ timeout: 8000 })
    // The link or verse snippet below it
    const link = page.getByRole('link', { name: /Read full verse with commentary/i })
    await expect(link).toBeVisible({ timeout: 8000 })
  })

  test('hamburger menu shows all 18 chapters', async ({ page }) => {
    await page.getByRole('button', { name: /open menu/i }).click()
    await page.getByRole('button', { name: /chapters/i }).click()
    const chapterButtons = page.locator('.drawer button').filter({ hasText: /^\d+\./ })
    await expect(chapterButtons).toHaveCount(18, { timeout: 5000 })
  })
})

// ── Verse page ────────────────────────────────────────────────────────────────

test.describe('Chapter 2, Verse 47', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#/chapter/2/verse/47')
  })

  test('Sanskrit text renders', async ({ page }) => {
    const sanskrit = page.locator('.sanskrit').first()
    await expect(sanskrit).toBeVisible({ timeout: 8000 })
    await expect(sanskrit).not.toBeEmpty()
  })

  test('audio player renders', async ({ page }) => {
    await expect(page.getByRole('button', { name: /play/i })).toBeVisible({ timeout: 8000 })
  })

  test('keyboard → navigates to verse 48', async ({ page }) => {
    await page.locator('.verse-card').waitFor({ timeout: 8000 })
    await page.keyboard.press('ArrowRight')
    await expect(page).toHaveURL(/#\/chapter\/2\/verse\/48/, { timeout: 5000 })
  })

  test('keyboard ← navigates to verse 46', async ({ page }) => {
    await page.locator('.verse-card').waitFor({ timeout: 8000 })
    await page.keyboard.press('ArrowLeft')
    await expect(page).toHaveURL(/#\/chapter\/2\/verse\/46/, { timeout: 5000 })
  })
})

// ── Visited dot persists via localStorage ─────────────────────────────────────

test.describe('Visited state', () => {
  test('visiting a verse marks it as visited on the chapter grid', async ({ page }) => {
    await page.goto('/#/chapter/2/verse/47')
    // Wait for verse content (not loading shell) — markVerseVisited fires after data loads
    await page.locator('.sanskrit').first().waitFor({ timeout: 10000 })

    // Use client-side navigation (breadcrumb link) so localStorage persists in the same context
    await page.getByRole('link', { name: 'Chapter 2' }).first().click()
    await page.waitForURL('**/#/chapter/2')

    // Verse 47 button should have the visited class
    const btn = page.locator('.verse-btn.visited', { hasText: '47' })
    await expect(btn).toBeVisible({ timeout: 5000 })
  })
})

// ── Last verse → next chapter navigation ──────────────────────────────────────

test.describe('Last verse of chapter', () => {
  test('arrow shows next chapter link on last verse', async ({ page }) => {
    // Chapter 1 has 47 verses
    await page.goto('/#/chapter/1/verse/47')
    await page.locator('.verse-card').waitFor({ timeout: 8000 })
    const nextLink = page.getByRole('link', { name: /Chapter 2/i })
    await expect(nextLink).toBeVisible()
  })
})
