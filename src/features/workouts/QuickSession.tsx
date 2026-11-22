import { Play, Timer } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../components/ui'
import { toWorkoutExercise } from '../../lib/workout'
import { useWorkout } from '../../store/WorkoutStore'
import type { Exercise } from '../../types'

const ZONES: { id: string; label: string; pick: (e: Exercise) => boolean }[] = [
  { id: 'glutes', label: 'Fessiers uniquement', pick: (e) => e.specificMuscle === 'fessiers' },
  { id: 'lower-body', label: 'Bas du corps', pick: (e) => e.category === 'lower-body' },
  { id: 'back', label: 'Dos', pick: (e) => e.category === 'back' },
  { id: 'upper', label: 'Haut du corps', pick: (e) => ['pecs', 'arms'].includes(String(e.category)) },
  { id: 'abs', label: 'Abdos', pick: (e) => e.category === 'abs' },
]

/** Séance rapide de 20 min : 4 exercices × 3 séries, 45 s de repos, avec tes dernières charges. */
export function QuickSession({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { allExercises, favorites, getPreviousPerformance, startWorkout } = useWorkout()
  const navigate = useNavigate()
  const [zone, setZone] = useState('glutes')

  const launch = () => {
    const z = ZONES.find((x) => x.id === zone)!
    const pool = allExercises.filter((e) => z.pick(e) && e.category !== 'cardio')
    // Les favoris d'abord, puis le reste dans un ordre aléatoire ; 4 exercices d'équipements variés si possible.
    const sorted = [...pool].sort((a, b) => Number(favorites.includes(b.id)) - Number(favorites.includes(a.id)) || Math.random() - 0.5)
    const chosen: Exercise[] = []
    for (const e of sorted) { if (chosen.length < 4 && !chosen.some((c) => c.equipment === e.equipment && chosen.length < 3)) chosen.push(e) }
    for (const e of sorted) { if (chosen.length < 4 && !chosen.includes(e)) chosen.push(e) }
    const exercises = chosen.map((e, i) => {
      const w = toWorkoutExercise({ ...e, defaultSets: 3 }, getPreviousPerformance(e.id)?.weight ?? 0)
      return { ...w, id: `${w.id}_${i}`, restSeconds: 45 }
    })
    startWorkout({ name: `Séance rapide 20 min · ${z.label}`, exercises })
    onClose()
    navigate('/seance')
  }

  return (
    <Modal open={open} onClose={onClose} title={<span className="flex items-center gap-2"><Timer size={20} className="text-pink" /> Séance rapide · 20 min</span>} subtitle="4 exercices, 3 séries, 45 s de repos" maxWidth="max-w-md">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {ZONES.map((z) => (
            <button key={z.id} onClick={() => setZone(z.id)} aria-pressed={zone === z.id}
              className={`rounded-2xl px-3 py-3 text-sm font-semibold ${zone === z.id ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{z.label}</button>
          ))}
        </div>
        <button onClick={launch} className="flex w-full items-center justify-center gap-2 rounded-full bg-[#781539] py-3 text-sm font-semibold text-white"><Play size={16} /> Lancer la séance</button>
      </div>
    </Modal>
  )
}
