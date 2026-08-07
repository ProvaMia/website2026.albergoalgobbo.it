import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      // On first load just reset without animation so the browser starts at the top.
      window.scrollTo({ top: 0 })
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])

  return null
}
