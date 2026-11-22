// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useEffect, useMemo, useRef } from 'react'
import confetti from 'canvas-confetti'
import { CustomExerciseSheet } from '../exercises/CustomExerciseSheet'
import { EXERCISE_FILTERS } from '../../data/misc'
import { ExerciseIllustration } from '../exercises/ExerciseIllustration'
import { FINISHERS } from '../../data/circuits'
import { FinisherTimerSheet } from './FinisherTimerSheet'
import { GearList } from '../exercises/GearList'
import { Icon } from '../../components/Icon'
import { Sheet } from '../../components/Sheet'
import { WarmupCooldownCard } from './WarmupCooldownCard'
import { equipmentMeta } from '../exercises/meta'
import { playRestDoneSound } from './helpers'
import { useAuth } from '../auth/AuthProvider'
import { useWorkout } from '../../store/WorkoutStore'
import {
  ArrowDownToLine,
  ArrowLeftRight,
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  Flame,
  Minus,
  Music,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Star,
  Timer,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react'
export const ActiveWorkoutPage = ({ onFinishWorkout, onExit }) => {
  let {
      activeWorkout,
      updateActiveWorkout,
      finishActiveWorkout,
      cancelActiveWorkout,
      getPreviousPerformance,
      getProgramOverloadSuggestion,
      getPersonalRecords,
      activeProgram,
      allExercises,
      favorites,
    } = useWorkout(),
    { profile, updateUserProfile } = useAuth(),
    [m, h] = useState(null),
    [g, v] = useState(false),
    [y, b] = useState(null),
    [x, S] = useState({}),
    [C, w] = useState({}),
    T = activeWorkout?.finisherPresetId ? FINISHERS.find((e) => e.id === activeWorkout.finisherPresetId) : void 0,
    [E, D] = useState(T ? T.category : activeWorkout?.finisher ? `cardio` : `none`),
    [ee, O] = useState(T ? `${T.name} — ${T.summary}` : activeWorkout?.finisher || ``),
    [te, k] = useState(activeWorkout?.finisherPresetId),
    [ne, re] = useState(activeWorkout?.finisherLog),
    [ie, ae] = useState(false),
    [oe, se] = useState(false),
    A = useRef(false),
    [ce, le] = useState(activeWorkout?.notes || ``),
    [ue, de] = useState(activeWorkout?.rating || 5),
    [fe, pe] = useState(false),
    [me, he] = useState(false),
    [ge, _e] = useState(profile?.spotifyUrl || ``),
    [ve, ye] = useState(false),
    [j, be] = useState(false),
    [xe, Se] = useState(``),
    [Ce, we] = useState(`all`),
    [Te, Ee] = useState(null),
    [De, Oe] = useState(null),
    ke = useRef(null),
    [Ae, je] = useState(0),
    [Me, Ne] = useState(false),
    [Pe, Fe] = useState(0),
    Ie = useRef(null),
    Le = useRef(null),
    Re = useMemo(() => {
      let e = xe.trim().toLowerCase()
      return [...allExercises]
        .filter((t) =>
          (Ce === `favs` && !favorites.includes(t.id)) || (Ce !== `all` && Ce !== `favs` && t.category !== Ce)
            ? false
            : !e ||
              t.name.toLowerCase().includes(e) ||
              t.primaryMuscle.toLowerCase().includes(e) ||
              (t.specificMuscle || ``).toLowerCase().includes(e),
        )
        .sort((t, n) => {
          let r = e && t.name.toLowerCase().startsWith(e) ? 1 : 0,
            i = e && n.name.toLowerCase().startsWith(e) ? 1 : 0
          if (r !== i) return i - r
          let a = +!!favorites.includes(t.id),
            o = +!!favorites.includes(n.id)
          return a === o ? t.name.localeCompare(n.name, `fr`) : o - a
        })
        .slice(0, e ? 20 : 16)
    }, [allExercises, favorites, xe, Ce])
  if (
    (useEffect(
      () => (
        (Le.current = setInterval(() => {
          Fe((e) => {
            let t = e + 1
            return (t % 600 == 0 && Ne(true), t)
          })
        }, 1e3)),
        () => {
          ;(Le.current && clearInterval(Le.current), ke.current && clearTimeout(ke.current))
        }
      ),
      [],
    ),
    useEffect(
      () => (
        g && m !== null && m > 0
          ? (Ie.current = setInterval(() => {
              h((e) => (e === null || e <= 1 ? (clearInterval(Ie.current), v(false), playRestDoneSound(), 0) : e - 1))
            }, 1e3))
          : m === 0 && v(false),
        () => {
          Ie.current && clearInterval(Ie.current)
        }
      ),
      [g, m],
    ),
    !activeWorkout || activeWorkout.exercises.length === 0)
  )
    return (
      <div className="p-8 text-center space-y-4 bg-white rounded-[32px] border border-[#FBCFE8] max-w-md mx-auto my-8 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-[#FCE7F3] text-[#831843] flex items-center justify-center mx-auto">
          <Icon name="weightlifter" className="w-6 h-6 text-[#831843]" />
        </div>
        <h2 className="font-display font-bold text-[#3B0726] text-base">Aucune séance active</h2>
        <p className="text-xs text-[#7A616F]">Démarre une séance depuis tes routines ou l'accueil.</p>
        <button onClick={onExit} className="px-6 py-3 bg-[#831843] text-white rounded-full text-xs font-bold">
          Retour aux séances
        </button>
      </div>
    )
  let ze = getPersonalRecords(),
    Be = activeWorkout.exercises.reduce((e, t) => e + t.sets.length, 0),
    Ve = activeWorkout.exercises.reduce((e, t) => e + t.sets.filter((e) => e.completed).length, 0),
    He = Be > 0 ? Math.round((Ve / Be) * 100) : 0,
    Ue = (e) => {
      ;(h(e), v(true))
    },
    We = (e) => {
      let t = new Set(activeWorkout.exercises.map((e) => e.exerciseId)),
        r = allExercises.find((t) => t.id === e.exerciseId),
        i = allExercises.filter((e) => !t.has(e.id)),
        a = i.filter((t) =>
          r?.specificMuscle && t.specificMuscle
            ? t.specificMuscle === r.specificMuscle
            : r?.primaryMuscle
              ? t.primaryMuscle.toLowerCase() === r.primaryMuscle.toLowerCase()
              : t.category === e.category,
        )
      return (
        a.length === 0 && (a = i.filter((t) => t.category === e.category)),
        a
          .sort((t, n) => {
            let r = +!!favorites.includes(t.id),
              i = +!!favorites.includes(n.id)
            if (i !== r) return i - r
            let a = +(t.equipment === e.equipment),
              o = +(n.equipment === e.equipment)
            return o === a ? t.name.localeCompare(n.name, `fr`) : o - a
          })
          .slice(0, 3)
      )
    },
    Ge = (e, t) => {
      let i = [...activeWorkout.exercises],
        a = i[e],
        s = getPreviousPerformance(t.id)
      S((e) => ({
        ...e,
        [a.id]: JSON.parse(JSON.stringify(a)),
      }))
      let c = s ? s.weight : (a.sets[0]?.targetWeight ?? 20),
        l = a.sets.map((e) =>
          e.completed
            ? {
                ...e,
              }
            : {
                ...e,
                targetWeight: c,
                actualWeight: c,
                targetReps: e.targetReps,
                actualReps: e.targetReps,
              },
        ),
        u = a.replacedFrom || a.exerciseName
      ;((i[e] = {
        ...a,
        exerciseId: t.id,
        exerciseName: t.name,
        category: t.category,
        equipment: t.equipment,
        restSeconds: a.restSeconds || t.defaultRestSeconds,
        sets: l,
        replacedFrom: u,
      }),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: i,
        }),
        b(null))
    },
    Ke = (e, t) => {
      let i = x[t]
      if (!i) return
      let a = [...activeWorkout.exercises]
      ;((a[e] = i),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: a,
        }),
        S((e) => {
          let n = {
            ...e,
          }
          return (delete n[t], n)
        }))
    },
    qe = (e) => {
      if (e >= activeWorkout.exercises.length - 1) {
        b(null)
        return
      }
      let t = [...activeWorkout.exercises],
        [i] = t.splice(e, 1)
      ;(t.push(i),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: t,
        }),
        b(null))
    },
    Je = (e) => {
      let t = getPreviousPerformance(e.id),
        i = t
          ? t.weight
          : e.equipment === `dumbbell`
            ? 8
            : e.equipment === `barbell`
              ? 20
              : e.equipment === `bodyweight` || e.equipment === `cardio_machine`
                ? 0
                : 20,
        a = parseInt(e.defaultReps, 10) || 10,
        s = e.defaultSets || 3,
        c = Array.from(
          {
            length: s,
          },
          (e, t) => ({
            id: `set_${Date.now()}_${t}_${Math.random().toString(36).slice(2, 5)}`,
            setNumber: t + 1,
            targetReps: a,
            targetWeight: i,
            actualReps: a,
            actualWeight: i,
            completed: false,
          }),
        ),
        l = {
          id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          exerciseId: e.id,
          exerciseName: e.name,
          category: e.category,
          equipment: e.equipment,
          restSeconds: e.defaultRestSeconds || profile?.defaultRestTime || 75,
          sets: c,
        }
      ;(updateActiveWorkout({
        ...activeWorkout,
        exercises: [...activeWorkout.exercises, l],
      }),
        (A.current = false),
        Se(``),
        be(false),
        Oe(`« ${e.name} » ajouté à ta séance !`),
        ke.current && clearTimeout(ke.current),
        (ke.current = setTimeout(() => Oe(null), 3500)))
    },
    Ye = (e) => {
      if (activeWorkout.exercises.length <= 1) return
      let t = activeWorkout.exercises.filter((t, n) => n !== e)
      ;(updateActiveWorkout({
        ...activeWorkout,
        exercises: t,
      }),
        b(null))
    },
    Xe = (e, t) => {
      let i = [...activeWorkout.exercises],
        a = {
          ...i[e],
        },
        o = [...a.sets],
        s = o[t],
        c = !s.completed
      ;((o[t] = {
        ...s,
        completed: c,
        actualWeight: s.actualWeight ?? s.targetWeight,
        actualReps: s.actualReps ?? s.targetReps,
      }),
        (a.sets = o),
        (i[e] = a),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: i,
        }),
        c &&
          (i.every((e) => e.sets.every((e) => e.completed)) && !A.current && !ne
            ? ((A.current = true), se(true), ae(true))
            : Ue(a.restSeconds || profile?.defaultRestTime || 75)))
    },
    Ze = (e, t, i, a) => {
      let o = [...activeWorkout.exercises],
        s = {
          ...o[e],
        },
        c = [...s.sets],
        l = Math.max(0, Number(i.toFixed(1))),
        u = Math.max(1, Math.round(a))
      ;((c[t] = {
        ...c[t],
        targetWeight: l,
        actualWeight: l,
        targetReps: u,
        actualReps: u,
      }),
        (s.sets = c),
        (o[e] = s),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: o,
        }))
    },
    Qe = (e) => {
      let t = [...activeWorkout.exercises],
        i = {
          ...t[e],
        },
        a = i.sets[i.sets.length - 1],
        o = {
          id: `set_${Date.now()}_${i.sets.length + 1}`,
          setNumber: i.sets.length + 1,
          targetReps: a ? (a.actualReps ?? a.targetReps) : 10,
          targetWeight: a ? (a.actualWeight ?? a.targetWeight) : 20,
          actualReps: a ? (a.actualReps ?? a.targetReps) : 10,
          actualWeight: a ? (a.actualWeight ?? a.targetWeight) : 20,
          completed: false,
        }
      ;((i.sets = [...i.sets, o]),
        (t[e] = i),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: t,
        }))
    },
    $e = (e) => {
      let t = [...activeWorkout.exercises],
        i = {
          ...t[e],
        }
      i.sets.length <= 1 ||
        ((i.sets = i.sets.slice(0, -1)),
        (t[e] = i),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: t,
        }))
    },
    et = (e, t, i) => {
      let a = [...activeWorkout.exercises],
        o = {
          ...a[e],
        }
      ;((o.sets = o.sets.map((e) => ({
        ...e,
        targetWeight: t,
        actualWeight: t,
        targetReps: i ?? e.targetReps,
        actualReps: i ?? e.actualReps ?? e.targetReps,
      }))),
        (a[e] = o),
        updateActiveWorkout({
          ...activeWorkout,
          exercises: a,
        }))
    },
    tt = (e) => {
      if ((D(e), e === `none`)) (O(``), k(void 0))
      else {
        let t = FINISHERS.filter((t) => t.category === e)[0]
        t && (k(t.id), O(`${t.name} — ${t.summary}`))
      }
    },
    nt = async () => {
      try {
        ;(await finishActiveWorkout(ce, E === `none` ? void 0 : ee, ue, ne),
          confetti({
            particleCount: 70,
            spread: 60,
            origin: {
              y: 0.6,
            },
            colors: [`#F8A5F8`, `#831843`, `#EC4899`, `#FBCFE8`],
          }),
          onFinishWorkout())
      } catch (e) {
        console.error(`Error finishing workout`, e)
      }
    }
  return (
    <div className="space-y-4 pb-48 lg:pb-28 animate-in fade-in duration-200">
      {/* Amélioration : les boutons passent à la ligne sur petit écran au lieu d'écraser le titre. */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2.5 bg-[#13030E]/90 backdrop-blur-xl p-3 sm:p-3.5 rounded-2xl sm:rounded-full border border-white/8 shadow-sm">
        <div className="flex min-w-[11rem] flex-1 items-center gap-2.5">
          <span className="px-3 py-1 rounded-full bg-[#EC4899] text-white text-[11px] font-extrabold tabular-nums">{He}%</span>
          <div className="min-w-0">
            <h1 className="font-display font-bold text-sm sm:text-base text-white truncate">{activeWorkout.name}</h1>
            <span className="text-[11px] text-[#A88096] font-mono tabular-nums block leading-none mt-0.5">
              {((e) => {
                let t = Math.floor(e / 60),
                  n = e % 60
                return `${t}m ${n < 10 ? `0` : ``}${n}s`
              })(Pe)}{' '}
              · {Ve}/{Be} séries
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => be(true)}
            className="h-9 px-2.5 sm:px-3 rounded-full bg-[#EC4899]/20 hover:bg-[#EC4899]/35 border border-[#EC4899]/40 text-[#FBCFE8] hover:text-white flex items-center gap-1 text-xs font-bold transition-all active:scale-95 cursor-pointer shrink-0"
            title="Ajouter un exercice à la séance"
          >
            <Plus className="w-3.5 h-3.5 text-[#EC4899]" />
            <span>Exo</span>
          </button>
          <button
            type="button"
            onClick={nt}
            className="h-9 px-3 rounded-full bg-gradient-to-r from-[#831843] to-[#EC4899] hover:opacity-95 text-white flex items-center gap-1.5 text-xs font-bold transition-all active:scale-95 shadow-sm cursor-pointer shrink-0"
            title="Terminer la séance"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.75]" />
            <span className="hidden sm:inline">Terminer</span>
          </button>
          <button
            type="button"
            onClick={() => je((e) => e + 1)}
            className="h-9 px-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white flex items-center gap-1.5 text-xs font-semibold transition-all active:scale-95"
            title="Eau +1"
          >
            <Icon name="water" className="w-3.5 h-3.5 text-[#EC4899]" />
            <span className="tabular-nums">{Ae}</span>
          </button>
          <button
            type="button"
            onClick={() => pe(true)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#EC4899] flex items-center justify-center transition-colors"
            title="Échauffement"
          >
            <Icon name="stretch" className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => he(true)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#EC4899] flex items-center justify-center transition-colors"
            title="Spotify"
          >
            <Music className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => ye(true)}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[#C29DB2] hover:text-white flex items-center justify-center transition-colors"
            title="Quitter"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
      {m !== null && m > 0 && (
        <div className="p-3.5 rounded-2xl bg-[#1C0515] border border-[#EC4899]/30 text-white flex items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-[#EC4899]">
              <Icon name="stopwatch" className="w-4 h-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29DB2] block">Récupération</span>
              <span className="font-mono font-extrabold text-xl sm:text-2xl tabular-nums text-white">
                {Math.floor(m / 60)}:{String(m % 60).padStart(2, `0`)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => h((e) => (e ? e + 15 : 15))}
              className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-bold"
            >
              +15s
            </button>
            <button
              type="button"
              onClick={() => v(!g)}
              className="w-9 h-9 rounded-full bg-[#EC4899] text-white flex items-center justify-center"
            >
              {g ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              type="button"
              onClick={() => {
                ;(h(null), v(false))
              }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-[#A88096] hover:text-white"
            >
              Passer
            </button>
          </div>
        </div>
      )}
      {Me && (
        <div className="p-3 rounded-2xl bg-[#1F0417] border border-[#EC4899]/30 text-white flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Icon name="water" className="w-4 h-4 text-[#EC4899] shrink-0" />
            <p className="text-xs text-[#FDF2F8]">Pause hydratation : bois quelques gorgées d'eau !</p>
          </div>
          <button
            type="button"
            onClick={() => {
              ;(je((e) => e + 1), Ne(false))
            }}
            className="px-3 py-1.5 rounded-full bg-[#EC4899] text-white text-xs font-bold shrink-0 min-h-[36px]"
          >
            +1 verre
          </button>
        </div>
      )}
      <GearList exercises={activeWorkout.exercises} variant="banner" title="Pense à prendre ton matériel avant de démarrer !" />
      {De && (
        <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 flex items-center justify-between gap-2 text-xs font-bold animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{De}</span>
          </div>
          <button type="button" onClick={() => Oe(null)} className="text-emerald-300/80 hover:text-white p-1" aria-label="Fermer">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      <div className="space-y-3.5">
        {activeWorkout.exercises.map((e, t) => {
          let r = getPreviousPerformance(e.exerciseId),
            i = ze[e.exerciseId],
            a = Math.max(...e.sets.map((e) => e.actualWeight ?? e.targetWeight ?? 0)),
            c = i && a > i.maxWeight
          r && Number((r.weight + (e.equipment === `dumbbell` ? 1 : 2.5)).toFixed(1))
          let f = e.sets.every((e) => e.completed),
            p = y === t,
            m = p ? We(e) : [],
            h = allExercises.find((t) => t.id === e.exerciseId),
            g = !!C[e.id]
          return (
            <div
              key={e.id}
              className={`p-4 sm:p-5 rounded-[26px] border transition-all space-y-3 shadow-xs ${f ? `bg-[#1D0417]/95 border-[#EC4899]/40` : `bg-[#150310] border-white/8`}`}
            >
              <div className="flex items-start justify-between gap-2.5 pb-2.5 border-b border-white/6">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-extrabold text-[#EC4899] uppercase tracking-wider">Ex {t + 1}</span>
                    <span className="text-[11px] text-[#A88096] truncate">
                      · {equipmentMeta(e.equipment).label}
                      {e.restSeconds > 0 ? ` · ${e.restSeconds}s` : ``}
                    </span>
                    {c && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EC4899] text-white text-[9px] font-extrabold">
                        <Icon name="sparkle" className="w-2.5 h-2.5 text-white" />
                        <span>Record</span>
                      </span>
                    )}
                  </div>
                  <h2 className="font-display font-bold text-base sm:text-lg text-white mt-0.5 truncate">{e.exerciseName}</h2>
                  {e.replacedFrom && (
                    <div className="mt-1.5 inline-flex flex-wrap items-center gap-2 px-2.5 py-1 rounded-xl bg-[#EC4899]/15 border border-[#EC4899]/30 text-[11px] text-[#FBCFE8]">
                      <span>
                        Remplacé (ancien : <strong className="text-white">{e.replacedFrom}</strong>)
                      </span>
                      {x[e.id] && (
                        <button
                          type="button"
                          onClick={() => Ke(t, e.id)}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white text-[#831843] font-bold text-[10px] hover:bg-[#FCE7F3] transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Annuler</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => $e(t)}
                    disabled={e.sets.length <= 1}
                    className="w-6 h-6 rounded-full text-[#C29DB2] hover:text-white flex items-center justify-center disabled:opacity-30 active:scale-90"
                    title="Retirer une série"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-[11px] font-bold text-white px-1 tabular-nums">{e.sets.length}</span>
                  <button
                    type="button"
                    onClick={() => Qe(t)}
                    className="w-6 h-6 rounded-full text-white hover:text-[#EC4899] flex items-center justify-center active:scale-90"
                    title="Ajouter une série"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => b(p ? null : t)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer ${p ? `bg-[#EC4899] text-white` : `bg-white/8 hover:bg-white/15 text-[#FBCFE8] border border-white/10`}`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                  <span>Changer d’exercice</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    w((t) => ({
                      ...t,
                      [e.id]: !t[e.id],
                    }))
                  }
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-semibold text-[#C29DB2] hover:text-white inline-flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {g ? <EyeOff className="w-3.5 h-3.5 text-[#EC4899]" /> : <Eye className="w-3.5 h-3.5 text-[#EC4899]" />}
                  <span>{g ? `Masquer la machine` : `Image de la machine`}</span>
                </button>
              </div>
              {g && (
                <ExerciseIllustration
                  exercise={{
                    id: e.exerciseId,
                    name: e.exerciseName,
                    equipment: e.equipment,
                    category: e.category,
                    machineSetup: h?.machineSetup,
                    imageUrl: h?.imageUrl,
                  }}
                  variant="dark_workout"
                />
              )}
              {p && (
                <div className="p-3.5 rounded-2xl bg-[#210519] border border-[#EC4899]/40 space-y-2.5 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EC4899] block">
                        Machine occupée ? · Même muscle ciblé
                      </span>
                      <p className="text-xs font-bold text-white">Choisis une alternative (conserve tes {e.sets.length} séries) :</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => b(null)}
                      className="w-7 h-7 rounded-full bg-white/10 text-[#FBCFE8] hover:text-white flex items-center justify-center"
                      aria-label="Fermer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {m.length > 0 ? (
                    <div className="space-y-2">
                      {m.map((n) => {
                        let r = favorites.includes(n.id),
                          i = getPreviousPerformance(n.id),
                          a = n.equipment === e.equipment
                        return (
                          <button
                            key={n.id}
                            type="button"
                            onClick={() => Ge(t, n)}
                            className="w-full p-3 rounded-xl bg-white/6 hover:bg-[#EC4899]/20 border border-white/10 hover:border-[#EC4899] text-left flex items-center justify-between gap-3 transition-all active:scale-99 cursor-pointer"
                          >
                            <div className="min-w-0 flex-1 space-y-0.5">
                              <div className="flex items-center gap-1.5">
                                {r && <Star className="w-3.5 h-3.5 fill-[#EC4899] text-[#EC4899] shrink-0" />}
                                <span className="font-display font-bold text-xs sm:text-sm text-white truncate">{n.name}</span>
                              </div>
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#C29DB2]">
                                <span className="text-[#FBCFE8] font-medium">{n.primaryMuscle}</span>
                                <span>·</span>
                                <span>
                                  {equipmentMeta(n.equipment).label}
                                  {a ? ` (même matériel)` : ``}
                                </span>
                                {i && (
                                  <>
                                    <span>·</span>
                                    <span className="font-mono font-bold text-[#EC4899]">Dernière charge : {i.weight} kg</span>
                                  </>
                                )}
                              </div>
                            </div>
                            <span className="px-3 py-1.5 rounded-full bg-[#EC4899] text-white font-bold text-[11px] shrink-0">
                              Remplacer
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-white/5 text-xs text-[#FBCFE8] space-y-2">
                      <p>Aucune autre alternative disponible pour ce muscle (les exercices similaires sont déjà dans ta séance).</p>
                    </div>
                  )}
                  {t < activeWorkout.exercises.length - 1 && (
                    <button
                      type="button"
                      onClick={() => qe(t)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/8 hover:bg-white/15 text-[#FBCFE8] font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <ArrowDownToLine className="w-3.5 h-3.5 text-[#EC4899]" />
                      <span>Reporter cet exercice à la fin de la séance</span>
                    </button>
                  )}
                  {activeWorkout.exercises.length > 1 && (
                    <button
                      type="button"
                      onClick={() => Ye(t)}
                      className="w-full py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/20 text-rose-200 font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-rose-300" />
                      <span>Retirer cet exercice de la séance</span>
                    </button>
                  )}
                </div>
              )}
              {(() => {
                let n = getProgramOverloadSuggestion(e.exerciseId)
                return !r && !n ? null : (
                  <div className="p-3 rounded-2xl bg-gradient-to-r from-[#EC4899]/15 via-[#831843]/20 to-white/[0.03] border border-[#EC4899]/30 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                      <div className="flex items-center gap-1.5 text-[#FBCFE8]">
                        <TrendingUp className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
                        <span>
                          {r ? (
                            <>
                              Semaine précédente ({r.date}) :{' '}
                              <strong className="text-white">
                                {r.weight} kg × {r.reps} reps
                              </strong>
                            </>
                          ) : (
                            <strong className="text-white">Surcharge Progressive — {activeProgram?.programTitle}</strong>
                          )}
                        </span>
                      </div>
                      {activeProgram && (
                        <span className="px-2 py-0.5 rounded-full bg-[#EC4899]/25 text-[#FBCFE8] text-[10px] font-extrabold">
                          Semaine {activeProgram.currentWeek}/{activeProgram.durationWeeks}
                        </span>
                      )}
                    </div>
                    {n && (
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-white/10">
                        <span className="text-[11px] text-emerald-300 font-bold">💡 {n.recommendationText}</span>
                        <div className="flex items-center gap-1.5">
                          {r && (
                            <button
                              type="button"
                              onClick={() => et(t, r.weight, r.reps)}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold transition-colors"
                            >
                              Même charge ({r.weight} kg)
                            </button>
                          )}
                          {n.suggestedWeight > 0 && (
                            <button
                              type="button"
                              onClick={() => et(t, n.suggestedWeight)}
                              className="px-2.5 py-1 rounded-lg bg-[#EC4899] hover:bg-pink-500 text-white text-[10px] font-extrabold transition-colors"
                            >
                              +2 kg ({n.suggestedWeight} kg)
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => et(t, r?.weight ?? e.sets[0]?.targetWeight ?? 0, n.suggestedReps)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-500/25 hover:bg-emerald-500/40 border border-emerald-400/40 text-emerald-200 text-[10px] font-extrabold transition-colors"
                          >
                            +2 reps ({n.suggestedReps} reps)
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })()}
              <div className="space-y-2">
                {e.sets.map((n, r) => {
                  let i = n.actualWeight ?? n.targetWeight ?? 0,
                    a = n.actualReps ?? n.targetReps ?? 10,
                    o = e.equipment === `dumbbell` ? 1 : 2.5
                  return (
                    <div
                      key={n.id}
                      className={`p-2.5 sm:p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 ${n.completed ? `bg-[#EC4899]/15 border-[#EC4899]/40` : `bg-white/[0.03] border-white/6`}`}
                    >
                      <button type="button" onClick={() => Xe(t, r)} className="flex items-center gap-2.5 min-h-[38px] text-left group">
                        <span
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${n.completed ? `bg-[#EC4899] text-white shadow-xs` : `bg-white/5 border border-white/20 text-transparent group-hover:border-[#EC4899]`}`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                        <div>
                          <span className="font-display font-bold text-xs text-white block leading-none">Série {r + 1}</span>
                          <span className="text-[10px] text-[#A88096] block mt-0.5">{n.completed ? `Validée` : `En attente`}</span>
                        </div>
                      </button>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white/5 rounded-xl border border-white/8 p-0.5">
                          <button
                            type="button"
                            onClick={() => Ze(t, r, i, a - 1)}
                            className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center active:scale-90"
                            aria-label="-1 rep"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-white px-2 tabular-nums">{a}</span>
                          <button
                            type="button"
                            onClick={() => Ze(t, r, i, a + 1)}
                            className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center active:scale-90"
                            aria-label="+1 rep"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center bg-white/5 rounded-xl border border-white/8 p-0.5">
                          <button
                            type="button"
                            onClick={() => Ze(t, r, i - o, a)}
                            className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center active:scale-90"
                            aria-label="-charge"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono font-bold text-xs text-[#EC4899] px-2 tabular-nums">{i}k</span>
                          <button
                            type="button"
                            onClick={() => Ze(t, r, i + o, a)}
                            className="w-7 h-7 rounded-lg text-white/80 hover:text-white hover:bg-white/10 flex items-center justify-center active:scale-90"
                            aria-label="+charge"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
        <button
          type="button"
          onClick={() => be(true)}
          className="w-full py-4 px-5 rounded-[24px] border border-dashed border-[#EC4899]/50 bg-[#1A0414] hover:bg-[#24061C] hover:border-[#EC4899] text-white flex items-center justify-center gap-2.5 transition-all active:scale-99 cursor-pointer shadow-xs"
        >
          <span className="w-8 h-8 rounded-full bg-[#EC4899]/20 border border-[#EC4899]/40 text-[#EC4899] flex items-center justify-center shrink-0">
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </span>
          <div className="text-left">
            <span className="font-display font-bold text-sm text-white block leading-tight">Ajouter un exercice à la séance</span>
            <span className="text-[11px] text-[#C29DB2] block">Recherche rapide ou création d'un exercice sur-mesure</span>
          </div>
        </button>
      </div>
      <div className="p-4 sm:p-5 rounded-[26px] bg-[#14030E] border border-pink-500/25 space-y-4 text-white">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#EC4899]" />
              <span className="font-compact text-xs font-extrabold text-white uppercase tracking-wider">Module Finisher (3 à 8 min)</span>
            </div>
            <button
              type="button"
              onClick={() => {
                ;(se(false), ae(true))
              }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#EC4899] to-[#831843] text-white text-[11px] font-extrabold flex items-center gap-1.5 shadow-md shadow-pink-500/20 hover:opacity-95"
            >
              <Timer className="w-3.5 h-3.5" />
              <span>Ouvrir Chrono Finisher</span>
            </button>
          </div>
          {ne && (
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-300 font-bold">
                <CircleCheck className="w-4 h-4 shrink-0" />
                <span>Finisher validé : {ee}</span>
              </div>
              {ne.isNewRecord && (
                <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">NOUVEAU RECORD !</span>
              )}
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => tt(`none`)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all min-h-[40px] ${E === `none` ? `bg-white text-[#180312]` : `bg-white/5 text-[#A88096] hover:text-white`}`}
            >
              Aucun
            </button>
            <button
              type="button"
              onClick={() => tt(`abs`)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${E === `abs` ? `bg-[#831843] text-white border border-pink-400/40` : `bg-white/5 text-[#A88096] hover:text-white`}`}
            >
              <Icon name="stretch" className="w-3.5 h-3.5 shrink-0" />
              <span>Abdos & Gainage</span>
            </button>
            <button
              type="button"
              onClick={() => tt(`cardio`)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${E === `cardio` ? `bg-[#EC4899] text-white` : `bg-white/5 text-[#A88096] hover:text-white`}`}
            >
              <Icon name="runner" className="w-3.5 h-3.5 shrink-0" />
              <span>Cardio & Sèche</span>
            </button>
            <button
              type="button"
              onClick={() => tt(`pump`)}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[40px] ${E === `pump` ? `bg-amber-500 text-slate-950 font-extrabold` : `bg-white/5 text-[#A88096] hover:text-white`}`}
            >
              <Flame className="w-3.5 h-3.5 shrink-0" />
              <span>Pump & 100 Reps</span>
            </button>
          </div>
          {E !== `none` && (
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-1 gap-2">
                {FINISHERS.filter((e) => e.category === E).map((e) => {
                  let t = te === e.id
                  return (
                    <div
                      key={e.id}
                      onClick={() => {
                        ;(k(e.id), O(`${e.name} — ${e.summary}`))
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${t ? `bg-[#EC4899]/20 border-[#EC4899]` : `bg-white/5 border-white/10 hover:bg-white/10`}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-white">{e.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-bold text-pink-200">
                            {e.durationLabel}
                          </span>
                        </div>
                        <p className="text-[11px] text-pink-200/75 mt-0.5">{e.summary}</p>
                      </div>
                      <button
                        type="button"
                        onClick={(t) => {
                          ;(t.stopPropagation(), k(e.id), O(`${e.name} — ${e.summary}`), se(false), ae(true))
                        }}
                        className="px-3 py-2 rounded-xl bg-[#EC4899] hover:bg-pink-500 text-white text-xs font-extrabold shrink-0 flex items-center gap-1"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Lancer</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
        <div className="pt-2 border-t border-white/6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div>
            <span className="font-display font-bold text-xs text-white block">Ressenti : {ue}/5</span>
            <span className="text-[11px] text-[#A88096]">{ue <= 2 ? `Modéré` : ue === 3 ? `Bon engagement` : `Intense`}</span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => de(e)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${ue >= e ? `bg-[#EC4899] text-white scale-105 shadow-2xs` : `bg-white/5 text-white/30`}`}
              >
                <Icon name="heart-pulse" className="w-3.5 h-3.5" />
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          value={ce}
          onChange={(e) => le(e.target.value)}
          placeholder="Note rapide (optionnel)..."
          className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-white/30 focus:outline-hidden focus:border-[#EC4899]"
        />
      </div>
      <div className="fixed bottom-[calc(5.75rem+env(safe-area-inset-bottom))] lg:bottom-6 left-4 right-4 lg:left-60 lg:right-0 z-40 max-w-xl mx-auto pointer-events-none">
        <button
          type="button"
          onClick={nt}
          className="pointer-events-auto w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#831843] via-[#BE185D] to-[#EC4899] hover:opacity-95 text-white font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-2xl shadow-black/60 active:scale-98 transition-all min-h-[52px] border border-white/20 cursor-pointer"
        >
          <Check className="w-4 h-4 stroke-[2.75]" />
          <span>
            Terminer la séance ({Ve}/{Be})
          </span>
        </button>
      </div>
      <Sheet
        isOpen={fe}
        onClose={() => pe(false)}
        title={
          <span className="flex items-center gap-2">
            <Icon name="stretch" className="w-5 h-5 text-[#EC4899]" />
            <span>Échauffement & Étirements</span>
          </span>
        }
      >
        <WarmupCooldownCard category={activeWorkout.exercises[0]?.category || `lower-body`} />
      </Sheet>
      <Sheet isOpen={me} onClose={() => he(false)} title="Ma Playlist d'entraînement" subtitle="Accède à ta musique sans quitter ta séance">
        <div className="space-y-3">
          <input
            type="url"
            value={ge}
            onChange={(e) => _e(e.target.value)}
            placeholder="https://open.spotify.com/playlist/..."
            className="w-full px-4 py-3 text-xs rounded-2xl border border-[#FBCFE8] bg-[#FFF0F5] text-[#3B0726]"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                ;(await updateUserProfile({
                  spotifyUrl: ge.trim(),
                }),
                  he(false))
              }}
              className="flex-1 py-3 rounded-full bg-[#FCE7F3] text-[#831843] font-bold text-xs min-h-[44px]"
            >
              Enregistrer le lien
            </button>
            <a
              href={ge || `https://open.spotify.com`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-full bg-[#831843] text-white font-bold text-xs text-center flex items-center justify-center min-h-[44px]"
            >
              Ouvrir Spotify ↗
            </a>
          </div>
        </div>
      </Sheet>
      <Sheet
        isOpen={ve}
        onClose={() => ye(false)}
        title="Quitter la séance en cours ?"
        subtitle="Les séries non validées ne seront pas enregistrées dans ton historique."
      >
        <div className="flex gap-2.5 pt-2">
          <button
            type="button"
            onClick={() => ye(false)}
            className="flex-1 py-3 rounded-full bg-[#FFF0F5] text-[#3B0726] font-bold text-xs min-h-[44px]"
          >
            Continuer ma séance
          </button>
          <button
            type="button"
            onClick={() => {
              ;(cancelActiveWorkout(), ye(false), onExit())
            }}
            className="flex-1 py-3 rounded-full bg-[#831843] text-white font-bold text-xs min-h-[44px]"
          >
            Abandonner
          </button>
        </div>
      </Sheet>
      <FinisherTimerSheet
        isOpen={ie}
        initialPresetId={oe ? void 0 : te}
        isHotSuggestion={oe}
        lastExerciseName={activeWorkout.exercises[activeWorkout.exercises.length - 1]?.exerciseName}
        onClose={() => ae(false)}
        onCompleteFinisher={(e, t) => {
          ;(re(e),
            D(e.category),
            k(e.presetId),
            O(t),
            ae(false),
            updateActiveWorkout({
              ...activeWorkout,
              finisher: t,
              finisherPresetId: e.presetId,
              finisherLog: e,
            }))
        }}
        onSkipAndFinishWorkout={() => {
          ;(ae(false), nt())
        }}
      />
      <Sheet isOpen={j} onClose={() => be(false)} title="Ajouter un exercice" subtitle="Sélectionne un exercice ou crée le tien en direct">
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-[#831843]/60 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={xe}
              onChange={(e) => Se(e.target.value)}
              placeholder="Tape quelques lettres (ex: hip, tirage, pecs, biceps)..."
              className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-[#F6EDF2] border border-[#E5D4DF] focus:outline-hidden focus:border-[#831843] text-xs font-semibold text-[#2B091C] placeholder-[#7A616F]/70"
            />
            {xe && (
              <button
                type="button"
                onClick={() => Se(``)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A616F] hover:text-[#3B0726]"
                aria-label="Effacer la recherche"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {EXERCISE_FILTERS.map((e) => {
              let t = Ce === e.id
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => we(e.id)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all shrink-0 cursor-pointer ${t ? `bg-[#831843] text-white shadow-2xs` : `bg-[#F6EDF2] text-[#7A616F] hover:text-[#3B0726] border border-[#E5D4DF]/60`}`}
                >
                  {e.label}
                </button>
              )
            })}
          </div>
          <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-0.5">
            {Re.length > 0 ? (
              Re.map((e) => {
                let t = favorites.includes(e.id),
                  r = activeWorkout.exercises.some((t) => t.exerciseId === e.id),
                  i = getPreviousPerformance(e.id)
                return (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => Je(e)}
                    className="w-full p-3 rounded-2xl bg-white hover:bg-[#FDF2F8] border border-[#FBCFE8]/80 hover:border-[#EC4899] text-left flex items-center justify-between gap-3 transition-all active:scale-99 cursor-pointer shadow-2xs"
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {t && <Star className="w-3.5 h-3.5 fill-[#EC4899] text-[#EC4899] shrink-0" />}
                        <span className="font-display font-bold text-xs sm:text-sm text-[#2B091C] truncate">{e.name}</span>
                        {r && (
                          <span className="px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#831843] text-[9px] font-extrabold shrink-0">
                            Déjà dans la séance
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-[#7A616F]">
                        <span className="font-semibold text-[#831843]">{e.primaryMuscle}</span>
                        <span>·</span>
                        <span>{equipmentMeta(e.equipment).label}</span>
                        <span>·</span>
                        <span>
                          {e.defaultSets || 3}×{e.defaultReps || `10`}
                        </span>
                        {i && (
                          <>
                            <span>·</span>
                            <span className="font-mono font-bold text-[#EC4899]">Dernière : {i.weight} kg</span>
                          </>
                        )}
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-[#831843] text-white font-bold text-[11px] shrink-0 flex items-center gap-1">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ajouter</span>
                    </span>
                  </button>
                )
              })
            ) : (
              <div className="p-5 rounded-2xl bg-[#F6EDF2] border border-[#E5D4DF] text-center space-y-2">
                <p className="text-xs font-semibold text-[#3B0726]">Aucun exercice trouvé pour « {xe} ».</p>
                <p className="text-[11px] text-[#7A616F]">
                  Tu peux le créer en 10 secondes avec sa fiche complète et l'ajouter directement !
                </p>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              Ee(xe.trim() || ``)
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FCE7F3] to-[#FDF2F8] hover:from-[#FBCFE8]/70 hover:to-[#FCE7F3] border border-[#FBCFE8] text-[#831843] font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#EC4899]" />
            <span>{xe.trim() ? `Créer « ${xe.trim()} » (fiche auto) & l'ajouter` : `Créer un nouvel exercice personnalisé`}</span>
          </button>
        </div>
      </Sheet>
      <CustomExerciseSheet
        isOpen={Te !== null}
        initialName={Te || ``}
        onClose={() => Ee(null)}
        onExerciseCreated={(e) => {
          ;(Ee(null), Je(e))
        }}
      />
    </div>
  )
}
