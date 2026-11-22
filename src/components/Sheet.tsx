// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
export const Sheet = ({ isOpen, onClose, title, subtitle, headerRight, footer, children, maxWidth = `max-w-xl` }) => (
  useEffect(() => {
    if (!isOpen) return
    let n = (e) => {
      e.key === `Escape` && onClose()
    }
    return (window.addEventListener(`keydown`, n), () => window.removeEventListener(`keydown`, n))
  }, [isOpen, onClose]),
  isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center liquid-sheet-backdrop p-0 sm:p-4"
          onClick={onClose}
        >
          <div
            className={`w-full ${maxWidth} rounded-t-[36px] sm:rounded-[36px] bg-[#FCFBF9] border-t sm:border border-white/80 liquid-sheet-container max-h-[92vh] flex flex-col overflow-hidden`}
            onClick={(e) => e.stopPropagation()}
          >
            <div onClick={onClose} className="pt-3 pb-1.5 flex justify-center cursor-pointer shrink-0" aria-label="Fermer le panneau">
              <div className="w-12 h-1.5 rounded-full bg-[#EC4899]/25 hover:bg-[#EC4899]/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] transition-all" />
            </div>
            {(title || headerRight) && (
              <div className="px-5 sm:px-6 pb-3.5 pt-1 border-b border-[#FBCFE8]/60 flex items-center justify-between gap-3 shrink-0 bg-[#FCFBF9]/95 backdrop-blur-md">
                <div className="min-w-0">
                  {title && <div className="text-base sm:text-lg font-bold text-[#3B0726] font-display leading-tight">{title}</div>}
                  {subtitle && <p className="text-xs text-[#7A616F] font-medium mt-0.5 truncate">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {headerRight}
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-9 h-9 min-w-[36px] min-h-[36px] rounded-full bg-[#FDF2F8] hover:bg-[#FCE7F3] text-[#831843] flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-2xs border border-white/60"
                    aria-label="Fermer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-4 space-y-4 text-xs text-[#3B0726]">{children}</div>
            {footer && (
              <div className="px-5 sm:px-6 py-3.5 border-t border-[#FBCFE8]/60 bg-[#FCFBF9]/95 backdrop-blur-md shrink-0 pb-[max(1.25rem,calc(env(safe-area-inset-bottom)+0.75rem))] shadow-[0_-8px_20px_rgba(59,7,38,0.06)]">
                {footer}
              </div>
            )}
          </div>
        </div>,
        document.body,
      )
    : null
)
