import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AudioPlayer from './AudioPlayer'
import WordBreakdown from './WordBreakdown'
import CommentaryTabs from './CommentaryTabs'

function SanskritLine({ text }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const textEl = textRef.current
    if (!container || !textEl) return

    function fit() {
      let size = 2.0
      textEl.style.whiteSpace = 'nowrap'
      textEl.style.fontSize = `${size}rem`
      while (textEl.scrollWidth > container.clientWidth && size > 0.75) {
        size = Math.round((size - 0.05) * 100) / 100
        textEl.style.fontSize = `${size}rem`
      }
      // If still overflowing at minimum size, allow wrapping rather than clipping
      if (textEl.scrollWidth > container.clientWidth) {
        textEl.style.whiteSpace = 'normal'
      }
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(container)
    return () => ro.disconnect()
  }, [text])

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'hidden' }}>
      <p ref={textRef} className="sanskrit" style={{ margin: 0, whiteSpace: 'nowrap' }}>
        {text}
      </p>
    </div>
  )
}

function splitSanskrit(text) {
  if (!text) return []
  // Format 1: \n newline separator (chapters 1–9)
  const byNewline = text.split('\n').map(l => l.trim()).filter(Boolean)
  if (byNewline.length > 1) return byNewline
  // Format 2: | pipe separator (chapters 11+) — restore dandas after splitting
  const byPipe = text.split('|').map(l => l.trim()).filter(Boolean)
  if (byPipe.length > 1) {
    return byPipe.map((l, i) => i === byPipe.length - 1 ? `${l} ॥` : `${l} ।`)
  }
  // Format 3: । danda separator fallback
  const byDanda = text.split('।').map(l => l.trim()).filter(Boolean)
  if (byDanda.length > 1) return byDanda.map((l, i) => i < byDanda.length - 1 ? `${l} ।` : l)
  // Fallback: single line as-is
  return [text]
}

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
          {splitSanskrit(verse.sanskrit).map((line, i) => (
            <SanskritLine key={i} text={line} />
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
