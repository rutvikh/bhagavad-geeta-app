import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function VerseGrid({ chapterNumber, verseCount }) {
  const navigate = useNavigate()
  const [visited, setVisited] = useState(new Set())

  useEffect(() => {
    try {
      const key = `visited_ch${chapterNumber}`
      const stored = JSON.parse(localStorage.getItem(key) || '[]')
      setVisited(new Set(stored))
    } catch {
      setVisited(new Set())
    }
  }, [chapterNumber])

  function handleVerseClick(verseNum) {
    // Mark as visited
    try {
      const key = `visited_ch${chapterNumber}`
      const stored = JSON.parse(localStorage.getItem(key) || '[]')
      const updated = Array.from(new Set([...stored, verseNum]))
      localStorage.setItem(key, JSON.stringify(updated))
    } catch {}

    navigate(`/chapter/${chapterNumber}/verse/${verseNum}`)
  }

  return (
    <div>
      <h2 style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        Select a Verse
      </h2>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: verseCount }, (_, i) => i + 1).map(n => (
          <button
            key={n}
            onClick={() => handleVerseClick(n)}
            className={`verse-btn ${visited.has(n) ? 'visited' : ''}`}
            title={`Verse ${n}${visited.has(n) ? ' (visited)' : ''}`}
            aria-label={`Go to verse ${n}`}
          >
            {n}
          </button>
        ))}
      </div>
      {visited.size > 0 && (
        <p style={{ fontSize: '0.75rem', color: 'rgba(44,26,0,0.45)', fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic', marginTop: '0.75rem' }}>
          {visited.size} of {verseCount} verses visited
        </p>
      )}
    </div>
  )
}
