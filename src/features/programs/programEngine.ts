import { EXERCISES, HARDER } from '../../data/exercises'
import { PROGRAMS } from '../../data/programs'
import { getState, patchState } from '../../lib/cloud'
import { localISO } from '../../lib/utils'
import type { ActiveProgram, Exercise, Program, Workout, WorkoutExercise } from '../../types'

/**
 * Règles de progression des programmes — reprises à l'identique de l'app d'origine
 * (progRule, proposal, versions, upSess, rotAlt, blockOf, progAgain).
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

/** Familles de mouvement « polyarticulaires » : elles prennent la surcharge complète. */
export const POLY = new Set(['thrust', 'squat', 'hinge', 'press45', 'pressc', 'presss', 'row', 'pullv', 'pullh', 'bulgar', 'lunge'])

export interface Rule { k: 'base' | 'keep' | 'vol' | 'over' | 'deload' | 'rec' | 'int'; lab: string; mult: number; add: number; rep: number }

/** Semaine du programme (0 = première), calculée depuis la date de début. */
export function progWeek(ap: ActiveProgram | null | undefined, today = localISO()) {
  if (!ap) return null
  const days = Math.round((new Date(today).getTime() - new Date(ap.startDate).getTime()) / 86400000)
  const w = Math.max(0, Math.floor(days / 7))
  return { w: Math.min(w, ap.durationWeeks - 1), over: w >= ap.durationWeeks }
}

const cycleOf = (ap?: ActiveProgram | null) => (ap as (ActiveProgram & { cycle?: number }) | null | undefined)?.cycle ?? 1

/** Règle de la semaine, déduite du titre de la semaine du programme. */
export function progRule(p: Program, w: number, ap?: ActiveProgram | null): Rule {
  const t = String(p.weeks[w]?.title ?? '').toLowerCase()
  if (p.isCustom && w > 0) return w % 2
    ? { k: 'vol', lab: 'Volume : même charge, +2 répétitions', mult: 1, add: 0, rep: 2 }
    : { k: 'over', lab: 'Surcharge : +2 kg sur les polyarticulaires, +1 kg sur l’isolation', mult: 1, add: 2, rep: 0 }
  if (/reprise\s*70/.test(t)) return { k: 'deload', lab: 'Reprise : charges à 70 % de tes dernières charges', mult: 0.7, add: 0, rep: 0 }
  if (/reprise\s*85/.test(t)) return { k: 'deload', lab: 'Reprise : charges à 85 %', mult: 0.85, add: 0, rep: 0 }
  if (/retour 100/.test(t)) return { k: 'keep', lab: 'Retour à 100 % : tes charges habituelles', mult: 1, add: 0, rep: 0 }
  if (/surcharge/.test(t) && p.id === 'force8') return { k: 'over', lab: 'Surcharge : +2,5 kg sur les mouvements principaux', mult: 1, add: 2.5, rep: 0 }
  if (/tempo lent/.test(t)) return { k: 'keep', lab: 'Tempo lent : descente en 3 secondes, mêmes charges', mult: 1, add: 0, rep: 0 }
  if (/décharge/.test(t)) return { k: 'deload', lab: 'Décharge : charges à 80 % pour récupérer', mult: 0.8, add: 0, rep: 0 }
  if (/record|bilan/.test(t) && w === p.durationWeeks - 1) return { k: 'rec', lab: 'Records : tente +2,5 kg sur tes polyarticulaires', mult: 1, add: 2.5, rep: 0 }
  if (/surcharge|affûtage/.test(t)) return { k: 'over', lab: 'Surcharge : +2 kg sur les polyarticulaires, +1 kg sur l’isolation', mult: 1, add: 2, rep: 0 }
  if (/volume|peak/.test(t)) return { k: 'vol', lab: 'Volume : même charge, +2 répétitions', mult: 1, add: 0, rep: 2 }
  if (/intensité/.test(t)) return { k: 'int', lab: 'Intensité : même charge, finisher pump en fin de séance', mult: 1, add: 0, rep: 0 }
  const cyc = cycleOf(ap)
  if (w === 0 && ap?.programId === p.id && cyc > 1) return { k: 'over', lab: `Cycle ${cyc} : tu repars de tes charges de fin de cycle, +2 kg sur les polyarticulaires`, mult: 1, add: 2, rep: 0 }
  if (w === 0) return { k: 'base', lab: 'Repères : garde tes charges actuelles, tempo contrôlé', mult: 1, add: 0, rep: 0 }
  return { k: 'keep', lab: 'Consolidation : mêmes charges, exécution parfaite', mult: 1, add: 0, rep: 0 }
}

/** Dernières séries réalisées sur un exercice (la séance la plus récente). */
export function lastSets(exerciseId: string, workouts: Workout[]) {
  const w = [...workouts].filter((x) => x.status === 'completed').sort((a, b) => b.date.localeCompare(a.date))
    .find((x) => x.exercises.some((e) => e.exerciseId === exerciseId && e.sets.some((s) => s.completed && (s.actualWeight ?? 0) > 0)))
  const ex = w?.exercises.find((e) => e.exerciseId === exerciseId)
  return ex ? ex.sets.filter((s) => s.completed) : null
}

/** Charge et répétitions proposées pour un exercice selon la règle de la semaine (pas de surcharge si la dernière série était « Dur »). */
export function proposal(ex: Exercise | undefined, rule: Rule, workouts: Workout[], repsDef = 10) {
  if (!ex || ex.category === 'cardio') return null
  const lw = lastSets(ex.id, workouts)
  if (!lw?.length) return null
  const top = Math.max(...lw.map((s) => s.actualWeight ?? 0))
  if (top <= 0) return null
  const r0 = Math.max(...lw.filter((s) => (s.actualWeight ?? 0) === top).map((s) => s.actualReps ?? 0)) || repsDef
  const lastRpe = [...lw].reverse().find((s) => s.rpe)?.rpe
  const add = rule.add && lastRpe !== 3 ? (POLY.has(String(ex.pattern)) ? rule.add : Math.min(1, rule.add)) : 0
  return { kg: Math.round((top * rule.mult + add) * 2) / 2, r: r0 + rule.rep, last: top, lastR: r0 }
}

// ---------- Version au-dessus ----------
const LVLS = ['Débutante', 'Intermédiaire', 'Avancée']
const lvIdx = (l: string) => { const i = LVLS.indexOf(l); return i < 0 ? 1 : i }
/** Versions proposées pour un programme : la version de base puis les niveaux au-dessus. */
export function versions(p: Program): [number, string][] {
  if (p.level === 'Pour toutes' || p.level === 'Tous niveaux') return [[0, 'Standard'], [1, 'Plus intense'], [2, 'Avancée']]
  const L = lvIdx(p.level)
  return [[0, `Proposée · ${p.level}`] as [number, string]].concat(LVLS.slice(L + 1).map((x, i) => [i + 1, `Au-dessus · ${x}`] as [number, string]))
}
export const verName = (p: Program, u: number) => versions(p).find((v) => v[0] === u)?.[1].replace(/^.*· /, '') ?? p.level

export function upNote(p: Program, u: number) {
  const t = /maison/.test(p.id)
    ? 'Tempo 3-1-1 (3 s de descente, 1 s de pause) sur tous les exercices, et les deux derniers exercices enchaînés en superset.'
    : p.id === 'force8'
      ? 'Dernière série du mouvement principal en « back-off » : -15 % et un maximum de reps propres.'
      : 'Dernière série du dernier exercice en drop-set : -30 % et on continue jusqu’à la limite technique.'
  return t + (u >= 2 ? ' Pause de 2 s en bas du premier exercice.' : '')
}

/** Version choisie (0 = proposée) pour le programme en cours. */
export const getUp = (programId?: string) => (programId ? Number((getState().programUp as Record<string, number> | undefined)?.[programId] ?? 0) : 0)
export const setUp = (programId: string, u: number) => patchState({ programUp: { ...((getState().programUp as Record<string, number>) ?? {}), [programId]: u } })

// ---------- Rotation par blocs (programmes de 8 semaines et plus) ----------
export const BLOCKS = ['Fondations', 'Volume', 'Intensité'] as const
export function blockOf(p: Program, w: number) { if (p.durationWeeks < 8) return 0; const size = Math.ceil(p.durationWeeks / 3); return Math.min(2, Math.floor(w / size)) }
const PATGRP: Record<string, string> = { abduct: 'iso', kick: 'iso', bulgar: 'uni', lunge: 'uni', step: 'uni' }
const pg = (p?: unknown) => PATGRP[String(p)] ?? String(p)
export function rotAlt(exId: string, b: number, used: Set<string>, catalog: Exercise[]) {
  const e = catalog.find((x) => x.id === exId)
  if (!e || e.category === 'cardio') return null
  const C = catalog.filter((x) => x.category === e.category && pg(x.pattern) === pg(e.pattern) && x.id !== e.id && !x.isCustom && !used.has(x.id) && !/Max|minutes|sec/.test(String(x.scheme ?? '')))
    .sort((a, c) => Number(c.specificMuscle === e.specificMuscle) - Number(a.specificMuscle === e.specificMuscle) || a.id.localeCompare(c.id))
  return C.length ? C[(b - 1) % C.length].id : null
}

export interface ProgramContext { program: Program; w: number; rule: Rule; up: number; block: number; swaps: [string, string][]; note: string }

/**
 * Applique le programme à une séance : rotation des exercices secondaires (bloc), variantes plus difficiles
 * et séries en plus (version au-dessus), puis charges proposées selon la règle de la semaine.
 */
export function applyProgram(exercises: WorkoutExercise[], ap: ActiveProgram, workouts: Workout[], catalog: Exercise[] = EXERCISES) {
  const program = PROGRAMS.find((p) => p.id === ap.programId) ?? (getState().customPrograms as Program[] | undefined)?.find((p) => p.id === ap.programId)
  const pw = progWeek(ap)
  if (!program || !pw || pw.over) return null
  const up = getUp(program.id)
  const rule = { ...progRule(program, pw.w, ap) }
  if (up && rule.add === 2) { rule.add = 2.5; rule.lab = rule.lab.replace('+2 kg', '+2,5 kg') }
  const block = blockOf(program, pw.w)
  const used = new Set(exercises.map((e) => e.exerciseId))
  const swaps: [string, string][] = []
  const t = Date.now()
  const out = exercises.map((it, i) => {
    let id = it.exerciseId
    if (block && i >= 2) { const a = rotAlt(id, block, used, catalog); if (a) { swaps.push([id, a]); used.add(a); id = a } }
    if (up) { const h = HARDER[id]; if (h && catalog.some((x) => x.id === h) && !used.has(h)) { id = h; used.add(h) } }
    const ex = catalog.find((x) => x.id === id)
    const extra = up && i < (up >= 2 ? 3 : 2) ? 1 : 0
    const baseSets = it.sets.length ? it.sets : [{ id: 'x', setNumber: 1, targetReps: 10, targetWeight: 0, completed: false }]
    const sets = [...baseSets, ...Array.from({ length: extra }, () => baseSets[baseSets.length - 1])]
    const pr = proposal(ex, rule, workouts, baseSets[0]?.targetReps || 10)
    return {
      ...it, exerciseId: id, exerciseName: ex?.name ?? it.exerciseName, equipment: ex?.equipment ?? it.equipment,
      restSeconds: up ? Math.max(30, (it.restSeconds ?? ex?.defaultRestSeconds ?? 60) - 15) : it.restSeconds,
      proposal: pr ? `${pr.last} → ${pr.kg} kg × ${pr.r}` : undefined,
      sets: sets.map((s, j) => ({
        ...s, id: `s_${t}_${i}_${j}`, setNumber: j + 1, completed: false,
        targetWeight: pr ? pr.kg : s.targetWeight, actualWeight: pr ? pr.kg : s.actualWeight ?? s.targetWeight,
        targetReps: pr ? pr.r : s.targetReps, actualReps: pr ? pr.r : s.actualReps ?? s.targetReps,
      })),
    }
  })
  const ctx: ProgramContext = { program, w: pw.w, rule, up, block, swaps, note: up ? upNote(program, up) : '' }
  const label = [`Semaine ${pw.w + 1}/${program.durationWeeks}`, rule.lab, block ? `bloc ${BLOCKS[block]}` : '', up ? `version ${verName(program, up)}` : ''].filter(Boolean).join(' · ')
  return { exercises: out, ctx, label }
}

/** « Refaire plus lourd » : historique du cycle terminé, puis nouveau cycle depuis aujourd'hui. */
export function recordCycleEnd(ap: ActiveProgram) {
  const hist = ((getState().progHist as { id: string; start: string; end: string; cycle: number }[] | undefined) ?? [])
  patchState({ progHist: [...hist, { id: ap.programId, start: ap.startDate, end: localISO(), cycle: cycleOf(ap) }].slice(-30) })
  return cycleOf(ap) + 1
}
export const programHistory = (id: string) => ((getState().progHist as { id: string; end: string; cycle: number }[] | undefined) ?? []).filter((h) => h.id === id)
export const cycleNumber = cycleOf
