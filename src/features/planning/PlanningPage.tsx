// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { ABS_FINISHER_OPTIONS, CARDIO_FINISHER_OPTIONS } from '../../data/circuits'
import { ACTIVITY_OPTIONS, WEEK_DAYS } from '../../lib/constants'
import { ACTIVITY_TYPES, WEEK_TEMPLATES } from '../../data/planning'
import { Icon, activityIcon } from '../../components/Icon'
import { Sheet } from '../../components/Sheet'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronLeft, ChevronRight, Flame, Play, RotateCcw, Sparkles } from 'lucide-react'
export const PlanningPage = ({ onStartActiveMode }) => {
  let { weeklyPlans, updateWeeklyPlanDay, routines, workouts, startWorkout } = useWorkout(),
    o = WEEK_DAYS.map((e, n) => {
      let r = weeklyPlans.find((t) => Number(t.dayOfWeek) === e.dayOfWeek)
      if (r) return r
      let i = new Date(),
        a = i.getDay(),
        o = a === 0 ? -6 : 1 - a,
        s = new Date(i)
      return (
        s.setDate(i.getDate() + o + n),
        {
          dayOfWeek: e.dayOfWeek,
          dayName: e.dayName,
          date: s.toISOString().split(`T`)[0],
          activity: `Repos`,
          activities: [`Repos`],
          finisherType: `none`,
          status: `rest`,
        }
      )
    }),
    [s, c] = useState(`week`),
    [l, u] = useState(null),
    [d, f] = useState([`Séance Bas du corps`]),
    [p, m] = useState(``),
    [h, g] = useState(``),
    [v, y] = useState(`none`),
    [b, x] = useState(``),
    [S, C] = useState(`planned`),
    [w, T] = useState(null),
    [E, D] = useState(false),
    [ee, O] = useState(new Date()),
    te = ee.getFullYear(),
    k = ee.getMonth(),
    ne = ee.toLocaleString(`fr-FR`, {
      month: `long`,
      year: `numeric`,
    }),
    re = (new Date(te, k, 1).getDay() + 6) % 7,
    ie = new Date(te, k + 1, 0).getDate(),
    ae = workouts.filter((e) => e.status === `completed`),
    oe = {}
  ae.forEach((e) => {
    ;(oe[e.date] ||
      (oe[e.date] = {
        count: 0,
        maxRating: 0,
        names: [],
      }),
      (oe[e.date].count += 1),
      (oe[e.date].maxRating = Math.max(oe[e.date].maxRating, e.rating || 4)),
      oe[e.date].names.push(e.name))
  })
  let se = async (e) => {
      if (!E) {
        D(true)
        try {
          for (let t of WEEK_DAYS) {
            let r = e.days[t.dayOfWeek] || {
                activity: `Repos`,
              },
              i = r.activity === `Repos`
            await updateWeeklyPlanDay(t.dayOfWeek, {
              activity: r.activity,
              activities: [r.activity],
              workoutName: i ? void 0 : r.workoutName,
              routineId: i ? void 0 : r.routineId,
              finisherType: i ? `none` : r.finisherType || `none`,
              finisher: i ? void 0 : r.finisher,
              status: i ? `rest` : `planned`,
            })
          }
          ;(T(`✨ « ${e.title} » appliqué à ta semaine !`), setTimeout(() => T(null), 3500))
        } finally {
          D(false)
        }
      }
    },
    A = (e) => {
      u(e)
      let t = e.activities && e.activities.length > 0 ? e.activities : [e.activity || `Repos`]
      ;(f(t),
        m(e.routineId || ``),
        g(e.workoutName || ``),
        y(e.finisherType === `pump` ? `cardio` : e.finisherType || (e.finisher ? `cardio` : `none`)),
        x(e.finisher || ``),
        C(e.status))
    },
    ce = (e) => {
      if (e === `Repos`) {
        f([`Repos`])
        return
      }
      let t = d.filter((e) => e !== `Repos`)
      if (t.includes(e)) {
        let n = t.filter((t) => t !== e)
        f(n.length > 0 ? n : [`Repos`])
      } else f([...t, e])
    },
    le = async () => {
      if (!l) return
      let e = d[0] || `Repos`,
        t = e === `Repos`,
        i = ACTIVITY_TYPES[e] || ACTIVITY_TYPES[`Séance Bas du corps`],
        a = h.trim()
      if (!t && !a) {
        if (p) {
          let e = routines.find((e) => e.id === p)
          e && (a = e.name)
        } else a = d.join(` + `)
      }
      ;(await updateWeeklyPlanDay(l.dayOfWeek, {
        activity: e,
        activities: d,
        routineId: t ? void 0 : p || i.defaultRoutineId || void 0,
        workoutName: t ? void 0 : a || void 0,
        finisherType: t ? `none` : v,
        finisher: t || v === `none` ? void 0 : b.trim() || void 0,
        status: t ? `rest` : S === `rest` ? `planned` : S,
      }),
        u(null))
    },
    ue = async (e, t) => {
      if ((t.stopPropagation(), e.status === `rest` || e.activity === `Repos`)) return
      let r = e.status === `completed` ? `planned` : `completed`
      await updateWeeklyPlanDay(e.dayOfWeek, {
        status: r,
      })
    },
    de = (t, n) => {
      n.stopPropagation()
      let i = ACTIVITY_TYPES[t.activity || `Séance Bas du corps`] || ACTIVITY_TYPES[`Séance Bas du corps`],
        o = t.routineId || i.defaultRoutineId,
        s = routines.find((e) => e.id === o) || routines[0]
      if (s) {
        let n = s.exercises.map((e, t) => ({
          ...e,
          id: `plan_ex_${Date.now()}_${t}`,
          sets: e.sets.map((e, t) => ({
            ...e,
            id: `plan_s_${Date.now()}_${t}`,
            completed: false,
            actualWeight: e.targetWeight,
            actualReps: e.targetReps,
          })),
        }))
        ;(startWorkout({
          name: t.workoutName || s.name,
          exercises: n,
          finisher: t.finisher || s.finisher,
        }),
          onStartActiveMode())
      }
    },
    fe = (e) =>
      e >= 5 ? `bg-[#831843] text-white font-bold` : e >= 4 ? `bg-[#EC4899] text-white font-bold` : `bg-[#FCE7F3] text-[#831843] font-bold`,
    pe = o.filter((e) => (e.activity || `Repos`) !== `Repos`).length
  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pt-1">
        <div>
          <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#831843] block">
            À la carte ou structuré · 100 % modulable
          </span>
          <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#2B091C]">Planning & Rythme</h1>
        </div>
        {pe > 0 && (
          <button
            type="button"
            onClick={() => se(WEEK_TEMPLATES[2])}
            className="self-start sm:self-auto px-3.5 py-2 rounded-full bg-[#F6EDF2] hover:bg-[#FCE7F3] text-[#831843] text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Passer en Mode Libre (vider la semaine)</span>
          </button>
        )}
      </div>
      {w && (
        <div className="p-3.5 rounded-2xl bg-[#FCE7F3] border border-[#FBCFE8] text-[#831843] text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 text-[#831843] shrink-0" />
          <span>{w}</span>
        </div>
      )}
      <div className="flex items-center gap-6 border-b border-[#F1E4EC]">
        <button
          onClick={() => c(`week`)}
          className={`pb-2.5 flex items-center gap-1.5 text-sm transition-colors border-b-2 -mb-[1px] ${s === `week` ? `border-[#831843] font-bold text-[#2B091C]` : `border-transparent font-medium text-[#8C6D7E] hover:text-[#2B091C]`}`}
        >
          <span>Ma semaine</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${s === `week` ? `bg-[#FCE7F3] text-[#831843]` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
          >
            {pe === 0 ? `Libre` : `${pe}j`}
          </span>
        </button>
        <button
          onClick={() => c(`month`)}
          className={`pb-2.5 flex items-center gap-1.5 text-sm transition-colors border-b-2 -mb-[1px] ${s === `month` ? `border-[#831843] font-bold text-[#2B091C]` : `border-transparent font-medium text-[#8C6D7E] hover:text-[#2B091C]`}`}
        >
          <span>Calendrier d’assiduité</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${s === `month` ? `bg-[#FCE7F3] text-[#831843]` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
          >
            {Object.keys(oe).length}
          </span>
        </button>
      </div>
      {s === `week` && (
        <div className="space-y-4">
          <div className="p-4 rounded-[26px] bg-grainy-pink border border-[#F472B6]/35 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-display font-bold text-xs sm:text-sm text-[#2B091C] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#831843]" />
                <span>Modèles de semaine en 1 clic (ou personnalise jour par jour) :</span>
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {WEEK_TEMPLATES.map((e) => (
                <button
                  key={e.id}
                  type="button"
                  disabled={E}
                  onClick={() => se(e)}
                  className="p-3 rounded-2xl bg-white/90 hover:bg-white border border-white text-left flex flex-col justify-between gap-2 transition-all active:scale-99 shadow-2xs"
                >
                  <div className="space-y-1">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#831843] text-[10px] font-bold">
                      {e.badge}
                    </span>
                    <h3 className="font-display font-bold text-xs text-[#2B091C] leading-snug">{e.title}</h3>
                    <p className="text-[10px] text-[#7A616F] leading-relaxed">{e.subtitle}</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#831843]">Appliquer →</span>
                </button>
              ))}
            </div>
          </div>
          <section className="space-y-2.5">
            {o.map((e) => {
              let t = e.activities && e.activities.length > 0 ? e.activities : [e.activity || `Repos`],
                n = t[0] || `Repos`,
                r = n === `Repos`,
                i = e.status === `completed`
              return (
                <div
                  key={e.dayOfWeek}
                  onClick={() => A(e)}
                  className="p-3.5 sm:p-4 rounded-[26px] bg-[#F6EDF2] hover:bg-[#F1E2EA] transition-all cursor-pointer flex items-center justify-between gap-3.5 active:scale-99"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                      <Icon name={activityIcon(n)} className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug truncate">{e.dayName}</h3>
                        {e.workoutName && !r && (
                          <span className="text-[11px] text-[#7A616F] truncate hidden sm:inline">· {e.workoutName}</span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#7A616F]">
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#831843]">
                          <span className={`w-2 h-2 rounded-full ${i ? `bg-emerald-500` : r ? `bg-[#C8B2BF]` : `bg-[#EC4899]`}`} />
                          <span>{r ? `Jour libre / Repos` : t.join(` + `)}</span>
                        </span>
                        {e.finisherType && e.finisherType !== `none` && (
                          <>
                            <span>·</span>
                            <span className="truncate max-w-[200px]">
                              + {e.finisher || (e.finisherType === `cardio` ? `Cardio` : `Abdos`)}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!r && (
                      <>
                        <button
                          type="button"
                          onClick={(t) => ue(e, t)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${i ? `bg-emerald-500 text-white` : `bg-white text-[#8C6D7E] hover:text-[#831843]`}`}
                          title="Marquer comme fait"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(t) => de(e, t)}
                          className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                          title="Démarrer la séance"
                        >
                          <Play className="w-3.5 h-3.5 fill-[#831843]" />
                        </button>
                      </>
                    )}
                    <span className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              )
            })}
          </section>
        </div>
      )}
      {s === `month` && (
        <section className="p-5 rounded-[28px] bg-[#F6EDF2] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-display font-bold text-[#2B091C] capitalize">{ne}</h2>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => O(new Date(te, k - 1, 1))}
                className="w-9 h-9 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                title="Mois précédent"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => O(new Date(te, k + 1, 1))}
                className="w-9 h-9 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                title="Mois suivant"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-[#7A616F] uppercase">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mer</span>
            <span>Jeu</span>
            <span>Ven</span>
            <span>Sam</span>
            <span>Dim</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {Array.from({
              length: re,
            }).map((e, t) => (
              <div key={`blank-${t}`} className="h-10" />
            ))}
            {Array.from({
              length: ie,
            }).map((e, t) => {
              let n = t + 1,
                r = `${te}-${String(k + 1).padStart(2, `0`)}-${String(n).padStart(2, `0`)}`,
                i = oe[r],
                a = new Date().toISOString().split(`T`)[0] === r
              return (
                <div key={`cal-${n}`} className="flex items-center justify-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-xs tabular-nums ${i ? fe(i.maxRating) : a ? `bg-white text-[#831843] ring-2 ring-[#EC4899] font-bold` : `text-[#2B091C] font-medium`}`}
                  >
                    {n}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}
      <Sheet
        isOpen={!!l}
        onClose={() => u(null)}
        title={l ? l.dayName : `Planifier le jour`}
        subtitle="Sélectionne ta séance (Dos/Pecs, Pecs/Bras, Bas du corps...) et ton circuit Finisher"
        footer={
          <button type="button" onClick={le} className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs min-h-[48px]">
            Enregistrer ce jour
          </button>
        }
      >
        {l && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              {ACTIVITY_OPTIONS.map((e) => {
                let t = d.includes(e)
                return (
                  <button
                    key={e}
                    type="button"
                    onClick={() => ce(e)}
                    className={`p-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between gap-2 transition-all min-h-[46px] ${t ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#2B091C] hover:bg-[#F1E2EA]`}`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      <Icon name={activityIcon(e)} className={`w-4 h-4 shrink-0 ${t ? `text-[#FBCFE8]` : `text-[#831843]`}`} />
                      <span className="truncate">{e}</span>
                    </span>
                    {t && <Check className="w-4 h-4 shrink-0" />}
                  </button>
                )
              })}
            </div>
            {!d.includes(`Repos`) && (
              <div className="space-y-3 pt-2 border-t border-[#F1E4EC]">
                <div>
                  <label className="block font-bold text-[#2B091C] text-xs mb-1.5">Routine associée (optionnel)</label>
                  <select
                    value={p}
                    onChange={(e) => m(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F6EDF2] text-xs font-bold text-[#2B091C]"
                  >
                    <option value="">Séance automatique selon l’activité choisie</option>
                    {routines.map((e) => (
                      <option key={e.id} value={e.id}>
                        {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block font-bold text-[#2B091C] text-xs flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#EC4899]" />
                    <span>Circuit Finisher (Abdos ou Cardio)</span>
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      {
                        id: `none`,
                        label: `Aucun`,
                      },
                      {
                        id: `abs`,
                        label: `Circuit Abdos`,
                      },
                      {
                        id: `cardio`,
                        label: `Circuit Cardio`,
                      },
                    ].map((e) => (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => {
                          ;(y(e.id),
                            e.id === `none` && x(``),
                            e.id === `cardio` && x(CARDIO_FINISHER_OPTIONS[0]),
                            e.id === `abs` && x(ABS_FINISHER_OPTIONS[0]))
                        }}
                        className={`py-2.5 px-3 rounded-2xl text-xs font-bold ${v === e.id ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#7A616F]`}`}
                      >
                        {e.label}
                      </button>
                    ))}
                  </div>
                  {v !== `none` && (
                    <select
                      value={b}
                      onChange={(e) => x(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FCE7F3]/70 text-xs font-bold text-[#831843]"
                    >
                      {(v === `abs` ? ABS_FINISHER_OPTIONS : CARDIO_FINISHER_OPTIONS).map((e, t) => (
                        <option key={t} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Sheet>
    </div>
  )
}
