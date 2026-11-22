import { collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, setDoc } from 'firebase/firestore'
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { FINISHERS } from '../data/circuits'
import { EXERCISES } from '../data/exercises'
import { PROGRAMS } from '../data/programs'
import { DEFAULT_ROUTINES } from '../data/routines'
import { useAuth } from '../features/auth/AuthProvider'
import { db } from '../lib/firebase'
import { clean, DAY_NAMES, decodeBase64, encodeBase64, localISO, readJSON, stripLeadingEmoji, todayISO, WEEK_ORDER, writeJSON } from '../lib/utils'
import type {
  ActiveProgram, Exercise, ExerciseSettings, FinisherLog, FinisherPreset, Measurement, OverloadSuggestion, PersonalRecords,
  PreviousPerformance, Program, Routine, WeeklyPlanDay, Workout, WorkoutExercise,
} from '../types'

// Clés localStorage identiques à l'app d'origine : le cache existant est relu tel quel.
const LS = 'glow_up_lab_local_'
const ACTIVE_WORKOUT_KEY = 'glow_up_lab_active_workout'

/** Semaine par défaut : Lundi fessiers, Mercredi dos, Vendredi chaîne postérieure. */
export function defaultWeek(): WeeklyPlanDay[] {
  const now = new Date()
  const offset = now.getDay() === 0 ? -6 : 1 - now.getDay()
  return WEEK_ORDER.map((dow, i) => {
    const d = new Date(now)
    d.setDate(now.getDate() + offset + i)
    const base: WeeklyPlanDay = { dayOfWeek: dow, dayName: DAY_NAMES[dow], date: localISO(d), activity: 'Repos', finisherType: 'none', status: 'rest' }
    const presets: Record<number, Partial<WeeklyPlanDay>> = {
      1: { activity: 'Séance Fessiers', workoutName: 'Booty Sculpt & Hypertrophie', routineId: 'routine-glutes-focus', finisherType: 'cardio', finisher: '12-5-30 Express (5 à 8 min)', finisherPresetId: 'finisher-cardio-12-5-30-express', status: 'planned' },
      3: { activity: 'Séance Dos', workoutName: 'Dos & Silhouette V-Shape (Posture)', routineId: 'routine-back-v-shape', finisherType: 'abs', finisher: '30/15 Tabata Core (4 min)', finisherPresetId: 'finisher-tabata-core-30-15', status: 'planned' },
      5: { activity: 'Séance Bas du corps', workoutName: 'Chaîne Postérieure (Fessiers & Ischios)', routineId: 'routine-posterior-chain', finisherType: 'pump', finisher: 'Challenge 100 Reps', finisherPresetId: 'finisher-challenge-100-reps', status: 'planned' },
    }
    const day = { ...base, ...presets[dow] }
    return clean({ ...day, activities: [day.activity] })
  })
}

/** Fusionne des jours enregistrés avec la semaine courante (dates recalculées). */
function mergeWeek(saved: Partial<WeeklyPlanDay>[] | null | undefined): WeeklyPlanDay[] {
  const week = defaultWeek()
  if (!Array.isArray(saved) || saved.length === 0) return week
  return week.map((d) => {
    const s = saved.find((x) => x && Number(x.dayOfWeek) === d.dayOfWeek)
    return s ? { ...d, ...s, workoutName: stripLeadingEmoji(s.workoutName), dayOfWeek: d.dayOfWeek, dayName: d.dayName, date: s.date || d.date } as WeeklyPlanDay : d
  })
}

const setVolume = (w: Workout) =>
  w.exercises.reduce((sum, ex) => sum + ex.sets.reduce((s, st) => (st.completed ? s + (st.actualWeight ?? st.targetWeight ?? 0) * (st.actualReps ?? st.targetReps ?? 0) : s), 0), 0)

export interface StartWorkoutInput {
  name: string
  exercises: WorkoutExercise[]
  finisher?: string
  finisherPresetId?: string
  programId?: string
  programWeekNumber?: number
  programDayId?: string
  notes?: string
  rating?: number
}

interface WorkoutStore {
  loading: boolean
  allExercises: Exercise[]
  customExercises: Exercise[]
  favorites: string[]
  routines: Routine[]
  workouts: Workout[]
  activeWorkout: Workout | null
  measurements: Measurement[]
  weeklyPlans: WeeklyPlanDay[]
  programs: Program[]
  customPrograms: Program[]
  activeProgram: ActiveProgram | null
  finishersCatalog: FinisherPreset[]
  exerciseSettings: ExerciseSettings
  sharedTemplateWorkout: Partial<Workout> | null
  setSharedTemplateWorkout: (w: Partial<Workout> | null) => void
  addCustomExercise: (e: Omit<Exercise, 'id'>) => Promise<Exercise | undefined>
  deleteCustomExercise: (id: string) => Promise<void>
  toggleFavorite: (id: string) => Promise<void>
  isFavorite: (id: string) => boolean
  createRoutine: (r: Omit<Routine, 'id'>) => Promise<Routine>
  updateRoutine: (id: string, patch: Partial<Routine>) => Promise<void>
  deleteRoutine: (id: string) => Promise<void>
  startWorkout: (w: StartWorkoutInput) => Workout
  updateActiveWorkout: (w: Workout) => void
  finishActiveWorkout: (notes?: string, finisher?: string, rating?: number, finisherLog?: FinisherLog) => Promise<Workout>
  cancelActiveWorkout: () => void
  deleteWorkout: (id: string) => Promise<void>
  updateWorkout: (id: string, patch: Partial<Workout>) => Promise<void>
  addCompletedWorkout: (w: Omit<Workout, 'id' | 'userId'>) => Promise<Workout>
  duplicateWorkoutAsNew: (w: Workout) => Workout
  getPreviousPerformance: (exerciseId: string) => PreviousPerformance | null
  getProgramOverloadSuggestion: (exerciseId: string) => OverloadSuggestion | null
  getPersonalRecords: () => PersonalRecords
  createCustomProgram: (p: Omit<Program, 'id'>) => Promise<Program>
  deleteCustomProgram: (id: string) => Promise<void>
  startProgram: (programId: string, preferredDays: number[], startDate: string) => Promise<void>
  stopActiveProgram: () => Promise<void>
  exportProgramCode: (p: Program) => string
  importProgramFromCode: (code: string) => Promise<Program | null>
  updateExerciseSettings: (exerciseId: string, settings: string) => Promise<void>
  loadSharedWorkout: (code: string) => boolean
  createShareCode: (w: Workout | Routine) => string
  addMeasurement: (m: Omit<Measurement, 'id'>) => Promise<void>
  deleteMeasurement: (id: string) => Promise<void>
  updateWeeklyPlanDay: (dayOfWeek: number, patch: Partial<WeeklyPlanDay>) => Promise<void>
  replaceWeek: (days: WeeklyPlanDay[]) => Promise<void>
  exportAllDataJSON: () => string
  exportWorkoutsCSV: () => string
  importAllDataJSON: (json: string) => Promise<{ success: boolean; message: string }>
}

const Ctx = createContext<WorkoutStore | null>(null)

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const { user, profile } = useAuth()
  const uid = user?.uid ?? null

  const [loading, setLoading] = useState(true)
  const [customExercises, setCustomExercises] = useState<Exercise[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [routines, setRoutines] = useState<Routine[]>(DEFAULT_ROUTINES)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)
  const [measurements, setMeasurements] = useState<Measurement[]>([])
  const [weeklyPlans, setWeeklyPlans] = useState<WeeklyPlanDay[]>(defaultWeek)
  const [customPrograms, setCustomPrograms] = useState<Program[]>([])
  const [activeProgram, setActiveProgram] = useState<ActiveProgram | null>(null)
  const [exerciseSettings, setExerciseSettings] = useState<ExerciseSettings>({})
  const [sharedTemplateWorkout, setSharedTemplateWorkout] = useState<Partial<Workout> | null>(null)

  // Refs pour que les callbacks lisent toujours l'état courant.
  const state = useRef({ workouts, weeklyPlans, activeProgram, activeWorkout, routines, measurements, customPrograms, favorites, customExercises, exerciseSettings })
  state.current = { workouts, weeklyPlans, activeProgram, activeWorkout, routines, measurements, customPrograms, favorites, customExercises, exerciseSettings }

  const key = (name: string) => `${LS}${name}_${uid}`
  const userDoc = (...path: string[]) => doc(db, 'users', uid!, ...path)
  const persist = async (what: string, op: () => Promise<unknown>) => {
    try { await op() } catch (e) { console.warn(`Synchronisation impossible (${what})`, e) }
  }

  // Séance en cours + lien de partage (?share=...)
  useEffect(() => {
    const saved = readJSON<Workout | null>(ACTIVE_WORKOUT_KEY, null)
    if (saved && saved.status === 'in_progress' && saved.exercises?.length && saved.date === todayISO()) setActiveWorkout(saved)
    else localStorage.removeItem(ACTIVE_WORKOUT_KEY)
    try {
      const share = new URLSearchParams(window.location.search).get('share')
      if (share) {
        const w = decodeBase64<Partial<Workout>>(share)
        if (w && (w.exercises || w.name)) setSharedTemplateWorkout(w)
      }
    } catch { /* lien invalide */ }
  }, [])

  // Chargement : cache local immédiat, puis Firestore en parallèle.
  useEffect(() => {
    if (!uid) { setLoading(false); return }
    let cancelled = false
    const k = (n: string) => `${LS}${n}_${uid}`
    const withDefaults = (list: Routine[]) => {
      const merged = [...DEFAULT_ROUTINES]
      list.forEach((r) => { const n = { ...r, name: stripLeadingEmoji(r.name) || r.name }; if (!merged.some((m) => m.id === n.id)) merged.push(n) })
      return merged
    }
    setCustomExercises(readJSON(k('custom'), []))
    setFavorites(readJSON(k('favs'), []))
    setRoutines(withDefaults(readJSON(k('routines'), [])))
    setWorkouts(readJSON<Workout[]>(k('workouts'), []).map((w) => ({ ...w, name: stripLeadingEmoji(w.name) || w.name })))
    setMeasurements(readJSON(k('measurements'), []))
    setWeeklyPlans(mergeWeek(readJSON(k('plans'), null)))
    setCustomPrograms(readJSON(k('programs'), []))
    setActiveProgram(readJSON(k('active_program'), null))
    setExerciseSettings(readJSON(k('settings'), {}))

    ;(async () => {
      try {
        const col = (n: string) => collection(db, 'users', uid, n)
        const [ex, fav, rout, wk, meas, prog, active, plans, settings] = await Promise.all([
          getDocs(col('exercises')), getDocs(col('favorites')), getDocs(col('routines')),
          getDocs(query(col('workouts'), orderBy('date', 'desc'))), getDocs(query(col('measurements'), orderBy('date', 'desc'))),
          getDocs(col('programs')), getDoc(doc(db, 'users', uid, 'profile', 'active_program')), getDocs(col('weekly_plans')),
          getDoc(doc(db, 'users', uid, 'profile', 'exercise_settings')),
        ])
        if (cancelled) return
        const list = <T,>(s: typeof ex) => s.docs.map((d) => d.data() as T)
        const exs = list<Exercise>(ex); setCustomExercises(exs); writeJSON(k('custom'), exs)
        const favs = fav.docs.map((d) => d.data().exerciseId as string); setFavorites(favs); writeJSON(k('favs'), favs)
        const rts = withDefaults(list<Routine>(rout)); setRoutines(rts); writeJSON(k('routines'), rts)
        const wks = list<Workout>(wk).map((w) => ({ ...w, name: stripLeadingEmoji(w.name) || w.name })); setWorkouts(wks); writeJSON(k('workouts'), wks)
        const ms = list<Measurement>(meas); setMeasurements(ms); writeJSON(k('measurements'), ms)
        const pgs = list<Program>(prog); setCustomPrograms(pgs); writeJSON(k('programs'), pgs)
        const ap = active.exists() ? (active.data() as ActiveProgram) : null
        if (ap?.programId) { setActiveProgram(ap); writeJSON(k('active_program'), ap) }
        if (settings.exists()) { const s = settings.data() as ExerciseSettings; setExerciseSettings(s); writeJSON(k('settings'), s) }
        if (plans.empty) {
          const week = defaultWeek(); setWeeklyPlans(week); writeJSON(k('plans'), week)
          await Promise.all(week.map((d) => setDoc(doc(db, 'users', uid, 'weekly_plans', `day_${d.dayOfWeek}`), clean(d))))
        } else {
          const week = mergeWeek(list<WeeklyPlanDay>(plans)); setWeeklyPlans(week); writeJSON(k('plans'), week)
        }
      } catch (e) {
        console.warn('Hors ligne ou erreur de chargement : données en cache conservées', e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => { cancelled = true }
  }, [uid])

  // ---------- Exercices ----------
  const addCustomExercise = useCallback(async (e: Omit<Exercise, 'id'>) => {
    if (!uid) return
    const ex = { ...e, id: `custom_${Date.now()}`, isCustom: true, userId: uid } as Exercise
    const next = [ex, ...state.current.customExercises]
    setCustomExercises(next); writeJSON(key('custom'), next)
    await persist('exercice', () => setDoc(userDoc('exercises', ex.id), clean(ex)))
    return ex
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const deleteCustomExercise = useCallback(async (id: string) => {
    if (!uid) return
    const next = state.current.customExercises.filter((e) => e.id !== id)
    setCustomExercises(next); writeJSON(key('custom'), next)
    await persist('exercice', () => deleteDoc(userDoc('exercises', id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const toggleFavorite = useCallback(async (id: string) => {
    if (!uid) return
    const isFav = state.current.favorites.includes(id)
    const next = isFav ? state.current.favorites.filter((f) => f !== id) : [...state.current.favorites, id]
    setFavorites(next); writeJSON(key('favs'), next)
    await persist('favori', () => (isFav ? deleteDoc(userDoc('favorites', id)) : setDoc(userDoc('favorites', id), { exerciseId: id, createdAt: new Date().toISOString() })))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Routines ----------
  const saveRoutines = (next: Routine[]) => { setRoutines(next); if (uid) writeJSON(key('routines'), next) }

  const createRoutine = useCallback(async (r: Omit<Routine, 'id'>) => {
    const routine = { ...r, id: `routine_${Date.now()}`, userId: uid ?? 'guest', createdAt: new Date().toISOString() } as Routine
    saveRoutines([routine, ...state.current.routines])
    if (uid) await persist('routine', () => setDoc(userDoc('routines', routine.id), clean(routine)))
    return routine
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const updateRoutine = useCallback(async (id: string, patch: Partial<Routine>) => {
    saveRoutines(state.current.routines.map((r) => (r.id === id ? { ...r, ...patch } : r)))
    if (uid) await persist('routine', () => setDoc(userDoc('routines', id), clean(patch), { merge: true }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const deleteRoutine = useCallback(async (id: string) => {
    saveRoutines(state.current.routines.filter((r) => r.id !== id))
    if (uid) await persist('routine', () => deleteDoc(userDoc('routines', id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Séances ----------
  const saveActive = (w: Workout | null) => {
    setActiveWorkout(w)
    if (w) writeJSON(ACTIVE_WORKOUT_KEY, w)
    else localStorage.removeItem(ACTIVE_WORKOUT_KEY)
  }

  const startWorkout = useCallback((input: StartWorkoutInput) => {
    const { weeklyPlans: plans, activeProgram: ap } = state.current
    const today = plans.find((d) => d.dayOfWeek === new Date().getDay())
    const w: Workout = clean({
      id: `workout_${Date.now()}`,
      userId: uid ?? 'guest',
      name: input.name,
      date: todayISO(),
      status: 'in_progress',
      exercises: input.exercises,
      finisher: input.finisher,
      finisherPresetId: input.finisherPresetId || today?.finisherPresetId,
      programId: input.programId || today?.programId || (ap && !ap.isCompleted ? ap.programId : undefined),
      programWeekNumber: input.programWeekNumber || today?.programWeekNumber || ap?.currentWeek,
      programDayId: input.programDayId || today?.programDayId,
      notes: input.notes,
      rating: input.rating ?? 5,
      startedAt: new Date().toISOString(),
    })
    saveActive(w)
    return w
  }, [uid])

  const updateActiveWorkout = useCallback((w: Workout) => saveActive(w), [])
  const cancelActiveWorkout = useCallback(() => saveActive(null), [])

  const finishActiveWorkout = useCallback(async (notes?: string, finisher?: string, rating?: number, finisherLog?: FinisherLog) => {
    const { activeWorkout: aw, workouts: list, weeklyPlans: plans, activeProgram: ap } = state.current
    if (!aw) throw new Error('Aucune séance active à terminer')
    const duration = aw.startedAt ? Math.max(1, Math.round((Date.now() - new Date(aw.startedAt).getTime()) / 60000)) : 45
    const done: Workout = {
      ...aw, status: 'completed', durationMinutes: duration, completedAt: new Date().toISOString(),
      notes: notes ?? aw.notes, finisher: finisher ?? aw.finisher, finisherLog: finisherLog ?? aw.finisherLog, rating: rating ?? aw.rating,
    }
    const nextWorkouts = [done, ...list]
    setWorkouts(nextWorkouts); saveActive(null)

    const dow = new Date().getDay()
    const nextPlans = plans.map((d) => (d.dayOfWeek === dow && d.status !== 'rest' ? { ...d, status: 'completed', workoutName: d.workoutName || done.name } : d))
    setWeeklyPlans(nextPlans)

    let nextProgram = ap
    if (ap && !ap.isCompleted) {
      const count = ap.completedSessionCount + 1
      const total = Math.max(1, ap.totalSessionsPlanned)
      const finished = count >= total
      nextProgram = {
        ...ap,
        completedSessionCount: count,
        completedWorkoutIds: [...(ap.completedWorkoutIds || []), done.id],
        currentWeek: Math.min(ap.durationWeeks, Math.max(1, Math.ceil(count / Math.max(1, ap.sessionsPerWeek)))),
        progressPercent: Math.min(100, Math.round((count / total) * 100)),
        totalVolumeKg: Math.round((ap.totalVolumeKg || 0) + setVolume(done)),
        isCompleted: finished,
        completedAt: finished ? new Date().toISOString() : ap.completedAt,
        updatedAt: new Date().toISOString(),
      }
      setActiveProgram(nextProgram)
    }

    if (uid) {
      writeJSON(key('workouts'), nextWorkouts); writeJSON(key('plans'), nextPlans)
      if (nextProgram) writeJSON(key('active_program'), nextProgram)
      const todayPlan = nextPlans.find((d) => d.dayOfWeek === dow)
      await persist('séance', () => Promise.all([
        setDoc(userDoc('workouts', done.id), clean(done)),
        todayPlan && setDoc(userDoc('weekly_plans', `day_${dow}`), clean(todayPlan)),
        nextProgram && setDoc(userDoc('profile', 'active_program'), clean(nextProgram)),
      ]))
    }
    return done
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const deleteWorkout = useCallback(async (id: string) => {
    const next = state.current.workouts.filter((w) => w.id !== id)
    setWorkouts(next)
    if (uid) { writeJSON(key('workouts'), next); await persist('séance', () => deleteDoc(userDoc('workouts', id))) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const updateWorkout = useCallback(async (id: string, patch: Partial<Workout>) => {
    const next = state.current.workouts.map((w) => (w.id === id ? { ...w, ...patch, updatedAt: new Date().toISOString() } : w))
    setWorkouts(next)
    if (uid) { writeJSON(key('workouts'), next); await persist('séance', () => setDoc(userDoc('workouts', id), clean(patch), { merge: true })) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  /** Saisie a posteriori d'une séance déjà réalisée. */
  const addCompletedWorkout = useCallback(async (w: Omit<Workout, 'id' | 'userId'>) => {
    const done = clean({ ...w, id: `workout_${Date.now()}`, userId: uid ?? 'guest', status: 'completed' }) as Workout
    const next = [done, ...state.current.workouts].sort((a, b) => b.date.localeCompare(a.date))
    setWorkouts(next)
    if (uid) { writeJSON(key('workouts'), next); await persist('séance', () => setDoc(userDoc('workouts', done.id), clean(done))) }
    return done
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const duplicateWorkoutAsNew = useCallback((w: Workout) => {
    const t = Date.now()
    return startWorkout({
      name: `${w.name} (Copie)`,
      exercises: w.exercises.map((ex, i) => ({
        ...ex, id: `ex_${t}_${i}`,
        sets: ex.sets.map((s, j) => ({ ...s, id: `s_${t}_${j}`, completed: false, actualReps: undefined, actualWeight: s.actualWeight ?? s.targetWeight })),
      })),
      finisher: w.finisher, finisherPresetId: w.finisherPresetId, notes: w.notes,
    })
  }, [startWorkout])

  const getPreviousPerformance = useCallback((exerciseId: string): PreviousPerformance | null => {
    for (const w of state.current.workouts) {
      if (w.status !== 'completed') continue
      const ex = w.exercises.find((e) => e.exerciseId === exerciseId)
      if (!ex) continue
      const sets = ex.sets.filter((s) => s.completed && (s.actualWeight !== undefined || s.targetWeight > 0 || s.targetReps > 0))
      if (sets.length) { const last = sets[sets.length - 1]; return { weight: last.actualWeight ?? last.targetWeight, reps: last.actualReps ?? last.targetReps, date: w.date } }
    }
    return null
  }, [])

  const getProgramOverloadSuggestion = useCallback((exerciseId: string): OverloadSuggestion | null => {
    const { activeProgram: ap, activeWorkout: aw } = state.current
    const prev = getPreviousPerformance(exerciseId)
    if (prev) {
      const loaded = prev.weight > 0
      const suggestedWeight = loaded ? Number((prev.weight + 2).toFixed(1)) : 0
      const suggestedReps = prev.reps + 2
      const weekLabel = ap ? `par rapport à la Semaine ${Math.max(1, (ap.currentWeek || 2) - 1)}` : `par rapport au ${prev.date}`
      return {
        previousWeight: prev.weight, previousReps: prev.reps, previousDate: prev.date, suggestedWeight, suggestedReps, weekLabel,
        recommendationText: loaded ? `+2 kg recommandés (${suggestedWeight} kg) ou +1 à 2 répétitions ${weekLabel}` : `+2 répétitions recommandées (${suggestedReps} reps) ${weekLabel}`,
      }
    }
    if (ap) {
      const first = aw?.exercises.find((e) => e.exerciseId === exerciseId)?.sets[0]
      const w = first?.targetWeight ?? 0
      const r = first?.targetReps ?? 10
      const sw = w > 0 ? w + 2 : 0
      return {
        previousWeight: w, previousReps: r, previousDate: ap.startDate, suggestedWeight: sw, suggestedReps: r + 1, weekLabel: `Semaine ${ap.currentWeek}`,
        recommendationText: w > 0
          ? `Surcharge Programme (Sem. ${ap.currentWeek}/${ap.durationWeeks}) : visez +2 kg (${sw} kg) ou +1 à 2 reps si la dernière série est fluide`
          : `Surcharge Programme (Sem. ${ap.currentWeek}/${ap.durationWeeks}) : visez +2 répétitions par rapport à la cible`,
      }
    }
    return null
  }, [getPreviousPerformance])

  const getPersonalRecords = useCallback(() => {
    const prs: PersonalRecords = {}
    for (const w of state.current.workouts) {
      if (w.status !== 'completed') continue
      for (const ex of w.exercises) for (const s of ex.sets) {
        if (s.completed && s.actualWeight && s.actualWeight > 0 && (!prs[ex.exerciseId] || s.actualWeight > prs[ex.exerciseId].maxWeight)) {
          prs[ex.exerciseId] = { maxWeight: s.actualWeight, reps: s.actualReps || s.targetReps, date: w.date }
        }
      }
    }
    return prs
  }, [])

  // ---------- Programmes ----------
  const createCustomProgram = useCallback(async (p: Omit<Program, 'id'>) => {
    const prog = { ...p, id: `prog_custom_${Date.now()}`, isCustom: true, createdBy: profile?.displayName || 'Athlète GlowUp', createdAt: new Date().toISOString() } as Program
    const next = [prog, ...state.current.customPrograms]
    setCustomPrograms(next)
    if (uid) { writeJSON(key('programs'), next); await persist('programme', () => setDoc(userDoc('programs', prog.id), clean(prog))) }
    return prog
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, profile?.displayName])

  const deleteCustomProgram = useCallback(async (id: string) => {
    const next = state.current.customPrograms.filter((p) => p.id !== id)
    setCustomPrograms(next)
    if (uid) { writeJSON(key('programs'), next); await persist('programme', () => deleteDoc(userDoc('programs', id))) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const exportProgramCode = useCallback((p: Program) => {
    try { return encodeBase64({ type: 'GLOWUPLAB_PROGRAM_V1', program: { ...p, isCustom: true } }) } catch { return JSON.stringify(p) }
  }, [])

  const importProgramFromCode = useCallback(async (code: string) => {
    try {
      let t = code.trim()
      const m = t.match(/[?&]program=([A-Za-z0-9+/=_-]+)/)
      if (m?.[1]) t = decodeURIComponent(m[1])
      const parsed = t.startsWith('{') ? JSON.parse(t) : decodeBase64<Record<string, unknown>>(t)
      const p = (parsed && typeof parsed === 'object' && 'program' in parsed ? parsed.program : parsed) as Partial<Program>
      if (p?.title && Array.isArray(p.weeks)) {
        return await createCustomProgram({
          title: p.title, subtitle: p.subtitle || 'Programme importé', objective: p.objective || 'hypertrophy',
          objectiveLabel: p.objectiveLabel || 'Prise de masse / Hypertrophie', durationWeeks: p.durationWeeks || 4, sessionsPerWeek: p.sessionsPerWeek || 3,
          level: p.level || 'Intermédiaire', coverImage: p.coverImage || PROGRAMS[0].coverImage, equipment: Array.isArray(p.equipment) ? p.equipment : ['Haltères'],
          description: p.description || 'Programme personnalisé partagé sur GlowUpLab.', coachTips: p.coachTips || [], weeks: p.weeks,
        })
      }
    } catch (e) { console.warn('Code programme invalide', e) }
    return null
  }, [createCustomProgram])

  const programs = useMemo(() => [...PROGRAMS, ...customPrograms], [customPrograms])

  const startProgram = useCallback(async (programId: string, preferredDays: number[], startDate: string) => {
    const prog = programs.find((p) => p.id === programId)
    if (!prog) return
    const lastMeas = state.current.measurements[0]
    const ap: ActiveProgram = clean({
      programId: prog.id, programTitle: prog.title, objective: prog.objective, objectiveLabel: prog.objectiveLabel, startDate, preferredDays,
      durationWeeks: prog.durationWeeks, sessionsPerWeek: prog.sessionsPerWeek, totalSessionsPlanned: prog.durationWeeks * prog.sessionsPerWeek,
      completedSessionCount: 0, completedWorkoutIds: [], currentWeek: 1, progressPercent: 0, totalVolumeKg: 0,
      initialMeasurements: lastMeas ? { weight: lastMeas.weight, waist: lastMeas.waist, hips: lastMeas.hips, thighs: lastMeas.thighs, arms: lastMeas.arms, chest: lastMeas.chest, date: lastMeas.date } : undefined,
      isCompleted: false, updatedAt: new Date().toISOString(),
    })
    setActiveProgram(ap)
    const trainingDays = prog.weeks[0]?.days.filter((d) => !d.isRest) ?? []
    const ordered = WEEK_ORDER.filter((d) => preferredDays.includes(d))
    const week = mergeWeek(state.current.weeklyPlans).map((day) => {
      const idx = ordered.indexOf(day.dayOfWeek)
      if (idx !== -1 && trainingDays.length) {
        const pd = trainingDays[idx % trainingDays.length]
        const fin = pd.finisherPresetId ? FINISHERS.find((f) => f.id === pd.finisherPresetId) : undefined
        const activity = pd.activityType || 'Musculation'
        return clean({
          ...day, activity, activities: [activity], routineId: pd.routineId, workoutName: pd.workoutTitle || pd.label, targetZone: pd.targetZone || 'lower-body',
          finisherType: fin ? fin.category : 'none', finisher: fin ? `${fin.name} — ${fin.summary}` : undefined, finisherPresetId: pd.finisherPresetId,
          programId: prog.id, programWeekNumber: 1, programDayId: pd.id, status: 'planned', notes: `Programme ${prog.title} (Semaine 1/${prog.durationWeeks})`,
        }) as WeeklyPlanDay
      }
      return clean({
        ...day, activity: 'Repos', activities: ['Repos'], routineId: undefined, workoutName: 'Repos & Récupération (Programme)', finisherType: 'none',
        finisher: undefined, finisherPresetId: undefined, programId: prog.id, programWeekNumber: 1, status: 'rest',
      }) as WeeklyPlanDay
    })
    setWeeklyPlans(week)
    if (uid) {
      writeJSON(key('active_program'), ap); writeJSON(key('plans'), week)
      await persist('programme', () => Promise.all([
        setDoc(userDoc('profile', 'active_program'), ap),
        ...week.map((d) => setDoc(userDoc('weekly_plans', `day_${d.dayOfWeek}`), clean(d))),
      ]))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, programs])

  const stopActiveProgram = useCallback(async () => {
    setActiveProgram(null)
    if (uid) { localStorage.removeItem(key('active_program')); await persist('programme', () => deleteDoc(userDoc('profile', 'active_program'))) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Réglages machine ----------
  const updateExerciseSettings = useCallback(async (exerciseId: string, settings: string) => {
    const next = { ...state.current.exerciseSettings, [exerciseId]: settings }
    setExerciseSettings(next)
    if (uid) { writeJSON(key('settings'), next); await persist('réglages', () => setDoc(userDoc('profile', 'exercise_settings'), clean(next), { merge: true })) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Partage de séance ----------
  const loadSharedWorkout = useCallback((code: string) => {
    try {
      let t = code.trim()
      const m = t.match(/[?&]share=([A-Za-z0-9+/=_-]+)/)
      if (m?.[1]) t = decodeURIComponent(m[1])
      const w = t.startsWith('{') ? JSON.parse(t) : decodeBase64<Partial<Workout>>(t)
      if (w && (w.exercises || w.name)) { setSharedTemplateWorkout(w); return true }
    } catch (e) { console.warn('Séance partagée illisible', e) }
    return false
  }, [])

  const createShareCode = useCallback((w: Workout | Routine) => {
    try {
      return encodeBase64({
        name: w.name,
        exercises: w.exercises.map((e) => ({ ...e, sets: e.sets.map((s) => ({ ...s, completed: false })) })),
        finisher: w.finisher, notes: w.notes,
      })
    } catch { return JSON.stringify(w) }
  }, [])

  // ---------- Mensurations ----------
  const addMeasurement = useCallback(async (m: Omit<Measurement, 'id'>) => {
    if (!uid) return
    const meas = clean({ ...m, id: `meas_${Date.now()}`, userId: uid, createdAt: new Date().toISOString() }) as Measurement
    const next = [meas, ...state.current.measurements].sort((a, b) => b.date.localeCompare(a.date))
    setMeasurements(next); writeJSON(key('measurements'), next)
    await persist('mensuration', () => setDoc(userDoc('measurements', meas.id), meas))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const deleteMeasurement = useCallback(async (id: string) => {
    if (!uid) return
    const next = state.current.measurements.filter((m) => m.id !== id)
    setMeasurements(next); writeJSON(key('measurements'), next)
    await persist('mensuration', () => deleteDoc(userDoc('measurements', id)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Planning ----------
  const updateWeeklyPlanDay = useCallback(async (dayOfWeek: number, patch: Partial<WeeklyPlanDay>) => {
    const next = mergeWeek(state.current.weeklyPlans).map((d) => (d.dayOfWeek === dayOfWeek ? clean({ ...d, ...patch }) : d))
    setWeeklyPlans(next)
    const day = next.find((d) => d.dayOfWeek === dayOfWeek)
    if (uid && day) { writeJSON(key('plans'), next); await persist('planning', () => setDoc(userDoc('weekly_plans', `day_${dayOfWeek}`), clean(day))) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  /** Remplace toute la semaine en une fois (modèles de semaine, mode libre). */
  const replaceWeek = useCallback(async (days: WeeklyPlanDay[]) => {
    const next = mergeWeek(days)
    setWeeklyPlans(next)
    if (uid) {
      writeJSON(key('plans'), next)
      await persist('planning', () => Promise.all(next.map((d) => setDoc(userDoc('weekly_plans', `day_${d.dayOfWeek}`), clean(d)))))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  // ---------- Export / import ----------
  const exportAllDataJSON = useCallback(() => {
    const s = state.current
    return JSON.stringify({
      app: 'Glow Up Lab', version: '1.1', exportedAt: new Date().toISOString(), profile,
      customExercises: s.customExercises, favorites: s.favorites, routines: s.routines, workouts: s.workouts, measurements: s.measurements,
      weeklyPlans: s.weeklyPlans, customPrograms: s.customPrograms, activeProgram: s.activeProgram,
    }, null, 2)
  }, [profile])

  const exportWorkoutsCSV = useCallback(() => {
    const q = (s: string) => `"${s.replace(/"/g, '""')}"`
    const rows = [['Date', 'Séance', 'Durée (min)', 'Exercice', 'Série', 'Charge (kg)', 'Répétitions', 'Complétée', 'Notes']]
    for (const w of state.current.workouts) for (const ex of w.exercises) for (const s of ex.sets) {
      rows.push([w.date, q(w.name), w.durationMinutes ? String(w.durationMinutes) : '', q(ex.exerciseName), String(s.setNumber),
        String(s.actualWeight ?? s.targetWeight), String(s.actualReps ?? s.targetReps), s.completed ? 'Oui' : 'Non', q(s.notes || w.notes || '')])
    }
    return rows.map((r) => r.join(',')).join('\n')
  }, [])

  const importAllDataJSON = useCallback(async (json: string) => {
    try {
      const t = JSON.parse(json)
      if (!t || typeof t !== 'object') return { success: false, message: 'Format de fichier invalide.' }
      const apply = <T,>(arr: unknown, set: (v: T) => void, name: string) => { if (Array.isArray(arr)) { set(arr as T); if (uid) writeJSON(key(name), arr) } }
      apply(t.customExercises, setCustomExercises, 'custom')
      apply(t.favorites, setFavorites, 'favs')
      apply(t.routines, setRoutines, 'routines')
      apply(t.workouts, setWorkouts, 'workouts')
      apply(t.measurements, setMeasurements, 'measurements')
      apply(t.weeklyPlans, setWeeklyPlans, 'plans')
      apply(t.customPrograms, setCustomPrograms, 'programs')
      if (t.activeProgram) { setActiveProgram(t.activeProgram); if (uid) writeJSON(key('active_program'), t.activeProgram) }
      return { success: true, message: 'Données restaurées avec succès !' }
    } catch {
      return { success: false, message: 'Erreur lors de la lecture du fichier JSON.' }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid])

  const allExercises = useMemo(() => [...EXERCISES, ...customExercises], [customExercises])
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const value: WorkoutStore = {
    loading, allExercises, customExercises, favorites, routines, workouts, activeWorkout, measurements, weeklyPlans, programs, customPrograms,
    activeProgram, finishersCatalog: FINISHERS, exerciseSettings, sharedTemplateWorkout, setSharedTemplateWorkout,
    addCustomExercise, deleteCustomExercise, toggleFavorite, isFavorite, createRoutine, updateRoutine, deleteRoutine,
    startWorkout, updateActiveWorkout, finishActiveWorkout, cancelActiveWorkout, deleteWorkout, updateWorkout, addCompletedWorkout,
    duplicateWorkoutAsNew, getPreviousPerformance, getProgramOverloadSuggestion, getPersonalRecords, createCustomProgram, deleteCustomProgram,
    startProgram, stopActiveProgram, exportProgramCode, importProgramFromCode, updateExerciseSettings, loadSharedWorkout, createShareCode,
    addMeasurement, deleteMeasurement, updateWeeklyPlanDay, replaceWeek, exportAllDataJSON, exportWorkoutsCSV, importAllDataJSON,
  }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWorkout() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useWorkout doit être utilisé dans <WorkoutProvider>')
  return ctx
}
