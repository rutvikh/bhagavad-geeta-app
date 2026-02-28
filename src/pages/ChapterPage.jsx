import { useParams, Link } from 'react-router-dom'
import { useMemo, useState, useEffect } from 'react'
import VerseGrid from '../components/VerseGrid'
import { getChapter, getAdjacentChapters, getVerse } from '../services/geetaService'

function FeaturedVerse({ chapterNumber, verseNumber }) {
  const [verseData, setVerseData] = useState(null)

  useEffect(() => {
    getVerse(chapterNumber, verseNumber)
      .then(found => setVerseData(found || null))
      .catch(() => setVerseData(null))
  }, [chapterNumber, verseNumber])

  if (!verseData) {
    return (
      <div className="p-4 rounded-lg" style={{ background: 'rgba(245,230,200,0.5)', border: '1px solid rgba(184,134,11,0.2)' }}>
        <Link to={`/chapter/${chapterNumber}/verse/${verseNumber}`} style={{ color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.85rem' }}>
          View verse {chapterNumber}.{verseNumber} →
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 rounded-lg" style={{ background: 'rgba(245,230,200,0.5)', border: '1px solid rgba(184,134,11,0.2)', borderLeft: '4px solid var(--color-saffron)' }}>
      <p className="sanskrit" style={{ fontSize: '1.15rem', margin: '0 0 0.5rem 0' }}>{verseData.sanskrit}</p>
      <p className="translation" style={{ margin: '0 0 0.5rem 0', fontSize: '0.92rem' }}>{verseData.translation}</p>
      <Link
        to={`/chapter/${chapterNumber}/verse/${verseNumber}`}
        style={{ color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.82rem', fontWeight: '600', textDecoration: 'none' }}
      >
        Read full verse with commentary →
      </Link>
    </div>
  )
}

export default function ChapterPage() {
  const { chapterNumber } = useParams()
  const num = parseInt(chapterNumber, 10)

  const chapter = useMemo(() => getChapter(num), [num])
  const { prev: prevChapter, next: nextChapter } = useMemo(() => getAdjacentChapters(num), [num])

  if (!chapter) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="verse-card">
          <p style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.2rem' }}>Chapter not found</p>
          <Link to="/" style={{ color: 'var(--color-saffron)' }}>← Return home</Link>
        </div>
      </main>
    )
  }

  const featuredVerseNum = chapter.featured_verse
    ? parseInt(chapter.featured_verse.split('.')[1], 10)
    : null

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">

      {/* Breadcrumb */}
      <nav className="breadcrumb flex items-center gap-1 fade-in-up" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        <Link to="/overview">Chapters</Link>
        <span>›</span>
        <span style={{ color: 'var(--color-saffron)', fontWeight: '600', fontSize: '0.85rem' }}>Chapter {num}</span>
      </nav>

      {/* Part A — Chapter Summary */}
      <div className="verse-card fade-in-up space-y-5">

        {/* Sanskrit & English heading */}
        <div>
          <p className="sanskrit" style={{ fontSize: '1.55rem', margin: '0 0 0.25rem 0' }}>
            अध्याय {num} · {chapter.sanskrit_name}
          </p>
          <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '1.2rem', color: 'var(--color-deep-brown)', margin: 0 }}>
            Chapter {chapter.number} · {chapter.english_name}
          </h1>
          <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '0.95rem', margin: '0.3rem 0 0 0' }}>
            {chapter.subtitle}
          </p>
        </div>

        {/* Verse count badge */}
        <div>
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
            style={{ background: 'var(--color-saffron)', color: 'white', fontFamily: 'Open Sans, sans-serif' }}
          >
            {chapter.verse_count} Verses
          </span>
        </div>

        {/* Summary */}
        {chapter.summary && (
          <div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Summary
            </h2>
            {chapter.summary.split('\n\n').map((para, i) => (
              <p key={i} className="commentary-text" style={{ margin: i > 0 ? '0.75rem 0 0 0' : 0 }}>
                {para}
              </p>
            ))}
          </div>
        )}

        {/* Key themes */}
        {chapter.themes && chapter.themes.length > 0 && (
          <div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Key Themes
            </h2>
            <div className="flex flex-wrap gap-2">
              {chapter.themes.map(theme => (
                <span key={theme} className="pill">{theme}</span>
              ))}
            </div>
          </div>
        )}

        {/* Featured verse mini-preview */}
        {featuredVerseNum && (
          <div>
            <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Central Verse
            </h2>
            <FeaturedVerse chapterNumber={num} verseNumber={featuredVerseNum} />
          </div>
        )}
      </div>

      {/* Part B — Verse Selection Grid */}
      <div className="verse-card fade-in-up">
        <VerseGrid chapterNumber={num} verseCount={chapter.verse_count} />
      </div>

      {/* Chapter navigation */}
      <div className="flex justify-between items-center gap-4 fade-in-up">
        {prevChapter ? (
          <Link
            to={`/chapter/${prevChapter.number}`}
            style={{ textDecoration: 'none', color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontWeight: '600', fontSize: '0.85rem' }}
          >
            ← Ch. {prevChapter.number}: {prevChapter.english_name}
          </Link>
        ) : <span />}
        {nextChapter ? (
          <Link
            to={`/chapter/${nextChapter.number}`}
            style={{ textDecoration: 'none', color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontWeight: '600', fontSize: '0.85rem', textAlign: 'right' }}
          >
            Ch. {nextChapter.number}: {nextChapter.english_name} →
          </Link>
        ) : <span />}
      </div>

    </main>
  )
}
