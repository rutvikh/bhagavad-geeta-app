import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import AudioPlayer from './AudioPlayer'

// jsdom does not implement HTMLMediaElement — stub the methods it needs
beforeEach(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    writable: true,
    value: vi.fn().mockResolvedValue(undefined),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    writable: true,
    value: vi.fn(),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'playbackRate', {
    configurable: true,
    writable: true,
    value: 1,
  })
})

describe('AudioPlayer — speed control', () => {
  it('renders the speed select with default value 1', () => {
    render(<AudioPlayer src="test.mp3" />)
    const select = screen.getByRole('combobox', { name: /playback speed/i })
    expect(select).toBeInTheDocument()
    expect(select.value).toBe('1')
  })

  it('renders all 6 speed options', () => {
    render(<AudioPlayer src="test.mp3" />)
    const options = screen.getAllByRole('option')
    const values = options.map(o => o.value)
    expect(values).toEqual(['0.5', '0.75', '1', '1.25', '1.5', '2'])
  })

  it('updates audio.playbackRate when speed is changed', () => {
    render(<AudioPlayer src="test.mp3" />)
    const select = screen.getByRole('combobox', { name: /playback speed/i })
    fireEvent.change(select, { target: { value: '1.5' } })
    expect(select.value).toBe('1.5')
  })

  it('hides the speed select when the audio errors', () => {
    render(<AudioPlayer src="broken.mp3" />)
    const audio = document.querySelector('audio')
    fireEvent.error(audio)
    expect(screen.queryByRole('combobox', { name: /playback speed/i })).not.toBeInTheDocument()
  })
})

describe('AudioPlayer — play/pause', () => {
  it('renders the play button initially', () => {
    render(<AudioPlayer src="test.mp3" />)
    expect(screen.getByRole('button', { name: /play/i })).toBeInTheDocument()
  })

  it('disables the play button on error', () => {
    render(<AudioPlayer src="broken.mp3" />)
    const audio = document.querySelector('audio')
    fireEvent.error(audio)
    expect(screen.getByRole('button', { name: /play/i })).toBeDisabled()
  })
})
