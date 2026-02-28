import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getVisitedVerses, markVerseVisited } from '../services/geetaService'

export default function VerseGrid({ chapterNumber, verseCount }) {
  const navigate = useNavigate()
  const [visited, setVisited] = useState(new Set())

  useEffect(() => {
    setVisited(new Set(getVisitedVerses(chapterNumber)))
  }, [chapterNumber])

  function handleVerseClick(verseNum) {
    markVerseVisited(chapterNumber, verseNum)
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
