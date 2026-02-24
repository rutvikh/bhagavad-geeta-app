import { Link } from 'react-router-dom'

export default function ChapterGrid({ chapters }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {chapters.map(ch => (
        <Link
          key={ch.number}
          to={`/chapter/${ch.number}`}
          className="chapter-card"
          style={{ textDecoration: 'none' }}
        >
          <div className="flex items-start gap-3">
            <span
              className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: 'var(--color-saffron)', color: 'white', fontFamily: 'Open Sans, sans-serif' }}
            >
              {ch.number}
            </span>
            <div className="min-w-0">
              <p
                style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: '1rem', color: 'var(--color-saffron)', margin: 0, lineHeight: 1.4 }}
                className="truncate"
              >
                {ch.sanskrit_name}
              </p>
              <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-deep-brown)', margin: '2px 0 0 0' }}>
                {ch.english_name}
              </p>
              <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.74rem', color: 'rgba(44,26,0,0.55)', margin: '2px 0 0 0', fontStyle: 'italic' }}>
                {ch.subtitle} · {ch.verse_count} verses
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
