import { Link } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import WordBreakdown from './WordBreakdown'
import CommentaryTabs from './CommentaryTabs'

export default function VerseCard({ verse, chapterNumber, mini = false }) {
  if (!verse) return null

  const audioSrc = (verse.audio?.startsWith('http') ? verse.audio : null) || `https://www.gitasupersite.iitk.ac.in/sites/default/files/audio/CHAP${chapterNumber}/${chapterNumber}-${verse.verse}.MP3`

  return (
    <div className="verse-card fade-in-up">
      {/* ① Chapter & Verse reference badge */}
      <div className="mb-4">
        <Link
          to={`/chapter/${chapterNumber}/verse/${verse.verse}`}
          style={{ textDecoration: 'none' }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-semibold"
            style={{ background: 'var(--color-light-gold)', color: 'var(--color-saffron)', border: '1px solid rgba(192,82,26,0.3)', fontFamily: 'Open Sans, sans-serif', letterSpacing: '0.04em' }}
          >
            Chapter {chapterNumber} · Verse {verse.verse}
          </span>
        </Link>
      </div>

      {/* ② Sanskrit verse */}
      <div className="mb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {verse.sanskrit.split('\n').map((line, i) => (
            <p key={i} className="sanskrit" style={{ margin: 0 }}>{line}</p>
          ))}
        </div>
      </div>

      {/* ③ Transliteration */}
      <div className="mb-4">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {verse.transliteration.split('\n').map((line, i) => (
            <p key={i} className="transliteration" style={{ margin: 0 }}>{line}</p>
          ))}
        </div>
      </div>

      {/* ④ English translation */}
      <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(184,134,11,0.2)' }}>
        <p className="translation" style={{ margin: 0 }}>
          {verse.translation}
        </p>
        <p style={{ fontSize: '0.72rem', color: 'rgba(44,26,0,0.45)', fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic', margin: '0.4rem 0 0 0' }}>
          — Translation based on Goyandka's Tatvavivecani
        </p>
      </div>

      {!mini && (
        <>
          {/* ⑤ Audio Player */}
          <div className="mb-5">
            <h3 style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.6rem' }}>
              Listen
            </h3>
            <AudioPlayer src={audioSrc} />
          </div>

          {/* ⑥ Word Breakdown */}
          {verse.word_breakdown && verse.word_breakdown.length > 0 && (
            <div className="mb-5 pb-5" style={{ borderBottom: '1px solid rgba(184,134,11,0.2)' }}>
              <WordBreakdown words={verse.word_breakdown} />
            </div>
          )}

          {/* ⑦ Commentary Tabs */}
          {verse.commentary && (
            <CommentaryTabs commentary={verse.commentary} />
          )}
        </>
      )}
    </div>
  )
}
