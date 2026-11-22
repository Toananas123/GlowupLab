// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { ABS_CIRCUITS, CARDIO_SESSIONS } from '../../data/circuits'
import { GearList } from '../exercises/GearList'
import { Icon } from '../../components/Icon'
import { LEG_DAY_CATEGORIES, WARMUPS } from '../../data/guides'
import { Sheet } from '../../components/Sheet'
import { buildLegDay } from './helpers'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronDown, ChevronUp, Flame, Play, RefreshCw, Save, Sparkles } from 'lucide-react'
export const WorkoutBuilderSheet = ({ isOpen, onClose, onLaunchWorkout, onSaveAsRoutine }) => {
  let { allExercises, favorites, getPreviousPerformance } = useWorkout(),
    [s, c] = useState(`back_sculpt_order`),
    [l, u] = useState(0),
    [d, f] = useState(0),
    [p, m] = useState([]),
    [h, g] = useState(``),
    [v, y] = useState(``),
    [b, x] = useState(false),
    [S, C] = useState(`pick_goal`)
  if (!isOpen) return null
  let w = [
      {
        id: `back_sculpt_order`,
        label: `Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)`,
        desc: `1. Milieu du dos · 2. Grand dorsal · 3. Arrière d’épaule · 4. Lombaires (Back Extension)`,
        icon: `dumbbell`,
      },
      {
        id: `dos_pecs`,
        label: `Séance Dos / Pecs (Upper Body Antagoniste)`,
        desc: `Combo haut du corps : 2 exos Dos + 2 exos Pecs pour une posture sculptée`,
        icon: `dumbbell`,
      },
      {
        id: `pecs_bras`,
        label: `Séance Pecs / Bras (Buste Tonique & Bras Fermes)`,
        desc: `Combo Push & Galbe : 2 exos Pecs + 2 exos Bras & Épaules`,
        icon: `biceps`,
      },
      {
        id: `pecs`,
        label: `Focus Pecs & Maintien du Buste`,
        desc: `Développé incliné, Chest Press, Pec-Deck Butterfly & Poulie vis-à-vis`,
        icon: `dumbbell`,
      },
      {
        id: `glutes`,
        label: `Fessiers uniquement (Booty Focus)`,
        desc: `Hip thrust, kickback poulie, abduction & fentes bulgares`,
        icon: `kettlebell`,
      },
      {
        id: `lower`,
        label: `Bas du corps complet (Ordre 1-2-3-4)`,
        desc: `Polyarticulaire lourd, unilatéral, ischios/quads & isolation fessiers`,
        icon: `kettlebell`,
      },
      {
        id: `abs`,
        label: `Circuits Abdos & Gainage (8 circuits)`,
        desc: `Debout avec charge, Planche lestée 60s, Over-Unders, 360°, Vacuum...`,
        icon: `stretch`,
      },
      {
        id: `cardio`,
        label: `Circuits Cardio Guidés (11 séances)`,
        desc: `Marche inclinée 12-5-30, StairMaster, Rameur, Elliptique, HIIT...`,
        icon: `runner`,
      },
      {
        id: `posterior`,
        label: `Chaîne postérieure (Fessiers & Ischios)`,
        desc: `RDL haltères, hip thrust, leg curl assis & banc lombaires`,
        icon: `kettlebell`,
      },
      {
        id: `quads_adductors`,
        label: `Quads Sculpt & Adducteurs Fermes`,
        desc: `Presse à cuisses, machine adducteurs, leg extension & squat sumo`,
        icon: `kettlebell`,
      },
      {
        id: `arms`,
        label: `Épaules Galbées & Bras Toniques`,
        desc: `Élévations latérales, développé militaire, triceps corde & curl incliné`,
        icon: `biceps`,
      },
      {
        id: `fullbody`,
        label: `Full Body Glow & Tonique`,
        desc: `Séance complète 4 mouvements polyarticulaires majeurs`,
        icon: `weightlifter`,
      },
    ],
    T = (e, t) =>
      e.length === 0
        ? t
        : [...e].sort((e, t) => {
            let n = favorites.includes(e.id),
              r = favorites.includes(t.id)
            return n && !r ? (Math.random() < 0.7 ? -1 : 1) : !n && r ? (Math.random() < 0.7 ? 1 : -1) : 0.5 - Math.random()
          })[0],
    E = (e) => {
      if (e === `abs`) {
        let e = ABS_CIRCUITS[d] || ABS_CIRCUITS[0],
          t = e.exercises.map((t, n) => {
            let r = parseInt(t.reps.replace(/[^0-9]/g, ``), 10) || 12
            return {
              id: `gen_abdo_${Date.now()}_${n}`,
              exerciseId: `circuit_${e.id}_${n}`,
              exerciseName: `${t.name} (${t.reps})`,
              category: `abs`,
              equipment: `bodyweight`,
              restSeconds: 25,
              sets: [
                {
                  id: `gen_s1_${n}`,
                  setNumber: 1,
                  targetReps: r,
                  targetWeight: 0,
                  completed: false,
                },
                {
                  id: `gen_s2_${n}`,
                  setNumber: 2,
                  targetReps: r,
                  targetWeight: 0,
                  completed: false,
                },
                {
                  id: `gen_s3_${n}`,
                  setNumber: 3,
                  targetReps: r,
                  targetWeight: 0,
                  completed: false,
                },
              ],
            }
          })
        ;(m(t), g(`Planche active statique finale (60 sec)`), y(e.name.replace(/^\d+\.\s*/, ``)), C(`review`))
        return
      }
      if (e === `cardio`) {
        let e = CARDIO_SESSIONS[l] || CARDIO_SESSIONS[0],
          t = e.intervals.map((t, n) => ({
            id: `gen_cardio_${Date.now()}_${n}`,
            exerciseId: `circuit_${e.id}_${n}`,
            exerciseName: `${t.time} · ${t.instruction}`,
            category: `cardio`,
            equipment: `cardio_machine`,
            restSeconds: 0,
            sets: [
              {
                id: `gen_cs1_${n}`,
                setNumber: 1,
                targetReps: e.durationMinutes,
                targetWeight: 0,
                completed: false,
              },
            ],
          }))
        ;(m(t), g(`5 min de marche retour au calme & hydratation`), y(`${e.name.replace(/^\d+\.\s*/, ``)} (${e.machine})`), C(`review`))
        return
      }
      let t = e === `glutes` || e === `lower` || e === `posterior` || e === `quads_adductors`,
        n = ``,
        r = ``,
        s = []
      if (t)
        (e === `glutes`
          ? ((n = `Glow Glutes Focus (Fessiers)`), (r = `Abduction machine en drop-set (3 x 20 reps)`))
          : e === `lower`
            ? ((n = `Bas du Corps Complet (Jambes Fermes)`), (r = `Leg Extension tempo brûlure (2 x 15 reps)`))
            : e === `posterior`
              ? ((n = `Chaîne Postérieure (Fessiers & Ischios)`), (r = `Back Extension au banc 45° (3 x 15 reps)`))
              : e === `quads_adductors` && ((n = `Quads Sculpt & Adducteurs Fermes`), (r = `Goblet Squat tempo lent (2 x 15 reps)`)),
          (s = buildLegDay(allExercises, favorites, e).map((e) => {
            let t = LEG_DAY_CATEGORIES.find((t) => t.id === e.phase)
            return {
              exercise: e.exercise,
              phaseTag: t ? `Phase ${t.id} · ${t.name}` : void 0,
            }
          })))
      else if (e === `back_sculpt_order` || e === `back`) {
        ;((n = `Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)`), (r = `Gainage Stomach Vacuum (4 x 20s) + Marche inclinée 10 min`))
        let e = allExercises.filter((e) => e.specificMuscle === `milieu-dos`),
          t = allExercises.filter((e) => e.specificMuscle === `grand-dorsal`),
          a = allExercises.filter((e) => e.specificMuscle === `trapezes-arriere-epaule` || e.specificMuscle === `epaule-arriere`),
          o =
            allExercises.find((e) => e.id === `hyperextensions-bench`) ||
            allExercises.find((e) => e.specificMuscle === `lombaires`) ||
            allExercises[0],
          c = T(e, allExercises[0]),
          l = T(
            e.filter((e) => e.id !== c.id),
            c,
          ),
          u = T(t, allExercises[0]),
          d = T(a, allExercises[0])
        s = [
          {
            exercise: c,
            phaseTag: `1. Milieu du dos (1/2)`,
          },
          ...(l.id === c.id
            ? []
            : [
                {
                  exercise: l,
                  phaseTag: `1. Milieu du dos (2/2)`,
                },
              ]),
          {
            exercise: u,
            phaseTag: `2. Grand dorsal (1 exo)`,
          },
          {
            exercise: d,
            phaseTag: `3. Arrière d’épaule (1 exo)`,
          },
          {
            exercise: o,
            phaseTag: `4. Lombaires · Back Extension`,
          },
        ]
      } else if (e === `dos_pecs`) {
        ;((n = `Séance Dos / Pecs (Upper Body Dessiné & Galbe)`), (r = `Face Pulls corde (3 x 15) + Planche active 60s`))
        let e = allExercises.filter((e) => e.category === `pecs`),
          t = allExercises.filter((e) => e.specificMuscle === `milieu-dos`),
          a = allExercises.filter((e) => e.specificMuscle === `grand-dorsal`),
          o = T(
            e.filter((e) => e.specificMuscle !== `pecs-isolation`),
            e[0] || allExercises[0],
          ),
          c = T(t, allExercises[0]),
          l = T(
            e.filter((e) => e.id !== o.id),
            e[0] || allExercises[0],
          ),
          u = T(a, allExercises[0])
        s = [
          {
            exercise: c,
            phaseTag: `Dos · Milieu du dos`,
          },
          {
            exercise: o,
            phaseTag: `Pecs · Haut & Galbe`,
          },
          {
            exercise: u,
            phaseTag: `Dos · Grand dorsal`,
          },
          {
            exercise: l,
            phaseTag: `Pecs · Isolation & Dessin`,
          },
        ]
      } else if (e === `pecs_bras`) {
        ;((n = `Séance Pecs / Bras (Buste Tonique & Bras Fermes)`), (r = `Extensions triceps corde en drop-set (2 x 15 reps)`))
        let e = allExercises.filter((e) => e.category === `pecs`),
          t = allExercises.filter((e) => e.specificMuscle === `triceps`),
          a = allExercises.filter((e) => e.specificMuscle === `biceps` || e.specificMuscle === `epaule-cote`),
          o = T(
            e.filter((e) => e.specificMuscle === `pecs-haut`),
            e[0] || allExercises[0],
          ),
          c = T(
            e.filter((e) => e.id !== o.id),
            e[1] || o,
          ),
          l = T(t, allExercises[0]),
          u = T(a, allExercises[0])
        s = [
          {
            exercise: o,
            phaseTag: `Pecs · Polyarticulaire`,
          },
          {
            exercise: c,
            phaseTag: `Pecs · Isolation Buste`,
          },
          {
            exercise: l,
            phaseTag: `Bras · Triceps Fermeté`,
          },
          {
            exercise: u,
            phaseTag: `Bras · Biceps / Épaules`,
          },
        ]
      } else if (e === `pecs`)
        ((n = `Focus Pecs & Maintien du Buste`),
          (r = `Pompes inclinées sur banc au poids du corps (2 x max)`),
          (s = allExercises
            .filter((e) => e.category === `pecs`)
            .slice(0, 4)
            .map((e) => ({
              exercise: e,
              phaseTag: e.primaryMuscle,
            }))))
      else {
        let t = []
        ;(e === `arms`
          ? ((n = `Épaules Galbées & Bras Toniques`),
            (r = `Extensions triceps à la corde (3 x 15 reps)`),
            (t = allExercises.filter((e) => e.category === `arms`)))
          : e === `fullbody` &&
            ((n = `Full Body Glow & Tonification Totale`),
            (r = `60 secondes de planche active ou 10 min de marche en côte`),
            (t = [
              allExercises.find((e) => e.specificMuscle === `fessiers`) || allExercises[0],
              allExercises.find((e) => e.specificMuscle === `milieu-dos`) || allExercises[1],
              allExercises.find((e) => e.category === `pecs`) || allExercises[2],
              allExercises.find((e) => e.specificMuscle === `abdos`) || allExercises[3],
            ].filter(Boolean))),
          (s = [...t]
            .sort((e, t) => {
              let n = favorites.includes(e.id),
                r = favorites.includes(t.id)
              return n && !r ? (Math.random() < 0.67 ? -1 : 1) : !n && r ? (Math.random() < 0.67 ? 1 : -1) : 0.5 - Math.random()
            })
            .slice(0, 4)
            .map((e) => ({
              exercise: e,
            }))))
      }
      let c = s.map((e, t) => {
        let n = e.exercise,
          r = getPreviousPerformance(n.id),
          i = r ? r.weight : n.equipment === `dumbbell` ? 8 : n.equipment === `barbell` ? 25 : n.equipment === `bodyweight` ? 0 : 20,
          a = n.defaultSets || 3,
          s = Array.from(
            {
              length: a,
            },
            (e, r) => ({
              id: `gen_set_${Date.now()}_${t}_${r}`,
              setNumber: r + 1,
              targetReps: parseInt(n.defaultReps, 10) || 12,
              targetWeight: i,
              completed: false,
            }),
          )
        return {
          id: `gen_item_${Date.now()}_${t}`,
          exerciseId: n.id,
          exerciseName: n.name,
          category: n.category,
          equipment: n.equipment,
          restSeconds: n.defaultRestSeconds || 75,
          sets: s,
          notes: e.phaseTag,
        }
      })
      ;(m(c), g(r), y(n), C(`review`))
    },
    D =
      s === `glutes` || s === `lower` || s === `posterior` || s === `quads_adductors`
        ? WARMUPS[`lower-body`]
        : s === `back` || s === `back_sculpt_order` || s === `dos_pecs`
          ? WARMUPS.back
          : s === `pecs` || s === `pecs_bras`
            ? WARMUPS.pecs
            : s === `arms`
              ? WARMUPS.arms
              : s === `abs`
                ? WARMUPS.abs
                : WARMUPS.cardio
  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={S === `pick_goal` ? `Séances Proposées & Circuits` : `Ta séance proposée`}
      subtitle={
        S === `pick_goal`
          ? `Choisis ta séance (Dos 1-2-3-4, Dos/Pecs, Pecs/Bras, Bas du corps...)`
          : `Vérifie les exercices avant de démarrer`
      }
      footer={
        <div className="flex items-center gap-2">
          {S === `pick_goal` ? (
            <button
              onClick={() => E(s)}
              className="w-full py-3.5 px-4 rounded-full bg-[#831843] hover:bg-[#3B0726] text-white font-bold text-xs flex items-center justify-center gap-2 active:scale-98 transition-all min-h-[48px]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Proposer cette séance</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => C(`pick_goal`)}
                className="py-3.5 px-4 rounded-full bg-[#F6EDF2] text-[#2B091C] font-bold text-xs transition-colors min-h-[48px]"
              >
                Retour
              </button>
              <button
                onClick={() => {
                  ;(onSaveAsRoutine({
                    name: v,
                    targetZone: s,
                    exercises: p,
                    finisher: h,
                    notes: `Séance personnalisée générée par Glow Up Lab`,
                  }),
                    onClose())
                }}
                className="py-3.5 px-4 rounded-full bg-[#FCE7F3] text-[#831843] font-bold text-xs flex items-center gap-1.5 transition-colors min-h-[48px]"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Sauvegarder</span>
              </button>
              <button
                onClick={() => {
                  ;(onLaunchWorkout({
                    name: v,
                    exercises: p,
                    finisher: h,
                  }),
                    onClose())
                }}
                className="flex-1 py-3.5 px-4 rounded-full bg-[#831843] text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all min-h-[48px]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Démarrer</span>
              </button>
            </>
          )}
        </div>
      }
    >
      {S === `pick_goal` ? (
        <div className="space-y-4">
          <div className="space-y-2">
            {w.map((e) => {
              let t = s === e.id
              return (
                <button
                  key={e.id}
                  onClick={() => c(e.id)}
                  className={`w-full p-3.5 rounded-[22px] text-left transition-all flex items-center justify-between gap-3 ${t ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#2B091C] hover:bg-[#F1E2EA]`}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t ? `bg-white/15 text-[#FBCFE8]` : `bg-white text-[#831843]`}`}
                    >
                      <Icon name={e.icon} className="w-5 h-5" />
                    </span>
                    <div className="min-w-0">
                      <span className="font-display font-bold text-xs sm:text-sm block truncate">{e.label}</span>
                      <span className={`text-[11px] block truncate mt-0.5 ${t ? `text-[#FBCFE8]/90` : `text-[#7A616F]`}`}>{e.desc}</span>
                    </div>
                  </div>
                  {t && <Check className="w-4 h-4 text-[#FBCFE8] shrink-0" />}
                </button>
              )
            })}
          </div>
          {s === `abs` && (
            <div className="p-4 rounded-[24px] bg-[#FCE7F3]/70 space-y-2.5">
              <span className="block text-xs font-bold text-[#831843]">
                Choisis ton circuit d’abdos & gainage ({ABS_CIRCUITS.length} disponibles) :
              </span>
              <div className="space-y-1.5">
                {ABS_CIRCUITS.map((e, t) => {
                  let n = d === t
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => f(t)}
                      className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${n ? `bg-[#831843] text-white font-bold` : `bg-white text-[#2B091C] hover:bg-[#FDFBFD]`}`}
                    >
                      <div className="min-w-0">
                        <span className="text-xs block truncate">{e.name}</span>
                        <span className={`text-[10px] block truncate ${n ? `text-[#FBCFE8]` : `text-[#7A616F]`}`}>
                          {e.durationMinutes} min · {e.focus}
                        </span>
                      </div>
                      {n && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
          {s === `cardio` && (
            <div className="p-4 rounded-[24px] bg-[#FCE7F3]/70 space-y-2.5">
              <span className="block text-xs font-bold text-[#831843]">
                Choisis ta séance cardio guidée ({CARDIO_SESSIONS.length} disponibles) :
              </span>
              <div className="space-y-1.5">
                {CARDIO_SESSIONS.map((e, t) => {
                  let n = l === t
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => u(t)}
                      className={`w-full p-3 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${n ? `bg-[#831843] text-white font-bold` : `bg-white text-[#2B091C] hover:bg-[#FDFBFD]`}`}
                    >
                      <div className="min-w-0">
                        <span className="text-xs block truncate">{e.name}</span>
                        <span className={`text-[10px] block truncate ${n ? `text-[#FBCFE8]` : `text-[#7A616F]`}`}>
                          {e.machine} · {e.durationMinutes} min · {e.intensity}
                        </span>
                      </div>
                      {n && <Check className="w-4 h-4 shrink-0" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-[#FCE7F3] text-[#2B091C] flex items-center justify-between">
            <div>
              <h3 className="font-display font-bold text-base">{v}</h3>
              <p className="text-xs text-[#831843] font-medium">{p.length} exercices structurés dans l’ordre</p>
            </div>
            {s !== `abs` && s !== `cardio` && (
              <button
                onClick={() => E(s)}
                className="p-2.5 rounded-full bg-white text-[#831843] transition-colors"
                title="Régénérer d'autres exercices"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            )}
          </div>
          <GearList exercises={p} variant="banner" />
          {D && (
            <div className="rounded-2xl bg-[#F6EDF2] overflow-hidden">
              <button
                onClick={() => x(!b)}
                className="w-full p-3.5 flex items-center justify-between text-left font-bold text-xs text-[#2B091C]"
              >
                <span className="flex items-center gap-2">
                  <Icon name="stretch" className="w-4 h-4 text-[#EC4899] shrink-0" />
                  <span>Échauffement & Étirements adaptés</span>
                </span>
                {b ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
              {b && (
                <div className="p-3.5 pt-0 space-y-3 text-xs text-[#2B091C]">
                  <div>
                    <span className="font-bold block mb-1">Échauffement :</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[#7A616F]">
                      {D.warmup.map((e, t) => (
                        <li key={`w-${t}`}>{e}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="font-bold block mb-1">Retour au calme :</span>
                    <ul className="list-disc list-inside space-y-0.5 text-[#7A616F]">
                      {D.cooldown.map((e, t) => (
                        <li key={`c-${t}`}>{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="space-y-2">
            {p.map((e, t) => (
              <div key={e.id} className="p-3.5 rounded-2xl bg-[#F6EDF2] flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <span className="font-display font-bold text-xs text-[#2B091C] block truncate">
                    {t + 1}. {e.exerciseName}
                  </span>
                  <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                    <span className="text-[11px] text-[#7A616F]">
                      {e.sets.length} {e.sets.length > 1 ? `séries` : `bloc`}
                      {e.restSeconds > 0 ? ` · Repos ${e.restSeconds}s` : ``}
                    </span>
                    {e.notes && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FCE7F3] text-[#831843]">{e.notes}</span>
                    )}
                  </div>
                </div>
                <span className="font-mono font-bold text-[#831843] text-xs shrink-0 bg-white px-2.5 py-1 rounded-full">
                  {e.sets[0]?.targetWeight ? `${e.sets[0].targetWeight} kg` : `PDC`}
                </span>
              </div>
            ))}
          </div>
          {h && (
            <div className="p-3.5 rounded-2xl bg-[#FCE7F3]/70 text-xs text-[#831843] flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#EC4899] shrink-0" />
              <span>
                <strong>Finisher :</strong> {h}
              </span>
            </div>
          )}
        </div>
      )}
    </Sheet>
  )
}
