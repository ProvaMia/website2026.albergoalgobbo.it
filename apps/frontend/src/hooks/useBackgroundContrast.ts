import { useState, useEffect, type RefObject } from 'react'

interface UseBackgroundContrastOptions {
  containerRef?: RefObject<HTMLElement | null>
}

/**
 * Detects whether the background behind a given element is dark or light.
 * Samples the pixel color from a canvas snapshot of the area behind the element.
 */
export function useBackgroundContrast(
  elementRef: RefObject<HTMLElement | null>,
  options: UseBackgroundContrastOptions = {}
): 'dark' | 'light' {
  const [background, setBackground] = useState<'dark' | 'light'>('light')

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const check = () => {
      const rect = element.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      // Find the element behind at the center point
      const hidden = element.style.visibility
      element.style.visibility = 'hidden'
      const behind = document.elementFromPoint(x, y)
      element.style.visibility = hidden

      if (!behind) return

      const style = getComputedStyle(behind)
      const bg = style.backgroundColor

      const match = bg.match(/\d+/g)
      if (match && match.length >= 3) {
        const [r, g, b] = match.map(Number)
        // Relative luminance formula
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
        setBackground(luminance < 0.5 ? 'dark' : 'light')
      }
    }

    check()

    const observer = new IntersectionObserver(check, {
      root: options.containerRef?.current,
      threshold: [0, 0.5, 1],
    })
    observer.observe(element)

    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [elementRef, options.containerRef])

  return background
}
