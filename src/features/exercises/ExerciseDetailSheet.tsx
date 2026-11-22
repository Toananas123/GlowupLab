// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ExerciseIllustration } from './ExerciseIllustration'
import { GearList } from './GearList'
import { Icon, categoryIcon } from '../../components/Icon'
import { equipmentMeta } from './meta'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronLeft, Plus, Star } from 'lucide-react'
export const ExerciseDetailSheet = ({ exercise, isOpen, onClose, onOpenLegPressGuide, onAddToWorkout }) => {
  let { isFavorite, toggleFavorite, getPreviousPerformance, exerciseSettings, updateExerciseSettings } = useWorkout(),
    [settingsNote, setSettingsNote] = useState(``),
    [saved, setSaved] = useState(false),
    scrollRef = useRef(null)
  // Amélioration : fermeture au clavier (Échap).
  useEffect(() => {
    if (!isOpen) return
    const onKey = (ev) => ev.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])
  if (
    (useEffect(() => {
      ;(exercise && exerciseSettings[exercise.id] ? setSettingsNote(exerciseSettings[exercise.id]) : setSettingsNote(``),
        setSaved(false),
        isOpen && scrollRef.current && (scrollRef.current.scrollTop = 0))
    }, [exercise, exerciseSettings, isOpen]),
    !isOpen || !exercise)
  )
    return null
  let favorite = isFavorite(exercise.id),
    previous = getPreviousPerformance(exercise.id),
    equipment = equipmentMeta(exercise.equipment),
    saveSettings = async () => {
      exercise && (await updateExerciseSettings(exercise.id, settingsNote.trim()), setSaved(true), setTimeout(() => setSaved(false), 2e3))
    },
    mistakes = [...(exercise.avoidTips || []), ...(exercise.commonMistakes || [])]
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-[#1F0C17]/45 backdrop-blur-xs p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-lg max-h-[90vh] rounded-t-[36px] sm:rounded-[36px] bg-[#F4E9F0] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 pt-5 pb-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white text-[#1F0C17] flex items-center justify-center shadow-2xs active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="px-3.5 py-1.5 rounded-full bg-white shadow-2xs flex items-center gap-2 text-xs font-semibold text-[#1F0C17]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA3E8E]" />
            <span>
              {exercise.primaryMuscle} · {equipment.label}
            </span>
          </div>
          <button
            type="button"
            onClick={() => toggleFavorite(exercise.id)}
            className="w-10 h-10 rounded-full bg-white text-[#781539] flex items-center justify-center shadow-2xs active:scale-95 transition-transform"
            aria-label="Favori"
          >
            <Star className={`w-4 h-4 ${favorite ? `fill-[#EA3E8E] text-[#EA3E8E]` : ``}`} />
          </button>
        </div>
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
          <div className="text-center space-y-3 py-2">
            <div className="w-20 h-20 rounded-[26px] bg-white shadow-md mx-auto flex items-center justify-center text-[#781539]">
              <Icon name={categoryIcon(exercise.category)} className="w-10 h-10 text-[#EA3E8E]" />
            </div>
            <div className="space-y-1 max-w-sm mx-auto">
              <h2 className="font-display font-bold text-2xl text-[#1F0C17] leading-tight">{exercise.name}</h2>
              <p className="text-xs text-[#7A616F] leading-relaxed">{exercise.description}</p>
            </div>
          </div>
          <ExerciseIllustration exercise={exercise} variant="section" />
          <div className="rounded-[28px] bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-[#1F0C17]">Repères & Charge</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F4E9F0] text-[11px] font-semibold text-[#7A616F]">Objectif</span>
            </div>
            <div className="divide-y divide-[#F4E9F0] text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#7A616F]">Dernière charge validée</span>
                <span className="font-mono font-bold text-[#1F0C17] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#EA3E8E]" />
                  {previous ? `${previous.weight} kg (${previous.reps} reps)` : `Non renseignée`}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#7A616F]">Séries × Répétitions</span>
                <span className="font-mono font-bold text-[#1F0C17]">
                  {exercise.defaultSets} × {exercise.defaultReps}
                </span>
              </div>
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-[#7A616F]">Temps de repos conseillé</span>
                <span className="font-mono font-bold text-[#1F0C17]">{exercise.defaultRestSeconds} sec</span>
              </div>
            </div>
            <div className="pt-2 flex gap-2">
              <input
                type="text"
                value={settingsNote}
                onChange={(e) => setSettingsNote(e.target.value)}
                placeholder="Mes réglages (ex: siège 4, poulie basse...)"
                className="flex-1 px-3.5 py-2.5 text-xs rounded-2xl bg-[#F4E9F0] text-[#1F0C17] placeholder:text-[#8C6D7E] focus:outline-hidden"
              />
              <button
                type="button"
                onClick={saveSettings}
                className="px-4 py-2.5 rounded-2xl bg-[#781539] text-white font-semibold text-xs shrink-0 flex items-center gap-1"
              >
                {saved ? <Check className="w-3.5 h-3.5" /> : null}
                <span>{saved ? `OK` : `Noter`}</span>
              </button>
            </div>
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-[#1F0C17]">Exécution</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-[#F4E9F0] text-[11px] font-semibold text-[#781539]">Posture</span>
            </div>
            <div className="divide-y divide-[#F4E9F0] text-xs">
              {exercise.startingPosition && (
                <div className="py-2.5 space-y-0.5">
                  <div className="flex items-center justify-between font-semibold text-[#1F0C17]">
                    <span>Position de départ</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[#7A616F] leading-relaxed">{exercise.startingPosition}</p>
                </div>
              )}
              {exercise.steps.map((e, t) => (
                <div key={t} className="py-2.5 flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-[#1F0C17] block">Étape {t + 1}</span>
                    <p className="text-[#7A616F] leading-relaxed">{e}</p>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                </div>
              ))}
            </div>
          </div>
          {mistakes.length > 0 && (
            <div className="rounded-[28px] bg-white p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-[#1F0C17]">Erreurs à éviter</h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F5] text-[11px] font-semibold text-[#EA3E8E]">Attention</span>
              </div>
              <div className="divide-y divide-[#F4E9F0] text-xs">
                {mistakes.map((e, t) => (
                  <div key={t} className="py-2.5 flex items-start justify-between gap-3">
                    <p className="text-[#1F0C17] leading-relaxed">{e}</p>
                    <span className="w-2 h-2 rounded-full bg-[#EA3E8E] shrink-0 mt-1.5" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <GearList exercise={exercise} variant="detail" />
          {exercise.hasFootPlacementGuide && onOpenLegPressGuide && (
            <button
              type="button"
              onClick={onOpenLegPressGuide}
              className="w-full p-4 rounded-[24px] bg-white text-[#781539] font-bold text-xs flex items-center justify-between shadow-2xs"
            >
              <span>Voir le guide des 7 positions de pieds à la presse</span>
              <span>→</span>
            </button>
          )}
        </div>
        {onAddToWorkout && (
          <div className="p-4 bg-white border-t border-[#F1E4EC] shrink-0">
            <button
              type="button"
              onClick={() => {
                ;(onAddToWorkout(exercise), onClose())
              }}
              className="w-full py-3.5 px-5 rounded-full bg-[#781539] hover:bg-[#3B0726] text-white font-bold text-xs flex items-center justify-center gap-2 min-h-[48px]"
            >
              <Plus className="w-4 h-4" />
              <span>Ajouter à ma séance</span>
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
