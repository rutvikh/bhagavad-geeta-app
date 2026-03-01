import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Vitest v4 jsdom does not fully implement localStorage.
// Provide a complete in-memory implementation as a global stub.
const _store = new Map()
const localStorageMock = {
  getItem:    (key) => _store.get(key) ?? null,
  setItem:    (key, val) => _store.set(key, String(val)),
  removeItem: (key) => _store.delete(key),
  clear:      () => _store.clear(),
  get length() { return _store.size },
  key:        (i) => Array.from(_store.keys())[i] ?? null,
}
vi.stubGlobal('localStorage', localStorageMock)
