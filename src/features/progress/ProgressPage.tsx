// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useEffect, useMemo } from 'react'
import { DEFAULT_OBJECTIVES, MEASUREMENT_FIELDS } from '../../data/misc'
import { Icon, categoryIcon } from '../../components/Icon'
import { OBJECTIVES_STORAGE_KEY } from '../../lib/constants'
import { Sheet } from '../../components/Sheet'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronDown, ChevronRight, Minus, PenLine, Plus, RotateCcw, Search, Target, Trash2 } from 'lucide-react'
export const ProgressPage = () => {
  let {
      workouts,
      getPersonalRecords,
      allExercises,
      duplicateWorkoutAsNew,
      updateWorkout,
      deleteWorkout,
      measurements,
      addMeasurement,
      deleteMeasurement,
    } = useWorkout(),
    [l, u] = useState(`overview`),
    [d, f] = useState(`all`),
    [p, m] = useState(() => {
      try {
        let e = localStorage.getItem(OBJECTIVES_STORAGE_KEY)
        if (e) {
          let t = JSON.parse(e)
          if (Array.isArray(t) && t.length === 3) return t
        }
      } catch {}
      return DEFAULT_OBJECTIVES
    }),
    [h, g] = useState(null),
    [v, y] = useState(``)
  useEffect(() => {
    try {
      localStorage.setItem(OBJECTIVES_STORAGE_KEY, JSON.stringify(p))
    } catch {}
  }, [p])
  let b = (e) => {
      m((t) =>
        t.map((t) =>
          t.id === e
            ? {
                ...t,
                completed: !t.completed,
              }
            : t,
        ),
      )
    },
    x = (e) => {
      ;(g(e.id), y(e.label))
    },
    S = (e) => {
      let t = v.trim()
      ;(t &&
        m((n) =>
          n.map((n) =>
            n.id === e
              ? {
                  ...n,
                  label: t,
                }
              : n,
          ),
        ),
        g(null))
    },
    [C, w] = useState(``),
    [T, E] = useState(`maxWeight`),
    [D, ee] = useState(`all`),
    [O, te] = useState(`hips`),
    [k, ne] = useState(false),
    [re, ie] = useState(``),
    [ae, oe] = useState(``),
    [se, A] = useState(() => new Date().toISOString().split(`T`)[0]),
    [ce, le] = useState(``),
    [ue, de] = useState(``),
    [fe, pe] = useState(``),
    [me, he] = useState(``),
    [ge, _e] = useState(``),
    [ve, ye] = useState(``),
    [j, be] = useState(``),
    [xe, Se] = useState(``),
    [Ce, we] = useState(null),
    [Te, Ee] = useState(null),
    [De, Oe] = useState(null),
    ke = useMemo(
      () =>
        (workouts || [])
          .filter((e) => e && (e.status === `completed` || !e.status))
          .sort((e, t) => new Date(t.date || 0).getTime() - new Date(e.date || 0).getTime()),
      [workouts],
    ),
    Ae = useMemo(() => {
      if (d === `all`) return ke
      let e = d === `7d` ? 7 : d === `30d` ? 30 : 90,
        t = Date.now() - e * 24 * 60 * 60 * 1e3
      return ke.filter((e) => new Date(e.date || 0).getTime() >= t)
    }, [ke, d]),
    je = useMemo(() => {
      let e = getPersonalRecords ? getPersonalRecords() : {}
      return !e || typeof e != `object`
        ? []
        : Array.isArray(e)
          ? e.map((e) => {
              let t = (allExercises || []).find((t) => t.id === e.exerciseId)
              return {
                exerciseId: e.exerciseId || ``,
                exerciseName: e.exerciseName || t?.name || `Exercice`,
                category: t?.category || `lower-body`,
                maxWeight: Number(e.maxWeight) || 0,
                repsAtMax: Number(e.repsAtMax ?? e.reps) || 0,
                date: e.date || new Date().toISOString(),
              }
            })
          : Object.entries(e)
              .map(([e, t]) => {
                let r = (allExercises || []).find((t) => t.id === e),
                  i = r?.name || ``
                if (!i)
                  for (let t of ke) {
                    let n = (t.exercises || []).find((t) => t.exerciseId === e)
                    if (n?.exerciseName) {
                      i = n.exerciseName
                      break
                    }
                  }
                return {
                  exerciseId: e,
                  exerciseName: i || `Exercice`,
                  category: r?.category || `lower-body`,
                  maxWeight: Number(t?.maxWeight) || 0,
                  repsAtMax: Number(t?.reps) || 0,
                  date: t?.date || new Date().toISOString(),
                }
              })
              .filter((e) => e.maxWeight > 0)
              .sort((e, t) => t.maxWeight - e.maxWeight)
    }, [getPersonalRecords, allExercises, ke]),
    Me = useMemo(() => {
      let e = 0,
        t = 0,
        r = 0,
        i = 0,
        a = 0,
        o = 0,
        s = {
          'lower-body': 0,
          back: 0,
          pecs: 0,
          arms: 0,
          abs: 0,
          cardio: 0,
        }
      Ae.forEach((c) => {
        if (
          ((i += c.durationMinutes || 45),
          c.rating && c.rating > 0 && ((a += c.rating), (o += 1)),
          c.finisher && typeof c.finisher == `string` && c.finisher.trim())
        ) {
          let e = c.finisher.toLowerCase()
          e.includes(`abdo`) || e.includes(`gainage`) || e.includes(`planche`) ? (s.abs += 3) : (s.cardio += 3)
        }
        ;(c.exercises || []).forEach((i) => {
          let a = (allExercises || []).find((e) => e.id === i.exerciseId),
            o = i.category || a?.category || `lower-body`,
            c = Array.isArray(i.sets) ? i.sets : [],
            l = c.filter((e) => e.completed)
          ;(l.length > 0 ? l : c).forEach((n) => {
            let i = Number(n.actualWeight ?? n.targetWeight ?? 0),
              a = Number(n.actualReps ?? n.targetReps ?? 0)
            ;((e += i * a), (t += 1), (r += a), (s[o] = (s[o] || 0) + 1))
          })
        })
      })
      let c = Object.values(s).reduce((e, t) => e + t, 0) || 1
      return {
        sessionsCount: Ae.length,
        totalVolume: e,
        totalSets: t,
        totalReps: r,
        totalMinutes: i,
        avgRating: o > 0 ? (a / o).toFixed(1) : `—`,
        categoryBreakdown: [
          {
            category: `lower-body`,
            label: `Bas du corps & Fessiers`,
            sets: s[`lower-body`],
            pct: Math.round((s[`lower-body`] / c) * 100),
          },
          {
            category: `back`,
            label: `Dos & Posture`,
            sets: s.back,
            pct: Math.round((s.back / c) * 100),
          },
          {
            category: `arms`,
            label: `Bras & Épaules`,
            sets: s.arms,
            pct: Math.round((s.arms / c) * 100),
          },
          {
            category: `abs`,
            label: `Abdos & Gainage`,
            sets: s.abs,
            pct: Math.round((s.abs / c) * 100),
          },
          {
            category: `cardio`,
            label: `Cardio & Finisher`,
            sets: s.cardio,
            pct: Math.round((s.cardio / c) * 100),
          },
        ],
      }
    }, [Ae, allExercises]),
    Ne = useMemo(() => {
      let e = new Set(ke.map((e) => (typeof e.date == `string` ? e.date.split(`T`)[0] : ``)).filter(Boolean)),
        t = []
      for (let n = 27; n >= 0; n--) {
        let r = new Date()
        r.setDate(r.getDate() - n)
        let i = r.toISOString().split(`T`)[0]
        t.push({
          dateStr: i,
          dayNum: r.getDate(),
          hasWorkout: e.has(i),
          isToday: n === 0,
        })
      }
      return t
    }, [ke]),
    Pe = useMemo(() => {
      let e = new Map()
      ke.forEach((t) => {
        ;(t.exercises || []).forEach((t) => {
          if (!t?.exerciseId) return
          let r = (allExercises || []).find((e) => e.id === t.exerciseId),
            i = e.get(t.exerciseId)
          i
            ? (i.count += 1)
            : e.set(t.exerciseId, {
                id: t.exerciseId,
                name: t.exerciseName || r?.name || `Exercice`,
                count: 1,
                category: t.category || r?.category || `lower-body`,
              })
        })
      })
      let t = Array.from(e.values()).sort((e, t) => t.count - e.count)
      return t.length === 0
        ? (allExercises || []).slice(0, 12).map((e) => ({
            id: e.id,
            name: e.name,
            count: 0,
            category: e.category,
          }))
        : t
    }, [ke, allExercises]),
    Fe = C || Pe[0]?.id || ``,
    Ie = useMemo(() => {
      if (!Fe) return []
      let e = []
      return (
        [...ke].reverse().forEach((t) => {
          let n = (t.exercises || []).find((e) => e.exerciseId === Fe)
          if (n && Array.isArray(n.sets) && n.sets.length > 0) {
            let r = 0,
              i = 0,
              a = 0,
              o = 0
            ;(n.sets.forEach((e) => {
              let t = Number(e.actualWeight ?? e.targetWeight ?? 0),
                n = Number(e.actualReps ?? e.targetReps ?? 0)
              o += t * n
              let s = t > 0 ? Math.round(t * (1 + n / 30)) : 0
              ;((t > r || (t === r && n > i)) && ((r = t), (i = n)), s > a && (a = s))
            }),
              (r > 0 || o > 0) &&
                e.push({
                  date: t.date || new Date().toISOString(),
                  maxWeight: r,
                  bestReps: i,
                  est1RM: a,
                  volume: o,
                }))
          }
        }),
        e
      )
    }, [Fe, ke]),
    Le = useMemo(
      () => [...(measurements || [])].sort((e, t) => new Date(e.date || 0).getTime() - new Date(t.date || 0).getTime()),
      [measurements],
    ),
    Re = Le.length > 0 ? Le[Le.length - 1] : null,
    ze = Le.length > 0 ? Le[0] : null,
    Be = useMemo(() => (!Re?.waist || !Re?.hips || Re.hips <= 0 ? null : (Re.waist / Re.hips).toFixed(2)), [Re]),
    Ve = useMemo(
      () =>
        Le.filter((e) => typeof e[O] == `number` && e[O] > 0).map((e) => ({
          date: e.date,
          value: e[O],
        })),
      [Le, O],
    ),
    He = (e, t = 360, n = 130, r = 20, i = 20) => {
      if (e.length === 0)
        return {
          linePath: ``,
          areaPath: ``,
          coords: [],
        }
      if (e.length === 1) {
        let i = t / 2,
          a = n / 2
        return {
          linePath: `M ${r} ${a} L ${t - r} ${a}`,
          areaPath: `M ${r} ${a} L ${t - r} ${a} L ${t - r} ${n} L ${r} ${n} Z`,
          coords: [
            {
              x: i,
              y: a,
              val: e[0],
            },
          ],
        }
      }
      let a = Math.min(...e),
        o = Math.max(...e) - a || 1,
        s = e.map((s, c) => ({
          x: r + (c / (e.length - 1)) * (t - r * 2),
          y: n - i - ((s - a) / o) * (n - i * 2),
          val: s,
        })),
        c = `M ${s[0].x} ${s[0].y}`
      for (let e = 0; e < s.length - 1; e++) {
        let t = s[e],
          n = s[e + 1],
          r = t.x + (n.x - t.x) / 2,
          i = t.y,
          a = t.x + (n.x - t.x) / 2,
          o = n.y
        c += ` C ${r} ${i}, ${a} ${o}, ${n.x} ${n.y}`
      }
      let l = `${c} L ${s[s.length - 1].x} ${n} L ${s[0].x} ${n} Z`
      return {
        linePath: c,
        areaPath: l,
        coords: s,
      }
    },
    Ue = () => {
      ;(A(new Date().toISOString().split(`T`)[0]),
        le(Re?.weight ? String(Re.weight) : ``),
        de(Re?.waist ? String(Re.waist) : ``),
        pe(Re?.hips ? String(Re.hips) : ``),
        he(Re?.thighs ? String(Re.thighs) : ``),
        _e(Re?.arms ? String(Re.arms) : ``),
        ye(Re?.chest ? String(Re.chest) : ``),
        be(``),
        ne(true))
    },
    We = async (e) => {
      e.preventDefault()
      let t = {
        date: se,
        weight: ce ? Number(ce) : void 0,
        waist: ue ? Number(ue) : void 0,
        hips: fe ? Number(fe) : void 0,
        thighs: me ? Number(me) : void 0,
        arms: ge ? Number(ge) : void 0,
        chest: ve ? Number(ve) : void 0,
        notes: j.trim() || void 0,
        unit: `metric`,
      }
      ;(await addMeasurement(t), ne(false))
    },
    Ge = async (e) => {
      let t = [
        `Glow Up Lab — ${e.name} (${new Date(e.date).toLocaleDateString(`fr-FR`)})`,
        ...(e.exercises || []).map((e) => {
          let t = Array.isArray(e.sets) ? e.sets : [],
            n = t.reduce((e, t) => {
              let n = Number(t.actualWeight ?? t.targetWeight ?? 0)
              return n > e ? n : e
            }, 0)
          return `• ${e.exerciseName} : ${t.length} séries (Max ${n} kg)`
        }),
      ]
      try {
        ;(await navigator.clipboard.writeText(
          t.join(`
`),
        ),
          Ee(e.id),
          setTimeout(() => Ee(null), 2e3))
      } catch {}
    },
    Ke = async (e) => {
      ;(e.preventDefault(),
        De &&
          (await updateWorkout(De.id, {
            name: De.name,
            exercises: De.exercises,
            notes: De.notes,
            finisher: De.finisher,
          }),
          Oe(null)))
    },
    qe = useMemo(() => je.filter((e) => D === `all` || e.category === D), [je, D]),
    Je = useMemo(() => {
      if (!xe.trim()) return ke
      let e = xe.toLowerCase()
      return ke.filter(
        (t) =>
          (t.name || ``).toLowerCase().includes(e) ||
          (t.exercises || []).some((t) => (t.exerciseName || ``).toLowerCase().includes(e)) ||
          (t.notes && t.notes.toLowerCase().includes(e)),
      )
    }, [ke, xe]),
    Ye = useMemo(() => (re && Le.find((e) => e.id === re)) || ze, [re, Le, ze]),
    Xe = useMemo(() => (ae && Le.find((e) => e.id === ae)) || Re, [ae, Le, Re])
  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      <div className="flex items-end justify-between gap-3 pt-1">
        <div>
          <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#831843] block">Analyses & Évolution</span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-[#2B091C] mt-0.5">
            Mon <span className="font-serif-ny italic font-normal text-[#831843]">suivi</span>
          </h1>
        </div>
        <button
          onClick={Ue}
          className="px-4 py-2.5 rounded-full bg-[#831843] hover:bg-[#3B0726] text-white text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nouvelle mesure</span>
        </button>
      </div>
      <div className="p-1 rounded-2xl bg-[#F6EDF2] grid grid-cols-4 gap-1">
        {[
          {
            id: `overview`,
            label: `Bilan`,
          },
          {
            id: `loads`,
            label: `Charges & PRs`,
          },
          {
            id: `body`,
            label: `Silhouette`,
          },
          {
            id: `history`,
            label: `Journal`,
          },
        ].map((e) => {
          let t = l === e.id
          return (
            <button
              key={e.id}
              onClick={() => u(e.id)}
              className={`py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-semibold transition-all truncate ${t ? `bg-white text-[#831843] shadow-2xs font-bold` : `text-[#7A616F] hover:text-[#2B091C]`}`}
            >
              {e.label}
            </button>
          )
        })}
      </div>
      {l === `overview` && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-[#7A616F]">Période analysée</span>
            <div className="inline-flex p-1 rounded-full bg-[#F6EDF2] gap-1">
              {[
                {
                  id: `7d`,
                  label: `7j`,
                },
                {
                  id: `30d`,
                  label: `30j`,
                },
                {
                  id: `90d`,
                  label: `3 mois`,
                },
                {
                  id: `all`,
                  label: `Tout`,
                },
              ].map((e) => (
                <button
                  key={e.id}
                  onClick={() => f(e.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all ${d === e.id ? `bg-[#831843] text-white` : `text-[#7A616F] hover:text-[#2B091C]`}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#7A616F]">Séances</span>
                <Icon name="weightlifter" className="w-4 h-4 text-[#831843]" />
              </div>
              <p className="font-mono text-2xl font-bold text-[#2B091C] tabular-nums">{Me.sessionsCount}</p>
              <span className="text-[11px] text-[#7A616F] block">Note moy. : {Me.avgRating}/5</span>
            </div>
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#7A616F]">Volume total</span>
                <Icon name="kettlebell" className="w-4 h-4 text-[#831843]" />
              </div>
              <p className="font-mono text-2xl font-bold text-[#831843] tabular-nums">
                {Me.totalVolume >= 1e3 ? `${(Me.totalVolume / 1e3).toFixed(1)}t` : `${Me.totalVolume}kg`}
              </p>
              <span className="text-[11px] text-[#7A616F] block">{Me.totalVolume.toLocaleString(`fr-FR`)} kg soulevés</span>
            </div>
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#7A616F]">Séries</span>
                <Icon name="dumbbell" className="w-4 h-4 text-[#831843]" />
              </div>
              <p className="font-mono text-2xl font-bold text-[#2B091C] tabular-nums">{Me.totalSets}</p>
              <span className="text-[11px] text-[#7A616F] block">{Me.totalReps} répétitions</span>
            </div>
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#7A616F]">Durée cumulée</span>
                <Icon name="stopwatch" className="w-4 h-4 text-[#831843]" />
              </div>
              <p className="font-mono text-2xl font-bold text-[#2B091C] tabular-nums">
                {Me.totalMinutes >= 60
                  ? `${Math.floor(Me.totalMinutes / 60)}h${Me.totalMinutes % 60 > 0 ? String(Me.totalMinutes % 60).padStart(2, `0`) : ``}`
                  : `${Me.totalMinutes}m`}
              </p>
              <span className="text-[11px] text-[#7A616F] block">{je.length} records établis</span>
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-[#F6EDF2] space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                  Assiduité sur 4 semaines
                </span>
                <h2 className="font-display font-bold text-base text-[#2B091C]">Calendrier de régularité (28 jours)</h2>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-[#831843] font-mono text-xs font-bold">
                {Ne.filter((e) => e.hasWorkout).length} j actifs
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {Ne.map((e) => (
                <div
                  key={e.dateStr}
                  title={e.dateStr}
                  className={`h-9 sm:h-10 rounded-xl flex flex-col items-center justify-center text-xs font-mono font-bold transition-all ${e.hasWorkout ? `bg-[#831843] text-white shadow-2xs` : e.isToday ? `bg-[#FCE7F3] text-[#831843] border border-[#F472B6]` : `bg-white/80 text-[#7A616F]`}`}
                >
                  <span>{e.dayNum}</span>
                  {e.hasWorkout && <span className="w-1 h-1 rounded-full bg-[#FBCFE8] mt-0.5" />}
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-[#F6EDF2] space-y-3.5">
            <div>
              <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                Équilibre d’entraînement
              </span>
              <h2 className="font-display font-bold text-base text-[#2B091C]">Répartition par zone musculaire</h2>
            </div>
            <div className="space-y-3">
              {Me.categoryBreakdown.map((e) => (
                <div key={e.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#2B091C] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-white text-[#831843] flex items-center justify-center">
                        <Icon name={categoryIcon(e.category)} className="w-3.5 h-3.5" />
                      </span>
                      <span>{e.label}</span>
                    </span>
                    <span className="font-mono font-bold text-[#831843]">
                      {e.sets} séries ({e.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-white overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#831843] to-[#EC4899] transition-all duration-300"
                      style={{
                        width: `${Math.max(e.pct, e.sets > 0 ? 6 : 0)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-grainy-pink space-y-3.5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-2xl bg-white text-[#831843] flex items-center justify-center shrink-0 shadow-2xs">
                  <Target className="w-4 h-4 text-[#EC4899]" />
                </div>
                <div className="min-w-0">
                  <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                    Focus personnel
                  </span>
                  <h2 className="font-display font-bold text-base text-[#2B091C] truncate">Mes objectifs</h2>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-white text-[#831843] font-mono text-xs font-bold shrink-0 shadow-2xs">
                {p.filter((e) => e.completed).length}/3
              </span>
            </div>
            <div className="space-y-2">
              {p.map((e) => {
                let t = h === e.id
                return (
                  <div
                    key={e.id}
                    className={`p-3 rounded-2xl transition-all flex items-center justify-between gap-2.5 ${e.completed ? `bg-white/60 text-[#831843]` : `bg-white/85 text-[#2B091C] hover:bg-white`}`}
                  >
                    {t ? (
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <input
                          type="text"
                          value={v}
                          onChange={(e) => y(e.target.value)}
                          onKeyDown={(t) => {
                            t.key === `Enter` && S(e.id)
                          }}
                          autoFocus
                          className="flex-1 min-w-0 px-2.5 py-1 rounded-xl bg-white border border-[#FBCFE8] text-xs font-semibold text-[#2B091C] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => S(e.id)}
                          className="px-2.5 py-1 rounded-xl bg-[#831843] text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          OK
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => b(e.id)}
                          className="flex items-center gap-3 flex-1 min-w-0 text-left cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${e.completed ? `bg-[#831843] text-white shadow-2xs` : `bg-[#F6EDF2] border-2 border-[#F472B6] text-transparent`}`}
                          >
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </span>
                          <span
                            className={`text-xs sm:text-sm font-semibold leading-snug transition-all ${e.completed ? `line-through opacity-65` : ``}`}
                          >
                            {e.label}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => x(e)}
                          className="w-7 h-7 rounded-full hover:bg-[#F6EDF2] text-[#7A616F] hover:text-[#831843] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                          title="Modifier cet objectif"
                        >
                          <PenLine className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
      {l === `loads` && (
        <div className="space-y-5">
          <div className="p-5 rounded-[28px] bg-grainy-pink space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div>
                <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                  Courbe de surcharge progressive
                </span>
                <h2 className="font-display font-bold text-lg text-[#2B091C]">Évolution par exercice</h2>
              </div>
              <select
                value={Fe}
                onChange={(e) => w(e.target.value)}
                className="px-3.5 py-2 text-xs rounded-full bg-white text-[#2B091C] font-semibold focus:outline-hidden shadow-2xs max-w-full sm:max-w-[230px] truncate"
              >
                {Pe.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name} {e.count > 0 ? `(${e.count} séances)` : ``}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[
                {
                  id: `maxWeight`,
                  label: `Charge Max (kg)`,
                },
                {
                  id: `est1RM`,
                  label: `1RM Estimé (kg)`,
                },
                {
                  id: `volume`,
                  label: `Volume Séance (kg)`,
                },
              ].map((e) => (
                <button
                  key={e.id}
                  onClick={() => E(e.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${T === e.id ? `bg-[#831843] text-white shadow-2xs` : `bg-white/80 text-[#7A616F] hover:bg-white`}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
            {Ie.length > 0 ? (
              (() => {
                let e = Ie.map((e) => e[T]),
                  t = e[0],
                  n = e[e.length - 1],
                  r = Math.max(...e),
                  i = n - t,
                  { linePath, areaPath, coords } = He(e)
                return (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="p-3 rounded-2xl bg-white/85">
                        <span className="text-[10px] font-semibold text-[#7A616F] block">Dernière séance</span>
                        <span className="font-mono text-lg font-bold text-[#2B091C]">{n} kg</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/85">
                        <span className="text-[10px] font-semibold text-[#7A616F] block">Record absolu</span>
                        <span className="font-mono text-lg font-bold text-[#831843]">{r} kg</span>
                      </div>
                      <div className="p-3 rounded-2xl bg-white/85">
                        <span className="text-[10px] font-semibold text-[#7A616F] block">Progression</span>
                        <span className="font-mono text-lg font-bold text-[#EC4899]">{i >= 0 ? `+${i}` : i} kg</span>
                      </div>
                    </div>
                    <div className="w-full overflow-hidden rounded-2xl bg-white/75 p-3">
                      <svg viewBox="0 0 360 130" className="w-full h-32 overflow-visible">
                        <defs>
                          <linearGradient id="loadFillGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#EC4899" stopOpacity="0.32" />
                            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        <path d={areaPath} fill="url(#loadFillGrad)" />
                        <path d={linePath} fill="none" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
                        {coords.map((e, t) => (
                          <g key={t}>
                            <circle cx={e.x} cy={e.y} r="4.5" fill="#FFFFFF" stroke="#831843" strokeWidth="2.5" />
                            <text x={e.x} y={e.y - 9} textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#2B091C]">
                              {e.val}
                            </text>
                          </g>
                        ))}
                      </svg>
                      <div className="flex justify-between text-[10px] font-semibold text-[#7A616F] px-1 mt-1">
                        <span>
                          {new Date(Ie[0].date).toLocaleDateString(`fr-FR`, {
                            day: `2-digit`,
                            month: `short`,
                          })}
                        </span>
                        <span>{Ie.length} séance(s) enregistrée(s)</span>
                        <span>
                          {new Date(Ie[Ie.length - 1].date).toLocaleDateString(`fr-FR`, {
                            day: `2-digit`,
                            month: `short`,
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })()
            ) : (
              <div className="py-8 text-center text-xs text-[#7A616F] bg-white/60 rounded-2xl">
                Valide une séance contenant cet exercice pour afficher ta courbe de progression.
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
              <h2 className="font-display font-bold text-base text-[#2B091C] flex items-center gap-2">
                <Icon name="trophy" className="w-4 h-4 text-[#831843]" />
                <span>Tous mes Records Personnels ({qe.length})</span>
              </h2>
              <div className="flex flex-wrap gap-1">
                {[
                  {
                    id: `all`,
                    label: `Tous`,
                  },
                  {
                    id: `lower-body`,
                    label: `Bas du corps`,
                  },
                  {
                    id: `back`,
                    label: `Dos`,
                  },
                  {
                    id: `arms`,
                    label: `Bras`,
                  },
                ].map((e) => (
                  <button
                    key={e.id}
                    onClick={() => ee(e.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${D === e.id ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#7A616F] hover:text-[#2B091C]`}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
            </div>
            {qe.length === 0 ? (
              <div className="p-6 rounded-[24px] bg-[#F6EDF2] text-center text-xs text-[#7A616F]">
                Aucun record enregistré dans cette catégorie pour le moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {qe.map((e) => {
                  let t = Math.round(e.maxWeight * (1 + e.repsAtMax / 30))
                  return (
                    <button
                      key={e.exerciseId}
                      onClick={() => w(e.exerciseId)}
                      className={`p-4 rounded-[24px] text-left transition-all flex items-center justify-between gap-3 ${Fe === e.exerciseId ? `bg-[#FCE7F3] border border-[#F472B6]` : `bg-[#F6EDF2] hover:bg-[#F1E2EA]`}`}
                    >
                      <div className="min-w-0">
                        <span className="font-display font-bold text-sm text-[#2B091C] block truncate">{e.exerciseName}</span>
                        <span className="text-[11px] text-[#7A616F] block mt-0.5">
                          1RM théorique : <strong className="font-mono text-[#831843]">{t} kg</strong> ·{' '}
                          {new Date(e.date).toLocaleDateString(`fr-FR`, {
                            day: `2-digit`,
                            month: `short`,
                          })}
                        </span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="px-3 py-1 rounded-full bg-white text-[#831843] font-mono font-bold text-xs block shadow-2xs">
                          {e.maxWeight} kg × {e.repsAtMax}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
      {l === `body` && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                Indice Sablier (Taille/Hanches)
              </span>
              <p className="font-mono text-2xl font-bold text-[#2B091C]">{Be || `—`}</p>
              <span className="text-[11px] text-[#7A616F] block">{Be ? `Harmonie taille / fessiers` : `Renseigne taille + hanches`}</span>
            </div>
            <div className="p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                Hanches / Fessiers
              </span>
              <p className="font-mono text-2xl font-bold text-[#831843]">{Re?.hips ? `${Re.hips} cm` : `—`}</p>
              <span className="text-[11px] text-[#7A616F] block">
                {ze?.hips && Re?.hips
                  ? `${Re.hips - ze.hips >= 0 ? `+` : ``}${(Re.hips - ze.hips).toFixed(1)} cm depuis le début`
                  : `Dernière mesure`}
              </span>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-[24px] bg-[#F6EDF2] space-y-1">
              <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">Tour de taille</span>
              <p className="font-mono text-2xl font-bold text-[#2B091C]">{Re?.waist ? `${Re.waist} cm` : `—`}</p>
              <span className="text-[11px] text-[#7A616F] block">
                {ze?.waist && Re?.waist
                  ? `${Re.waist - ze.waist >= 0 ? `+` : ``}${(Re.waist - ze.waist).toFixed(1)} cm depuis le début`
                  : `Dernière mesure`}
              </span>
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-grainy-pink space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">
                  Suivi morphologique
                </span>
                <h2 className="font-display font-bold text-lg text-[#2B091C]">Courbe de mes mensurations</h2>
              </div>
              <button
                onClick={Ue}
                className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[#831843] text-white text-xs font-semibold flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter une mesure</span>
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {MEASUREMENT_FIELDS.map((e) => (
                <button
                  key={e.key}
                  onClick={() => te(e.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${O === e.key ? `bg-[#831843] text-white shadow-2xs` : `bg-white/85 text-[#7A616F] hover:bg-white`}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
            {Ve.length > 0 ? (
              (() => {
                let e = Ve.map((e) => e.value),
                  t = MEASUREMENT_FIELDS.find((e) => e.key === O)?.unit || `cm`,
                  { linePath, areaPath, coords } = He(e)
                return (
                  <div className="w-full overflow-hidden rounded-2xl bg-white/80 p-3">
                    <svg viewBox="0 0 360 130" className="w-full h-32 overflow-visible">
                      <defs>
                        <linearGradient id="bodyFillGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#831843" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#831843" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d={areaPath} fill="url(#bodyFillGrad)" />
                      <path d={linePath} fill="none" stroke="#831843" strokeWidth="3" strokeLinecap="round" />
                      {coords.map((e, n) => (
                        <g key={n}>
                          <circle cx={e.x} cy={e.y} r="4.5" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2.5" />
                          <text x={e.x} y={e.y - 9} textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#2B091C]">
                            {e.val}
                            {t}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                )
              })()
            ) : (
              <div className="py-8 text-center text-xs text-[#7A616F] bg-white/60 rounded-2xl">
                Aucune donnée pour cette mesure. Clique sur « Nouvelle mesure » pour commencer.
              </div>
            )}
          </div>
          {Le.length >= 2 && Ye && Xe && (
            <div className="p-5 rounded-[28px] bg-[#F6EDF2] space-y-3.5">
              <div>
                <span className="font-compact text-[10px] font-semibold uppercase tracking-wider text-[#831843] block">Avant / Après</span>
                <h3 className="font-display font-bold text-base text-[#2B091C]">Comparateur entre deux dates</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[10px] font-semibold text-[#7A616F] uppercase block mb-1">Date de départ</label>
                  <select
                    value={Ye.id}
                    onChange={(e) => ie(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold text-[#2B091C]"
                  >
                    {Le.map((e) => (
                      <option key={e.id} value={e.id}>
                        {new Date(e.date).toLocaleDateString(`fr-FR`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-[#7A616F] uppercase block mb-1">Date comparée</label>
                  <select
                    value={Xe.id}
                    onChange={(e) => oe(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white text-xs font-semibold text-[#2B091C]"
                  >
                    {Le.map((e) => (
                      <option key={e.id} value={e.id}>
                        {new Date(e.date).toLocaleDateString(`fr-FR`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MEASUREMENT_FIELDS.map((e) => {
                  let t = Ye[e.key],
                    n = Xe[e.key]
                  if (typeof t != `number` && typeof n != `number`) return null
                  let r = typeof t == `number` && typeof n == `number` ? Number((n - t).toFixed(1)) : null
                  return (
                    <div key={e.key} className="p-3 rounded-2xl bg-white space-y-0.5">
                      <span className="text-[11px] font-semibold text-[#7A616F] block">{e.label}</span>
                      <div className="flex items-baseline justify-between gap-1">
                        <span className="font-mono font-bold text-sm text-[#2B091C]">
                          {n ?? `—`} {e.unit}
                        </span>
                        {r !== null && (
                          <span
                            className={`font-mono text-xs font-bold ${r > 0 ? `text-[#831843]` : r < 0 ? `text-[#EC4899]` : `text-[#7A616F]`}`}
                          >
                            {r > 0 ? `+${r}` : r} {e.unit}
                          </span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
          <div className="space-y-2.5">
            <h3 className="font-display font-bold text-base text-[#2B091C] px-1">Historique des relevés ({(measurements || []).length})</h3>
            {(measurements || []).length === 0 ? (
              <div className="p-6 rounded-[24px] bg-[#F6EDF2] text-center text-xs text-[#7A616F]">
                Aucun relevé enregistré. Ajoute tes mensurations pour suivre l’évolution de ta silhouette.
              </div>
            ) : (
              <div className="space-y-2">
                {[...Le].reverse().map((e) => (
                  <div key={e.id} className="p-4 rounded-[24px] bg-[#F6EDF2] flex items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <span className="font-display font-bold text-xs text-[#831843] block">
                        {new Date(e.date).toLocaleDateString(`fr-FR`, {
                          weekday: `short`,
                          day: `2-digit`,
                          month: `long`,
                          year: `numeric`,
                        })}
                      </span>
                      <div className="flex flex-wrap gap-2 text-xs font-mono text-[#2B091C]">
                        {e.hips && (
                          <span>
                            Hanches: <strong>{e.hips}cm</strong>
                          </span>
                        )}
                        {e.waist && (
                          <span>
                            Taille: <strong>{e.waist}cm</strong>
                          </span>
                        )}
                        {e.weight && (
                          <span>
                            Poids: <strong>{e.weight}kg</strong>
                          </span>
                        )}
                        {e.thighs && (
                          <span>
                            Cuisses: <strong>{e.thighs}cm</strong>
                          </span>
                        )}
                        {e.arms && (
                          <span>
                            Bras: <strong>{e.arms}cm</strong>
                          </span>
                        )}
                        {e.chest && (
                          <span>
                            Poitrine: <strong>{e.chest}cm</strong>
                          </span>
                        )}
                      </div>
                      {e.notes && <p className="text-[11px] text-[#7A616F] italic">{e.notes}</p>}
                    </div>
                    <button
                      onClick={() => deleteMeasurement(e.id)}
                      className="w-8 h-8 rounded-full bg-white text-[#7A616F] hover:text-red-600 flex items-center justify-center shrink-0"
                      title="Supprimer ce relevé"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {l === `history` && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-[#7A616F] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={xe}
              onChange={(e) => Se(e.target.value)}
              placeholder="Rechercher une séance ou un exercice..."
              className="w-full pl-10 pr-4 py-3 rounded-full bg-[#F6EDF2] text-xs font-semibold text-[#2B091C] placeholder:text-[#7A616F] focus:outline-hidden"
            />
          </div>
          {Je.length === 0 ? (
            <div className="p-8 rounded-[28px] bg-[#F6EDF2] text-center text-xs text-[#7A616F]">
              Aucune séance terminée ne correspond à ta recherche.
            </div>
          ) : (
            <div className="space-y-3">
              {Je.map((e) => {
                let t = Ce === e.id,
                  n = 0,
                  i = 0
                return (
                  (e.exercises || []).forEach((e) => {
                    ;(e.sets || []).forEach((e) => {
                      let t = Number(e.actualWeight ?? e.targetWeight ?? 0),
                        r = Number(e.actualReps ?? e.targetReps ?? 0)
                      ;((n += t * r), (i += 1))
                    })
                  }),
                  (
                    <div key={e.id} className="p-4 sm:p-5 rounded-[26px] bg-[#F6EDF2] space-y-3 transition-all">
                      <div className="flex items-start justify-between gap-3">
                        <button type="button" onClick={() => we(t ? null : e.id)} className="text-left min-w-0 flex-1">
                          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#831843]">
                            <span>
                              {new Date(e.date).toLocaleDateString(`fr-FR`, {
                                weekday: `short`,
                                day: `2-digit`,
                                month: `short`,
                              })}
                            </span>
                            <span>·</span>
                            <span className="font-mono">{e.durationMinutes || 45} min</span>
                            <span>·</span>
                            <span className="font-mono">{n} kg</span>
                          </div>
                          <h3 className="font-display font-bold text-base text-[#2B091C] truncate mt-0.5">{e.name}</h3>
                          <p className="text-xs text-[#7A616F] truncate mt-0.5">
                            {(e.exercises || []).length} exercices · {i} séries
                            {e.finisher && typeof e.finisher == `string` ? ` · + ${e.finisher}` : ``}
                          </p>
                        </button>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => duplicateWorkoutAsNew(e)}
                            className="px-3 py-1.5 rounded-full bg-[#831843] text-white text-[11px] font-semibold flex items-center gap-1 active:scale-95 transition-transform"
                            title="Refaire cette séance"
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>Refaire</span>
                          </button>
                          <button
                            onClick={() => we(t ? null : e.id)}
                            className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center"
                            aria-label="Voir les détails"
                          >
                            {t ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                      {t && (
                        <div className="pt-3 border-t border-[#E6D5DF] space-y-3 animate-in fade-in duration-150">
                          <div className="space-y-2">
                            {(e.exercises || []).map((e) => (
                              <div key={e.id} className="p-3 rounded-2xl bg-white space-y-1.5">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-display font-bold text-xs text-[#2B091C] block">{e.exerciseName}</span>
                                  {e.replacedFrom && (
                                    <span className="px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#831843] text-[10px] font-semibold">
                                      {e.replacedFrom} remplacé par {e.exerciseName}
                                    </span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-1.5">
                                  {(e.sets || []).map((e, t) => (
                                    <span
                                      key={e.id || t}
                                      className="px-2.5 py-1 rounded-lg bg-[#F6EDF2] font-mono text-[11px] font-semibold text-[#831843]"
                                    >
                                      S{t + 1}: {e.actualWeight ?? e.targetWeight}kg × {e.actualReps ?? e.targetReps}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                          {e.notes && <p className="text-xs text-[#7A616F] italic bg-white/70 p-3 rounded-xl">Note : {e.notes}</p>}
                          <div className="flex items-center justify-end gap-2 pt-1">
                            <button
                              onClick={() => Ge(e)}
                              className="px-3 py-1.5 rounded-full bg-white text-[#831843] text-xs font-semibold flex items-center gap-1"
                            >
                              <Icon name="share" className="w-3.5 h-3.5" />
                              <span>{Te === e.id ? `Copié !` : `Partager`}</span>
                            </button>
                            <button
                              onClick={() => Oe(JSON.parse(JSON.stringify(e)))}
                              className="px-3 py-1.5 rounded-full bg-white text-[#2B091C] text-xs font-semibold flex items-center gap-1"
                            >
                              <PenLine className="w-3.5 h-3.5" />
                              <span>Modifier</span>
                            </button>
                            <button
                              onClick={() => deleteWorkout(e.id)}
                              className="px-3 py-1.5 rounded-full bg-white text-red-600 text-xs font-semibold flex items-center gap-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Supprimer</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )
              })}
            </div>
          )}
        </div>
      )}
      <Sheet isOpen={k} onClose={() => ne(false)} title="Nouvelle mesure" subtitle="Enregistre tes mensurations du jour">
        <form onSubmit={We} className="space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Date du relevé</label>
            <input
              type="date"
              required
              value={se}
              onChange={(e) => A(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-semibold text-[#2B091C]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Hanches / Fessiers (cm)</label>
              <input
                type="number"
                step="0.5"
                value={fe}
                onChange={(e) => pe(e.target.value)}
                placeholder="Ex: 98"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Tour de taille (cm)</label>
              <input
                type="number"
                step="0.5"
                value={ue}
                onChange={(e) => de(e.target.value)}
                placeholder="Ex: 66"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Poids (kg)</label>
              <input
                type="number"
                step="0.1"
                value={ce}
                onChange={(e) => le(e.target.value)}
                placeholder="Ex: 58.5"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Cuisses (cm)</label>
              <input
                type="number"
                step="0.5"
                value={me}
                onChange={(e) => he(e.target.value)}
                placeholder="Ex: 56"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Bras (cm)</label>
              <input
                type="number"
                step="0.5"
                value={ge}
                onChange={(e) => _e(e.target.value)}
                placeholder="Ex: 28"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Poitrine (cm)</label>
              <input
                type="number"
                step="0.5"
                value={ve}
                onChange={(e) => ye(e.target.value)}
                placeholder="Ex: 88"
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-mono font-bold text-[#2B091C]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Note ou ressenti (optionnel)</label>
            <input
              type="text"
              value={j}
              onChange={(e) => be(e.target.value)}
              placeholder="Ex: Prise de mesure à jeun..."
              className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-medium text-[#2B091C]"
            />
          </div>
          <button type="submit" className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs min-h-[46px]">
            Enregistrer mes mensurations
          </button>
        </form>
      </Sheet>
      <Sheet isOpen={!!De} onClose={() => Oe(null)} title="Modifier la séance" subtitle="Ajuste tes charges ou répétitions">
        {De && (
          <form onSubmit={Ke} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-[#7A616F] uppercase mb-1">Nom de la séance</label>
              <input
                type="text"
                required
                value={De.name}
                onChange={(e) =>
                  Oe({
                    ...De,
                    name: e.target.value,
                  })
                }
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl bg-[#F6EDF2] font-bold text-[#2B091C]"
              />
            </div>
            <div className="space-y-3">
              {(De.exercises || []).map((e, t) => (
                <div key={e.id} className="p-3.5 rounded-2xl bg-[#F6EDF2] space-y-2">
                  <span className="font-bold text-xs text-[#2B091C] block">{e.exerciseName}</span>
                  <div className="space-y-2">
                    {(e.sets || []).map((e, n) => {
                      let r = Number(e.actualWeight ?? e.targetWeight ?? 0),
                        i = Number(e.actualReps ?? e.targetReps ?? 0)
                      return (
                        <div key={e.id || n} className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl text-xs">
                          <span className="font-bold text-[#831843] w-8">#{n + 1}</span>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                let e = [...De.exercises]
                                ;((e[t].sets[n].actualWeight = Math.max(0, r - 2.5)),
                                  Oe({
                                    ...De,
                                    exercises: e,
                                  }))
                              }}
                              className="w-7 h-7 rounded-full bg-[#F6EDF2] flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-14 text-center font-mono font-bold">{r}kg</span>
                            <button
                              type="button"
                              onClick={() => {
                                let e = [...De.exercises]
                                ;((e[t].sets[n].actualWeight = r + 2.5),
                                  Oe({
                                    ...De,
                                    exercises: e,
                                  }))
                              }}
                              className="w-7 h-7 rounded-full bg-[#F6EDF2] flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => {
                                let e = [...De.exercises]
                                ;((e[t].sets[n].actualReps = Math.max(1, i - 1)),
                                  Oe({
                                    ...De,
                                    exercises: e,
                                  }))
                              }}
                              className="w-7 h-7 rounded-full bg-[#F6EDF2] flex items-center justify-center"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-12 text-center font-mono font-bold">{i}r</span>
                            <button
                              type="button"
                              onClick={() => {
                                let e = [...De.exercises]
                                ;((e[t].sets[n].actualReps = i + 1),
                                  Oe({
                                    ...De,
                                    exercises: e,
                                  }))
                              }}
                              className="w-7 h-7 rounded-full bg-[#F6EDF2] flex items-center justify-center"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
            <button type="submit" className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs min-h-[46px]">
              Enregistrer les modifications
            </button>
          </form>
        )}
      </Sheet>
    </div>
  )
}
