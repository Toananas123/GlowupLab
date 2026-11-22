import { getState, patchState } from '../../lib/cloud'
import type { ActiveProgram, Exercise, WorkoutExercise } from '../../types'

/**
 * Règles de progression des programmes (d'après le README : volume, surcharge, décharge, records ;
 * « version au-dessus » ; rotation par blocs pour les programmes de 8 semaines et plus).
 */

export const LEVELS = ['Débutante', 'Intermédiaire', 'Avancée', 'Pour toutes'] as const
export type Level = (typeof LEVELS)[number]

export function levelLabel(level?: string): Level {
  const l = (level ?? '').toLowerCase()
  if (l.startsWith('débutant')) return 'Débutante'
  if (l.startsWith('avancé')) return 'Avancée'
  if (l.startsWith('intermédiaire')) return 'Intermédiaire'
  return 'Pour toutes'
}

export interface WeekPhase { name: 'Volume' | 'Surcharge' | 'Décharge' | 'Records'; loadPct: number; setsDelta: number; note: string }

/** Phase de la semaine dans un programme de `total` semaines. */
export function weekPhase(week: number, total: number): WeekPhase {
  if (total >= 4 && week === total) return { name: 'Records', loadPct: 5, setsDelta: 0, note: 'Semaine records : vise une nouvelle charge maximale sur ta dernière série.' }
  if (week % 4 === 0) return { name: 'Décharge', loadPct: -10, setsDelta: -1, note: 'Semaine de décharge : charges –10 % et une série de moins pour récupérer.' }
  if (week <= 2) return { name: 'Volume', loadPct: 0, setsDelta: 0, note: 'Semaine volume : charges stables, vise le haut de la fourchette de répétitions.' }
  return { name: 'Surcharge', loadPct: Math.min(10, (week - 2) * 2.5), setsDelta: 0, note: 'Semaine surcharge : charges augmentées par rapport aux semaines précédentes.' }
}

export const BLOCKS = ['Fondations', 'Volume', 'Intensité'] as const
/** Bloc en cours pour les programmes de 8 semaines et plus. */
export const blockFor = (week: number, total: number) => (total >= 8 ? BLOCKS[Math.min(2, Math.floor((week - 1) / Math.ceil(total / 3)))] : null)

/** « Version au-dessus » : activée par programme. */
export const isHarder = (programId?: string) => Boolean(programId && (getState().programHarder as Record<string, boolean> | undefined)?.[programId])
export function setHarder(programId: string, on: boolean) {
  patchState({ programHarder: { ...((getState().programHarder as Record<string, boolean>) ?? {}), [programId]: on } })
}

const round = (kg: number) => Math.max(0, Math.round(kg * 2) / 2)

/**
 * Applique les règles du programme aux exercices d'une séance :
 * charge de base = dernière charge réalisée, puis phase de la semaine, version au-dessus et rotation par blocs.
 */
export function applyProgramRules(exercises: WorkoutExercise[], ap: ActiveProgram, catalog: Exercise[], lastWeight: (exerciseId: string) => number | undefined) {
  const phase = weekPhase(ap.currentWeek, ap.durationWeeks)
  const harder = isHarder(ap.programId)
  const block = blockFor(ap.currentWeek, ap.durationWeeks)
  const blockIndex = block ? BLOCKS.indexOf(block) : 0
  const t = Date.now()

  const out = exercises.map((ex, i) => {
    let base = ex
    // Rotation : à partir du 3e exercice, variante de même muscle selon le bloc.
    if (block && blockIndex > 0 && i >= 2) {
      const src = catalog.find((c) => c.id === ex.exerciseId)
      const alts = src ? catalog.filter((c) => c.id !== src.id && c.specificMuscle === src.specificMuscle && c.category === src.category) : []
      const alt = alts[(blockIndex - 1 + i) % Math.max(1, alts.length)]
      if (alt) base = { ...ex, exerciseId: alt.id, exerciseName: alt.name, equipment: alt.equipment, restSeconds: alt.defaultRestSeconds ?? ex.restSeconds }
    }
    const last = lastWeight(base.exerciseId)
    const sets = base.sets.slice(0, Math.max(1, base.sets.length + phase.setsDelta))
    if (harder && sets.length) sets.push({ ...sets[sets.length - 1], id: `s_${t}_${i}_x`, setNumber: sets.length + 1 })
    return {
      ...base,
      restSeconds: harder ? Math.max(30, (base.restSeconds ?? 75) - 15) : base.restSeconds,
      sets: sets.map((s, j) => {
        const start = last ?? s.targetWeight ?? 0
        const kg = start > 0 ? round(start * (1 + phase.loadPct / 100) + (harder ? 2.5 : 0)) : 0
        return { ...s, id: `s_${t}_${i}_${j}`, setNumber: j + 1, targetWeight: kg, actualWeight: kg, completed: false }
      }),
    }
  })
  const label = [`Semaine ${ap.currentWeek}/${ap.durationWeeks} · ${phase.name}`, block && `bloc ${block}`, harder && 'version au-dessus'].filter(Boolean).join(' · ')
  return { exercises: out, label, phase }
}
