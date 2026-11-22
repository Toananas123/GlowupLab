// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useEffect, useRef } from 'react'
import { FINISHERS } from '../../data/circuits'
import { FINISHER_RECORDS_KEY, playFinisherBeep } from './helpers'
import {
  Award,
  ChevronRight,
  CircleCheck,
  Flame,
  Pause,
  Play,
  RotateCcw,
  SkipForward,
  Sparkles,
  Timer,
  Volume2,
  VolumeX,
  X,
  Zap,
} from 'lucide-react'
export const FinisherTimerSheet = ({
  isOpen,
  initialPresetId,
  isHotSuggestion = false,
  lastExerciseName,
  onClose,
  onCompleteFinisher,
  onSkipAndFinishWorkout,
}) => {
  let [s, c] = useState(`abs`),
    [l, u] = useState(() => (initialPresetId && FINISHERS.find((e) => e.id === initialPresetId)) || null),
    [d, f] = useState(true),
    [p, m] = useState(false),
    [h, g] = useState(false),
    [v, y] = useState(0),
    [b, x] = useState(0),
    [S, C] = useState(0),
    [w, T] = useState(0),
    [E, D] = useState(``),
    [ee, O] = useState(0),
    [te, k] = useState(null),
    [ne, re] = useState(() => {
      try {
        let e = localStorage.getItem(FINISHER_RECORDS_KEY)
        return e ? JSON.parse(e) : {}
      } catch {
        return {}
      }
    }),
    ie = useRef(null),
    ae = useRef(-1),
    oe = useRef(-1)
  useEffect(() => {
    if (isOpen) {
      if (initialPresetId) {
        let e = FINISHERS.find((e) => e.id === initialPresetId) || null
        ;(u(e), e && (c(e.category), D(e.selectableExercises?.[0] || lastExerciseName || `Squats poids du corps`)))
      } else u(null)
      se()
    }
  }, [isOpen, initialPresetId, lastExerciseName])
  let se = () => {
      ;(m(false), g(false), y(0), x(0), C(0), T(0), O(0), k(null), (ie.current = null), (ae.current = -1), (oe.current = -1))
    },
    A = (e) => {
      ;(u(e), D(e.selectableExercises?.[0] || lastExerciseName || `Glute Bridges au sol`), se())
    }
  if (
    (useEffect(() => {
      if (!isOpen || !p || !l || h) {
        ie.current = null
        return
      }
      ie.current = Date.now()
      let t = setInterval(() => {
        let e = Date.now(),
          t = ie.current || e,
          n = Math.floor((e - t) / 1e3)
        if (!(n < 1)) {
          if (((ie.current = t + n * 1e3), te !== null && te > 0)) {
            let e = Math.max(0, te - n)
            ;(k(e === 0 ? null : e), e === 0 && d && playFinisherBeep(`effort`))
          }
          if (l.executionMode === `interval` && l.intervals) {
            let e = l.intervals,
              t = e[b]
            if (!t) return
            let r = S + n,
              i = v + n
            y(i)
            let a = t.durationSeconds - r
            if ((a > 0 && a <= 3 && oe.current !== a && ((oe.current = a), d && playFinisherBeep(`countdown`)), r >= t.durationSeconds)) {
              let t = b + 1
              if (((oe.current = -1), t >= e.length)) (m(false), g(true), d && playFinisherBeep(`complete`))
              else {
                ;(x(t), C(0))
                let n = e[t]
                d && playFinisherBeep(n.type === `effort` ? `effort` : `rest`)
              }
            } else C(r)
          } else if (l.executionMode === `countdown`) {
            let e = v + n,
              t = l.totalDurationSeconds - e
            if (l.phaseAlerts)
              for (let t of l.phaseAlerts)
                t.atElapsedSeconds > 0 &&
                  e >= t.atElapsedSeconds &&
                  ae.current < t.atElapsedSeconds &&
                  ((ae.current = t.atElapsedSeconds), d && playFinisherBeep(`transition`))
            ;(t > 0 && t <= 3 && oe.current !== t && ((oe.current = t), d && playFinisherBeep(`countdown`)),
              e >= l.totalDurationSeconds ? (y(l.totalDurationSeconds), m(false), g(true), d && playFinisherBeep(`complete`)) : y(e))
          } else y((e) => e + n)
        }
      }, 250)
      return () => clearInterval(t)
    }, [isOpen, p, h, l, b, S, v, d, te]),
    !isOpen)
  )
    return null
  let ce = (e) => {
      let t = Math.max(0, Math.round(e)),
        n = Math.floor(t / 60),
        r = t % 60
      return `${n}:${r < 10 ? `0` : ``}${r}`
    },
    le = () => {
      l && (!p && v === 0 && d && playFinisherBeep(`effort`), m((e) => !e))
    },
    ue = (e) => {
      if (!l) return
      !p && !h && m(true)
      let t = l.targetReps || 100,
        n = Math.min(t, w + e)
      ;(T(n), n >= t ? (m(false), g(true), d && playFinisherBeep(`complete`)) : d && playFinisherBeep(`countdown`))
    },
    de = () => {
      if (!l) return
      !p && v === 0 && m(true)
      let e = ee + 1
      ;(O(e),
        e === 1
          ? (k(l.restBetweenSetsSeconds || 60), d && playFinisherBeep(`rest`))
          : e >= (l.targetSets || 2) && (k(null), m(false), g(true), d && playFinisherBeep(`complete`)))
    },
    fe = () => {
      if (!l) return
      let e = Math.max(1, v || l.totalDurationSeconds),
        t = ne[l.id],
        n = l.executionMode === `stopwatch` && (!t || e < t)
      if (n) {
        let t = {
          ...ne,
          [l.id]: e,
        }
        re(t)
        try {
          localStorage.setItem(FINISHER_RECORDS_KEY, JSON.stringify(t))
        } catch {}
      }
      onCompleteFinisher(
        {
          presetId: l.id,
          name: l.name,
          category: l.category,
          executionMode: l.executionMode,
          completedAt: new Date().toISOString(),
          durationSeconds: e,
          repsCompleted: l.targetReps ? Math.max(w, l.targetReps) : void 0,
          selectedExercise: l.selectableExercises ? E : lastExerciseName,
          isNewRecord: n,
        },
        l.id === `finisher-challenge-100-reps` ? `${l.name} (${E} — ${ce(e)})` : `${l.name} (${ce(e)} validé)`,
      )
    },
    pe = FINISHERS.filter((e) => e.category === s),
    me = l?.executionMode === `interval` && l.intervals ? l.intervals[b] : null,
    he = l?.executionMode === `interval` && l.intervals ? l.intervals[b + 1] : null,
    ge =
      l?.executionMode === `countdown` && l.phaseAlerts
        ? [...l.phaseAlerts].reverse().find((e) => v >= e.atElapsedSeconds) || l.phaseAlerts[0]
        : null,
    _e = l?.executionMode === `interval` ? me?.type === `effort` : te === null
  return (
    <div className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-[#12030D]/90 backdrop-blur-md p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-[#1F0718] border border-pink-500/30 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden text-white max-h-[92vh] flex flex-col">
        <div className="px-5 py-4 border-b border-pink-500/20 flex items-center justify-between bg-gradient-to-r from-[#2D0A22] to-[#1F0718]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400 block">
                {isHotSuggestion && !l ? `Suggestion Dynamique à Chaud` : `Module Finisher Interactif`}
              </span>
              <h3 className="text-base font-extrabold text-white leading-tight">{l ? l.name : `Dernière ligne droite !`}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {l && (
              <button
                type="button"
                onClick={() => f((e) => !e)}
                className={`p-2 rounded-xl border transition-colors ${d ? `bg-pink-500/20 border-pink-500/40 text-pink-300` : `bg-white/5 border-white/10 text-pink-200/40`}`}
                title={d ? `Bips sonores activés (compatible Spotify)` : `Son coupé`}
              >
                {d ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-pink-200/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          {l ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={() => {
                    ;(se(), u(null))
                  }}
                  className="text-pink-300 hover:text-white font-bold underline underline-offset-4"
                >
                  ← Changer de Finisher
                </button>
                <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-pink-200/80 font-semibold">
                  {l.categoryLabel} · {l.durationLabel}
                </span>
              </div>
              <div
                className={`rounded-3xl p-6 border-2 transition-all duration-300 text-center relative overflow-hidden ${h ? `bg-gradient-to-br from-emerald-600/30 to-teal-900/40 border-emerald-400 shadow-lg shadow-emerald-500/20` : p ? (_e ? `bg-gradient-to-br from-emerald-600/25 via-emerald-900/30 to-[#1F0718] border-emerald-400 shadow-lg shadow-emerald-500/20` : `bg-gradient-to-br from-amber-500/25 via-amber-900/30 to-[#1F0718] border-amber-400 shadow-lg shadow-amber-500/20`) : `bg-gradient-to-br from-pink-600/15 to-[#160410] border-pink-500/30`}`}
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/20 bg-black/30">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${h ? `bg-emerald-400` : p ? (_e ? `bg-emerald-400 animate-ping` : `bg-amber-400 animate-pulse`) : `bg-pink-400`}`}
                  />
                  {h
                    ? `FINISHER VALIDÉ !`
                    : l.executionMode === `interval` && me
                      ? me.type === `effort`
                        ? `EFFORT INTENSE (GO !)`
                        : `RÉCUPÉRATION ACTIVE (REPOS)`
                      : te === null
                        ? l.executionMode === `countdown`
                          ? `MAINTIEN CONTINU SANS PAUSE`
                          : `CHRONO TIME CAP EN COURS`
                        : `REPOS ENTRE LES 2 SÉRIES (60S)`}
                </div>
                <h4 className="text-base sm:text-lg font-extrabold text-white mb-1">
                  {l.executionMode === `interval` && me
                    ? me.label
                    : l.executionMode === `countdown` && ge
                      ? ge.label
                      : l.id === `finisher-challenge-100-reps`
                        ? `Objectif : ${w} / ${l.targetReps || 100} répétitions`
                        : `Drop-Set sur ${lastExerciseName || `votre dernier exercice`}`}
                </h4>
                <p className="text-xs text-pink-100/85 max-w-md mx-auto mb-4 min-h-[2rem]">
                  {l.executionMode === `interval` && me ? me.cue : l.executionMode === `countdown` && ge ? ge.cue : l.summary}
                </p>
                <div className="font-mono text-6xl sm:text-7xl font-black tracking-tight text-white my-2 select-none">
                  {l.executionMode === `interval` && me
                    ? ce(me.durationSeconds - S)
                    : l.executionMode === `countdown`
                      ? ce(l.totalDurationSeconds - v)
                      : ce(te === null ? v : te)}
                </div>
                {l.executionMode !== `stopwatch` && (
                  <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mt-4 border border-white/10">
                    <div
                      className={`h-full transition-all duration-300 ${_e ? `bg-emerald-400` : `bg-amber-400`}`}
                      style={{
                        width: `${Math.min(100, Math.round((v / Math.max(1, l.totalDurationSeconds)) * 100))}%`,
                      }}
                    />
                  </div>
                )}
                {l.executionMode === `interval` && he && !h && (
                  <div className="mt-3 text-[11px] font-bold text-pink-200/80 flex items-center justify-center gap-1.5">
                    <span>Suivant :</span>
                    <span className={he.type === `effort` ? `text-emerald-300` : `text-amber-300`}>
                      {he.label} ({he.durationSeconds}s)
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-center gap-3 mt-5">
                  <button
                    type="button"
                    onClick={le}
                    className={`px-6 py-3 rounded-2xl font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg ${p ? `bg-amber-500 hover:bg-amber-600 text-slate-950` : `bg-pink-600 hover:bg-pink-500 text-white shadow-pink-600/30`}`}
                  >
                    {p ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" /> Pause
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" /> {v > 0 ? `Reprendre` : `Lancer le Chrono`}
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={se}
                    className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 text-pink-200 transition-colors"
                    title="Réinitialiser"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {l.id === `finisher-challenge-100-reps` && (
                <div className="p-4 rounded-2xl bg-white/5 border border-pink-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-pink-300 uppercase tracking-wider">Exercice choisi pour les 100 reps</label>
                    {ne[l.id] && (
                      <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Record : {ce(ne[l.id])}
                      </span>
                    )}
                  </div>
                  <select
                    value={E}
                    onChange={(e) => D(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#12030D] border border-pink-500/30 text-sm font-bold text-white focus:outline-none focus:border-pink-400"
                  >
                    {(l.selectableExercises || []).map((e) => (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-xs font-extrabold">
                      <span className="text-pink-200">Progression du Challenge</span>
                      <span className="text-emerald-400">{w} / 100 reps</span>
                    </div>
                    <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-pink-500 to-emerald-400 transition-all duration-200"
                        style={{
                          width: `${Math.min(100, w)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 pt-1">
                    {[5, 10, 20, 25].map((e) => (
                      <button
                        key={e}
                        type="button"
                        onClick={() => ue(e)}
                        className="py-2.5 rounded-xl bg-pink-500/20 hover:bg-pink-500/35 border border-pink-500/40 text-xs font-extrabold text-pink-200 transition-all active:scale-95"
                      >
                        +{e} reps
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {l.id === `finisher-drop-set-mecanique` && (
                <div className="p-4 rounded-2xl bg-white/5 border border-pink-500/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                      Suivi des 2 Séries à l’échec (-30% de charge)
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">{ee} / 2 séries validées</span>
                  </div>
                  <button
                    type="button"
                    onClick={de}
                    disabled={ee >= 2}
                    className="w-full py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 disabled:opacity-50 border border-emerald-400/40 text-emerald-200 text-xs font-extrabold flex items-center justify-center gap-2 transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    {ee === 0
                      ? `Série 1 à l’échec terminée → Lancer les 60s de repos`
                      : ee === 1
                        ? `Valider la Série 2 à l’échec total`
                        : `Les 2 séries Drop-Set sont complétées !`}
                  </button>
                </div>
              )}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-[11px] font-bold uppercase tracking-wider text-pink-300 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5" /> Protocole d’exécution
                </p>
                <ul className="space-y-1.5">
                  {l.instructions.map((e, t) => (
                    <li key={t} className="text-xs text-pink-100/80 flex items-start gap-2">
                      <span className="text-pink-400 font-bold">•</span>
                      <span>{e}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={fe}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                >
                  <CircleCheck className="w-5 h-5" />
                  Terminé — Valider ce Finisher ({ce(v || l.totalDurationSeconds)})
                </button>
                {onSkipAndFinishWorkout && (
                  <button
                    type="button"
                    onClick={onSkipAndFinishWorkout}
                    className="py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-pink-200/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <SkipForward className="w-4 h-4" />
                    Passer
                  </button>
                )}
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-pink-600/25 via-rose-500/15 to-amber-500/10 border border-pink-500/30">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-extrabold text-white">
                      Séance presque terminée ! Envie de tout donner sur 5 minutes ? Choisis ton Finisher
                    </p>
                    <p className="text-xs text-pink-200/80 mt-1">
                      Un bloc haute intensité de 3 à 8 minutes avec chronomètre intelligent et signaux sonores compatibles avec votre
                      musique Spotify.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  {
                    id: `abs`,
                    label: `Abdos & Gainage`,
                  },
                  {
                    id: `cardio`,
                    label: `Cardio & Brûle-graisse`,
                  },
                  {
                    id: `pump`,
                    label: `Pump & Congestion`,
                  },
                ].map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => c(e.id)}
                    className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all text-center ${s === e.id ? `bg-pink-600 border-pink-400 text-white shadow-lg shadow-pink-600/25` : `bg-white/5 border-white/10 text-pink-200/70 hover:bg-white/10`}`}
                  >
                    {e.label}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {pe.map((e) => {
                  let t = ne[e.id]
                  return (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => A(e)}
                      className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-pink-500/15 border border-pink-500/20 hover:border-pink-400/50 transition-all group"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-extrabold text-white group-hover:text-pink-300 transition-colors">{e.name}</span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                              {e.durationLabel}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/10 text-pink-100/80">
                              {e.executionMode === `interval`
                                ? `Chrono Intervalle`
                                : e.executionMode === `countdown`
                                  ? `Compte à rebours`
                                  : `Chrono + Compteur`}
                            </span>
                          </div>
                          <p className="text-xs text-pink-200/75 leading-relaxed">{e.summary}</p>
                          {t && (
                            <p className="text-[11px] font-bold text-amber-300 flex items-center gap-1 pt-1">
                              <Award className="w-3.5 h-3.5" /> Record perso : {ce(t)}
                            </p>
                          )}
                        </div>
                        <div className="w-9 h-9 rounded-xl bg-pink-500/20 group-hover:bg-pink-500 text-pink-300 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
              {onSkipAndFinishWorkout && (
                <button
                  type="button"
                  onClick={onSkipAndFinishWorkout}
                  className="w-full py-3.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/15 text-pink-200/80 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <SkipForward className="w-4 h-4" />
                  Passer et terminer la séance
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
