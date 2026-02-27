import { useState } from 'react'

const TABS = [
  {
    key: 'dadaji',
    label: 'Dadaji',
    fullName: 'Shri Pandurang Athavale',
    subtitle: 'Swadhyay Parivaar',
    color: '#C0521A',
  },
  {
    key: 'sarvapriyananda',
    label: 'Swami Sarvapriyananda',
    fullName: 'Swami Sarvapriyananda',
    subtitle: 'Vedanta Society of New York',
    color: '#8B5E00',
  },
  {
    key: 'yogananda',
    label: 'Yogananda',
    fullName: 'Paramahansa Yogananda',
    subtitle: 'God Talks With Arjuna',
    color: '#5E6B00',
  },
  {
    key: 'goyandka',
    label: 'Gita Press',
    fullName: 'Jayadayal Goyandka',
    subtitle: 'Tatvavivecani',
    color: '#005E5A',
    hidden: true,
  },
  {
    key: 'guruji',
    label: 'Guruji (Geeta Study)',
    fullName: 'Guruji',
    subtitle: 'Geeta Study',
    color: '#7B3FA0',
    wip: true,
  },
]

export default function CommentaryTabs({ commentary }) {
  const [active, setActive] = useState('dadaji')

  if (!commentary) return null

  const activeTab = TABS.find(t => t.key === active)
  const text = commentary[active]

  return (
    <div>
      <h3 style={{ color: 'var(--color-gold)', fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
        Commentary
      </h3>

      {/* Tab buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {TABS.filter(tab => !tab.hidden).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`tab-btn ${active === tab.key ? 'active' : ''}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active commentator info */}
      <div
        className="mb-3 px-3 py-2 rounded-lg"
        style={{ background: 'rgba(245,230,200,0.5)', borderLeft: `3px solid ${activeTab?.color || 'var(--color-saffron)'}` }}
      >
        <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '0.88rem', color: 'var(--color-deep-brown)', margin: 0 }}>
          {activeTab?.fullName}
        </p>
        <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(44,26,0,0.6)', margin: 0, fontStyle: 'italic' }}>
          {activeTab?.subtitle}
        </p>
      </div>

      {/* Commentary text */}
      <div className="space-y-3">
        {activeTab?.wip ? (
          <div
            className="flex flex-col items-center text-center rounded-xl px-6 py-8"
            style={{ background: 'rgba(245,230,200,0.5)', border: '1.5px dashed #B8860B' }}
          >
            <span style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🪔</span>
            <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '1rem', color: 'var(--color-saffron)', margin: '0 0 0.25rem' }}>
              Guruji's Commentary
            </p>
            <p style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', fontSize: '1rem', color: 'var(--color-saffron)', margin: '0 0 1rem' }}>
              is being compiled
            </p>
            <div style={{ width: '60%', height: '1px', background: '#B8860B', opacity: 0.4, marginBottom: '1rem' }} />
            <p style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.83rem', color: 'rgba(44,26,0,0.65)', margin: 0, lineHeight: '1.6' }}>
              This section will contain insights from<br />Geeta Study sessions. Coming soon.
            </p>
          </div>
        ) : text ? (
          text.split('\n\n').map((para, i) => (
            <p key={i} className="commentary-text" style={{ margin: 0 }}>
              {para}
            </p>
          ))
        ) : (
          <p className="commentary-text" style={{ fontStyle: 'italic', opacity: 0.6 }}>
            Commentary for this verse will be added in a future update.
          </p>
        )}
      </div>
    </div>
  )
}
