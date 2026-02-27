import { useState, useRef, useEffect, useCallback } from 'react'

function formatTime(secs) {
  if (!secs || isNaN(secs)) return '0:00'
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  useEffect(() => {
    setPlaying(false)
    setCurrentTime(0)
    setDuration(0)
    setLoaded(false)
    setError(false)
  }, [src])

  const handleTimeUpdate = useCallback(() => {
    setCurrentTime(audioRef.current?.currentTime ?? 0)
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    setDuration(audioRef.current?.duration ?? 0)
    setLoaded(true)
    setError(false)
  }, [])

  const handleEnded = useCallback(() => {
    setPlaying(false)
    setCurrentTime(0)
  }, [])

  const handleError = useCallback(() => {
    setError(true)
    setLoaded(false)
  }, [])

  function togglePlay() {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => setError(true))
    }
  }

  function handleSeek(e) {
    const audio = audioRef.current
    if (!audio || !duration) return
    const val = parseFloat(e.target.value)
    const time = (val / 100) * duration
    audio.currentTime = time
    setCurrentTime(time)
  }

  return (
    <div
      className="flex flex-col gap-2 p-3 rounded-xl"
      style={{ background: 'rgba(245,230,200,0.6)', border: '1px solid rgba(184,134,11,0.3)' }}
    >
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onError={handleError}
        preload="metadata"
      />

      <div className="flex items-center gap-3">
        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause' : 'Play'}
          disabled={error}
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all"
          style={{
            background: error ? '#ccc' : 'var(--color-saffron)',
            color: 'white',
            boxShadow: error ? 'none' : '0 2px 8px rgba(192,82,26,0.35)',
            cursor: error ? 'not-allowed' : 'pointer',
          }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="2" width="4" height="12" rx="1"/>
              <rect x="10" y="2" width="4" height="12" rx="1"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
              <polygon points="3,1 15,8 3,15"/>
            </svg>
          )}
        </button>

        {/* Progress + time */}
        <div className="flex-1 flex flex-col gap-1">
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={handleSeek}
            className="audio-progress"
            aria-label="Seek audio"
            disabled={!loaded || error}
            style={{ cursor: loaded && !error ? 'pointer' : 'default' }}
          />
          <div className="flex justify-between" style={{ fontSize: '0.72rem', color: 'var(--color-gold)', fontFamily: 'Open Sans, sans-serif' }}>
            <span>{formatTime(currentTime)}</span>
            {error ? (
              <span style={{ color: '#999', fontStyle: 'italic' }}>Audio not available</span>
            ) : (
              <span>{loaded ? formatTime(duration) : '—'}</span>
            )}
          </div>
        </div>
      </div>

      {!error && (
        <p className="text-center" style={{ fontSize: '0.7rem', color: 'rgba(44,26,0,0.45)', fontFamily: 'Open Sans, sans-serif', fontStyle: 'italic' }}>
          Sanskrit recitation in traditional chanting style
        </p>
      )}
    </div>
  )
}
