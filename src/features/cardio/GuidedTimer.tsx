import { Pause, Play, SkipBack, SkipForward, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatClock } from '../../lib/workout'
import { playFinisherBeep } from '../workouts/helpers'
import type { CardioStep } from './cardioSessions'

/**
 * Minuteur guidé plein écran : étape par étape, compte à rebours, bips et vibration aux changements,
 * réglages de la machine affichés (vitesse, pente, niveau). L'écran reste allumé pendant la séance.
 */
export function GuidedTimer({ title, steps, onClose, onFinish }: {
  title: string
  steps: CardioStep[]
  onClose: () => void
  /** Appelé à la fin avec la durée réellement effectuée (minutes). */
  onFinish?: (minutes: number) => void
}) {
  const [index, setIndex] = useState(0)
  const [left, setLeft] = useState(steps[0]?.seconds ?? 0)
  const [running, setRunning] = useState(true)
  const [elapsed, setElapsed] = useState(0)
  const [done, setDone] = useState(false)
  const wakeLock = useRef<{ release: () => Promise<void> } | null>(null)
  const step = steps[index]
  const next = steps[index + 1]
  const total = steps.reduce((s, x) => s + x.seconds, 0)

  // Garde l'écran allumé (si le navigateur le permet).
  useEffect(() => {
    const nav = navigator as Navigator & { wakeLock?: { request: (t: 'screen') => Promise<{ release: () => Promise<void> }> } }
    nav.wakeLock?.request('screen').then((l) => { wakeLock.current = l }).catch(() => {})
    return () => { void wakeLock.current?.release().catch(() => {}) }
  }, [])

  useEffect(() => {
    if (!running || done) return
    const t = setInterval(() => {
      setElapsed((e) => e + 1)
      setLeft((l) => {
        if (l > 1) {
          if (l <= 4) playFinisherBeep('countdown')
          return l - 1
        }
        setIndex((i) => {
          const ni = i + 1
          if (ni >= steps.length) { setDone(true); playFinisherBeep('complete'); return i }
          playFinisherBeep(steps[ni].effort ? 'effort' : 'rest')
          setLeft(steps[ni].seconds)
          return ni
        })
        return 0
      })
    }, 1000)
    return () => clearInterval(t)
  }, [running, done, steps])

  const go = (i: number) => {
    if (i < 0 || i >= steps.length) return
    setIndex(i); setLeft(steps[i].seconds); playFinisherBeep('transition')
  }
  const finish = () => { onFinish?.(Math.max(1, Math.round(elapsed / 60))); onClose() }

  const settings = step ? [
    step.speed !== undefined && { label: 'Vitesse', value: `${step.speed.toLocaleString('fr-FR')} km/h` },
    step.incline !== undefined && { label: 'Pente', value: `${step.incline} %` },
    step.level !== undefined && { label: 'Niveau', value: `${step.level}` },
  ].filter(Boolean) as { label: string; value: string }[] : []

  return createPortal(
    <div className={`fixed inset-0 z-[90] flex flex-col text-white transition-colors ${step?.effort ? 'bg-[#781539]' : 'bg-[#1f0c17]'}`} role="dialog" aria-modal="true" aria-label={title}>
      <header className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))]">
        <div><p className="text-sm text-white/70">{title}</p><p className="font-mono text-sm">{formatClock(elapsed)} / {formatClock(total)}</p></div>
        <button onClick={onClose} aria-label="Quitter le minuteur" className="grid size-10 place-items-center rounded-full bg-white/10"><X size={18} /></button>
      </header>
      <div className="mx-5 mt-3 h-1.5 overflow-hidden rounded-full bg-white/15"><div className="h-full bg-pink transition-all" style={{ width: `${(elapsed / total) * 100}%` }} /></div>

      {done ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <p className="font-display text-4xl font-bold">Séance terminée 🎉</p>
          <p className="text-white/80">{Math.round(elapsed / 60)} minutes de cardio. Bravo !</p>
          {onFinish && <button onClick={finish} className="rounded-full bg-white px-6 py-3 font-semibold text-[#781539]">Enregistrer dans mon journal</button>}
          <button onClick={onClose} className="text-sm text-white/70 underline">Fermer sans enregistrer</button>
        </div>
      ) : step && (
        <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
          <p className="text-sm text-white/70">Étape {index + 1} sur {steps.length}</p>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">{step.label}</h2>
          <p className="font-mono text-7xl font-bold tabular-nums sm:text-8xl" aria-live="off">{formatClock(left)}</p>
          {settings.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {settings.map((s) => <span key={s.label} className="rounded-2xl bg-white/12 px-4 py-2"><span className="block text-xs text-white/70">{s.label}</span><span className="font-mono text-xl font-bold">{s.value}</span></span>)}
            </div>
          )}
          {step.cue && <p className="max-w-sm text-white/85">{step.cue}</p>}
          {next && <p className="text-sm text-white/60">Ensuite : {next.label} · {formatClock(next.seconds)}</p>}
        </div>
      )}

      {!done && (
        <footer className="flex items-center justify-center gap-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <button onClick={() => go(index - 1)} disabled={index === 0} aria-label="Étape précédente" className="grid size-14 place-items-center rounded-full bg-white/10 disabled:opacity-30"><SkipBack size={22} /></button>
          <button onClick={() => setRunning(!running)} aria-label={running ? 'Pause' : 'Reprendre'} className="grid size-20 place-items-center rounded-full bg-white text-[#781539]">{running ? <Pause size={30} /> : <Play size={30} />}</button>
          <button onClick={() => (index === steps.length - 1 ? (setDone(true), playFinisherBeep('complete')) : go(index + 1))} aria-label="Étape suivante" className="grid size-14 place-items-center rounded-full bg-white/10"><SkipForward size={22} /></button>
        </footer>
      )}
    </div>,
    document.body,
  )
}
