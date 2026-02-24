import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import chaptersData from '../data/chapters.json'

const chapters = chaptersData.chapters

export default function HamburgerMenu({ open, onClose }) {
  const [chaptersExpanded, setChaptersExpanded] = useState(false)
  const navigate = useNavigate()

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  function handleNav(path) {
    navigate(path)
    onClose()
  }

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="drawer-overlay" onClick={onClose} />

      {/* Drawer */}
      <nav className={`drawer ${open ? 'open' : ''}`} aria-label="Main navigation">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="mb-6 ml-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors"
          style={{ color: 'var(--color-light-gold)' }}
        >
          ✕
        </button>

        <nav className="flex flex-col gap-1">
          <NavItem onClick={() => handleNav('/')}>
            🏠 Home — Verse of the Day
          </NavItem>

          <NavItem onClick={() => handleNav('/overview')}>
            📖 Overview
          </NavItem>

          {/* Chapters accordion */}
          <button
            onClick={() => setChaptersExpanded(v => !v)}
            className="w-full text-left px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10 flex items-center justify-between"
            style={{ color: 'var(--color-light-gold)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.92rem', fontWeight: '600' }}
          >
            <span>📚 Chapters</span>
            <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: chaptersExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
          </button>

          {chaptersExpanded && (
            <div className="ml-3 border-l pl-3 flex flex-col gap-0.5 mt-1 mb-1" style={{ borderColor: 'rgba(184,134,11,0.3)' }}>
              {chapters.map(ch => (
                <button
                  key={ch.number}
                  onClick={() => handleNav(`/chapter/${ch.number}`)}
                  className="text-left px-2 py-1.5 rounded transition-colors hover:bg-white/10"
                  style={{ color: 'rgba(255,248,230,0.8)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.8rem' }}
                >
                  <span style={{ color: 'var(--color-gold)', fontWeight: '700', marginRight: '0.4em' }}>{ch.number}.</span>
                  {ch.english_name}
                  <span className="ml-1 opacity-50" style={{ fontSize: '0.72rem' }}>({ch.verse_count}v)</span>
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Footer tag */}
        <div className="mt-auto pt-8 text-center" style={{ color: 'rgba(255,248,230,0.35)', fontSize: '0.72rem', fontFamily: 'Open Sans, sans-serif' }}>
          ॥ श्रीमद्भगवद्गीता ॥
        </div>
      </nav>
    </>
  )
}

function NavItem({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-3 py-2.5 rounded-lg transition-colors hover:bg-white/10"
      style={{ color: 'var(--color-light-gold)', fontFamily: 'Open Sans, sans-serif', fontSize: '0.92rem', fontWeight: '600' }}
    >
      {children}
    </button>
  )
}
