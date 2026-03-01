# ॥ श्रीमद्भगवद्गीता ॥ Bhagavad Geeta Web App

A temple in your browser — all 700 verses of the Bhagavad Geeta with Sanskrit,
transliteration, English translation, word-by-word breakdown, audio chanting,
and four tradition-spanning commentaries.

**Live site:** https://rutvikh.github.io/bhagavad-geeta-app

---

## Features

- All 18 chapters with summaries, themes, and verse grids
- Sanskrit (Devanagari) + IAST transliteration + English translation (Yogananda style)
- Audio player with variable playback speed (0.5×–2×) for each verse
- Word-by-word Sanskrit breakdown with IAST transliteration, grammatical form, and root analysis
- Four commentary traditions:
  - Shri Pandurang Athavale (Dadaji) — Swadhyay Parivaar
  - Swami Sarvapriyananda — Vedanta Society of New York
  - Paramahansa Yogananda — God Talks With Arjuna
  - Jayadayal Goyandka — Tatvavivecani
- Verse of the Day (date-hash algorithm cycles through all 700)
- Reading progress tracking per chapter (localStorage)
- Keyboard navigation (← →) between verses; last verse links to next chapter
- Fully mobile responsive
- Static — no backend, GitHub Pages ready

## Tech Stack

- React 18 + Vite
- React Router v6 (HashRouter for GitHub Pages compatibility)
- Tailwind CSS v3 + custom CSS design tokens
- JSON data files (no database, no API)
- Vitest + React Testing Library (unit/component tests)
- Playwright (E2E smoke tests)

## Quick Start

### Prerequisites

Node.js v18 or newer:
```bash
brew install node        # macOS via Homebrew
# or download from https://nodejs.org
```

### Setup

```bash
npm install
npm run dev
# → http://localhost:5173
```

### Build

```bash
npm run build       # production build → dist/
npm run preview     # serve the build locally at http://localhost:4173
```

---

## Testing

### Unit & Component Tests (Vitest)

```bash
npm run test          # run once
npm run test:watch    # watch mode
```

Covers:
- `src/services/geetaService.test.js` — 17 tests for all service functions (chapter queries, verse loading, date-hash logic, localStorage round-trips)
- `src/components/AudioPlayer.test.jsx` — 6 tests for the speed control and player UI
- `src/data/verses.test.js` — 4 data integrity tests: all 18 chapter files exist, verse counts match metadata, no numbering gaps, all 700 verses have every mandatory field populated (reports every failing verse)

### E2E Smoke Tests (Playwright)

Requires the build to be running (`npm run preview`) or the test runner starts it automatically.

```bash
npm run test:e2e      # runs 13 smoke tests against http://localhost:4173
```

Covers:
- Verse of the Day page: Sanskrit renders, audio player visible, speed select with 6 options, defaults to 1×
- Chapter page: heading, featured verse preview, hamburger menu with 18 chapters
- Verse page: Sanskrit text, audio player, keyboard ← → navigation
- Visited state: dot appears on chapter grid after visiting a verse (localStorage)
- Last verse → next chapter navigation link

### Audio Link Audit (manual, slow)

Checks all 700 IITK fallback audio URLs with HTTP HEAD requests:

```bash
npm run test:audio    # ~2-3 minutes, concurrency 20
```

### Pre-push Hook & Deploy Guard

- A git pre-push hook runs `npm run test` automatically before every push — push is blocked if any unit/data test fails.
- `npm run deploy` runs the build + E2E tests before publishing to GitHub Pages.

---

## Deploy to GitHub Pages

1. Update `homepage` in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/YOUR_REPO"
   ```

2. Push to GitHub:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

3. Deploy (builds, runs E2E tests, publishes):
   ```bash
   npm run deploy
   ```

4. In the GitHub repo: Settings → Pages → Source: `gh-pages` branch

---

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── images/             # krishna-arjuna-bg.jpg (1920×1080+)
│       └── audio/              # ch01/verse_01_01.mp3, ch02/verse_02_47.mp3 …
├── src/
│   ├── services/
│   │   └── geetaService.js     # single data access layer (all chapter/verse/localStorage logic)
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── VerseCard.jsx
│   │   ├── AudioPlayer.jsx     # HTML5 audio + variable speed control
│   │   ├── WordBreakdown.jsx
│   │   ├── CommentaryTabs.jsx
│   │   ├── VerseGrid.jsx
│   │   └── ChapterGrid.jsx
│   ├── pages/
│   │   ├── Home.jsx            # Verse of the Day
│   │   ├── Overview.jsx        # Introduction + chapter grid
│   │   ├── ChapterPage.jsx     # Chapter summary + verse grid
│   │   └── VersePage.jsx       # Full verse with all features
│   ├── data/
│   │   ├── chapters.json       # 18 chapter metadata
│   │   └── verses/             # chapter_01.json … chapter_18.json
│   ├── test-setup.js           # Vitest global setup (localStorage mock)
│   ├── App.jsx
│   └── index.css
├── tests/
│   ├── smoke.spec.js           # Playwright E2E (13 tests)
│   └── audio-links.spec.js     # IITK audio URL audit (manual)
├── playwright.config.js
├── vite.config.js
└── tailwind.config.js
```

## Data Schema

### Chapter (`src/data/chapters.json`)

```json
{
  "number": 2,
  "sanskrit_name": "सांख्ययोग",
  "english_name": "Sankhya Yoga",
  "subtitle": "The Yoga of Knowledge",
  "verse_count": 72,
  "themes": ["duty", "soul", "knowledge"],
  "summary": "...",
  "featured_verse": "2.47"
}
```

### Verse (`src/data/verses/chapter_NN.json`)

```json
{
  "verse": 47,
  "sanskrit": "कर्मण्येवाधिकारस्ते...",
  "transliteration": "karmaṇy evādhikāras te...",
  "translation": "...",
  "audio": "ch02/verse_02_47.mp3",
  "word_breakdown": [
    {
      "word": "कर्मणि",
      "transliteration": "karmaṇi",
      "root": "√kṛ (to do, to act)",
      "grammatical_form": "noun, neuter, locative singular",
      "meaning": "in action"
    }
  ],
  "commentary": {
    "dadaji": "...",
    "sarvapriyananda": "...",
    "yogananda": "...",
    "goyandka": "..."
  }
}
```

---

*"Where there is Krishna, the Lord of Yoga, and Arjuna the archer — there abide prosperity, victory, happiness, and righteousness."* — BG 18.78
