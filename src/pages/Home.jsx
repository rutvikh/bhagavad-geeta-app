import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import VerseCard from '../components/VerseCard'
import { getTodaysVerse } from '../services/geetaService'

export default function Home() {
  const [verseData, setVerseData] = useState(null)
  const [chapter, setChapter] = useState(null)
  const [verse, setVerse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getTodaysVerse()
      .then(data => {
        if (data) {
          const { chapter: ch, ...verseObj } = data
          setChapter(ch)
          setVerse(verseObj.verse)
          setVerseData(verseObj)
        } else {
          setError(true)
        }
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      {/* Page title */}
      <div className="text-center mb-8 fade-in-up">
        <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.6rem', fontWeight: '700', color: 'var(--color-gold)', margin: 0 }}>
          Verse of the Day
        </h1>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(44,26,0,0.5)', margin: '0.3rem 0 0 0' }}>
          {today}
        </p>
      </div>

      {/* Verse reference badge (above card) */}
      {!loading && !error && verseData && (
        <div className="text-center mb-4 fade-in-up">
          <Link
            to={`/chapter/${chapter}/verse/${verse}`}
            style={{ textDecoration: 'none' }}
          >
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold"
              style={{ background: 'var(--color-saffron)', color: 'white', fontFamily: 'Open Sans, sans-serif', letterSpacing: '0.04em', boxShadow: '0 2px 8px rgba(192,82,26,0.3)' }}
            >
              Chapter {chapter} · Verse {verse}
            </span>
          </Link>
        </div>
      )}

      {/* Content */}
      {loading && <LoadingState />}
      {error && <ErrorState />}
      {!loading && !error && verseData && (
        <VerseCard verse={verseData} chapterNumber={chapter} />
      )}
      {!loading && !error && !verseData && <ErrorState />}
    </main>
  )
}

function LoadingState() {
  return (
    <div className="verse-card text-center py-12">
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🪷</div>
      <p style={{ color: 'var(--color-gold)', fontFamily: 'Open Sans, sans-serif' }}>Loading today's verse…</p>
    </div>
  )
}

function ErrorState() {
  return (
    <div className="verse-card text-center py-12">
      <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🙏</div>
      <p style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Chapter data coming soon
      </p>
      <p style={{ color: 'rgba(44,26,0,0.6)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        Verse data for this chapter has not yet been added.
      </p>
      <Link
        to="/chapter/2/verse/47"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1.25rem',
          background: 'var(--color-saffron)',
          color: 'white',
          borderRadius: '9999px',
          textDecoration: 'none',
          fontFamily: 'Open Sans, sans-serif',
          fontSize: '0.9rem',
          fontWeight: '600',
        }}
      >
        Read BG 2.47 — the eternal verse
      </Link>
    </div>
  )
}
