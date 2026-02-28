import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import VerseCard from '../components/VerseCard'
import chaptersData from '../data/chapters.json'

const chapters = chaptersData.chapters

export default function VersePage() {
  const { chapterNumber, verseNumber } = useParams()
  const navigate = useNavigate()
  const chNum = parseInt(chapterNumber, 10)
  const vNum = parseInt(verseNumber, 10)

  const [verseData, setVerseData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const chapter = chapters.find(c => c.number === chNum)
  const nextChapter = chapters.find(c => c.number === chNum + 1) || null

  useEffect(() => {
    setLoading(true)
    setError(false)
    setVerseData(null)

    const chStr = String(chNum).padStart(2, '0')
    import(`../data/verses/chapter_${chStr}.json`)
      .then(mod => {
        const found = mod.default.verses.find(v => v.verse === vNum)
        if (found) {
          setVerseData(found)
          // Mark as visited
          try {
            const key = `visited_ch${chNum}`
            const stored = JSON.parse(localStorage.getItem(key) || '[]')
            if (!stored.includes(vNum)) {
              localStorage.setItem(key, JSON.stringify([...stored, vNum]))
            }
          } catch {}
        } else {
          setError(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [chNum, vNum])

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'ArrowLeft' && vNum > 1) { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/chapter/${chNum}/verse/${vNum - 1}`) }
      if (e.key === 'ArrowRight') {
        if (chapter && vNum < chapter.verse_count) { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/chapter/${chNum}/verse/${vNum + 1}`) }
        else if (chapter && vNum === chapter.verse_count && nextChapter) { window.scrollTo({ top: 0, behavior: 'instant' }); navigate(`/chapter/${chNum + 1}/verse/1`) }
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [chNum, vNum, chapter, navigate])

  const hasPrev = vNum > 1
  const hasNext = chapter && vNum < chapter.verse_count
  const isLastVerse = chapter && vNum === chapter.verse_count

  return (
    <main className="max-w-3xl mx-auto px-4 py-8 space-y-6">

      {/* Breadcrumb */}
      <nav className="breadcrumb flex items-center gap-1 fade-in-up" aria-label="breadcrumb">
        <Link to="/">Home</Link>
        <span>›</span>
        {chapter && <Link to={`/chapter/${chNum}`}>Chapter {chNum}</Link>}
        <span>›</span>
        <span style={{ color: 'var(--color-saffron)', fontWeight: '600', fontSize: '0.85rem' }}>Verse {vNum}</span>
      </nav>

      {/* Top nav arrows */}
      <VerseNav chNum={chNum} vNum={vNum} hasPrev={hasPrev} hasNext={hasNext} isLastVerse={isLastVerse} nextChapter={nextChapter} />

      {/* Content */}
      {loading && (
        <div className="verse-card text-center py-12">
          <p style={{ color: 'var(--color-gold)', fontFamily: 'Open Sans, sans-serif' }}>Loading verse…</p>
        </div>
      )}

      {error && (
        <div className="verse-card text-center py-12 space-y-3">
          <p style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.1rem' }}>
            Verse data not yet available
          </p>
          <p style={{ color: 'rgba(44,26,0,0.6)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.9rem' }}>
            Chapter {chNum}, Verse {vNum} will be added in a future update.
          </p>
          <Link
            to={`/chapter/${chNum}`}
            style={{ display: 'inline-block', color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontWeight: '600', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            ← Back to Chapter {chNum}
          </Link>
        </div>
      )}

      {!loading && !error && verseData && (
        <VerseCard verse={verseData} chapterNumber={chNum} />
      )}

      {/* Bottom nav arrows */}
      {!loading && !error && (
        <VerseNav chNum={chNum} vNum={vNum} hasPrev={hasPrev} hasNext={hasNext} isLastVerse={isLastVerse} nextChapter={nextChapter} />
      )}

      {/* Keyboard hint */}
      <p className="text-center" style={{ fontSize: '0.72rem', color: 'rgba(44,26,0,0.35)', fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic' }}>
        Use ← → arrow keys to navigate between verses
      </p>

    </main>
  )
}

function VerseNav({ chNum, vNum, hasPrev, hasNext, isLastVerse, nextChapter }) {
  const linkStyle = { textDecoration: 'none', color: 'var(--color-saffron)', fontFamily: 'Open Sans, sans-serif', fontWeight: '600', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }

  return (
    <div className="flex justify-between items-center gap-4">
      {hasPrev ? (
        <Link to={`/chapter/${chNum}/verse/${vNum - 1}`} style={linkStyle} aria-label={`Previous verse ${vNum - 1}`}>
          ← Verse {vNum - 1}
        </Link>
      ) : (
        <span />
      )}

      <Link
        to={`/chapter/${chNum}`}
        style={{ textDecoration: 'none', color: 'var(--color-gold)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.82rem' }}
      >
        Chapter {chNum}
      </Link>

      {hasNext ? (
        <Link to={`/chapter/${chNum}/verse/${vNum + 1}`} style={linkStyle} aria-label={`Next verse ${vNum + 1}`}>
          Verse {vNum + 1} →
        </Link>
      ) : isLastVerse && nextChapter ? (
        <Link to={`/chapter/${chNum + 1}/verse/1`} style={linkStyle} aria-label={`Next chapter ${chNum + 1}`}>
          Chapter {chNum + 1} →
        </Link>
      ) : (
        <span />
      )}
    </div>
  )
}
