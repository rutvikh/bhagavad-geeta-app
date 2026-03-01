import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  getChapters,
  getChapter,
  getAdjacentChapters,
  getVerse,
  getTodaysVerse,
  markVerseVisited,
  getVisitedVerses,
} from './geetaService'

// ── Chapter queries ───────────────────────────────────────────────────────────

describe('getChapters', () => {
  it('returns all 18 chapters', () => {
    const chapters = getChapters()
    expect(chapters).toHaveLength(18)
  })

  it('each chapter has required fields', () => {
    for (const ch of getChapters()) {
      expect(typeof ch.number).toBe('number')
      expect(typeof ch.english_name).toBe('string')
      expect(typeof ch.verse_count).toBe('number')
    }
  })
})

describe('getChapter', () => {
  it('returns the correct chapter by number', () => {
    const ch = getChapter(2)
    expect(ch.number).toBe(2)
    expect(ch.english_name).toBe('Sankhya Yoga')
  })

  it('returns null for an out-of-range chapter', () => {
    expect(getChapter(0)).toBeNull()
    expect(getChapter(19)).toBeNull()
  })
})

describe('getAdjacentChapters', () => {
  it('returns prev null for chapter 1', () => {
    const { prev, next } = getAdjacentChapters(1)
    expect(prev).toBeNull()
    expect(next.number).toBe(2)
  })

  it('returns next null for chapter 18', () => {
    const { prev, next } = getAdjacentChapters(18)
    expect(prev.number).toBe(17)
    expect(next).toBeNull()
  })

  it('returns correct neighbours for a middle chapter', () => {
    const { prev, next } = getAdjacentChapters(6)
    expect(prev.number).toBe(5)
    expect(next.number).toBe(7)
  })
})

// ── Verse queries ─────────────────────────────────────────────────────────────

describe('getVerse', () => {
  it('resolves to a verse object with the correct verse number', async () => {
    const verse = await getVerse(2, 47)
    expect(verse).not.toBeNull()
    expect(verse.verse).toBe(47)
  })

  it('resolves to null for a verse number that does not exist', async () => {
    const verse = await getVerse(2, 9999)
    expect(verse).toBeNull()
  })
})

// ── getTodaysVerse ────────────────────────────────────────────────────────────

describe('getTodaysVerse', () => {
  it('resolves to an object that includes a numeric verse field', async () => {
    const data = await getTodaysVerse()
    expect(data).not.toBeNull()
    // verse.verse must be a number — this is what caused the audio URL bug
    expect(typeof data.verse).toBe('number')
  })

  it('resolves to an object that includes a numeric chapter field', async () => {
    const data = await getTodaysVerse()
    expect(typeof data.chapter).toBe('number')
    expect(data.chapter).toBeGreaterThanOrEqual(1)
    expect(data.chapter).toBeLessThanOrEqual(18)
  })

  it('resolves to an object with core verse content fields', async () => {
    const data = await getTodaysVerse()
    expect(data).toHaveProperty('sanskrit')
    expect(data).toHaveProperty('transliteration')
    expect(data).toHaveProperty('translation')
  })
})

// ── localStorage ──────────────────────────────────────────────────────────────

describe('markVerseVisited / getVisitedVerses', () => {
  beforeEach(() => localStorage.clear())
  afterEach(() => localStorage.clear())

  it('starts with an empty visited list', () => {
    expect(getVisitedVerses(2)).toEqual([])
  })

  it('marks a verse as visited and retrieves it', () => {
    markVerseVisited(2, 47)
    expect(getVisitedVerses(2)).toContain(47)
  })

  it('does not duplicate an already-visited verse', () => {
    markVerseVisited(2, 47)
    markVerseVisited(2, 47)
    const visited = getVisitedVerses(2)
    expect(visited.filter(v => v === 47)).toHaveLength(1)
  })

  it('keeps visited lists isolated per chapter', () => {
    markVerseVisited(1, 1)
    expect(getVisitedVerses(2)).not.toContain(1)
  })

  it('returns [] when localStorage contains corrupted data', () => {
    localStorage.setItem('visited_ch2', 'not-valid-json{{{')
    expect(getVisitedVerses(2)).toEqual([])
  })
})
