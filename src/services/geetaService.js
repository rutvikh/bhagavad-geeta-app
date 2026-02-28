import chaptersData from '../data/chapters.json'

const chapters = chaptersData.chapters

// ── Chapter-file cache (one load per session) ─────────────────────────────────
const _cache = new Map()

async function _loadChapter(chapterNumber) {
  if (_cache.has(chapterNumber)) return _cache.get(chapterNumber)
  const chStr = String(chapterNumber).padStart(2, '0')
  const mod = await import(`../data/verses/chapter_${chStr}.json`)
  _cache.set(chapterNumber, mod.default)
  return mod.default
}

// ── Chapter queries (synchronous) ─────────────────────────────────────────────

export function getChapters() {
  return chapters
}

export function getChapter(chapterNumber) {
  return chapters.find(c => c.number === chapterNumber) || null
}

export function getAdjacentChapters(chapterNumber) {
  return {
    prev: chapters.find(c => c.number === chapterNumber - 1) || null,
    next: chapters.find(c => c.number === chapterNumber + 1) || null,
  }
}

// ── Verse queries (async) ─────────────────────────────────────────────────────

export async function getVerse(chapterNumber, verseNumber) {
  const data = await _loadChapter(chapterNumber)
  return data.verses.find(v => v.verse === verseNumber) || null
}

export async function getChapterVerses(chapterNumber) {
  const data = await _loadChapter(chapterNumber)
  return data.verses
}

export async function getTodaysVerse() {
  const today = new Date()
  const dateKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`

  let hash = 0
  for (let i = 0; i < dateKey.length; i++) {
    hash = Math.imul(31, hash) + dateKey.charCodeAt(i) | 0
  }
  const totalVerses = chapters.reduce((sum, ch) => sum + ch.verse_count, 0)
  const index = Math.abs(hash) % totalVerses

  // Map flat index to chapter/verse
  let count = 0
  let chapter = 2
  let verse = 47
  for (const ch of chapters) {
    if (index < count + ch.verse_count) {
      chapter = ch.number
      verse = index - count + 1
      break
    }
    count += ch.verse_count
  }

  try {
    const verseData = await getVerse(chapter, verse)
    if (verseData) return { chapter, verse, ...verseData }
    // Verse not in JSON yet — fall back to BG 2.47
    return _fallback()
  } catch {
    return _fallback()
  }
}

async function _fallback() {
  try {
    const verseData = await getVerse(2, 47)
    return { chapter: 2, verse: 47, ...verseData }
  } catch {
    return null
  }
}

// ── Progress tracking (localStorage) ─────────────────────────────────────────

export function markVerseVisited(chapterNumber, verseNumber) {
  try {
    const key = `visited_ch${chapterNumber}`
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    if (!stored.includes(verseNumber)) {
      localStorage.setItem(key, JSON.stringify([...stored, verseNumber]))
    }
  } catch {}
}

export function getVisitedVerses(chapterNumber) {
  try {
    return JSON.parse(localStorage.getItem(`visited_ch${chapterNumber}`) || '[]')
  } catch {
    return []
  }
}
