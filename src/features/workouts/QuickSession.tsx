import { Play, RefreshCw, Timer } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../components/ui'
import { useWorkout } from '../../store/WorkoutStore'
import { quickSession } from './generators'

/** Séance rapide · 20 min (comme dans l'app d'origine) : 3 exercices sur les zones les moins travaillées récemment. */
export function QuickSession({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { workouts, favorites, allExercises, startWorkout } = useWorkout()
  const navigate = useNavigate()
  const [session, setSession] = useState(() => quickSession(workouts, favorites, allExercises))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (open) setSession(quickSession(workouts, favorites, allExercises)) }, [open])

  return (
    <Modal open={open} onClose={onClose} title={<span className="flex items-center gap-2"><Timer size={20} className="text-pink" /> Séance rapide · 20 min</span>} subtitle={session.description} maxWidth="max-w-md">
      <div className="space-y-3">
        <ul className="space-y-2">
          {session.exercises.map((e) => (
            <li key={e.id} className="rounded-2xl bg-soft px-4 py-3">
              <p className="text-xs font-semibold text-plum">{String(e.phase)}</p>
              <p className="font-semibold">{e.exerciseName}</p>
              <p className="font-mono text-xs text-muted">{e.sets.length} × {e.sets[0]?.targetReps} · repos {e.restSeconds} s</p>
            </li>
          ))}
        </ul>
        <div className="flex gap-2">
          <button onClick={() => setSession(quickSession(workouts, favorites, allExercises))} className="flex items-center gap-1.5 rounded-full bg-soft px-4 py-3 text-sm font-semibold text-plum"><RefreshCw size={15} /> Autre tirage</button>
          <button onClick={() => { startWorkout({ name: session.name, exercises: session.exercises, notes: session.description }); onClose(); navigate('/seance') }}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#781539] py-3 text-sm font-semibold text-white"><Play size={16} /> Démarrer</button>
        </div>
      </div>
    </Modal>
  )
}
