import useResizeObserver from "@react-hook/resize-observer"
import { useLayoutEffect, useState, useRef, useCallback, useEffect } from "react"
import '@/components/ui/image.css'



export const useSize = (ref, threshold) => {
  const [size, setSize] = useState(null)
  // Reference to the request animation frame numbers
  const rafNumbers = useRef([])
  // Store the size from the first animation frame
  const pendingSize = useRef>(null)

  const updateSize = useCallback((newSize) => {
    setSize((currentSize) => {
      if (!currentSize) {
        return newSize
      }

      const widthDiff = Math.abs(newSize.width - currentSize.width)
      const heightDiff = Math.abs(newSize.height - currentSize.height)

      if ((widthDiff > threshold || heightDiff > threshold)) {
        return newSize
      }
      return currentSize
    })
  }, [threshold])

  useLayoutEffect(() => {
    if (ref.current) {
      const { width, height } = ref.current.getBoundingClientRect()
      if (width === 0 || height === 0) {
        return
      }

      // Initial size, set immediately
      updateSize({ width, height })
    }
  }, [updateSize])

  useResizeObserver(ref, (entry) => {
    const { width, height } = entry.contentRect
    if (width === 0 || height === 0) {
      return
    }

    // Size was changed, cancel any pending animation frames that are waiting for the size to stabilize
    rafNumbers.current.forEach(rafNumber => {
      cancelAnimationFrame(rafNumber)
    })

    rafNumbers.current = []
    pendingSize.current = { width, height }
    // Wait for 3 animation frames to ensure the size is stable
    rafNumbers.current.push(requestAnimationFrame(() => {
      rafNumbers.current.push(requestAnimationFrame(() => {
        rafNumbers.current.push(requestAnimationFrame(() => {
          // If no resize changed observed after 3 animation frames, update the size
          updateSize(pendingSize.current)
          pendingSize.current = null
        }))
      }))
    }))
  })

  // Cleanup RAF on unmount
  useEffect(() => {
    return () => {
      rafNumbers.current.forEach(rafNumber => {
        cancelAnimationFrame(rafNumber)
      })
    }
  }, [])

  return size
}
