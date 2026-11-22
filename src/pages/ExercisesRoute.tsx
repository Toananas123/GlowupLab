import { useNavigate, useSearchParams } from 'react-router-dom'
import { ExercisesPage } from '../features/exercises/ExercisesPage'
import { toWorkoutExercise } from '../lib/workout'
import { useWorkout } from '../store/WorkoutStore'
import type { Exercise } from '../types'

export function ExercisesRoute() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { activeWorkout, updateActiveWorkout, startWorkout, getPreviousPerformance } = useWorkout()
  const zone = params.get('zone') || 'lower-body'

  // Amélioration : l'original ouvrait seulement la séance sans y ajouter l'exercice.
  const addToWorkout = (ex?: Exercise) => {
    if (ex?.id) {
      const item = toWorkoutExercise(ex, getPreviousPerformance(ex.id)?.weight ?? 0)
      if (activeWorkout) updateActiveWorkout({ ...activeWorkout, exercises: [...activeWorkout.exercises, item] })
      else startWorkout({ name: ex.name, exercises: [item] })
    }
    navigate('/seance')
  }

  return <ExercisesPage key={zone} initialCategory={zone} onAddToActiveWorkout={addToWorkout} />
}
