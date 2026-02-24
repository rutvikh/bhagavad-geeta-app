import { useState } from 'react'
import { Link } from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-3"
        style={{ background: 'rgba(255,248,230,0.92)', backdropFilter: 'blur(8px)', borderBottom: '1px solid rgba(184,134,11,0.2)' }}
      >
        {/* Left spacer for centering */}
        <div className="w-10" />

        {/* Centered title */}
        <Link
          to="/"
          className="text-center flex-1"
          style={{ textDecoration: 'none' }}
        >
          <div
            className="sanskrit leading-tight"
            style={{ fontSize: '1.15rem', display: 'block' }}
          >
            ॥ श्रीमद्भगवद्गीता ॥
          </div>
          <div
            style={{
              fontFamily: 'Libre Baskerville, Georgia, serif',
              fontWeight: '700',
              fontSize: '0.78rem',
              color: 'var(--color-deep-brown)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginTop: '1px',
            }}
          >
            Bhagavad Geeta
          </div>
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-md hover:bg-amber-50 transition-colors"
        >
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-saffron)' }} />
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-saffron)' }} />
          <span className="block w-5 h-0.5 rounded" style={{ background: 'var(--color-saffron)' }} />
        </button>
      </header>

      <HamburgerMenu open={open} onClose={() => setOpen(false)} />
    </>
  )
}
