import { X } from 'lucide-react'
import { useEffect, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export function Field({ icon, className = '', ...props }: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <label className={`flex items-center gap-3 rounded-2xl border border-blush-line bg-surface px-4 py-3 focus-within:border-pink focus-within:ring-2 focus-within:ring-blush ${className}`}>
      {icon && <span className="text-pink">{icon}</span>}
      <input {...props} className="w-full min-w-0 bg-transparent text-sm text-ink outline-none placeholder:text-muted/70" />
    </label>
  )
}

export function PrimaryButton({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}
      className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink to-[#781539] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink/25 transition hover:brightness-110 active:scale-[.98] disabled:opacity-60 ${className}`}>
      {children}
    </button>
  )
}

export function Button({ children, variant = 'soft', className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'soft' | 'plum' | 'ghost' | 'danger' | 'outline' }) {
  const v = {
    soft: 'bg-soft text-plum hover:bg-blush',
    plum: 'bg-[#781539] text-white hover:bg-[#6d1438]',
    ghost: 'text-plum hover:bg-soft',
    danger: 'bg-rose-600 text-white hover:bg-rose-700',
    outline: 'border border-blush-line bg-surface text-ink hover:bg-soft',
  }[variant]
  return (
    <button {...props} className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[.98] disabled:opacity-50 ${v} ${className}`}>
      {children}
    </button>
  )
}

export function Alert({ tone = 'error', children }: { tone?: 'error' | 'success' | 'info'; children: ReactNode }) {
  const cls = { error: 'bg-rose-50 text-rose-700 border-rose-200', success: 'bg-emerald-50 text-emerald-700 border-emerald-200', info: 'bg-soft text-plum border-blush-line' }[tone]
  return <p role="alert" className={`rounded-2xl border px-4 py-2.5 text-sm ${cls}`}>{children}</p>
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-line bg-surface p-5 ${className}`}>{children}</div>
}

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <div>
        {eyebrow && <p className="text-[11px] font-bold uppercase tracking-wider text-plum">{eyebrow}</p>}
        <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export function Chip({ active, children, onClick }: { active?: boolean; children: ReactNode; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${active ? 'border-[#781539] bg-[#781539] text-white' : 'border-line bg-surface text-muted hover:text-ink'}`}>
      {children}
    </button>
  )
}

/** Panneau modal : feuille du bas sur mobile, fenêtre centrée sur ordinateur. */
export function Modal({ open, onClose, title, subtitle, headerRight, footer, children, maxWidth = 'max-w-xl' }: {
  open: boolean; onClose: () => void; title?: ReactNode; subtitle?: ReactNode; headerRight?: ReactNode; footer?: ReactNode; children: ReactNode; maxWidth?: string
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = prev }
  }, [open, onClose])
  if (!open) return null
  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-[#1f0c17]/40 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}
        className={`animate-fade-up flex max-h-[92dvh] w-full ${maxWidth} flex-col overflow-hidden rounded-t-[2rem] bg-bg text-ink shadow-2xl sm:rounded-[2rem]`}>
        <div className="flex justify-center pt-2.5 sm:hidden"><div className="h-1.5 w-10 rounded-full bg-blush-line" /></div>
        {(title || headerRight) && (
          <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-3 sm:px-6 sm:pt-6">
            <div className="min-w-0">
              {title && <div className="font-display text-xl font-bold">{title}</div>}
              {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {headerRight}
              <button type="button" onClick={onClose} aria-label="Fermer" className="grid size-9 place-items-center rounded-full bg-soft text-plum hover:bg-blush"><X size={16} /></button>
            </div>
          </div>
        )}
        <div className="flex-1 overflow-y-auto px-5 pb-5 sm:px-6 sm:pb-6">{children}</div>
        {footer && <div className="pb-safe border-t border-line bg-surface px-5 py-4 sm:px-6">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}

export function EmptyState({ icon, title, text, action }: { icon?: ReactNode; title: string; text?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-3xl border border-dashed border-blush-line bg-surface px-6 py-10 text-center">
      {icon && <div className="grid size-12 place-items-center rounded-2xl bg-soft text-plum">{icon}</div>}
      <p className="font-semibold text-ink">{title}</p>
      {text && <p className="max-w-sm text-sm text-muted">{text}</p>}
      {action}
    </div>
  )
}
