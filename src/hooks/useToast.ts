// hooks/useToast.ts
import { useState, useCallback } from 'react'

let nextId = 0

export function useToast() {
  const [toasts, setToasts] = useState<any[]>([])

  const addToast = useCallback((title: string, subtitle?: string, done = false) => {
    const id = nextId++
    setToasts(prev => [...prev, { id, title, subtitle, done }])
    return id
  }, [])

  const resolveToast = useCallback((id: number, title: string, subtitle?: string) => {
    setToasts(prev =>
      prev.map(t => t.id === id ? { ...t, title, subtitle, done: true } : t)
    )
  }, [])

  const removeToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return { toasts, addToast, resolveToast, removeToast }
}