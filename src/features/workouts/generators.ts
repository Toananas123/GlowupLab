import { EXERCISES } from '../../data/exercises'
import type { Exercise, Workout, WorkoutExercise } from '../../types'
import { POLY } from '../programs/programEngine'
import type { Phase } from '../cycle/cycle'

/**
 * Générateurs de séances repris de l'app d'origine : séance rapide 20 min (quickSess)
 * et séance adaptée à la phase du cycle (cycSess).
 */

const ZNAME: Record<string, string> = { 'lower-body': 'Bas du corps', back: 'Dos', pecs: 'Pecs', arms: 'Bras & Épaules', abs: 'Abdos' }
const usable = (e: Exercise) => !/Max|minutes/.test(String(e.scheme ?? ''))
const schemeReps = (e: Exercise) => String(e.defaultReps ?? '10').split(/[-–/ ]/)[0]

function item(e: Exercise, sets: number, reps: string, rest: number, phase: string, i: number): WorkoutExercise {
  const t = Date.now()
  const r = parseInt(reps, 10) || 10
  return {
    id: `ex_${t}_${i}`, exerciseId: e.id, exerciseName: e.name, category: e.category, equipment: e.equipment, restSeconds: rest, phase,
    sets: Array.from({ length: sets }, (_, j) => ({ id: `s_${t}_${i}_${j}`, setNumber: j + 1, targetReps: r, targetWeight: 0, actualReps: r, completed: false })),
  }
}

/** Séance rapide · 20 min : 3 exercices sur les zones les moins travaillées récemment. */
export function quickSession(workouts: Workout[], favorites: string[], catalog: Exercise[] = EXERCISES) {
  const zones = Object.keys(ZNAME)
  const last: Record<string, string> = {}
  for (const w of workouts) if (w.status === 'completed') for (const e of w.exercises) {
    const z = catalog.find((x) => x.id === e.exerciseId)?.category
    if (z && zones.includes(z) && (!last[z] || w.date > last[z])) last[z] = w.date
  }
  const order = zones.map((z) => ({ z, r: Math.random() })).sort((a, b) => (last[a.z] ?? '0').localeCompare(last[b.z] ?? '0') || a.r - b.r).map((x) => x.z).slice(0, 3)
  const exercises = order.map((z, i) => {
    const L = catalog.filter((e) => e.category === z && usable(e))
    const fav = L.filter((e) => favorites.includes(e.id))
    const pool = fav.length && Math.random() < 0.67 ? fav : L
    const e = pool[Math.floor(Math.random() * pool.length)]
    const ago = last[z] ? Math.round((Date.now() - new Date(last[z]).getTime()) / 86400000) : null
    const note = ago == null ? 'jamais travaillé' : ago === 0 ? 'travaillé aujourd’hui' : `travaillé il y a ${ago} j`
    return item(e, 3, z === 'abs' ? schemeReps(e) : '12', 45, `${ZNAME[z]} · ${note}`, i)
  })
  return { name: 'Séance rapide · 20 min', description: '3 exercices sur les zones les moins travaillées récemment', exercises }
}

/** Séance adaptée à la phase du cycle (favoris privilégiés). */
export function phaseSession(phase: Phase, favorites: string[], catalog: Exercise[] = EXERCISES) {
  const all = catalog.filter(usable)
  const pick = (L: Exercise[], n: number) => {
    const out: Exercise[] = []
    while (out.length < n) {
      const fav = L.filter((e) => favorites.includes(e.id) && !out.includes(e))
      const src = fav.length && Math.random() < 0.6 ? fav : L.filter((e) => !out.includes(e))
      if (!src.length) break
      out.push(src[Math.floor(Math.random() * src.length)])
    }
    return out
  }
  if (phase === 'menstrual') {
    const ab = pick(all.filter((e) => e.category === 'abs' && e.equipment === 'bodyweight'), 2)
    const bs = pick(all.filter((e) => e.category === 'lower-body' && e.equipment === 'bodyweight'), 2)
    return { name: 'Mobilité & gainage doux', description: '4 exercices au poids du corps · 2 séries · 60 s de repos',
      exercises: [...bs, ...ab].map((e, i) => item(e, 2, e.category === 'abs' ? schemeReps(e) : '15', 60, 'Doux', i)) }
  }
  if (phase === 'follicular' || phase === 'ovulatory') {
    const P = all.filter((e) => (e.category === 'lower-body' || e.category === 'back') && POLY.has(String(e.pattern)) && e.equipment !== 'bodyweight')
    const heavy = pick(P, 3).map((e, i) => item(e, 4, '8', 120, 'Lourd', i))
    const ab = pick(all.filter((e) => e.category === 'abs'), 1).map((e, i) => item(e, 3, schemeReps(e), 45, 'Gainage', i + 3))
    return { name: phase === 'ovulatory' ? 'Séance lourde (bien échauffée)' : 'Séance lourde · records', description: '3 polyarticulaires en 4×8 · 2 min de repos · gainage pour finir', exercises: [...heavy, ...ab] }
  }
  const zs = ['lower-body', 'back', 'arms', 'abs']
  const ex = zs.map((z) => pick(all.filter((e) => e.category === z), 1)[0]).filter(Boolean)
  return { name: 'Volume modéré', description: '4 zones · 3×15 · 75 s de repos · charges modérées', exercises: ex.map((e, i) => item(e, 3, e.category === 'abs' ? schemeReps(e) : '15', 75, 'Modéré', i)) }
}
