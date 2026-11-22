// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useMemo } from 'react'
import { ABS_CIRCUITS, CARDIO_SESSIONS } from '../../data/circuits'
import { CustomExerciseSheet } from '../exercises/CustomExerciseSheet'
import { Icon } from '../../components/Icon'
import { WarmupCooldownCard } from './WarmupCooldownCard'
import { equipmentMeta } from '../exercises/meta'
import { useWorkout } from '../../store/WorkoutStore'
import {
  Check,
  ChevronDown,
  ChevronUp,
  Flame,
  History,
  Lightbulb,
  Play,
  Plus,
  RotateCcw,
  Save,
  Search,
  Share2,
  Sparkles,
  Star,
  Trash2,
  X,
} from 'lucide-react'
export const WorkoutGeneratorSheet = ({ isOpen, onClose, onLaunchWorkout, onSaveRoutine }) => {
  let { allExercises, favorites, getPreviousPerformance } = useWorkout(),
    [s, c] = useState(new Date().toISOString().split(`T`)[0]),
    [l, u] = useState(`Ma Séance Sur-Mesure`),
    [d, f] = useState([]),
    [p, m] = useState(``),
    [h, g] = useState(`all`),
    [v, y] = useState(true),
    [b, x] = useState(null),
    [S, C] = useState(`none`),
    [w, T] = useState(``),
    [E, D] = useState(`circuits`),
    [ee, O] = useState(ABS_CIRCUITS[0]?.id || ``),
    [te, k] = useState(CARDIO_SESSIONS[0]?.id || ``),
    [ne, re] = useState(null),
    [ie, ae] = useState(5),
    [oe, se] = useState(``),
    [A, ce] = useState(false),
    [le, ue] = useState(false),
    de = useMemo(() => {
      let e = p.trim().toLowerCase()
      return [...allExercises]
        .filter((t) =>
          (h === `favs` && !favorites.includes(t.id)) || (h !== `all` && h !== `favs` && t.category !== h)
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
          let o = +!!favorites.includes(t.id)
          return +!!favorites.includes(n.id) - o
        })
        .slice(0, e ? 12 : 8)
    }, [allExercises, favorites, p, h])
  if (!isOpen) return null
  let fe = (e) => {
      let t = getPreviousPerformance(e.id),
        n = t
          ? t.weight
          : e.equipment === `dumbbell`
            ? 8
            : e.equipment === `barbell`
              ? 30
              : e.equipment === `bodyweight` || e.equipment === `cardio_machine`
                ? 0
                : 20,
        r = Array.from(
          {
            length: e.defaultSets || 3,
          },
          (t, r) => ({
            id: `s_${Date.now()}_${r}`,
            setNumber: r + 1,
            targetReps: parseInt(e.defaultReps, 10) || 10,
            targetWeight: n,
            completed: false,
          }),
        ),
        i = {
          id: `item_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          exerciseId: e.id,
          exerciseName: e.name,
          category: e.category,
          equipment: e.equipment,
          restSeconds: e.defaultRestSeconds || 60,
          sets: r,
        }
      ;(f((e) => [...e, i]), m(``))
    },
    pe = (e) => {
      f(d.filter((t, n) => n !== e))
    },
    me = (e) => {
      let t = d[e],
        n = t.sets[t.sets.length - 1],
        r = {
          id: `s_${Date.now()}_${t.sets.length}`,
          setNumber: t.sets.length + 1,
          targetReps: n ? n.targetReps : 10,
          targetWeight: n ? n.targetWeight : 15,
          completed: false,
        },
        i = [...d]
      ;((i[e] = {
        ...t,
        sets: [...t.sets, r],
      }),
        f(i))
    },
    he = (e, t) => {
      let n = d[e]
      if (n.sets.length <= 1) return
      let r = n.sets
          .filter((e, n) => n !== t)
          .map((e, t) => ({
            ...e,
            setNumber: t + 1,
          })),
        i = [...d]
      ;((i[e] = {
        ...n,
        sets: r,
      }),
        f(i))
    },
    ge = (e, t, n, r) => {
      let i = d[e],
        a = [...i.sets]
      a[t] = {
        ...a[t],
        targetReps: n,
        targetWeight: r,
      }
      let o = [...d]
      ;((o[e] = {
        ...i,
        sets: a,
      }),
        f(o))
    },
    _e = (e, t) => {
      let n = d[e],
        r = n.sets.map((e) => ({
          ...e,
          targetWeight: t,
        })),
        i = [...d]
      ;((i[e] = {
        ...n,
        sets: r,
      }),
        f(i))
    },
    ve = (e, t, n) => {
      let r = d[e],
        i = r.sets.map((e) => ({
          ...e,
          targetWeight: t,
          targetReps: n,
        })),
        a = [...d]
      ;((a[e] = {
        ...r,
        sets: i,
      }),
        f(a))
    },
    ye = [
      `15 min Marche inclinée 12-5-30 (12% pente, 5 km/h)`,
      `12 min StairMaster fessiers tempo régulier (sans se tenir)`,
      `10 min Rameur fractionné 30s sprint / 30s récup`,
      `15 min Vélo elliptique pyramide résistances`,
      `20 min Marche inclinée brûle-graisse (pente 8-10%, 5.2 km/h)`,
      `12 min HIIT Vélo : 20s sprint max / 40s souple`,
      `10 min Corde à sauter / Jumping Jacks (45s effort / 15s repos)`,
      `15 min Escalier (StairMaster) pas croisés & kickbacks`,
    ],
    j = [
      `Circuit Gainage Global & Obliques 7 min (Planche + Commando)`,
      `Stomach Vacuum (5 x 20s) + Deadbug contrôlé (3 x 12)`,
      `Hollow Body Hold & Crunchs contrôlés (3 x 15 reps)`,
      `Relevés de bassin au sol & Chandelles (3 x 12 reps)`,
      `Circuit Pilates Core : Deadbug, Bird-Dog & Planche latérale`,
      `Russian Twists avec disque 5kg & Planche lestée 45s`,
      `Crunch poulie haute à genoux (3 x 15) + Gainage 60s`,
    ],
    be = (e) => {
      if ((C(e), e === `none`)) T(``)
      else if (e === `cardio`) {
        let e = CARDIO_SESSIONS[0]
        e ? (k(e.id), T(`${e.name.replace(/^\d+\.\s*/, ``)} (${e.machine} · ${e.durationMinutes} min)`)) : T(ye[0])
      } else if (e === `abs`) {
        let e = ABS_CIRCUITS[0]
        e
          ? (O(e.id), T(`${e.name.replace(/^\d+\.\s*/, ``)} (${e.durationMinutes} min · ${e.exercises.map((e) => e.name).join(` + `)})`))
          : T(j[0])
      }
    },
    xe = (e) => {
      ;(O(e.id),
        T(`${e.name.replace(/^\d+\.\s*/, ``)} (${e.durationMinutes} min : ${e.exercises.map((e) => `${e.name} ${e.reps}`).join(`, `)})`))
    },
    Se = (e) => {
      ;(k(e.id), T(`${e.name.replace(/^\d+\.\s*/, ``)} (${e.machine} · ${e.durationMinutes} min · Intensité ${e.intensity})`))
    },
    Ce = (e) => {
      let t = e.exercises.map((t, n) => {
        let r = parseInt(t.reps.replace(/[^0-9]/g, ``), 10) || 12
        return {
          id: `inc_abdo_${Date.now()}_${n}`,
          exerciseId: `circuit_${e.id}_${n}`,
          exerciseName: `[Circuit Abdos] ${t.name} (${t.reps})`,
          category: `abs`,
          equipment: `bodyweight`,
          restSeconds: 25,
          sets: [
            {
              id: `s1_${Date.now()}_${n}`,
              setNumber: 1,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
            {
              id: `s2_${Date.now()}_${n}`,
              setNumber: 2,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
            {
              id: `s3_${Date.now()}_${n}`,
              setNumber: 3,
              targetReps: r,
              targetWeight: 0,
              completed: false,
            },
          ],
        }
      })
      ;(f((e) => [...e, ...t]),
        re(`Les ${e.exercises.length} exercices du circuit « ${e.name.replace(/^\d+\.\s*/, ``)} » ont été ajoutés à ta séance !`),
        setTimeout(() => re(null), 3500))
    },
    we = (e) => {
      let t = e.intervals.map((t, n) => ({
        id: `inc_cardio_${Date.now()}_${n}`,
        exerciseId: `circuit_${e.id}_${n}`,
        exerciseName: `[${e.machine}] ${t.time} · ${t.instruction}`,
        category: `cardio`,
        equipment: `cardio_machine`,
        restSeconds: 0,
        sets: [
          {
            id: `sc_${Date.now()}_${n}`,
            setNumber: 1,
            targetReps: e.durationMinutes,
            targetWeight: 0,
            completed: false,
          },
        ],
      }))
      ;(f((e) => [...e, ...t]),
        re(`Les étapes du circuit « ${e.name.replace(/^\d+\.\s*/, ``)} » ont été ajoutées à ta séance !`),
        setTimeout(() => re(null), 3500))
    },
    Te = async () => {
      let e = [
        `Séance Glow Up Lab : ${l}`,
        `Date : ${s}`,
        `Intensité souhaitée : ${ie}/5`,
        `Exercices (${d.length}) :`,
        ...d.map(
          (e, t) =>
            `  ${t + 1}. ${e.exerciseName} - ${e.sets.length} séries (${e.sets.map((e) => `${e.targetWeight}kg x${e.targetReps}`).join(`, `)})`,
        ),
        S !== `none` && w ? `Finisher : ${w}` : `Finisher : Aucun`,
        oe ? `Notes : ${oe}` : ``,
      ].filter(Boolean).join(`
`)
      try {
        ;(navigator.clipboard && (await navigator.clipboard.writeText(e)), ue(true), setTimeout(() => ue(false), 3e3))
      } catch {
        ;(ue(true), setTimeout(() => ue(false), 3e3))
      }
    },
    Ee = ABS_CIRCUITS.find((e) => e.id === ee) || ABS_CIRCUITS[0],
    De = CARDIO_SESSIONS.find((e) => e.id === te) || CARDIO_SESSIONS[0]
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#3B0726]/60 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-xl rounded-[32px] bg-[#FCFBF9] p-5 sm:p-6 shadow-2xl border border-[#E6E2D8] my-4 max-h-[93vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5B8EE]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1F0C17] font-display">Saisir & Personnaliser ma Séance</h2>
            <p className="text-xs text-[#7A616F] font-medium">
              Tape quelques lettres pour ajouter tes exos et choisis ton circuit Finisher
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={Te}
              className="p-2 rounded-full text-[#781539] bg-[#FCE7F3] hover:bg-[#FBCFE8] transition-colors flex items-center gap-1 text-xs font-bold"
              title="Partager cette séance"
            >
              {le ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span className="hidden sm:inline">Partager</span>
            </button>
            <button onClick={onClose} className="p-1.5 text-[#6E6A63] hover:text-[#3B0726] rounded-full hover:bg-[#F2EFE9]">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {le && (
          <div className="mt-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Séance et résumé copiés dans le presse-papiers !</span>
          </div>
        )}
        {ne && (
          <div className="mt-2 p-2.5 rounded-xl bg-[#FCE7F3] border border-[#FBCFE8] text-[#781539] text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <Sparkles className="w-4 h-4 text-[#EA3E8E] shrink-0" />
            <span>{ne}</span>
          </div>
        )}
        <div className="flex-1 overflow-y-auto space-y-4 py-4 pr-1 text-xs leading-relaxed text-[#1F0C17]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-[#781539]">Nom de la séance</label>
              <input
                type="text"
                value={l}
                onChange={(e) => u(e.target.value)}
                placeholder="ex: Séance Dos / Pecs, Leg Day Fessiers..."
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-[#E5D4DF] bg-white text-[#1F0C17] font-semibold focus:outline-hidden focus:border-[#781539]"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#781539]">Date</label>
              <input
                type="date"
                value={s}
                onChange={(e) => c(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-[#E5D4DF] bg-white text-[#1F0C17] font-semibold"
              />
            </div>
          </div>
          <div className="p-4 rounded-[26px] bg-[#F4E9F0] border border-[#E5D4DF] space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F0C17] block">Ajouter un exercice (Saisie intelligente)</span>
                  <span className="text-[10px] text-[#7A616F] block">
                    Tape quelques lettres (ex: « hip », « tir », « pec », « fent ») et clique sur une proposition
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => y(!v)}
                className="text-[11px] font-bold text-[#781539] px-2.5 py-1 rounded-full bg-white hover:bg-[#FCE7F3]"
              >
                {v ? `Réduire` : `Ouvrir`}
              </button>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 text-[#781539] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={p}
                onFocus={() => y(true)}
                onChange={(e) => {
                  ;(m(e.target.value), y(true))
                }}
                placeholder="Écris les premières lettres d'un exercice (ex: tirage, hip thrust, développé, curl...)"
                className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-white border-2 border-[#FBCFE8] focus:border-[#781539] focus:outline-hidden text-xs font-semibold text-[#1F0C17] placeholder:text-[#8C6D7E]"
              />
              {p && (
                <button
                  type="button"
                  onClick={() => m(``)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C6D7E] hover:text-[#1F0C17]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {v && (
              <div className="space-y-2.5 animate-in fade-in duration-150">
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-0.5">
                  {[
                    {
                      id: `all`,
                      label: `Tous`,
                    },
                    {
                      id: `favs`,
                      label: `⭐ Favoris`,
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
                      id: `pecs`,
                      label: `Pecs`,
                    },
                    {
                      id: `arms`,
                      label: `Bras & Épaules`,
                    },
                    {
                      id: `abs`,
                      label: `Abdos`,
                    },
                    {
                      id: `cardio`,
                      label: `Cardio`,
                    },
                  ].map((e) => {
                    let t = h === e.id
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => g(e.id)}
                        className={`px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all ${t ? `bg-[#781539] text-white` : `bg-white text-[#7A616F] hover:text-[#1F0C17]`}`}
                      >
                        {e.label}
                      </button>
                    )
                  })}
                </div>
                <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
                  {de.map((e) => {
                    let t = favorites.includes(e.id),
                      n = equipmentMeta(e.equipment),
                      r = d.some((t) => t.exerciseId === e.id)
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => fe(e)}
                        className="w-full p-2.5 rounded-2xl bg-white hover:bg-[#FCE7F3]/70 border border-[#E5D4DF] text-left flex items-center justify-between gap-2 transition-all active:scale-99"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-[#1F0C17] truncate">{e.name}</span>
                            {t && <Star className="w-3 h-3 fill-[#EA3E8E] text-[#EA3E8E] shrink-0" />}
                            {r && (
                              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                                Déjà ajouté
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                            <span className="text-[10px] font-semibold text-[#781539]">{e.primaryMuscle}</span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${n.badgeClass}`}>{n.label}</span>
                          </div>
                        </div>
                        <span className="px-3 py-1.5 rounded-full bg-[#781539] text-white text-[11px] font-bold shrink-0">+ Ajouter</span>
                      </button>
                    )
                  })}
                  {p.trim().length >= 2 && (
                    <button
                      type="button"
                      onClick={() => x(p.trim())}
                      className="w-full p-3 rounded-2xl bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] text-left flex items-center justify-between gap-2 font-bold text-xs transition-all"
                    >
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#EA3E8E] shrink-0" />
                        <span>Créer l’exercice « {p.trim()} » (avec sa fiche complète)</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#781539] text-white text-[10px]">+ Créer</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="rounded-2xl border border-[#E6E2D8] overflow-hidden">
            <button
              type="button"
              onClick={() => ce(!A)}
              className="w-full p-3 bg-[#F2EFE9] text-left flex items-center justify-between font-semibold text-xs text-[#3B0726]"
            >
              <div className="flex items-center gap-2">
                <Icon name="stretch" className="w-4 h-4 text-[#EA3E8E] shrink-0" />
                <span>Protocole conseillé : Échauffement dynamique & Étirements</span>
              </div>
              {A ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {A && (
              <div className="p-2 bg-white">
                <WarmupCooldownCard category={d[0]?.category || `lower-body`} />
              </div>
            )}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-[#1F0C17] uppercase tracking-wider">Exercices sélectionnés ({d.length})</span>
              <button
                type="button"
                onClick={() => x(``)}
                className="text-[11px] font-bold text-[#781539] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Créer un nouvel exo perso</span>
              </button>
            </div>
            {d.length === 0 ? (
              <div className="p-5 rounded-2xl bg-[#FCFBF9] text-center space-y-1.5 border border-dashed border-[#E5D4DF]">
                <p className="text-xs text-[#7A616F] font-medium">
                  Tape quelques lettres dans la barre ci-dessus ou clique sur un exercice proposé pour construire ta séance.
                </p>
              </div>
            ) : (
              d.map((e, t) => {
                let n = getPreviousPerformance(e.exerciseId),
                  r = e.equipment === `dumbbell` ? 1 : 2.5,
                  i = n ? Number((n.weight + r).toFixed(1)) : null,
                  s = equipmentMeta(e.equipment)
                return (
                  <div key={e.id} className="p-4 rounded-2xl bg-white border border-[#E5D4DF] space-y-3 shadow-2xs">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold font-display text-[#1F0C17] text-sm">
                            {t + 1}. {e.exerciseName}
                          </span>
                          {favorites.includes(e.exerciseId) && <Star className="w-3.5 h-3.5 fill-[#EA3E8E] text-[#EA3E8E]" />}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-[9px] px-2 py-0.5 rounded-full ${s.badgeClass}`}>{s.label}</span>
                          <span className="text-[11px] text-[#7A616F]">Repos {e.restSeconds}s</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => pe(t)}
                        className="p-1 text-neutral-400 hover:text-red-600 rounded-full hover:bg-[#F2EFE9]"
                        title="Supprimer cet exercice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {n && (
                      <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-[#FCE7F3]/60 text-[11px] text-[#1F0C17]">
                        <div className="flex items-center gap-1 font-medium">
                          <History className="w-3 h-3 text-[#781539]" />
                          <span>
                            Dernière charge : <strong>{n.weight} kg</strong> ({n.reps} reps)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => ve(t, n.weight, n.reps)}
                          className="px-2 py-0.5 rounded-full bg-white font-bold text-[10px] text-[#781539] hover:bg-[#FCE7F3] flex items-center gap-1"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Reprendre</span>
                        </button>
                        {i && (
                          <button
                            type="button"
                            onClick={() => _e(t, i)}
                            className="px-2 py-0.5 rounded-full bg-[#781539] font-bold text-[10px] text-white flex items-center gap-1"
                          >
                            <Lightbulb className="w-2.5 h-2.5 text-[#FBCFE8]" />
                            <span>Essayer {i} kg</span>
                          </button>
                        )}
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <div className="grid grid-cols-12 gap-2 text-[10px] font-bold text-[#7A616F] uppercase px-1">
                        <span className="col-span-2">Série</span>
                        <span className="col-span-5">Reps</span>
                        <span className="col-span-4">Charge (kg)</span>
                        <span className="col-span-1" />
                      </div>
                      {e.sets.map((n, r) => (
                        <div key={n.id} className="grid grid-cols-12 gap-2 items-center">
                          <span className="col-span-2 font-display font-bold text-[#781539] pl-1">#{r + 1}</span>
                          <div className="col-span-5">
                            <input
                              type="number"
                              min="1"
                              value={n.targetReps}
                              onChange={(e) => ge(t, r, parseInt(e.target.value, 10) || 0, n.targetWeight)}
                              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E5D4DF] bg-[#FCFBF9] text-center font-mono font-semibold"
                            />
                          </div>
                          <div className="col-span-4">
                            <input
                              type="number"
                              step="0.5"
                              min="0"
                              value={n.targetWeight}
                              onChange={(e) => ge(t, r, n.targetReps, parseFloat(e.target.value) || 0)}
                              className="w-full px-2.5 py-1.5 text-xs rounded-xl border border-[#E5D4DF] bg-[#FCFBF9] text-center font-mono font-bold text-[#1F0C17]"
                            />
                          </div>
                          <div className="col-span-1 text-center">
                            {e.sets.length > 1 && (
                              <button type="button" onClick={() => he(t, r)} className="text-neutral-400 hover:text-red-500 font-bold">
                                ×
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="pt-1 flex justify-start">
                      <button type="button" onClick={() => me(t)} className="text-[11px] font-bold text-[#781539] hover:underline">
                        + Ajouter une série
                      </button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
          <div className="space-y-3 p-4 rounded-[26px] bg-[#F4E9F0] border border-[#E5D4DF]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#1F0C17]">
                <Flame className="w-4 h-4 text-[#EA3E8E]" />
                <span>Option Finisher : Circuits Abdos, Cardio ou Idées Rapides</span>
              </div>
              <span className="text-[10px] font-semibold text-[#781539]">
                {ABS_CIRCUITS.length} circuits Abdos · {CARDIO_SESSIONS.length} Cardio
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => be(`none`)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all ${S === `none` ? `bg-[#1F0C17] text-white shadow-xs` : `bg-white text-[#7A616F] hover:bg-[#FCE7F3] border border-[#E5D4DF]`}`}
              >
                Aucun
              </button>
              <button
                type="button"
                onClick={() => be(`abs`)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${S === `abs` ? `bg-[#781539] text-white shadow-xs` : `bg-white text-[#7A616F] hover:bg-[#FCE7F3] border border-[#E5D4DF]`}`}
              >
                <Icon name="stretch" className="w-3.5 h-3.5 shrink-0" />
                <span>Abdos & Circuits</span>
              </button>
              <button
                type="button"
                onClick={() => be(`cardio`)}
                className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${S === `cardio` ? `bg-[#EA3E8E] text-white shadow-xs` : `bg-white text-[#7A616F] hover:bg-[#FCE7F3] border border-[#E5D4DF]`}`}
              >
                <Icon name="runner" className="w-3.5 h-3.5 shrink-0" />
                <span>Cardio & Circuits</span>
              </button>
            </div>
            {S !== `none` && (
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => D(`circuits`)}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-bold transition-all ${E === `circuits` ? `bg-[#FCE7F3] text-[#781539] border border-[#FBCFE8]` : `bg-white text-[#7A616F]`}`}
                >
                  {S === `abs`
                    ? `🔥 Les ${ABS_CIRCUITS.length} Circuits Abdos de l'appli`
                    : `🏃‍♀️ Les ${CARDIO_SESSIONS.length} Circuits Cardio guidés`}
                </button>
                <button
                  type="button"
                  onClick={() => D(`quick`)}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-bold transition-all ${E === `quick` ? `bg-[#FCE7F3] text-[#781539] border border-[#FBCFE8]` : `bg-white text-[#7A616F]`}`}
                >
                  ⚡ Autres idées rapides
                </button>
              </div>
            )}
            {S === `abs` && (
              <div className="space-y-2.5 pt-1 animate-in fade-in">
                {E === `circuits` ? (
                  <div className="space-y-2">
                    <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                      {ABS_CIRCUITS.map((e) => {
                        let t = ee === e.id
                        return (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => xe(e)}
                            className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${t ? `bg-[#781539] text-white` : `bg-white text-[#1F0C17] hover:bg-[#FCE7F3]/50 border border-[#E5D4DF]`}`}
                          >
                            <div className="min-w-0">
                              <span className="font-bold text-xs block truncate">{e.name.replace(/^\d+\.\s*/, ``)}</span>
                              <span className={`text-[10px] block truncate ${t ? `text-[#FBCFE8]` : `text-[#7A616F]`}`}>
                                {e.durationMinutes} min · {e.focus}
                              </span>
                            </div>
                            {t && <Check className="w-4 h-4 shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                    {Ee && (
                      <div className="p-3 rounded-2xl bg-white border border-[#FBCFE8] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[11px] text-[#781539]">
                            Détail du circuit sélectionné ({Ee.exercises.length} exos) :
                          </span>
                          <button
                            type="button"
                            onClick={() => Ce(Ee)}
                            className="px-2.5 py-1 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] font-bold text-[10px] flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Incorporer les exos dans la séance</span>
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                          {Ee.exercises.map((e, t) => (
                            <div
                              key={t}
                              className="px-2.5 py-1.5 rounded-xl bg-[#F4E9F0] text-[10px] flex items-center justify-between gap-1"
                            >
                              <span className="font-semibold text-[#1F0C17] truncate">
                                {t + 1}. {e.name}
                              </span>
                              <span className="font-mono font-bold text-[#781539] shrink-0">{e.reps}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {j.map((e, t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => T(e)}
                        className={`px-2.5 py-1.5 rounded-full text-[10px] font-semibold border transition-colors ${w === e ? `bg-[#781539] text-white border-[#781539]` : `bg-white text-[#1F0C17] border-[#E5D4DF] hover:bg-[#FCE7F3]`}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={w}
                  onChange={(e) => T(e.target.value)}
                  placeholder="Ou personnalise librement ton Finisher Abdos..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D4DF] bg-white text-[#1F0C17] font-medium"
                />
              </div>
            )}
            {S === `cardio` && (
              <div className="space-y-2.5 pt-1 animate-in fade-in">
                {E === `circuits` ? (
                  <div className="space-y-2">
                    <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                      {CARDIO_SESSIONS.map((e) => {
                        let t = te === e.id
                        return (
                          <button
                            key={e.id}
                            type="button"
                            onClick={() => Se(e)}
                            className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center justify-between gap-2 ${t ? `bg-[#781539] text-white` : `bg-white text-[#1F0C17] hover:bg-[#FCE7F3]/50 border border-[#E5D4DF]`}`}
                          >
                            <div className="min-w-0">
                              <span className="font-bold text-xs block truncate">{e.name.replace(/^\d+\.\s*/, ``)}</span>
                              <span className={`text-[10px] block truncate ${t ? `text-[#FBCFE8]` : `text-[#7A616F]`}`}>
                                {e.machine} · {e.durationMinutes} min · Intensité {e.intensity}
                              </span>
                            </div>
                            {t && <Check className="w-4 h-4 shrink-0" />}
                          </button>
                        )
                      })}
                    </div>
                    {De && (
                      <div className="p-3 rounded-2xl bg-white border border-[#FBCFE8] space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[11px] text-[#781539]">Étapes du circuit ({De.machine}) :</span>
                          <button
                            type="button"
                            onClick={() => we(De)}
                            className="px-2.5 py-1 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] font-bold text-[10px] flex items-center gap-1 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Incorporer les paliers dans la séance</span>
                          </button>
                        </div>
                        <div className="space-y-1">
                          {De.intervals.map((e, t) => (
                            <div
                              key={t}
                              className="px-2.5 py-1 rounded-xl bg-[#F4E9F0] text-[10px] flex items-center justify-between gap-2"
                            >
                              <span className="font-mono font-bold text-[#781539] shrink-0">{e.time}</span>
                              <span className="text-[#1F0C17] truncate flex-1 text-right">{e.instruction}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-1.5">
                    {ye.map((e, t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => T(e)}
                        className={`px-2.5 py-1.5 rounded-full text-[10px] font-semibold border transition-colors ${w === e ? `bg-[#781539] text-white border-[#781539]` : `bg-white text-[#1F0C17] border-[#E5D4DF] hover:bg-[#FCE7F3]`}`}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  value={w}
                  onChange={(e) => T(e.target.value)}
                  placeholder="Ou écris ton Finisher Cardio sur-mesure..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#E5D4DF] bg-white text-[#1F0C17] font-medium"
                />
              </div>
            )}
            {S === `none` && (
              <p className="text-[11px] text-[#7A616F] italic pt-0.5">
                Aucun finisher sélectionné. Clique sur « Abdos & Circuits » ou « Cardio & Circuits » pour choisir parmi tous les circuits de
                l’application.
              </p>
            )}
          </div>
          <div className="space-y-3 p-4 rounded-2xl bg-[#FCFBF9] border border-[#E6E2D8]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
              <div>
                <label className="text-xs font-semibold text-[#3B0726] flex items-center gap-1.5">
                  <span>Ressenti d'intensité : {ie}/5</span>
                  <Icon name="heart-pulse" className="w-3.5 h-3.5 text-[#EA3E8E]" />
                </label>
                <span className="text-[10px] text-neutral-500">
                  {ie === 1 && `Doux · Récupération active`}
                  {ie === 2 && `Modéré · Échauffement et mobilité`}
                  {ie === 3 && `Équilibré · Bon engagement musculaire`}
                  {ie === 4 && `Intense · Brûlure et congestion profonde`}
                  {ie === 5 && `Record · Effort maximal et dépassement !`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((e) => (
                  <button
                    key={e}
                    type="button"
                    onClick={() => ae(e)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center ${ie >= e ? `bg-[#F8A5F8] text-[#3B0726] scale-110 shadow-xs` : `bg-white text-neutral-400 opacity-60 border border-[#E6E2D8]`}`}
                  >
                    <Icon name="heart-pulse" className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-neutral-600 mb-1">Notes personnelles en bas de séance</label>
              <textarea
                value={oe}
                onChange={(e) => se(e.target.value)}
                placeholder="Ressenti, énergie, réglages machines à mémoriser..."
                rows={2}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#E6E2D8] bg-white text-[#3B0726]"
              />
            </div>
          </div>
        </div>
        <div className="pt-3 border-t border-[#F5B8EE] flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              d.length === 0
                ? y(true)
                : (onSaveRoutine({
                    name: l,
                    targetZone: d[0]?.category || `lower-body`,
                    exercises: d,
                    finisher: S === `none` ? void 0 : w,
                    notes: oe,
                  }),
                  onClose())
            }}
            className="py-3 px-4 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Enregistrer routine</span>
          </button>
          <button
            type="button"
            onClick={Te}
            className="py-3 px-3.5 rounded-full bg-[#F4E9F0] hover:bg-[#F1E2EA] text-[#1F0C17] font-bold text-xs flex items-center gap-1 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#781539]" />
            <span>Partager</span>
          </button>
          <button
            type="button"
            onClick={() => {
              d.length === 0
                ? y(true)
                : (onLaunchWorkout({
                    name: l,
                    exercises: d,
                    finisher: S === `none` ? void 0 : w,
                    notes: oe,
                    rating: ie,
                    finisherType: S,
                  }),
                  onClose())
            }}
            className="flex-1 py-3 px-4 rounded-full bg-[#781539] hover:bg-[#5B0E2D] text-white font-bold text-xs flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Démarrer la séance active</span>
          </button>
        </div>
      </div>
      <CustomExerciseSheet
        isOpen={b !== null}
        onClose={() => x(null)}
        initialName={b || ``}
        onExerciseCreated={(e) => {
          ;(fe(e), x(null))
        }}
      />
    </div>
  )
}
