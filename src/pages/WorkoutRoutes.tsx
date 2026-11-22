import { Timer } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Icon } from '../components/Icon'
import { ActiveWorkoutPage } from '../features/workouts/ActiveWorkoutPage'
import { QuickSession } from '../features/workouts/QuickSession'
import { WorkoutsPage } from '../features/workouts/WorkoutsPage'

export function WorkoutsRoute() {
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [quick, setQuick] = useState(params.get('rapide') === '1')
  const close = () => { setQuick(false); if (params.has('rapide')) setParams({}, { replace: true }) }
  return (
    <>
      <div className="mb-5 grid grid-cols-2 gap-2.5">
        <button onClick={() => setQuick(true)} className="flex items-center gap-3 rounded-3xl bg-soft p-4 text-left hover:bg-blush">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface text-plum"><Timer size={20} /></span>
          <span><span className="block text-sm font-semibold">Séance rapide</span><span className="block text-xs text-muted">20 min, fessiers ou autre zone</span></span>
        </button>
        <Link to="/cardio" className="flex items-center gap-3 rounded-3xl bg-soft p-4 hover:bg-blush">
          <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-surface text-plum"><Icon name="runner" className="size-5" /></span>
          <span><span className="block text-sm font-semibold">Cardio</span><span className="block text-xs text-muted">Séances complètes guidées</span></span>
        </Link>
      </div>
      <WorkoutsPage onStartActiveMode={() => navigate('/seance')} />
      <QuickSession open={quick} onClose={close} />
    </>
  )
}

export function ActiveWorkoutRoute() {
  const navigate = useNavigate()
  return <ActiveWorkoutPage onFinishWorkout={() => navigate('/')} onExit={() => navigate('/seances')} />
}
