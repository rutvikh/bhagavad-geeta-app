import { useEffect, useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}

export default function ScrollToTop() {
  const { pathname } = useLocation()

  // useLayoutEffect fires before paint — beats browser scroll restoration
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  // useEffect as belt-and-suspenders fallback after paint
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
