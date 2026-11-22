import { useNavigate } from 'react-router-dom'
import { PlanningPage } from '../features/planning/PlanningPage'
import { ProgramsPage } from '../features/programs/ProgramsPage'
import { MeasurementsPage } from '../features/progress/MeasurementsPage'
import { ProgressPage } from '../features/progress/ProgressPage'

export function PlanningRoute() {
  const navigate = useNavigate()
  return <PlanningPage onStartActiveMode={() => navigate('/seance')} />
}

export function ProgramsRoute() {
  const navigate = useNavigate()
  return <ProgramsPage onStartWorkoutSession={() => navigate('/seance')} onNavigateToPlanning={() => navigate('/planning')} />
}

export function ProgressRoute() {
  return <ProgressPage />
}

export function MeasurementsRoute() {
  const navigate = useNavigate()
  return <MeasurementsPage onBackToProgress={() => navigate('/suivi')} />
}
