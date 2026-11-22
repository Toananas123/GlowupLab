// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { ABS_CIRCUITS, CARDIO_SESSIONS } from '../../data/circuits'
import { GearList } from '../exercises/GearList'
import { Icon } from '../../components/Icon'
import { Sheet } from '../../components/Sheet'
import { WarmupCooldownCard } from './WarmupCooldownCard'
import { WorkoutBuilderSheet } from './WorkoutBuilderSheet'
import { WorkoutGeneratorSheet } from './WorkoutGeneratorSheet'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronRight, Copy, FileText, Link, Pen, Play, Plus, RotateCcw, Share2, Sparkles, Trash2, X } from 'lucide-react'
export const WorkoutsPage = ({ onStartActiveMode }) => {
  let {
      routines,
      workouts,
      startWorkout,
      createRoutine,
      deleteRoutine,
      deleteWorkout,
      updateWorkout,
      duplicateWorkoutAsNew,
      sharedTemplateWorkout,
      setSharedTemplateWorkout,
      loadSharedWorkout,
      createShareCode,
    } = useWorkout(),
    [p, m] = useState(false),
    [h, g] = useState(false),
    [v, y] = useState(`routines`),
    [b, x] = useState(`all`),
    [S, C] = useState(null),
    [w, T] = useState(null),
    [E, D] = useState(false),
    [ee, O] = useState(``),
    [te, k] = useState(``),
    [ne, re] = useState(null),
    [ie, ae] = useState(null),
    [oe, se] = useState(null),
    [A, ce] = useState(null),
    [le, ue] = useState(``),
    [de, fe] = useState(``),
    [pe, me] = useState(``),
    [he, ge] = useState(5),
    [_e, ve] = useState(``),
    [ye, j] = useState(`none`),
    [be, xe] = useState(false),
    Se = workouts.filter((e) => e.status === `completed`),
    Ce = (e) => {
      ;(se(e), setTimeout(() => se(null), 3500))
    },
    we = (t) => {
      let n = t.exercises.map((e, t) => ({
        ...e,
        id: `ex_${Date.now()}_${t}`,
        sets: e.sets.map((e, t) => ({
          ...e,
          id: `s_${Date.now()}_${t}`,
          completed: false,
          actualWeight: e.targetWeight,
          actualReps: e.targetReps,
        })),
      }))
      ;(startWorkout({
        name: t.name,
        exercises: n,
        finisher: t.finisher,
        notes: t.notes,
      }),
        onStartActiveMode())
    },
    Te = (t) => {
      let n = t.exercises.map((e, n) => {
        let r = parseInt(e.reps.replace(/[^0-9]/g, ``), 10) || 12
        return {
          id: `abdo_ex_${Date.now()}_${n}`,
          exerciseId: `circuit_${t.id}_${n}`,
          exerciseName: `${e.name} (${e.reps})`,
          category: `abs`,
          equipment: `bodyweight`,
          restSeconds: 25,
          sets: [
            {
              id: `s1_${n}`,
              setNumber: 1,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
            {
              id: `s2_${n}`,
              setNumber: 2,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
            {
              id: `s3_${n}`,
              setNumber: 3,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
          ],
        }
      })
      ;(startWorkout({
        name: t.name.replace(/^\d+\.\s*/, ``),
        exercises: n,
        finisher: `Gainage actif final (45 sec)`,
        notes: `Focus : ${t.focus}`,
      }),
        C(null),
        onStartActiveMode())
    },
    Ee = (t) => {
      let n = t.intervals.map((e, n) => ({
        id: `cardio_ex_${Date.now()}_${n}`,
        exerciseId: `circuit_${t.id}_${n}`,
        exerciseName: `${e.time} · ${e.instruction}`,
        category: `cardio`,
        equipment: `cardio_machine`,
        restSeconds: 0,
        sets: [
          {
            id: `s1_${n}`,
            setNumber: 1,
            targetReps: t.durationMinutes,
            targetWeight: 0,
            completed: false,
          },
        ],
      }))
      ;(startWorkout({
        name: `${t.name.replace(/^\d+\.\s*/, ``)} (${t.machine})`,
        exercises: n,
        finisher: `Retour au calme & hydratation`,
        notes: t.description,
      }),
        T(null),
        onStartActiveMode())
    },
    De = (t) => {
      ;(duplicateWorkoutAsNew(t), onStartActiveMode())
    },
    Oe = (e, t = false) => {
      let n = createShareCode(e),
        r = `${`${window.location.origin}${window.location.pathname}`}?share=${encodeURIComponent(n)}`,
        i = e.exercises.map((e, t) => {
          let n = e.sets
            .map((e) => {
              let t = e.actualWeight ?? e.targetWeight ?? 0
              return `${e.actualReps ?? e.targetReps ?? 10} reps${t > 0 ? ` @ ${t}kg` : ``}`
            })
            .join(`, `)
          return `  ${t + 1}. ${e.exerciseName} (${e.sets.length} séries : ${n})`
        }).join(`
`),
        a = [
          `${t ? `Routine Glow Up Lab` : `Séance Terminée Glow Up Lab`} : ${e.name}`,
          t ? null : `Date : ${e.date} · Durée : ${e.durationMinutes || 45} min`,
          !t && e.rating ? `Ressenti : ${e.rating}/5` : null,
          ``,
          `Détail des exercices (${e.exercises.length}) :`,
          i,
          e.finisher ? `\nFinisher : ${e.finisher}` : null,
          e.notes ? `Notes : ${e.notes}` : null,
          ``,
          `Lien pour ouvrir ou importer la séance :`,
          r,
        ].filter((e) => e !== null).join(`
`)
      return {
        title: e.name,
        formattedText: a,
        shareUrl: r,
        shareCode: n,
      }
    },
    ke = (e) => {
      let t = Oe(e, false)
      ;(ae(null), re(t))
    },
    Ae = (e) => {
      let t = {
          id: `share_routine_${Date.now()}`,
          userId: `guest`,
          name: e.name,
          date: new Date().toISOString().split(`T`)[0],
          status: `planned`,
          exercises: e.exercises,
          finisher: e.finisher,
          notes: e.notes,
        },
        n = Oe(t, true)
      ;(ae(null), re(n))
    },
    je = async (e, t) => {
      try {
        ;(await navigator.clipboard.writeText(t), ae(e), setTimeout(() => ae(null), 3e3))
      } catch {}
    },
    Me = async () => {
      if (ne) {
        if (navigator.share)
          try {
            await navigator.share({
              title: `Séance Glow Up Lab : ${ne.title}`,
              text: ne.formattedText,
              url: ne.shareUrl,
            })
            return
          } catch {}
        await je(`text`, ne.formattedText)
      }
    },
    Ne = () => {
      ;(k(``),
        loadSharedWorkout(ee) ? (D(false), O(``), Ce(`Séance partagée chargée avec succès !`)) : k(`Lien ou code de partage invalide.`))
    },
    Pe = (e) => {
      ;(ce(e),
        ue(e.name),
        fe(e.date),
        me(e.notes || ``),
        ge(e.rating || 5),
        ve(e.finisher || ``),
        j(
          e.finisher
            ? e.finisher.toLowerCase().includes(`abdo`) || e.finisher.toLowerCase().includes(`gainage`)
              ? `abs`
              : `cardio`
            : `none`,
        ))
    },
    Fe = async () => {
      A &&
        (await updateWorkout(A.id, {
          name: le.trim() || A.name,
          date: de,
          notes: pe.trim(),
          rating: he,
          finisher: ye === `none` ? void 0 : _e.trim(),
        }),
        ce(null))
    },
    Ie = (e) =>
      e === `abs`
        ? `stretch`
        : e === `cardio`
          ? `runner`
          : e === `arms` || e === `pecs_bras`
            ? `biceps`
            : e === `back` || e === `back_sculpt_order` || e === `dos_pecs` || e === `pecs`
              ? `dumbbell`
              : `weightlifter`,
    Le = (e, t) => {
      let n = (t || ``).toLowerCase()
      return n.includes(`dos / pecs`) || e === `dos_pecs`
        ? `Combo Dos / Pecs`
        : n.includes(`pecs / bras`) || e === `pecs_bras`
          ? `Combo Pecs / Bras`
          : n.includes(`1-2-3-4`) || e === `back_sculpt_order`
            ? `Dos · Ordre 1-2-3-4`
            : e === `pecs`
              ? `Pecs & Buste`
              : e === `abs`
                ? `Circuit Abdos`
                : e === `cardio`
                  ? `Circuit Cardio`
                  : e === `arms`
                    ? `Bras & Épaules`
                    : e === `back`
                      ? `Dos`
                      : e === `fullbody`
                        ? `Full Body`
                        : `Bas du corps`
    },
    Re = routines.filter((e) =>
      b === `all`
        ? true
        : b === `abs`
          ? e.targetZone === `abs`
          : b === `cardio`
            ? e.targetZone === `cardio`
            : b === `upper_combos`
              ? e.targetZone === `back` ||
                e.targetZone === `pecs` ||
                e.targetZone === `arms` ||
                e.targetZone === `dos_pecs` ||
                e.targetZone === `pecs_bras` ||
                e.targetZone === `back_sculpt_order`
              : b !== `lower` || e.targetZone === `lower-body` || e.targetZone === `glutes` || e.targetZone === `lower`,
    )
  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pt-1">
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#2B091C]">Séances</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => D(true)}
            className="w-10 h-10 rounded-full bg-[#F6EDF2] hover:bg-[#FCE7F3] text-[#831843] flex items-center justify-center transition-colors"
            title="Importer une séance partagée"
          >
            <Icon name="share" className="w-4 h-4" />
          </button>
          <button
            onClick={() => xe(true)}
            className="w-10 h-10 rounded-full bg-[#F6EDF2] hover:bg-[#FCE7F3] text-[#831843] flex items-center justify-center transition-colors"
            title="Échauffement & Étirements"
          >
            <Icon name="stretch" className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <button
          onClick={() => g(true)}
          className="p-4 rounded-[26px] bg-[#831843] hover:bg-[#3B0726] text-white text-left flex items-center justify-between gap-3.5 transition-all active:scale-99"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white shrink-0">
              <Plus className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-[15px] text-white leading-snug">Saisir une séance</h2>
              <p className="text-xs text-[#FBCFE8]/90 truncate">Créer ma séance sur mesure</p>
            </div>
          </div>
          <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white shrink-0">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
        <button
          onClick={() => m(true)}
          className="p-4 rounded-[26px] bg-[#F6EDF2] hover:bg-[#F1E2EA] text-[#2B091C] text-left flex items-center justify-between gap-3.5 transition-all active:scale-99"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <span className="w-12 h-12 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#EC4899] shrink-0">
              <Sparkles className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-[15px] text-[#2B091C] leading-snug">Propose-moi une séance</h2>
              <p className="text-xs text-[#7A616F] truncate">Muscu, circuits abdos & cardio</p>
            </div>
          </div>
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#831843] shrink-0">
            <ChevronRight className="w-4 h-4" />
          </span>
        </button>
      </div>
      {oe && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{oe}</span>
        </div>
      )}
      {sharedTemplateWorkout && (
        <div className="p-4 rounded-[26px] bg-[#FCE7F3] space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#831843]">Séance partagée reçue</span>
              <h3 className="font-display font-bold text-base text-[#2B091C]">{sharedTemplateWorkout.name}</h3>
            </div>
            <button onClick={() => setSharedTemplateWorkout(null)} className="p-1 text-[#7A616F] hover:text-[#2B091C] rounded-full">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                ;(startWorkout({
                  name: sharedTemplateWorkout.name,
                  exercises: sharedTemplateWorkout.exercises,
                  finisher: sharedTemplateWorkout.finisher,
                  notes: sharedTemplateWorkout.notes,
                }),
                  setSharedTemplateWorkout(null),
                  onStartActiveMode())
              }}
              className="px-4 py-2 rounded-full bg-[#831843] text-white font-bold text-xs"
            >
              Démarrer
            </button>
            <button
              onClick={async () => {
                ;(await createRoutine({
                  name: sharedTemplateWorkout.name,
                  targetZone: sharedTemplateWorkout.exercises[0]?.category || `lower-body`,
                  exercises: sharedTemplateWorkout.exercises,
                  finisher: sharedTemplateWorkout.finisher,
                  notes: sharedTemplateWorkout.notes,
                }),
                  setSharedTemplateWorkout(null),
                  Ce(`Routine sauvegardée !`))
              }}
              className="px-4 py-2 rounded-full bg-white text-[#831843] font-bold text-xs"
            >
              Sauvegarder
            </button>
          </div>
        </div>
      )}
      <div className="flex items-center gap-6 border-b border-[#F1E4EC] pt-1">
        <button
          onClick={() => y(`routines`)}
          className={`pb-2.5 flex items-center gap-1.5 text-sm transition-colors border-b-2 -mb-[1px] ${v === `routines` ? `border-[#831843] font-bold text-[#2B091C]` : `border-transparent font-medium text-[#8C6D7E] hover:text-[#2B091C]`}`}
        >
          <span>Séances proposées</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${v === `routines` ? `bg-[#FCE7F3] text-[#831843]` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
          >
            {routines.length + ABS_CIRCUITS.length + CARDIO_SESSIONS.length}
          </span>
        </button>
        <button
          onClick={() => y(`history`)}
          className={`pb-2.5 flex items-center gap-1.5 text-sm transition-colors border-b-2 -mb-[1px] ${v === `history` ? `border-[#831843] font-bold text-[#2B091C]` : `border-transparent font-medium text-[#8C6D7E] hover:text-[#2B091C]`}`}
        >
          <span>Historique</span>
          <span
            className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${v === `history` ? `bg-[#FCE7F3] text-[#831843]` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
          >
            {Se.length}
          </span>
        </button>
      </div>
      {v === `routines` && (
        <div className="space-y-4">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
            {[
              {
                id: `all`,
                label: `Toutes`,
              },
              {
                id: `upper_combos`,
                label: `Dos, Pecs & Bras (Dos/Pecs, Pecs/Bras)`,
              },
              {
                id: `lower`,
                label: `Bas du corps & Fessiers`,
              },
              {
                id: `abs`,
                label: `Circuits Abdos`,
              },
              {
                id: `cardio`,
                label: `Circuits Cardio`,
              },
            ].map((e) => {
              let t = b === e.id
              return (
                <button
                  key={e.id}
                  onClick={() => x(e.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all active:scale-95 ${t ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#7A616F] hover:text-[#2B091C]`}`}
                >
                  {e.label}
                </button>
              )
            })}
          </div>
          <div className="space-y-2.5">
            {Re.map((e) => {
              let t = e.exercises.reduce((e, t) => e + t.sets.length, 0),
                n = Le(e.targetZone, e.name),
                r = Ie(e.targetZone)
              return (
                <div
                  key={e.id}
                  onClick={() => we(e)}
                  className="p-3.5 sm:p-4 rounded-[26px] bg-[#F6EDF2] hover:bg-[#F1E2EA] transition-all flex items-center justify-between gap-3.5 cursor-pointer active:scale-99"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                      <Icon name={r} className="w-6 h-6" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <span className="font-compact text-[10px] font-bold uppercase tracking-wider text-[#831843] block leading-none">
                        {n}
                      </span>
                      <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug truncate">{e.name}</h3>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#7A616F]">
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#831843]">
                          <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
                          <span>{e.exercises.length} exercices</span>
                        </span>
                        <span>·</span>
                        <span>{t} séries</span>
                      </div>
                      <GearList exercises={e.exercises} variant="pill-list" className="pt-0.5" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {!e.isDefault && (
                      <button
                        onClick={(t) => {
                          ;(t.stopPropagation(), deleteRoutine(e.id))
                        }}
                        className="w-8 h-8 rounded-full text-[#8C6D7E] hover:text-red-600 flex items-center justify-center"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(t) => {
                        ;(t.stopPropagation(), Ae(e))
                      }}
                      className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                      title="Partager"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs">
                      <Play className="w-3.5 h-3.5 fill-[#831843]" />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
          {(b === `all` || b === `abs`) && (
            <section className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-base font-display font-bold text-[#2B091C]">Circuits Abdos & Gainage ({ABS_CIRCUITS.length})</h2>
              </div>
              <div className="space-y-2.5">
                {ABS_CIRCUITS.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => C(e)}
                    className="p-3.5 sm:p-4 rounded-[26px] bg-[#F6EDF2] hover:bg-[#F1E2EA] transition-all flex items-center justify-between gap-3.5 cursor-pointer active:scale-99"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                        <Icon name="stretch" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="font-compact text-[10px] font-bold uppercase tracking-wider text-[#EC4899] block leading-none">
                          Circuit Abdos · {e.durationMinutes} min
                        </span>
                        <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug truncate">
                          {e.name.replace(/^\d+\.\s*/, ``)}
                        </h3>
                        <p className="text-xs text-[#7A616F] truncate">
                          {e.exercises.length} mouvements · {e.focus}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(t) => {
                        ;(t.stopPropagation(), Te(e))
                      }}
                      className="w-9 h-9 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs shrink-0"
                      title="Lancer ce circuit"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#831843]" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
          {(b === `all` || b === `cardio`) && (
            <section className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-base font-display font-bold text-[#2B091C]">Circuits Cardio Guidés ({CARDIO_SESSIONS.length})</h2>
              </div>
              <div className="space-y-2.5">
                {CARDIO_SESSIONS.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => T(e)}
                    className="p-3.5 sm:p-4 rounded-[26px] bg-[#F6EDF2] hover:bg-[#F1E2EA] transition-all flex items-center justify-between gap-3.5 cursor-pointer active:scale-99"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                        <Icon name="runner" className="w-6 h-6" />
                      </div>
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="font-compact text-[10px] font-bold uppercase tracking-wider text-[#831843] block leading-none">
                          {e.machine} · {e.durationMinutes} min · {e.intensity}
                        </span>
                        <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug truncate">
                          {e.name.replace(/^\d+\.\s*/, ``)}
                        </h3>
                        <p className="text-xs text-[#7A616F] truncate">{e.description}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(t) => {
                        ;(t.stopPropagation(), Ee(e))
                      }}
                      className="w-9 h-9 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs shrink-0"
                      title="Lancer ce circuit"
                    >
                      <Play className="w-3.5 h-3.5 fill-[#831843]" />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
      {v === `history` && (
        <div className="space-y-2.5">
          {Se.length === 0 ? (
            <div className="p-8 rounded-[28px] bg-[#F6EDF2] text-center space-y-2">
              <h3 className="font-bold font-display text-[#2B091C] text-base">Aucune séance terminée</h3>
              <p className="text-xs text-[#7A616F]">Lance une routine ci-dessus pour démarrer ton historique.</p>
            </div>
          ) : (
            Se.map((e) => (
              <div key={e.id} className="p-3.5 sm:p-4 rounded-[26px] bg-[#F6EDF2] flex items-center justify-between gap-3.5">
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                    <Icon name="weightlifter" className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug truncate">{e.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#7A616F]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#831843]">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{e.date}</span>
                      </span>
                      <span>·</span>
                      <span>{e.exercises.length} exercices</span>
                      {e.rating && (
                        <>
                          <span>·</span>
                          <span>{e.rating}/5</span>
                        </>
                      )}
                    </div>
                    {e.exercises.some((e) => e.replacedFrom) && (
                      <div className="flex flex-wrap gap-1 pt-0.5">
                        {e.exercises
                          .filter((e) => e.replacedFrom)
                          .map((e) => (
                            <span
                              key={e.id}
                              className="inline-block px-2 py-0.5 rounded-full bg-white text-[#831843] text-[10px] font-semibold"
                            >
                              {e.replacedFrom} remplacé par {e.exerciseName}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => ke(e)}
                    className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                    title="Partager"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => Pe(e)}
                    className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shadow-2xs"
                    title="Modifier"
                  >
                    <Pen className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => De(e)}
                    className="h-8 px-3 rounded-full bg-[#831843] text-white text-xs font-semibold flex items-center gap-1"
                    title="Refaire cette séance"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">Refaire</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
      <Sheet
        isOpen={!!S}
        onClose={() => C(null)}
        title={S?.name.replace(/^\d+\.\s*/, ``)}
        subtitle={S ? `${S.durationMinutes} min · ${S.focus}` : ``}
      >
        {S && (
          <div className="space-y-4">
            <div className="space-y-2.5">
              {S.exercises.map((e, t) => (
                <div key={t} className="p-3.5 rounded-2xl bg-[#F6EDF2] space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display font-bold text-xs text-[#2B091C]">
                      {t + 1}. {e.name}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-[#831843] bg-white px-2.5 py-0.5 rounded-full shrink-0">
                      {e.reps}
                    </span>
                  </div>
                  <p className="text-xs text-[#7A616F] leading-relaxed">{e.position}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => Te(S)}
              className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Démarrer ce circuit abdos</span>
            </button>
          </div>
        )}
      </Sheet>
      <Sheet
        isOpen={!!w}
        onClose={() => T(null)}
        title={w?.name.replace(/^\d+\.\s*/, ``)}
        subtitle={w ? `${w.machine} · ${w.durationMinutes} min · Intensité ${w.intensity}` : ``}
      >
        {w && (
          <div className="space-y-4">
            <p className="text-xs text-[#7A616F] leading-relaxed">{w.description}</p>
            <div className="space-y-2">
              {w.intervals.map((e, t) => (
                <div key={t} className="p-3.5 rounded-2xl bg-[#F6EDF2] flex items-start gap-3">
                  <span className="font-mono font-bold text-[11px] text-[#831843] bg-white px-2.5 py-1 rounded-xl shrink-0">{e.time}</span>
                  <span className="text-xs text-[#2B091C] font-medium leading-relaxed">{e.instruction}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => Ee(w)}
              className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Démarrer ce circuit cardio</span>
            </button>
          </div>
        )}
      </Sheet>
      <Sheet isOpen={!!ne} onClose={() => re(null)} title="Partager la séance" subtitle={ne?.title}>
        {ne && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-[#F6EDF2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2B091C] flex items-center gap-1.5 text-xs">
                  <Link className="w-3.5 h-3.5 text-[#831843]" />
                  <span>Lien direct</span>
                </span>
                <button
                  onClick={() => je(`link`, ne.shareUrl)}
                  className="px-3 py-1.5 rounded-full bg-[#831843] text-white font-bold text-[11px] flex items-center gap-1"
                >
                  {ie === `link` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{ie === `link` ? `Copié !` : `Copier`}</span>
                </button>
              </div>
              <input
                type="text"
                readOnly
                value={ne.shareUrl}
                className="w-full px-3 py-2 rounded-xl bg-white font-mono text-[10px] text-[#2B091C]"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#F6EDF2] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#2B091C] flex items-center gap-1.5 text-xs">
                  <FileText className="w-3.5 h-3.5 text-[#831843]" />
                  <span>Résumé texte</span>
                </span>
                <button
                  onClick={() => je(`text`, ne.formattedText)}
                  className="px-3 py-1.5 rounded-full bg-[#EC4899] text-white font-bold text-[11px] flex items-center gap-1"
                >
                  {ie === `text` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{ie === `text` ? `Copié !` : `Copier`}</span>
                </button>
              </div>
              <pre className="p-3 rounded-xl bg-white font-sans text-[11px] text-[#2B091C] whitespace-pre-wrap max-h-40 overflow-y-auto">
                {ne.formattedText}
              </pre>
            </div>
            <button
              onClick={Me}
              className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Share2 className="w-4 h-4" />
              <span>Envoyer</span>
            </button>
          </div>
        )}
      </Sheet>
      <Sheet isOpen={E} onClose={() => D(false)} title="Importer une séance" subtitle="Colle le lien ou le code reçu">
        <div className="space-y-3">
          <textarea
            value={ee}
            onChange={(e) => O(e.target.value)}
            placeholder="Colle ici le lien ?share=... ou le code..."
            rows={3}
            className="w-full p-3 rounded-2xl bg-[#F6EDF2] text-xs font-mono text-[#2B091C]"
          />
          {te && <p className="text-xs text-red-600 font-bold">{te}</p>}
          <button onClick={Ne} className="w-full py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs min-h-[48px]">
            Charger la séance
          </button>
        </div>
      </Sheet>
      <Sheet isOpen={!!A} onClose={() => ce(null)} title="Modifier la séance">
        {A && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-bold text-[#2B091C] text-[11px] mb-1">Nom de la séance</label>
              <input
                type="text"
                value={le}
                onChange={(e) => ue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F6EDF2] text-xs font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2B091C] text-[11px] mb-1">Date</label>
              <input
                type="date"
                value={de}
                onChange={(e) => fe(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F6EDF2] text-xs font-bold text-[#2B091C]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#2B091C] text-[11px] mb-1">Ressenti ({he}/5)</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => ge(e)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${he >= e ? `bg-[#EC4899] text-white` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
                  >
                    <Icon name="heart-pulse" className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block font-bold text-[#2B091C] text-[11px] mb-1">Notes</label>
              <textarea
                value={pe}
                onChange={(e) => me(e.target.value)}
                rows={2}
                className="w-full p-3 rounded-2xl bg-[#F6EDF2] text-xs text-[#2B091C]"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  ;(deleteWorkout(A.id), ce(null))
                }}
                className="px-4 py-3.5 rounded-full bg-red-50 text-red-700 font-bold text-xs"
              >
                Supprimer
              </button>
              <button onClick={Fe} className="flex-1 py-3.5 rounded-full bg-[#831843] text-white font-bold text-xs">
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </Sheet>
      <Sheet isOpen={be} onClose={() => xe(false)} title="Échauffement & Étirements">
        <WarmupCooldownCard category="lower-body" />
      </Sheet>
      <WorkoutBuilderSheet
        isOpen={p}
        onClose={() => m(false)}
        onLaunchWorkout={(t) => {
          ;(startWorkout(t), onStartActiveMode())
        }}
        onSaveAsRoutine={(e) => {
          ;(createRoutine(e), Ce(`Routine sauvegardée !`))
        }}
      />
      <WorkoutGeneratorSheet
        isOpen={h}
        onClose={() => g(false)}
        onLaunchWorkout={(t) => {
          ;(startWorkout(t), onStartActiveMode())
        }}
        onSaveRoutine={(e) => {
          ;(createRoutine(e), Ce(`Routine enregistrée !`))
        }}
      />
    </div>
  )
}
