'use client'

import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { useEffect, useState } from 'react'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message?: string
  duration?: number
}

// Global toast state
let toasts: ToastMessage[] = []
let listeners: ((toasts: ToastMessage[]) => void)[] = []

const notify = (toast: Omit<ToastMessage, 'id'>) => {
  const id = Date.now().toString()
  const newToast = { id, ...toast }
  toasts = [...toasts, newToast]
  listeners.forEach(listener => listener(toasts))
  
  // Auto remove after duration
  setTimeout(() => {
    removeToast(id)
  }, toast.duration || 5000)
}

const removeToast = (id: string) => {
  toasts = toasts.filter(toast => toast.id !== id)
  listeners.forEach(listener => listener(toasts))
}

// Export toast functions
export const toast = {
  success: (title: string, message?: string, duration?: number) => 
    notify({ type: 'success', title, message, duration }),
  error: (title: string, message?: string, duration?: number) => 
    notify({ type: 'error', title, message, duration }),
  warning: (title: string, message?: string, duration?: number) => 
    notify({ type: 'warning', title, message, duration }),
  info: (title: string, message?: string, duration?: number) => 
    notify({ type: 'info', title, message, duration }),
}

const toastStyles = {
  success: {
    bg: 'bg-green-50 border-green-200',
    text: 'text-green-800',
    icon: CheckCircle,
    iconColor: 'text-green-600'
  },
  error: {
    bg: 'bg-red-50 border-red-200',
    text: 'text-red-800',
    icon: AlertCircle,
    iconColor: 'text-red-600'
  },
  warning: {
    bg: 'bg-yellow-50 border-yellow-200',
    text: 'text-yellow-800',
    icon: AlertTriangle,
    iconColor: 'text-yellow-600'
  },
  info: {
    bg: 'bg-blue-50 border-blue-200',
    text: 'text-blue-800',
    icon: Info,
    iconColor: 'text-blue-600'
  }
}

export function Toast() {
  const [toastList, setToastList] = useState<ToastMessage[]>([])

  useEffect(() => {
    const listener = (newToasts: ToastMessage[]) => {
      setToastList(newToasts)
    }
    
    listeners.push(listener)
    
    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }, [])

  if (toastList.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toastList.map((toast) => {
        const style = toastStyles[toast.type]
        const Icon = style.icon
        
        return (
          <div
            key={toast.id}
            className={`
              max-w-sm w-full ${style.bg} border rounded-lg p-4 shadow-lg
              animate-slide-down
            `}
          >
            <div className="flex items-start">
              <Icon className={`w-5 h-5 ${style.iconColor} mt-0.5 flex-shrink-0`} />
              
              <div className="ml-3 flex-1">
                <h4 className={`text-sm font-medium ${style.text}`}>
                  {toast.title}
                </h4>
                {toast.message && (
                  <p className={`mt-1 text-sm ${style.text} opacity-80`}>
                    {toast.message}
                  </p>
                )}
              </div>
              
              <button
                onClick={() => removeToast(toast.id)}
                className={`ml-3 ${style.text} opacity-60 hover:opacity-100`}
                aria-label="Fechar notificação"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}