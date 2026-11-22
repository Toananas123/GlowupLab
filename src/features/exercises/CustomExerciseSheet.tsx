// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from '../../components/Icon'
import { MUSCLE_GROUPS } from '../../data/exercises'
import { generateExerciseSheet } from './meta'
import { useWorkout } from '../../store/WorkoutStore'
import { Check, ChevronDown, ChevronUp, Plus, Sparkles, X } from 'lucide-react'
export const CustomExerciseSheet = ({ isOpen, onClose, initialName = ``, onExerciseCreated }) => {
  let { addCustomExercise } = useWorkout(),
    [name, setName] = useState(initialName),
    [muscle, setMuscle] = useState(`fessiers`),
    [equipment, setEquipment] = useState(`dumbbell`),
    [description, setDescription] = useState(``),
    [tip, setTip] = useState(``),
    [sets, setSets] = useState(3),
    [reps, setReps] = useState(`10-12`),
    [rest, setRest] = useState(75),
    [showPreview, setShowPreview] = useState(true),
    [saving, setSaving] = useState(false),
    [error, setError] = useState(``),
    [success, setSuccess] = useState(``)
  if (
    (useEffect(() => {
      isOpen && initialName && setName(initialName)
    }, [isOpen, initialName]),
    !isOpen)
  )
    return null
  let muscleGroup = MUSCLE_GROUPS.find((e) => e.id === muscle) || MUSCLE_GROUPS[0],
    sheet = generateExerciseSheet(name, muscle, equipment, description, tip)
  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#3B0726]/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-[32px] bg-[#FCFBF9] p-6 shadow-2xl border border-[#E6E1D8] my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-[#F5B8EE]">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#781539]">
              <Icon name="dumbbell" className="w-5 h-5" />
            </span>
            <div>
              <h2 className="font-bold text-[#1F0C17] text-base font-display">Créer mon propre exercice</h2>
              <p className="text-[11px] text-[#7A616F]">Génère automatiquement une fiche complète comme les autres exos</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-[#6E6A63] hover:text-[#3B0726] rounded-full hover:bg-[#F2EFE9]">
            <X className="w-4 h-4" />
          </button>
        </div>
        <form
          onSubmit={async (e) => {
            if ((e.preventDefault(), name.trim())) {
              setSaving(true)
              try {
                let e = generateExerciseSheet(name, muscle, equipment, description, tip),
                  n = error.trim()
                    ? error
                        .split(
                          `
`,
                        )
                        .map((e) => e.trim())
                        .filter(Boolean)
                    : e.steps,
                  c = {
                    name: name.trim(),
                    category: muscleGroup.category,
                    specificMuscle: muscle,
                    primaryMuscle: muscleGroup.label.replace(/^\d+\.\s*/, ``),
                    equipment,
                    description: e.description,
                    startingPosition: success.trim() || e.startingPosition,
                    steps: n,
                    breathing: e.breathing,
                    formTips: e.formTips,
                    commonMistakes: e.commonMistakes,
                    avoidTips: e.avoidTips,
                    machineSetup: e.machineSetup,
                    defaultSets: Number(sets),
                    defaultReps: reps,
                    defaultRestSeconds: Number(rest),
                  },
                  u = await addCustomExercise(c)
                ;(onExerciseCreated &&
                  onExerciseCreated(
                    u || {
                      ...c,
                      id: `custom_${Date.now()}`,
                      isCustom: true,
                    },
                  ),
                  setName(``),
                  setDescription(``),
                  setTip(``),
                  setError(``),
                  setSuccess(``),
                  onClose())
              } catch (e) {
                console.error(`Error creating custom exercise`, e)
              } finally {
                setSaving(false)
              }
            }
          }}
          className="mt-4 space-y-3.5 text-xs text-[#1F0C17] overflow-y-auto pr-1 flex-1"
        >
          <div>
            <label className="block font-bold text-[#781539] uppercase text-[10px] mb-1">Nom de ton exercice *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Tirage horizontal prise large, Développé incliné, Hip Thrust..."
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] focus:outline-hidden focus:border-[#781539] text-xs font-semibold text-[#1F0C17]"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#781539] uppercase text-[10px] mb-1">Zone / Muscle ciblé *</label>
              <select
                value={muscle}
                onChange={(e) => setMuscle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] focus:outline-hidden focus:border-[#781539] text-xs font-semibold text-[#1F0C17]"
              >
                <optgroup label="Bas du corps">
                  <option value="fessiers">Fessiers</option>
                  <option value="quadriceps">Quadriceps</option>
                  <option value="ischios">Ischios</option>
                  <option value="adducteurs">Adducteurs</option>
                </optgroup>
                <optgroup label="Dos (Ordre 1-2-3-4)">
                  <option value="milieu-dos">1. Milieu du dos (Rhomboïdes)</option>
                  <option value="grand-dorsal">2. Grand dorsal</option>
                  <option value="trapezes-arriere-epaule">3. Arrière d’épaule / Trapèzes</option>
                  <option value="lombaires">4. Lombaires (Back Extension)</option>
                </optgroup>
                <optgroup label="Pecs & Buste">
                  <option value="pecs-haut">Haut des Pecs & Galbe</option>
                  <option value="pecs-global">Pectoraux Global</option>
                  <option value="pecs-isolation">Isolation Pecs (Fly / Pec-Deck)</option>
                </optgroup>
                <optgroup label="Épaules & Bras">
                  <option value="epaule-avant">Épaule (avant)</option>
                  <option value="epaule-cote">Épaule (côté)</option>
                  <option value="epaule-arriere">Épaule (arrière)</option>
                  <option value="biceps">Biceps</option>
                  <option value="triceps">Triceps</option>
                </optgroup>
                <optgroup label="Tronc & Cardio">
                  <option value="abdos">Abdominaux & Gainage</option>
                  <option value="cardio">Cardio & Circuits</option>
                </optgroup>
              </select>
            </div>
            <div>
              <label className="block font-bold text-[#781539] uppercase text-[10px] mb-1">Matériel utilisé *</label>
              <select
                value={equipment}
                onChange={(e) => setEquipment(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] focus:outline-hidden focus:border-[#781539] text-xs font-semibold text-[#1F0C17]"
              >
                <option value="dumbbell">Haltères (Poids libres)</option>
                <option value="barbell">Barre / Smith Machine</option>
                <option value="machine">Machine guidée</option>
                <option value="cable">Poulie (Câble)</option>
                <option value="bodyweight">Poids du corps</option>
                <option value="cardio_machine">Machine Cardio</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-[#7A616F] uppercase text-[10px] mb-1">Séries</label>
              <input
                type="number"
                min="1"
                max="10"
                value={sets}
                onChange={(e) => setSets(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] text-xs text-center font-mono tabular-nums font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-[#7A616F] uppercase text-[10px] mb-1">Répétitions</label>
              <input
                type="text"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                placeholder="10-12"
                className="w-full px-3 py-2 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] text-xs text-center font-mono tabular-nums font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-[#7A616F] uppercase text-[10px] mb-1">Repos (sec)</label>
              <input
                type="number"
                step="15"
                min="0"
                value={rest}
                onChange={(e) => setRest(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-2xl bg-[#F4E9F0] border border-[#E5D4DF] text-xs text-center font-mono tabular-nums font-bold"
              />
            </div>
          </div>
          <div className="rounded-[24px] bg-[#FCE7F3]/50 border border-[#FBCFE8] overflow-hidden">
            <div className="p-3.5 flex items-center justify-between gap-2">
              <button type="button" onClick={() => setShowPreview(!showPreview)} className="flex items-center gap-2 text-left flex-1">
                <span className="w-7 h-7 rounded-xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="font-display font-bold text-xs text-[#1F0C17] block">
                    Fiche Exercice Complète (Générée automatiquement)
                  </span>
                  <span className="text-[10px] text-[#781539] font-medium block">
                    Position, 4 étapes, respiration, réglages machine & erreurs à éviter
                  </span>
                </div>
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    let e = generateExerciseSheet(name, muscle, equipment, description, tip)
                    ;(setSuccess(e.startingPosition),
                      setError(
                        e.steps.join(`
`),
                      ),
                      description.trim() || setDescription(e.description),
                      tip.trim() || setTip(e.formTips[0]))
                  }}
                  className="px-2.5 py-1 rounded-full bg-white text-[#781539] font-bold text-[10px] hover:bg-[#FCE7F3] border border-[#FBCFE8]"
                >
                  Personnaliser
                </button>
                <button type="button" onClick={() => setShowPreview(!showPreview)} className="p-1 text-[#781539]">
                  {showPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            {showPreview && (
              <div className="px-3.5 pb-3.5 space-y-2.5 text-[11px] border-t border-[#FBCFE8]/60 pt-2.5">
                <div className="p-2.5 rounded-2xl bg-white/90 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#781539] uppercase text-[10px]">Aperçu de ta fiche dans l’appli :</span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" /> Fiche 100% complète
                    </span>
                  </div>
                  <p className="text-[#1F0C17]">
                    <strong>Position :</strong> {success || sheet.startingPosition}
                  </p>
                  <div>
                    <strong className="text-[#1F0C17] block mb-0.5">Étapes (1 à 4) :</strong>
                    <ol className="list-decimal list-inside space-y-0.5 text-[#7A616F]">
                      {(error
                        ? error
                            .split(
                              `
`,
                            )
                            .filter(Boolean)
                        : sheet.steps
                      ).map((e, t) => (
                        <li key={t} className="truncate">
                          {e}
                        </li>
                      ))}
                    </ol>
                  </div>
                  <p className="text-[#7A616F]">
                    <strong className="text-[#1F0C17]">Réglage & Sécurité :</strong> {sheet.machineSetup.seatSetting}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#781539] text-[10px] mb-1">Précision / Description (optionnel)</label>
                    <input
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Laissé vide = rédigé automatiquement"
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D4DF] text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#781539] text-[10px] mb-1">Ton astuce perso (optionnel)</label>
                    <input
                      type="text"
                      value={tip}
                      onChange={(e) => setTip(e.target.value)}
                      placeholder="ex: Tirer les coudes vers les hanches..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#E5D4DF] text-[11px]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="pt-3 border-t border-[#F5B8EE] flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 rounded-full bg-[#F4E9F0] text-[#1F0C17] font-bold text-xs">
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving || !name.trim()}
              className="px-5 py-2.5 rounded-full bg-[#781539] hover:bg-[#5B0E2D] disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{saving ? `Création de la fiche...` : `Créer mon exo & sa fiche`}</span>
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  )
}
