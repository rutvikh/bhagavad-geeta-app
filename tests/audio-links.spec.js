/**
 * IITK audio fallback link audit — Layer 5
 *
 * Run manually:  npm run test:audio
 * Never runs as part of pre-push or predeploy.
 *
 * Fires HEAD requests for all 700 IITK fallback audio URLs and reports
 * every broken link. Concurrency is capped at 20 to avoid rate-limiting.
 */
import { test, expect } from '@playwright/test'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const CONCURRENCY = 20
const TIMEOUT_MS = 10000
const DATA_DIR = resolve(process.cwd(), 'src/data')

function iitKUrl(chapter, verse) {
  return `https://www.gitasupersite.iitk.ac.in/sites/default/files/audio/CHAP${chapter}/${chapter}-${verse}.MP3`
}

function buildAllUrls() {
  const chaptersData = JSON.parse(readFileSync(resolve(DATA_DIR, 'chapters.json'), 'utf8'))
  const urls = []
  for (const ch of chaptersData.chapters) {
    for (let v = 1; v <= ch.verse_count; v++) {
      urls.push({ chapter: ch.number, verse: v, url: iitKUrl(ch.number, v) })
    }
  }
  return urls
}

async function checkUrl({ url, chapter, verse }) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { method: 'HEAD', signal: controller.signal })
    return { chapter, verse, url, ok: res.ok, status: res.status }
  } catch (err) {
    return { chapter, verse, url, ok: false, status: err.name === 'AbortError' ? 'TIMEOUT' : 'ERROR' }
  } finally {
    clearTimeout(timer)
  }
}

async function runWithConcurrency(items, fn, concurrency) {
  const results = []
  let i = 0
  async function worker() {
    while (i < items.length) {
      const item = items[i++]
      results.push(await fn(item))
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker))
  return results
}

test('all 700 IITK audio fallback URLs respond with 2xx', async () => {
  const allUrls = buildAllUrls()
  console.log(`\nChecking ${allUrls.length} IITK audio URLs (concurrency: ${CONCURRENCY})…\n`)

  const results = await runWithConcurrency(allUrls, checkUrl, CONCURRENCY)

  const failures = results.filter(r => !r.ok)

  if (failures.length > 0) {
    const report = failures
      .map(f => `  Ch.${f.chapter} V.${f.verse} [${f.status}]: ${f.url}`)
      .join('\n')
    console.log(`\n${failures.length} broken links:\n${report}\n`)
  } else {
    console.log('All 700 IITK audio URLs are reachable.\n')
  }

  expect(failures, `\n${failures.length} broken IITK audio links found:\n${failures.map(f => `Ch.${f.chapter} V.${f.verse}: ${f.status}`).join('\n')}`).toHaveLength(0)
})
