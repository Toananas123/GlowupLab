// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { FINISHERS } from '../../data/circuits'
import { OBJECTIVES, PROGRAM_EQUIPMENT } from '../../data/programs'
import { WEEK_DAYS_SHORT } from '../../lib/constants'
import { useWorkout } from '../../store/WorkoutStore'
import { LEVELS, levelLabel } from './programEngine'
import {
  Award,
  Calendar,
  Check,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  Copy,
  Dumbbell,
  Flame,
  FolderPlus,
  Layers,
  Play,
  Plus,
  Share2,
  SlidersHorizontal,
  Sparkles,
  Trash2,
  TrendingUp,
  Trophy,
  Upload,
  X,
} from 'lucide-react'
export const ProgramsPage = ({ onStartWorkoutSession, onNavigateToPlanning }) => {
  let {
      programs,
      activeProgram,
      routines,
      measurements,
      workouts,
      createCustomProgram,
      deleteCustomProgram,
      startProgram,
      stopActiveProgram,
      exportProgramCode,
      importProgramFromCode,
      startWorkout,
    } = useWorkout(),
    [m, h] = useState(`all`),
    [lvl, setLvl] = useState(`all`),
    [g, v] = useState(`all`),
    [y, b] = useState(null),
    [x, S] = useState({}),
    [C, w] = useState(null),
    [T, E] = useState([1, 3, 5]),
    [D, ee] = useState(new Date().toISOString().split(`T`)[0]),
    [O, te] = useState(false),
    [k, ne] = useState(``),
    [re, ie] = useState(``),
    [ae, oe] = useState(`hypertrophy`),
    [se, A] = useState(6),
    [ce, le] = useState(3),
    [ue, de] = useState(`Intermédiaire`),
    [fe, pe] = useState([`Haltères`, `Machines`]),
    [me, he] = useState(``),
    [ge, _e] = useState(1),
    [ve, ye] = useState(() => ke(6, 3, routines[0]?.id || `routine-glutes-focus`)),
    [j, be] = useState(null),
    [xe, Se] = useState(false),
    [Ce, we] = useState(``),
    [Te, Ee] = useState(null),
    [De, Oe] = useState(false)
  function ke(e, t, n) {
    return Array.from(
      {
        length: e,
      },
      (e, r) => {
        let i = r + 1,
          a = Array.from(
            {
              length: 7,
            },
            (e, r) => {
              let a = r + 1,
                o = r < t
              return {
                id: `custom_w${i}_d${a}`,
                dayNumber: a,
                label: o ? `Jour ${a} — Séance ${a}` : `Jour ${a} — Repos`,
                isRest: !o,
                activityType: o ? `Musculation` : `Repos`,
                routineId: o ? n : void 0,
                workoutTitle: o ? `Séance Jour ${a}` : `Repos`,
                durationMinutes: o ? 45 : void 0,
                finisherPresetId: o ? `finisher-tabata-core-30-15` : void 0,
              }
            },
          )
        return {
          weekNumber: i,
          title: `Semaine ${i} — Progression`,
          focusNote:
            i === 1
              ? `Trouvez vos charges de référence avec une technique parfaite.`
              : `Ajoutez +2 kg ou +1 à 2 répétitions par rapport à la semaine précédente.`,
          days: a,
        }
      },
    )
  }
  let Ae = (e) => {
      ;(Ee(e), setTimeout(() => Ee(null), 3500))
    },
    je = programs.filter((e) => !((m !== `all` && e.objective !== m) || (g !== `all` && !e.equipment.includes(g)) || (lvl !== `all` && levelLabel(e.level) !== lvl && levelLabel(e.level) !== `Pour toutes`))),
    Me = (e) => {
      ;(w(e), e.sessionsPerWeek === 4 ? E([1, 2, 4, 5]) : e.sessionsPerWeek >= 5 ? E([1, 2, 3, 5, 6]) : E([1, 3, 5]))
    },
    Ne = async () => {
      C &&
        (T.length === 0
          ? Ae(`Sélectionnez au moins un jour d’entraînement dans la semaine.`)
          : (await startProgram(C.id, T, D),
            w(null),
            b(null),
            confetti({
              particleCount: 65,
              spread: 60,
              origin: {
                y: 0.6,
              },
              colors: [`#EA3E8E`, `#781539`, `#FBCFE8`],
            }),
            Ae(`Programme "${C.title}" activé ! Vos séances ont été planifiées dans le Calendrier.`)))
    },
    Pe = (t, n, r) => {
      let a = routines.find((e) => e.id === n.routineId) || routines[0],
        o = n.finisherPresetId ? FINISHERS.find((e) => e.id === n.finisherPresetId) : void 0,
        s = (n.exercises || a?.exercises || []).map((e, t) => ({
          ...e,
          id: `prog_ex_${Date.now()}_${t}`,
          sets: e.sets.map((e, n) => ({
            ...e,
            id: `prog_set_${Date.now()}_${t}_${n}`,
            completed: false,
          })),
        }))
      ;(startWorkout({
        name: `${n.workoutTitle || n.label} (${t.title} · Sem. ${r})`,
        exercises: s,
        finisher: o ? `${o.name} — ${o.summary}` : a?.finisher,
        finisherPresetId: n.finisherPresetId,
        programId: t.id,
        programWeekNumber: r,
        programDayId: n.id,
        notes: `Programme ${t.title} — Semaine ${r}/${t.durationWeeks}`,
      }),
        onStartWorkoutSession && onStartWorkoutSession())
    },
    Fe = (e, t) => {
      ;(A(e), le(t), ye(ke(e, t, routines[0]?.id || `routine-glutes-focus`)), _e(1))
    },
    Ie = (e, t, n) => {
      ye((r) =>
        r.map((r) => {
          if (r.weekNumber !== e) return r
          let i = [...r.days]
          return (
            (i[t] = {
              ...i[t],
              ...n,
            }),
            {
              ...r,
              days: i,
            }
          )
        }),
      )
    },
    Le = (e) => {
      let t = ve.find((t) => t.weekNumber === e)
      t &&
        (ye((n) =>
          n.map((n) =>
            n.weekNumber === e
              ? n
              : {
                  ...n,
                  days: t.days.map((e, t) => ({
                    ...e,
                    id: `custom_w${n.weekNumber}_d${t + 1}`,
                  })),
                },
          ),
        ),
        Ae(`La structure de la Semaine ${e} a été dupliquée sur toutes les semaines !`))
    },
    Re = async () => {
      if (!k.trim()) {
        Ae(`Donnez un nom à votre programme personnalisé.`)
        return
      }
      let e = OBJECTIVES[ae],
        t = await createCustomProgram({
          title: k.trim(),
          subtitle: re.trim() || `${se} semaines · ${ce} séances/semaine`,
          objective: ae,
          objectiveLabel: e.label,
          durationWeeks: se,
          sessionsPerWeek: ce,
          level: ue,
          coverImage: `https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=80`,
          equipment: fe.length > 0 ? fe : [`Haltères`],
          description: me.trim() || `Programme sur-mesure conçu sur GlowUpLab (${se} semaines, objectif ${e.shortLabel}).`,
          coachTips: [`Suivez les recommandations de surcharge progressive (+2 kg ou +1 à 2 reps chaque semaine).`],
          weeks: ve,
        })
      ;(te(false), ne(``), ie(``), Ae(`Programme "${t.title}" créé avec succès !`))
    },
    ze = async () => {
      if (!Ce.trim()) return
      let e = await importProgramFromCode(Ce)
      e ? (Se(false), we(``), Ae(`Programme "${e.title}" importé avec succès !`)) : Ae(`Code ou JSON de programme invalide.`)
    },
    Be = measurements[0],
    Ve = activeProgram?.initialMeasurements || measurements[measurements.length - 1]
  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-200">
      {Te && (
        <div className="fixed top-4 right-4 left-4 sm:left-auto z-[90] max-w-md bg-[#1F0C17] text-white px-4 py-3 rounded-2xl shadow-2xl border border-pink-500/40 flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top-3">
          <CircleCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{Te}</span>
        </div>
      )}
      <div className="rounded-[32px] bg-gradient-to-br from-[#3B0726] via-[#590D3B] to-[#781539] p-6 sm:p-7 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-pink-200 text-[11px] font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-pink-300" /> Architecture & Surcharge Progressive
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight">Programmes d’Entraînement</h1>
            <p className="text-xs sm:text-sm text-pink-100/85 leading-relaxed">
              Choisissez un programme clé en main par objectif ou créez votre propre cycle sur-mesure avec planification automatique dans
              votre calendrier.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => te(true)}
              className="px-4 py-3 rounded-2xl bg-[#EA3E8E] hover:bg-pink-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-pink-600/30 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Créer mon programme</span>
            </button>
            <button
              type="button"
              onClick={() => Se(true)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Importer</span>
            </button>
          </div>
        </div>
      </div>
      {activeProgram && (
        <div className="rounded-[28px] bg-white border-2 border-[#EA3E8E]/40 p-5 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7F3] text-[#781539] text-[10px] font-extrabold uppercase tracking-wider">
                  Programme Actif
                </span>
                <span className="text-xs font-bold text-[#7A616F]">{activeProgram.objectiveLabel}</span>
              </div>
              <h2 className="text-lg font-extrabold text-[#1F0C17] font-display">{activeProgram.programTitle}</h2>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => Oe(true)}
                className="px-3.5 py-2 rounded-xl bg-[#FCE7F3] hover:bg-pink-200 text-[#781539] text-xs font-extrabold flex items-center gap-1.5 transition-colors"
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Écran de Bilan</span>
              </button>
              {onNavigateToPlanning && (
                <button
                  type="button"
                  onClick={onNavigateToPlanning}
                  className="px-3.5 py-2 rounded-xl bg-[#1F0C17] text-white text-xs font-bold flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-400" />
                  <span>Voir Planning</span>
                </button>
              )}
              <button
                type="button"
                onClick={stopActiveProgram}
                className="px-3 py-2 rounded-xl bg-neutral-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-700 text-xs font-semibold transition-colors"
              >
                Arrêter
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-extrabold">
              <span className="text-[#781539]">
                Semaine {activeProgram.currentWeek}/{activeProgram.durationWeeks} — {activeProgram.progressPercent}% complété
              </span>
              <span className="text-[#7A616F]">
                {activeProgram.completedSessionCount}/{activeProgram.totalSessionsPlanned} séances validées ·{' '}
                {activeProgram.totalVolumeKg.toLocaleString(`fr-FR`)} kg soulevés
              </span>
            </div>
            <div className="w-full h-3 bg-[#F4E9F0] rounded-full overflow-hidden border border-[#FBCFE8]">
              <div
                className="h-full bg-gradient-to-r from-[#781539] to-[#EA3E8E] transition-all duration-500"
                style={{
                  width: `${Math.max(4, activeProgram.progressPercent)}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
      {/* Classement par niveau (README) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none" role="group" aria-label="Filtrer par niveau">
        {[`all`, ...LEVELS].map((l) => (
          <button key={l} type="button" onClick={() => setLvl(l)} aria-pressed={lvl === l}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${lvl === l ? `bg-[#781539] text-white` : `bg-[#F4E9F0] text-[#7A616F] hover:text-[#1F0C17]`}`}>
            {l === `all` ? `Tous les niveaux` : l}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => h(`all`)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border ${m === `all` ? `bg-[#781539] text-white border-[#781539] shadow-sm` : `bg-white text-[#593E4C] border-[#FBCFE8] hover:bg-[#FCE7F3]/50`}`}
          >
            Tous les objectifs ({programs.length})
          </button>
          {Object.keys(OBJECTIVES).map((e) => {
            let t = OBJECTIVES[e]
            return (
              <button
                key={e}
                type="button"
                onClick={() => h(e)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all border ${m === e ? `bg-[#781539] text-white border-[#781539] shadow-sm` : `bg-white text-[#593E4C] border-[#FBCFE8] hover:bg-[#FCE7F3]/50`}`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          <span className="text-[11px] font-bold text-[#7A616F] flex items-center gap-1 pr-1 shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#781539]" /> Matériel :
          </span>
          <button
            type="button"
            onClick={() => v(`all`)}
            className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${g === `all` ? `bg-[#FCE7F3] text-[#781539] border-[#EA3E8E]` : `bg-white text-[#7A616F] border-[#E6D5DF]`}`}
          >
            Tout voir
          </button>
          {PROGRAM_EQUIPMENT.map((e) => (
            <button
              key={e}
              type="button"
              onClick={() => v(g === e ? `all` : e)}
              className={`px-3 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${g === e ? `bg-[#FCE7F3] text-[#781539] border-[#EA3E8E]` : `bg-white text-[#7A616F] border-[#E6D5DF] hover:border-[#EA3E8E]/50`}`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {je.map((e) => {
          let t = OBJECTIVES[e.objective] || OBJECTIVES.hypertrophy,
            n = activeProgram?.programId === e.id && !activeProgram.isCompleted,
            i = x[e.id] ?? 0
          return (
            <div
              key={e.id}
              className={`rounded-[30px] bg-white border transition-all overflow-hidden shadow-sm hover:shadow-md flex flex-col ${n ? `border-2 border-[#EA3E8E]` : `border-[#FBCFE8]`}`}
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#1F0C17]">
                <img
                  src={e.coverImage}
                  alt={e.title}
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E0513] via-[#1E0513]/40 to-transparent" />
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#781539] text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                    {t.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {n && <span className="px-2.5 py-1 rounded-full bg-[#EA3E8E] text-white text-[10px] font-extrabold">EN COURS</span>}
                    <button
                      type="button"
                      onClick={() => be(e)}
                      className="p-2 rounded-full bg-black/45 hover:bg-black/70 text-white backdrop-blur-xs transition-colors"
                      title="Partager ou exporter ce programme"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    {e.isCustom && (
                      <button
                        type="button"
                        onClick={() => deleteCustomProgram(e.id)}
                        className="p-2 rounded-full bg-black/45 hover:bg-rose-600 text-white backdrop-blur-xs transition-colors"
                        title="Supprimer ce programme personnalisé"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="text-lg sm:text-xl font-extrabold font-display leading-tight">{e.title}</h3>
                  <p className="text-xs text-pink-100/90 line-clamp-1 mt-0.5">{e.subtitle}</p>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3.5">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8]">
                      <span className="text-[10px] font-bold text-[#7A616F] uppercase block">Durée</span>
                      <span className="text-xs font-extrabold text-[#781539]">{e.durationWeeks} semaines</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8]">
                      <span className="text-[10px] font-bold text-[#7A616F] uppercase block">Fréquence</span>
                      <span className="text-xs font-extrabold text-[#781539]">{e.sessionsPerWeek} séances/sem</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8]">
                      <span className="text-[10px] font-bold text-[#7A616F] uppercase block">Niveau</span>
                      <span className="text-xs font-extrabold text-[#781539]">{levelLabel(e.level)}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#593E4C] leading-relaxed">{e.description}</p>
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#7A616F] block">Matériel requis :</span>
                    <div className="flex flex-wrap gap-1.5">
                      {e.equipment.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => v(g === e ? `all` : e)}
                          className={`px-2.5 py-1 rounded-xl text-[10px] font-bold border transition-all ${g === e ? `bg-[#781539] text-white border-[#781539]` : `bg-[#F4E9F0] text-[#781539] border-[#FBCFE8] hover:bg-[#FCE7F3]`}`}
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#FBCFE8] bg-[#FCFBF9] overflow-hidden">
                    <button
                      type="button"
                      onClick={() =>
                        S((t) => ({
                          ...t,
                          [e.id]: i === 1 ? 0 : 1,
                        }))
                      }
                      className="w-full px-3.5 py-2.5 flex items-center justify-between text-xs font-extrabold text-[#3B0726] hover:bg-[#FCE7F3]/40 transition-colors"
                    >
                      <span className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#EA3E8E]" />
                        <span>Aperçu semaine par semaine ({e.weeks.length} semaines)</span>
                      </span>
                      {i === 1 ? <ChevronUp className="w-4 h-4 text-[#781539]" /> : <ChevronDown className="w-4 h-4 text-[#781539]" />}
                    </button>
                    {i === 1 && e.weeks[0] && (
                      <div className="p-3 border-t border-[#FBCFE8] space-y-2 bg-white">
                        <p className="text-[11px] font-bold text-[#781539]">{e.weeks[0].title}</p>
                        <div className="space-y-1.5">
                          {e.weeks[0].days.map((t) => (
                            <div
                              key={t.id}
                              className={`px-2.5 py-1.5 rounded-xl text-[11px] flex items-center justify-between gap-2 ${t.isRest ? `bg-neutral-50 text-neutral-400` : `bg-[#FDF2F8] text-[#3B0726] font-semibold`}`}
                            >
                              <span className="truncate">{t.label}</span>
                              {!t.isRest && (
                                <button
                                  type="button"
                                  onClick={() => Pe(e, t, 1)}
                                  className="px-2 py-0.5 rounded-lg bg-[#781539] text-white text-[10px] font-bold shrink-0 hover:bg-[#EA3E8E]"
                                >
                                  Lancer
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => b(e)}
                    className="py-3 px-4 rounded-2xl bg-[#FCE7F3] hover:bg-pink-200 text-[#781539] font-extrabold text-xs transition-colors"
                  >
                    Détails & Semaines
                  </button>
                  <button
                    type="button"
                    onClick={() => Me(e)}
                    className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#781539] to-[#EA3E8E] hover:opacity-95 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-pink-500/20 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{n ? `Reconfigurer les jours` : `Démarrer ce programme`}</span>
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {y && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1F0C17]/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-[32px] border border-[#FBCFE8] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-150">
            <div className="relative h-44 bg-[#1F0C17] shrink-0">
              <img src={y.coverImage} alt={y.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E0513] via-[#1E0513]/40 to-transparent" />
              <button
                type="button"
                onClick={() => b(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/80"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="px-2.5 py-0.5 rounded-full bg-[#EA3E8E] text-[10px] font-extrabold uppercase">{y.objectiveLabel}</span>
                <h2 className="text-xl sm:text-2xl font-extrabold font-display mt-1">{y.title}</h2>
                <p className="text-xs text-pink-100">{y.subtitle}</p>
              </div>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {y.coachTips && y.coachTips.length > 0 && (
                <div className="p-4 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8] space-y-1.5">
                  <span className="text-xs font-extrabold text-[#781539] flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#EA3E8E]" /> Conseils Coach & Surcharge Progressive
                  </span>
                  {y.coachTips.map((e, t) => (
                    <p key={t} className="text-xs text-[#593E4C]">
                      • {e}
                    </p>
                  ))}
                </div>
              )}
              <div className="space-y-2.5">
                <h3 className="text-xs font-extrabold uppercase tracking-wider text-[#781539]">
                  Structure complète ({y.weeks.length} semaines)
                </h3>
                {y.weeks.map((e) => {
                  let t = (x[`detail_${y.id}`] ?? 1) === e.weekNumber
                  return (
                    <div key={e.weekNumber} className="rounded-2xl border border-[#FBCFE8] overflow-hidden bg-[#FCFBF9]">
                      <button
                        type="button"
                        onClick={() =>
                          S((n) => ({
                            ...n,
                            [`detail_${y.id}`]: t ? 0 : e.weekNumber,
                          }))
                        }
                        className="w-full px-4 py-3 text-left flex items-center justify-between bg-white hover:bg-[#FDF2F8] transition-colors"
                      >
                        <div>
                          <span className="text-xs font-extrabold text-[#1F0C17] block">{e.title}</span>
                          {e.focusNote && <span className="text-[11px] text-[#7A616F]">{e.focusNote}</span>}
                        </div>
                        {t ? <ChevronUp className="w-4 h-4 text-[#781539]" /> : <ChevronDown className="w-4 h-4 text-[#781539]" />}
                      </button>
                      {t && (
                        <div className="p-3.5 border-t border-[#FBCFE8] space-y-2 bg-[#FCFBF9]">
                          {e.days.map((t) => {
                            let n = t.finisherPresetId ? FINISHERS.find((e) => e.id === t.finisherPresetId) : void 0
                            return (
                              <div
                                key={t.id}
                                className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${t.isRest ? `bg-neutral-50 border-neutral-200/70 text-neutral-400` : `bg-white border-[#FBCFE8] text-[#1F0C17]`}`}
                              >
                                <div className="min-w-0">
                                  <p className="text-xs font-bold truncate">{t.label}</p>
                                  {!t.isRest && (
                                    <p className="text-[11px] text-[#7A616F] mt-0.5">
                                      {t.workoutTitle}
                                      {n ? ` · Finisher : ${n.name}` : ``}
                                    </p>
                                  )}
                                </div>
                                {!t.isRest && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      ;(b(null), Pe(y, t, e.weekNumber))
                                    }}
                                    className="px-3 py-1.5 rounded-xl bg-[#781539] hover:bg-[#EA3E8E] text-white text-xs font-bold shrink-0 flex items-center gap-1"
                                  >
                                    <Play className="w-3 h-3 fill-white" />
                                    <span>Démarrer</span>
                                  </button>
                                )}
                              </div>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="p-4 border-t border-[#FBCFE8] bg-[#FDF2F8] flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => b(null)}
                className="px-4 py-2.5 rounded-xl bg-white text-[#593E4C] text-xs font-bold border border-[#FBCFE8]"
              >
                Fermer
              </button>
              <button
                type="button"
                onClick={() => {
                  let e = y
                  ;(b(null), Me(e))
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#781539] to-[#EA3E8E] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Planifier dans mon Calendrier</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {C && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#1F0C17]/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-[32px] border border-[#FBCFE8] p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA3E8E] block">Planification Automatique</span>
                <h3 className="text-lg font-extrabold text-[#1F0C17] font-display">Démarrer « {C.title} »</h3>
                <p className="text-xs text-[#7A616F] mt-0.5">
                  Fréquence recommandée : <strong>{C.sessionsPerWeek} séances / semaine</strong> pendant {C.durationWeeks} semaines.
                </p>
              </div>
              <button type="button" onClick={() => w(null)} className="p-1.5 rounded-full bg-[#FDF2F8] text-[#781539]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-[#1F0C17] block">
                1. Sélectionnez vos jours d’entraînement préférés ({T.length} choisis)
              </label>
              <div className="grid grid-cols-7 gap-1.5">
                {WEEK_DAYS_SHORT.map((e) => {
                  let t = T.includes(e.dayOfWeek)
                  return (
                    <button
                      key={e.dayOfWeek}
                      type="button"
                      onClick={() => E((t) => (t.includes(e.dayOfWeek) ? t.filter((t) => t !== e.dayOfWeek) : [...t, e.dayOfWeek]))}
                      className={`py-3 rounded-2xl text-xs font-extrabold border transition-all ${t ? `bg-[#781539] text-white border-[#781539] shadow-sm` : `bg-[#FDF2F8] text-[#7A616F] border-[#FBCFE8]`}`}
                    >
                      {e.short}
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-[#7A616F]">
                Les jours non sélectionnés seront automatiquement configurés en jours de repos recommandés dans votre Planning.
              </p>
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-extrabold text-[#1F0C17] block">2. Date de début du programme</label>
              <input
                type="date"
                value={D}
                onChange={(e) => ee(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl border border-[#FBCFE8] bg-[#FDF2F8] text-xs font-bold text-[#1F0C17]"
              />
            </div>
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 space-y-1">
              <p className="font-extrabold flex items-center gap-1.5">
                <CircleCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                Synchronisation Calendrier & Accueil
              </p>
              <p>
                Vos séances et Finishers seront automatiquement injectés dans votre Planning Hebdomadaire et dans le widget « 3 prochains
                jours » de l’accueil.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => w(null)}
                className="px-4 py-3 rounded-2xl bg-neutral-100 text-neutral-700 text-xs font-bold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={Ne}
                className="flex-1 py-3 px-5 rounded-2xl bg-gradient-to-r from-[#781539] to-[#EA3E8E] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Activer & Planifier mes séances</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {O && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#1F0C17]/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-[32px] border border-[#FBCFE8] p-6 shadow-2xl max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#FBCFE8]">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EA3E8E] block">Constructeur Sur-Mesure</span>
                <h3 className="text-lg font-extrabold text-[#1F0C17] font-display">Créer mon Programme d’Entraînement</h3>
              </div>
              <button type="button" onClick={() => te(false)} className="p-2 rounded-full bg-[#FDF2F8] text-[#781539]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1F0C17]">Nom du programme *</label>
                  <input
                    type="text"
                    value={k}
                    onChange={(e) => ne(e.target.value)}
                    placeholder="ex: Mon Cycle Booty & Core"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] font-bold text-[#1F0C17]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#1F0C17]">Objectif principal</label>
                  <select
                    value={ae}
                    onChange={(e) => oe(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] font-bold text-[#1F0C17]"
                  >
                    {Object.keys(OBJECTIVES).map((e) => (
                      <option key={e} value={e}>
                        {OBJECTIVES[e].label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-[#1F0C17]">Durée (Semaines)</label>
                  <select
                    value={se}
                    onChange={(e) => Fe(Number(e.target.value), ce)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] font-bold text-[#1F0C17]"
                  >
                    {[4, 6, 8, 12].map((e) => (
                      <option key={e} value={e}>
                        {e} semaines
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#1F0C17]">Séances / semaine</label>
                  <select
                    value={ce}
                    onChange={(e) => Fe(se, Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] font-bold text-[#1F0C17]"
                  >
                    {[2, 3, 4, 5, 6].map((e) => (
                      <option key={e} value={e}>
                        {e} séances / sem
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#1F0C17]">Niveau</label>
                  <select
                    value={ue}
                    onChange={(e) => de(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-[#FBCFE8] bg-[#FDF2F8] font-bold text-[#1F0C17]"
                  >
                    <option value="Débutant">Débutant</option>
                    <option value="Intermédiaire">Intermédiaire</option>
                    <option value="Avancé">Avancé</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="font-bold text-[#1F0C17] block">Matériel requis</label>
                <div className="flex flex-wrap gap-1.5">
                  {PROGRAM_EQUIPMENT.map((e) => {
                    let t = fe.includes(e)
                    return (
                      <button
                        key={e}
                        type="button"
                        onClick={() => pe((t) => (t.includes(e) ? t.filter((t) => t !== e) : [...t, e]))}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all ${t ? `bg-[#781539] text-white border-[#781539]` : `bg-white text-[#7A616F] border-[#FBCFE8]`}`}
                      >
                        {e}
                      </button>
                    )
                  })}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-[#FCFBF9] border border-[#FBCFE8] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-extrabold text-[#1F0C17] uppercase tracking-wider">
                    Constructeur de Semaines (Semaine {ge}/{se})
                  </span>
                  <button
                    type="button"
                    onClick={() => Le(ge)}
                    className="px-3 py-1.5 rounded-xl bg-[#FCE7F3] hover:bg-pink-200 text-[#781539] font-extrabold text-[11px] flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Dupliquer la Semaine {ge} sur tout le programme</span>
                  </button>
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {ve.map((e) => (
                    <button
                      key={e.weekNumber}
                      type="button"
                      onClick={() => _e(e.weekNumber)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap ${ge === e.weekNumber ? `bg-[#781539] text-white` : `bg-white text-[#7A616F] border border-[#FBCFE8]`}`}
                    >
                      Sem. {e.weekNumber}
                    </button>
                  ))}
                </div>
                {(() => {
                  let e = ve.find((e) => e.weekNumber === ge)
                  return e ? (
                    <div className="space-y-2">
                      {e.days.map((e, t) => (
                        <div
                          key={e.id}
                          className="p-3 rounded-xl bg-white border border-[#FBCFE8] grid grid-cols-1 sm:grid-cols-12 gap-2 items-center"
                        >
                          <div className="sm:col-span-3 flex items-center justify-between sm:justify-start gap-2">
                            <span className="font-extrabold text-[#781539]">Jour {e.dayNumber}</span>
                            <button
                              type="button"
                              onClick={() =>
                                Ie(ge, t, {
                                  isRest: !e.isRest,
                                  label: e.isRest ? `Jour ${e.dayNumber} — Séance` : `Jour ${e.dayNumber} — Repos`,
                                })
                              }
                              className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${e.isRest ? `bg-neutral-200 text-neutral-700` : `bg-emerald-100 text-emerald-800`}`}
                            >
                              {e.isRest ? `Repos` : `Entraînement`}
                            </button>
                          </div>
                          {e.isRest ? (
                            <div className="sm:col-span-9 text-[11px] text-neutral-400 italic">
                              Journée de récupération musculaire ou mobilité douce
                            </div>
                          ) : (
                            <>
                              <div className="sm:col-span-5">
                                <select
                                  value={e.routineId || ``}
                                  onChange={(n) => {
                                    let r = routines.find((e) => e.id === n.target.value)
                                    Ie(ge, t, {
                                      routineId: n.target.value,
                                      workoutTitle: r ? r.name : e.workoutTitle,
                                      label: `Jour ${e.dayNumber} — ${r ? r.name : `Séance`}`,
                                    })
                                  }}
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#FBCFE8] bg-[#FDF2F8] text-[11px] font-bold text-[#1F0C17]"
                                >
                                  {routines.map((e) => (
                                    <option key={e.id} value={e.id}>
                                      {e.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="sm:col-span-4">
                                <select
                                  value={e.finisherPresetId || ``}
                                  onChange={(e) =>
                                    Ie(ge, t, {
                                      finisherPresetId: e.target.value || void 0,
                                    })
                                  }
                                  className="w-full px-2.5 py-1.5 rounded-lg border border-[#FBCFE8] bg-white text-[11px] font-semibold text-[#593E4C]"
                                >
                                  <option value="">Sans Finisher</option>
                                  {FINISHERS.map((e) => (
                                    <option key={e.id} value={e.id}>
                                      🔥 {e.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null
                })()}
              </div>
            </div>
            <div className="pt-3 border-t border-[#FBCFE8] flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => te(false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-bold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={Re}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#781539] to-[#EA3E8E] text-white text-xs font-extrabold flex items-center gap-1.5 shadow-md"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Enregistrer mon programme</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {j && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#1F0C17]/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-[32px] border border-[#FBCFE8] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#1F0C17] font-display">Partager « {j.title} »</h3>
              <button type="button" onClick={() => be(null)} className="p-1.5 rounded-full bg-[#FDF2F8] text-[#781539]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#7A616F]">
              Partagez ce code unique ou le fichier JSON avec une amie ou votre coach pour qu’elle puisse importer l’intégralité des{' '}
              {j.durationWeeks} semaines.
            </p>
            <div className="p-3 rounded-2xl bg-[#FDF2F8] border border-[#FBCFE8]">
              <p className="text-[10px] font-mono text-[#781539] break-all line-clamp-3">{exportProgramCode(j)}</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={async () => {
                  let e = exportProgramCode(j)
                  ;(navigator.clipboard && (await navigator.clipboard.writeText(e)), Ae(`Code de partage copié dans le presse-papiers !`))
                }}
                className="py-3 px-3 rounded-2xl bg-[#781539] text-white text-xs font-extrabold flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copier le Code</span>
              </button>
              <button
                type="button"
                onClick={async () => {
                  let e = JSON.stringify(j, null, 2)
                  ;(navigator.clipboard && (await navigator.clipboard.writeText(e)), Ae(`Structure JSON copiée dans le presse-papiers !`))
                }}
                className="py-3 px-3 rounded-2xl bg-[#FCE7F3] text-[#781539] text-xs font-extrabold flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copier JSON</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {xe && (
        <div className="fixed inset-0 z-[75] flex items-center justify-center bg-[#1F0C17]/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-[32px] border border-[#FBCFE8] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#1F0C17] font-display">Importer un Programme (Code ou JSON)</h3>
              <button type="button" onClick={() => Se(false)} className="p-1.5 rounded-full bg-[#FDF2F8] text-[#781539]">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              rows={4}
              value={Ce}
              onChange={(e) => we(e.target.value)}
              placeholder="Collez ici le code de partage GlowUpLab ou le JSON du programme..."
              className="w-full p-3.5 rounded-2xl border border-[#FBCFE8] bg-[#FDF2F8] text-xs font-mono text-[#1F0C17]"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => Se(false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 text-xs font-bold"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={ze}
                className="px-5 py-2.5 rounded-xl bg-[#781539] text-white text-xs font-extrabold flex items-center gap-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Importer dans mon catalogue</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {De && activeProgram && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-[#12030D]/85 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-lg bg-gradient-to-b from-[#1F0C17] to-[#160410] border border-pink-500/40 rounded-[32px] p-6 text-white shadow-2xl space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-400 block">Bilan Officiel GlowUpLab</span>
                  <h3 className="text-xl font-extrabold font-display">{activeProgram.programTitle}</h3>
                </div>
              </div>
              <button type="button" onClick={() => Oe(false)} className="p-2 rounded-full bg-white/10 text-pink-200">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/25">
                <Dumbbell className="w-4 h-4 text-pink-400 mx-auto mb-1" />
                <span className="text-lg font-black block">{activeProgram.totalVolumeKg.toLocaleString(`fr-FR`)} kg</span>
                <span className="text-[10px] text-pink-200/70 uppercase font-bold">Volume Total Soulevé</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/25">
                <CircleCheck className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-lg font-black block">
                  {activeProgram.completedSessionCount} / {activeProgram.totalSessionsPlanned}
                </span>
                <span className="text-[10px] text-pink-200/70 uppercase font-bold">Séances Validées</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white/5 border border-pink-500/25">
                <Award className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                <span className="text-lg font-black block">{activeProgram.progressPercent}%</span>
                <span className="text-[10px] text-pink-200/70 uppercase font-bold">Achèvement Global</span>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" /> Évolution des Mensurations (Jour 1 → Aujourd’hui)
                </span>
              </div>
              {Ve && Be ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                  {[
                    {
                      label: `Poids`,
                      start: Ve.weight,
                      end: Be.weight,
                      unit: `kg`,
                    },
                    {
                      label: `Taille`,
                      start: Ve.waist,
                      end: Be.waist,
                      unit: `cm`,
                    },
                    {
                      label: `Hanches / Fessiers`,
                      start: Ve.hips,
                      end: Be.hips,
                      unit: `cm`,
                    },
                    {
                      label: `Cuisses`,
                      start: Ve.thighs,
                      end: Be.thighs,
                      unit: `cm`,
                    },
                  ].map((e) => {
                    let t = e.start !== void 0 && e.end !== void 0 ? Number((e.end - e.start).toFixed(1)) : null
                    return (
                      <div key={e.label} className="p-2.5 rounded-xl bg-black/30 border border-white/10">
                        <span className="text-[10px] text-pink-200/70 font-bold block">{e.label}</span>
                        <span className="text-xs font-extrabold text-white block mt-0.5">
                          {e.end === void 0 ? `—` : `${e.end} ${e.unit}`}
                        </span>
                        {t !== null && (
                          <span
                            className={`text-[10px] font-bold block ${t > 0 ? `text-emerald-400` : t < 0 ? `text-pink-400` : `text-white/50`}`}
                          >
                            {t > 0 ? `+${t}` : t} {e.unit}
                          </span>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-xs text-pink-200/75">
                  Ajoutez vos mensurations dans l’onglet « Progrès » pour visualiser automatiquement votre comparatif Jour 1 vs Dernier
                  jour.
                </p>
              )}
            </div>
            <div className="p-3.5 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-between text-xs">
              <span className="font-bold text-pink-100 flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-400" />
                Finishers relevés en fin de séance :
              </span>
              <span className="font-extrabold text-white">
                {workouts.filter((e) => e.finisherLog || e.finisher).length} Finishers validés
              </span>
            </div>
            <button
              type="button"
              onClick={() => Oe(false)}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#EA3E8E] to-[#781539] text-white font-extrabold text-xs"
            >
              Continuer ma progression GlowUpLab
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
