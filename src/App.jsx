import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Overview from './pages/Overview'
import ChapterPage from './pages/ChapterPage'
import VersePage from './pages/VersePage'

export default function App() {
  return (
    <HashRouter>
      {/* Fixed parallax background */}
      <div className="page-bg" aria-hidden="true" />

      <div className="relative min-h-screen">
        <Navbar />

        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/verse-of-the-day" element={<Home />} />
          <Route path="/chapter/:chapterNumber" element={<ChapterPage />} />
          <Route path="/chapter/:chapterNumber/verse/:verseNumber" element={<VersePage />} />
        </Routes>

        {/* Footer */}
        <footer className="text-center py-6 mt-8">
          <p className="text-sm opacity-60" style={{ color: 'var(--color-dark-brown)', fontFamily: 'Open Sans, sans-serif' }}>
            <span style={{ fontSize: '1.1rem' }}>🪷</span>{' '}
            Wisdom from the Bhagavad Geeta — offered with devotion
          </p>
        </footer>
      </div>
    </HashRouter>
  )
}
