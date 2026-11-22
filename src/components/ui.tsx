import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export function Field({ icon, ...props }: InputHTMLAttributes<HTMLInputElement> & { icon?: ReactNode }) {
  return (
    <label className="flex items-center gap-3 rounded-full border border-blush-200 bg-white px-4 py-3 focus-within:border-glow-500 focus-within:ring-2 focus-within:ring-blush-200">
      {icon && <span className="text-glow-500">{icon}</span>}
      <input {...props} className="w-full bg-transparent text-sm text-plum-900 outline-none placeholder:text-plum-700/50" />
    </label>
  )
}

export function PrimaryButton({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-glow-500 to-plum-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-glow-500/25 transition hover:brightness-110 disabled:opacity-60 ${className}`}
    >
      {children}
    </button>
  )
}

export function Alert({ tone = 'error', children }: { tone?: 'error' | 'success'; children: ReactNode }) {
  const cls = tone === 'error' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
  return <p role="alert" className={`rounded-2xl border px-4 py-2.5 text-sm ${cls}`}>{children}</p>
}
