// components/ToastNotification.tsx
import { useEffect, useState } from 'react'

type ToastType = 'featuring' | 'posting' | 'saving' | 'success' | 'error'

interface Toast {
  id: number
  type: ToastType
  title: string
  subtitle?: string
  done?: boolean
}

interface ToastNotificationProps {
  toasts: Toast[]
  onRemove: (id: number) => void
}

export function ToastNotification({ toasts, onRemove }: ToastNotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2.5 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: number) => void }) {
  useEffect(() => {
    const delay = toast.done ? 2500 : 8000
    const t = setTimeout(() => onRemove(toast.id), delay)
    return () => clearTimeout(t)
  }, [toast.id, toast.done])

  return (
    <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl !px-4 !py-3.5 min-w-[280px] max-w-[360px] shadow-sm animate-slide-in">
      {toast.done ? (
        <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <svg className="w-3 h-3 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      ) : (
        <span className="w-5 h-5 rounded-full border-2 border-gray-200 border-t-purple-600 animate-spin shrink-0" />
      )}
      <div>
        <p className="text-sm font-medium text-gray-900 leading-tight">{toast.title}</p>
        {toast.subtitle && (
          <p className="text-xs text-gray-500 !mt-0.5">{toast.subtitle}</p>
        )}
      </div>
    </div>
  )
}