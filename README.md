# ॥ श्रीमद्भगवद्गीता ॥ Bhagavad Geeta Web App

A temple in your browser — all 700 verses of the Bhagavad Geeta with Sanskrit,
transliteration, English translation, word-by-word breakdown, audio chanting,
and four tradition-spanning commentaries.

## Features

- 📖 All 18 chapters with chapter summaries and verse grids
- 🔤 Sanskrit (Devanagari) + IAST transliteration + English translation
- 🎵 Audio player for each verse (MP3 recitation)
- 📚 Word-by-word Sanskrit breakdown with interactive tooltips
- 💬 Four commentary traditions:
  - Shri Pandurang Athavale (Dadaji) — Swadhyay Parivaar
  - Swami Sarvapriyananda — Vedanta Society of New York
  - Paramahansa Yogananda — God Talks With Arjuna
  - Jayadayal Goyandka — Tatvavivecani
- 🌅 Verse of the Day (algorithmically cycles through all 700)
- ✅ Reading progress tracking per chapter (localStorage)
- 📱 Fully mobile responsive
- 🌐 Static — no backend, GitHub Pages ready

## Tech Stack

- React 18 + Vite
- React Router v6 (HashRouter for GitHub Pages)
- Tailwind CSS + custom CSS design tokens
- JSON data files (no database)

## Quick Start

### Prerequisites

Install Node.js (v18 or newer):
```bash
# Using Homebrew (macOS):
brew install node

# Or download from: https://nodejs.org
```

### Setup

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# → Open http://localhost:5173
```

### Build & Deploy to GitHub Pages

1. Create a GitHub repository named `bhagavad-geeta`

2. Update `homepage` in `package.json`:
   ```json
   "homepage": "https://YOUR_USERNAME.github.io/bhagavad-geeta"
   ```

3. Initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Bhagavad Geeta Web App"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/bhagavad-geeta.git
   git push -u origin main
   ```

4. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

5. In GitHub repo → Settings → Pages → set Source to `gh-pages` branch

6. Visit: `https://YOUR_USERNAME.github.io/bhagavad-geeta`

## Adding Content

### Verse Data
Add verse JSON files to `src/data/verses/`:
- `chapter_01.json` — Chapter 1 data (sample included)
- `chapter_02.json` — Chapter 2 data (full sample for key verses)
- `chapter_03.json` through `chapter_18.json`

See existing files for the schema.

### Background Image
Place your Krishna-Arjuna painting at:
```
public/assets/images/krishna-arjuna-bg.jpg
```
Minimum 1920×1080px. See `public/assets/images/README.md` for details.

### Audio Files
Place MP3 recitations at:
```
public/assets/audio/ch01/verse_01_01.mp3
public/assets/audio/ch02/verse_02_47.mp3
...
```
See `public/assets/audio/README.md` for details.

## Project Structure

```
/
├── public/
│   └── assets/
│       ├── images/         # Background image
│       └── audio/          # Verse MP3 files (ch01/, ch02/, ...)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HamburgerMenu.jsx
│   │   ├── VerseCard.jsx
│   │   ├── AudioPlayer.jsx
│   │   ├── WordBreakdown.jsx
│   │   ├── CommentaryTabs.jsx
│   │   ├── VerseGrid.jsx
│   │   └── ChapterGrid.jsx
│   ├── pages/
│   │   ├── Home.jsx        # Verse of the Day
│   │   ├── Overview.jsx    # Introduction + chapter grid
│   │   ├── ChapterPage.jsx # Chapter summary + verse grid
│   │   └── VersePage.jsx   # Full verse with all features
│   ├── data/
│   │   ├── chapters.json   # All 18 chapter metadata
│   │   └── verses/         # Per-chapter verse data
│   ├── App.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── tailwind.config.js
```

---

*"Where there is Krishna, the Lord of Yoga, and Arjuna the archer — there abide prosperity, victory, happiness, and righteousness."* — BG 18.78
