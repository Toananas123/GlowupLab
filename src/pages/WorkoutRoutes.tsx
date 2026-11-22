import { useNavigate } from 'react-router-dom'
import { ActiveWorkoutPage } from '../features/workouts/ActiveWorkoutPage'
import { WorkoutsPage } from '../features/workouts/WorkoutsPage'

export function WorkoutsRoute() {
  const navigate = useNavigate()
  return <WorkoutsPage onStartActiveMode={() => navigate('/seance')} />
}

export function ActiveWorkoutRoute() {
  const navigate = useNavigate()
  return <ActiveWorkoutPage onFinishWorkout={() => navigate('/')} onExit={() => navigate('/seances')} />
}
