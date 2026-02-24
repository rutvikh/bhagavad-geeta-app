import { useState } from 'react'

function WordSpan({ word, meaning, transliteration, root, grammaticalForm }) {
  const [visible, setVisible] = useState(false)

  return (
    <span
      className="word-span inline-block"
      tabIndex={0}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      onTouchStart={(e) => { e.preventDefault(); setVisible(v => !v) }}
      style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: '1.35rem', color: 'var(--color-saffron)', lineHeight: 1.9 }}
    >
      {word}
      {visible && (
        <span className="word-tooltip" role="tooltip">
          <strong style={{ color: 'var(--color-gold)', display: 'block' }}>{word}</strong>
          <span style={{ fontStyle: 'italic', display: 'block', marginBottom: '2px' }}>{transliteration}</span>
          {root && <span style={{ display: 'block', opacity: 0.8 }}>Root: {root}</span>}
          {grammaticalForm && <span style={{ display: 'block', opacity: 0.7, fontSize: '0.72rem' }}>{grammaticalForm}</span>}
          <span style={{ display: 'block', marginTop: '3px', fontWeight: 600, color: '#e8d5a3' }}>{meaning}</span>
        </span>
      )}
    </span>
  )
}

export default function WordBreakdown({ words }) {
  if (!words || words.length === 0) return null

  return (
    <div className="space-y-5">
      {/* Section header */}
      <h3 style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
        Sanskrit Word Breakdown
      </h3>

      {/* Inline highlighted verse */}
      <div className="mb-3">
        <p style={{ fontSize: '0.75rem', color: 'rgba(44,26,0,0.5)', fontFamily: 'Open Sans, sans-serif', marginBottom: '0.5rem', fontStyle: 'italic' }}>
          Hover or tap each word to reveal its meaning:
        </p>
        <div className="flex flex-wrap gap-2 p-3 rounded-lg" style={{ background: 'rgba(245,230,200,0.5)', border: '1px solid rgba(184,134,11,0.2)' }}>
          {words.map((w, i) => (
            <WordSpan
              key={i}
              word={w.word}
              transliteration={w.transliteration}
              root={w.root}
              grammaticalForm={w.grammatical_form}
              meaning={w.meaning}
            />
          ))}
        </div>
      </div>

      {/* Full breakdown table */}
      <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(184,134,11,0.25)' }}>
        <table className="breakdown-table">
          <thead>
            <tr>
              <th>Sanskrit</th>
              <th>Transliteration</th>
              <th>Root (Dhātu)</th>
              <th>Grammatical Form</th>
              <th>Meaning</th>
            </tr>
          </thead>
          <tbody>
            {words.map((w, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: '1.1rem', color: 'var(--color-saffron)', fontWeight: '600' }}>{w.word}</td>
                <td style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>{w.transliteration}</td>
                <td style={{ color: 'var(--color-deep-brown)' }}>{w.root || '—'}</td>
                <td style={{ color: 'rgba(44,26,0,0.7)', fontSize: '0.82rem' }}>{w.grammatical_form || '—'}</td>
                <td style={{ fontWeight: '600', color: 'var(--color-dark-brown)' }}>{w.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
