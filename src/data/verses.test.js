import { describe, it, expect } from 'vitest'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import chaptersData from './chapters.json'

const CHAPTERS = chaptersData.chapters
const DATA_DIR = resolve(__dirname)

// ── Helpers ───────────────────────────────────────────────────────────────────

function chapterPath(n) {
  return resolve(DATA_DIR, 'verses', `chapter_${String(n).padStart(2, '0')}.json`)
}

function isNonEmptyString(val) {
  return typeof val === 'string' && val.trim().length > 0
}

function isNonEmptyArray(val) {
  return Array.isArray(val) && val.length > 0
}

// ── Layer 3: Data integrity ───────────────────────────────────────────────────

describe('Chapter JSON files', () => {
  it('all 18 chapter JSON files exist', () => {
    const missing = CHAPTERS.filter(ch => !existsSync(chapterPath(ch.number)))
    expect(missing, `Missing chapter files: ${missing.map(c => c.number).join(', ')}`).toHaveLength(0)
  })

  it('verse counts match chapters.json for every chapter', () => {
    const mismatches = []
    for (const ch of CHAPTERS) {
      if (!existsSync(chapterPath(ch.number))) continue
      const data = JSON.parse(readFileSync(chapterPath(ch.number), 'utf8'))
      if (data.verses.length !== ch.verse_count) {
        mismatches.push(`Ch.${ch.number}: expected ${ch.verse_count} verses, got ${data.verses.length}`)
      }
    }
    expect(mismatches, mismatches.join('\n')).toHaveLength(0)
  })

  it('verse numbers are sequential with no gaps or duplicates', () => {
    const problems = []
    for (const ch of CHAPTERS) {
      if (!existsSync(chapterPath(ch.number))) continue
      const data = JSON.parse(readFileSync(chapterPath(ch.number), 'utf8'))
      const nums = data.verses.map(v => v.verse)
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== i + 1) {
          problems.push(`Ch.${ch.number}: expected verse ${i + 1} at index ${i}, found ${nums[i]}`)
        }
      }
    }
    expect(problems, problems.join('\n')).toHaveLength(0)
  })
})

describe('Verse content — mandatory fields', () => {
  it('all 700 verses have every mandatory field populated', () => {
    const failures = []

    for (const ch of CHAPTERS) {
      if (!existsSync(chapterPath(ch.number))) continue
      const data = JSON.parse(readFileSync(chapterPath(ch.number), 'utf8'))

      for (const v of data.verses) {
        const ref = `Ch.${ch.number} V.${v.verse}`
        const missing = []

        // Top-level scalar fields
        if (!isNonEmptyString(v.sanskrit))        missing.push('sanskrit')
        if (!isNonEmptyString(v.transliteration)) missing.push('transliteration')
        if (!isNonEmptyString(v.translation))     missing.push('translation')

        // word_breakdown
        if (!isNonEmptyArray(v.word_breakdown)) {
          missing.push('word_breakdown')
        } else {
          v.word_breakdown.forEach((w, wi) => {
            if (!isNonEmptyString(w.word))              missing.push(`word_breakdown[${wi}].word`)
            if (!isNonEmptyString(w.transliteration))   missing.push(`word_breakdown[${wi}].transliteration`)
            if (!isNonEmptyString(w.root))              missing.push(`word_breakdown[${wi}].root`)
            if (!isNonEmptyString(w.grammatical_form))  missing.push(`word_breakdown[${wi}].grammatical_form`)
            if (!isNonEmptyString(w.meaning))           missing.push(`word_breakdown[${wi}].meaning`)
          })
        }

        // commentary — all 4 commentators required
        if (!v.commentary || typeof v.commentary !== 'object') {
          missing.push('commentary')
        } else {
          for (const key of ['dadaji', 'sarvapriyananda', 'yogananda', 'goyandka']) {
            if (!isNonEmptyString(v.commentary[key])) missing.push(`commentary.${key}`)
          }
        }

        if (missing.length > 0) {
          failures.push(`${ref}: missing ${missing.join(', ')}`)
        }
      }
    }

    expect(failures, `\n${failures.join('\n')}`).toHaveLength(0)
  })
})
