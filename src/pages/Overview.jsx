import { Link } from 'react-router-dom'
import ChapterGrid from '../components/ChapterGrid'
import chaptersData from '../data/chapters.json'

const chapters = chaptersData.chapters

export default function Overview() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">

      {/* Page header */}
      <div className="text-center fade-in-up">
        <h1 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '2rem', fontWeight: '700', color: 'var(--color-saffron)', margin: 0 }}>
          Overview
        </h1>
        <p className="transliteration mt-1" style={{ fontSize: '1rem' }}>
          Introduction to the Bhagavad Geeta
        </p>
      </div>

      {/* What is the Bhagavad Geeta? */}
      <Section title="What is the Bhagavad Geeta?">
        <p className="commentary-text">
          The Bhagavad Geeta — literally "the Song of God" — is one of the most luminous spiritual texts ever composed. Comprising 700 verses set within the epic Mahabharata, it records a profound dialogue between Shri Krishna and the warrior-prince Arjuna on the eve of the great Kurukshetra war. At the moment when Arjuna's courage fails and he is overwhelmed by grief and confusion, Krishna — his charioteer and divine friend — reveals to him the eternal truths of life, duty, consciousness, and liberation.
        </p>
        <p className="commentary-text mt-3">
          Though rooted in a specific historical moment, the Geeta's wisdom transcends time. Its teachings address the fundamental questions every human being faces: Who am I? What is my duty? How should I act in the face of suffering? What is the nature of God? Generation after generation, across continents and traditions, seekers have found in its 700 verses a complete guide to living — and to dying — with wisdom, devotion, and inner freedom.
        </p>
        <p className="commentary-text mt-3">
          The text is organized into 18 chapters (adhyāyas), each exploring a different facet of yoga — union with the Divine. Together they form a complete spiritual science, encompassing the paths of knowledge (Jnana Yoga), devotion (Bhakti Yoga), selfless action (Karma Yoga), and meditation (Raja Yoga).
        </p>
      </Section>

      {/* The Dialogue */}
      <Section title="The Divine Dialogue — Krishna and Arjuna">
        <p className="commentary-text">
          <strong style={{ color: 'var(--color-deep-brown)' }}>Arjuna</strong> is the greatest archer of his age, a Pandava prince renowned for his valor. Yet when he surveys the opposing army on the field of Kurukshetra — filled with teachers, kinsmen, and beloved elders — he is seized by sorrow and refuses to fight. "What is the use of victory if it brings only grief?" he asks, and lays down his bow.
        </p>
        <p className="commentary-text mt-3">
          <strong style={{ color: 'var(--color-deep-brown)' }}>Shri Krishna</strong>, his divine charioteer and intimate friend, responds not with a call to arms, but with the deepest teaching ever given. He reminds Arjuna that the soul (Ātman) is eternal and indestructible; that action performed without attachment to its fruits is the highest dharma; that God dwells in all beings; and that liberation is available to anyone who walks the path of love, knowledge, and selfless service.
        </p>
        <p className="commentary-text mt-3">
          <strong style={{ color: 'var(--color-deep-brown)' }}>Kurukshetra</strong> is both a literal battlefield and a perennial symbol. Every human life is a Kurukshetra — a field where the forces of wisdom and ignorance, selflessness and ego, clarity and delusion, engage in constant battle. The Geeta is Krishna's answer to Arjuna's — and every soul's — deepest confusion.
        </p>
      </Section>

      {/* The Four Paths of Yoga */}
      <Section title="The Four Paths of Yoga">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'Jnana Yoga', subtitle: 'The Path of Knowledge', desc: 'Discrimination between the eternal and the transient, culminating in the direct knowledge "I am Brahman." Emphasized in Chapters 2, 4, 13, and 15.' },
            { name: 'Bhakti Yoga', subtitle: 'The Path of Devotion', desc: 'Loving surrender to the Divine in all its forms. Described most fully in Chapter 12, and woven throughout in Krishna\'s repeated invitations to "fix your mind on Me."' },
            { name: 'Karma Yoga', subtitle: 'The Path of Selfless Action', desc: 'Acting in the world without attachment to results — doing one\'s duty as an offering to God. The cornerstone teaching of Chapter 3 and the heart of the Geeta.' },
            { name: 'Raja Yoga', subtitle: 'The Path of Meditation', desc: 'The systematic science of mind-control and inner absorption, detailed in Chapter 6. Leads to the stilling of the mind and direct experience of the Self.' },
          ].map(path => (
            <div key={path.name} className="verse-card" style={{ padding: '1.25rem' }}>
              <h3 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontWeight: '700', color: 'var(--color-saffron)', margin: '0 0 0.2rem 0', fontSize: '1rem' }}>
                {path.name}
              </h3>
              <p style={{ fontStyle: 'italic', color: 'var(--color-gold)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.82rem', margin: '0 0 0.5rem 0' }}>
                {path.subtitle}
              </p>
              <p className="commentary-text" style={{ margin: 0 }}>{path.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 18 Chapters at a Glance */}
      <Section title="The 18 Chapters at a Glance">
        <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid rgba(184,134,11,0.25)' }}>
          <table className="breakdown-table w-full">
            <thead>
              <tr>
                <th style={{ width: '3rem' }}>Ch.</th>
                <th>Name</th>
                <th>Theme</th>
                <th style={{ width: '5rem', textAlign: 'center' }}>Verses</th>
              </tr>
            </thead>
            <tbody>
              {chapters.map(ch => (
                <tr key={ch.number}>
                  <td style={{ textAlign: 'center', fontWeight: '700', color: 'var(--color-saffron)' }}>
                    <Link to={`/chapter/${ch.number}`} style={{ color: 'inherit', textDecoration: 'none' }}>{ch.number}</Link>
                  </td>
                  <td>
                    <Link to={`/chapter/${ch.number}`} style={{ textDecoration: 'none' }}>
                      <span style={{ fontFamily: 'Noto Serif Devanagari, serif', fontSize: '0.95rem', color: 'var(--color-saffron)', display: 'block', lineHeight: 1.4 }}>{ch.sanskrit_name}</span>
                      <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '0.78rem', color: 'var(--color-deep-brown)', fontWeight: '600' }}>{ch.english_name}</span>
                    </Link>
                  </td>
                  <td style={{ fontStyle: 'italic', color: 'rgba(44,26,0,0.65)', fontSize: '0.82rem', fontFamily: 'Open Sans, sans-serif' }}>
                    {ch.subtitle}
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: '700', color: 'var(--color-dark-brown)' }}>
                    {ch.verse_count}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* How to use */}
      <Section title="How to Use This Website">
        <div className="verse-card" style={{ padding: '1.5rem' }}>
          {[
            { icon: '📖', title: 'Navigate by Chapter', desc: 'Use the hamburger menu (☰) in the top-right corner to jump to any of the 18 chapters. Each chapter page shows a summary, themes, and a grid of all its verses.' },
            { icon: '🔤', title: 'Read the Verse Card', desc: 'Every verse is shown in Devanagari Sanskrit, Roman transliteration, and an English translation. Hover or tap individual Sanskrit words to see their meanings.' },
            { icon: '🎵', title: 'Listen to the Chanting', desc: 'Press ▶ to hear the verse recited in traditional chanting style. Use the progress bar to seek.' },
            { icon: '📚', title: 'Explore Four Traditions', desc: 'Switch between the four commentary tabs — Dadaji, Swami Sarvapriyananda, Yogananda, and Goyandka — to see the same verse through different spiritual eyes.' },
            { icon: '✅', title: 'Track Your Progress', desc: 'Visited verses appear highlighted in the chapter verse grid, so you can track how far you\'ve journeyed through the Geeta.' },
          ].map(item => (
            <div key={item.title} className="flex gap-3 mb-4 last:mb-0">
              <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <p style={{ fontWeight: '700', color: 'var(--color-deep-brown)', fontFamily: 'Open Sans, sans-serif', margin: '0 0 0.2rem 0', fontSize: '0.92rem' }}>{item.title}</p>
                <p className="commentary-text" style={{ margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Chapter Grid */}
      <Section title="Explore All 18 Chapters">
        <ChapterGrid chapters={chapters} />
      </Section>

    </main>
  )
}

function Section({ title, children }) {
  return (
    <section className="fade-in-up">
      <h2 style={{ fontFamily: 'Libre Baskerville, Georgia, serif', fontSize: '1.4rem', fontWeight: '700', color: 'var(--color-gold)', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(184,134,11,0.3)' }}>
        {title}
      </h2>
      {children}
    </section>
  )
}
