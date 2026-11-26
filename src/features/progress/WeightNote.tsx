import { useCycle } from '../cycle/useCycle'
import { isWaterPhase } from '../cycle/cycle'
import { useWorkout } from '../../store/WorkoutStore'

/** Repère des pesées de fin de cycle (rétention d'eau), comme dans l'app d'origine. Visible seulement si le suivi du cycle est actif. */
export function WeightNote() {
  const [cycle] = useCycle()
  const { measurements } = useWorkout()
  if (!cycle.enabled) return null
  const w = measurements.filter((m) => m.weight != null).sort((a, b) => a.date.localeCompare(b.date))
  if (!w.length) return null
  const flagged = w.filter((m) => isWaterPhase(cycle, m.date))
  const last = w[w.length - 1]
  return (
    <div className="mb-4 rounded-2xl bg-soft px-4 py-3 text-sm">
      <p className="flex items-start gap-2 text-muted">
        <span className="mt-1 inline-block size-2.5 shrink-0 rounded-full border-2 border-[#781539] bg-[#F9B8D6]" />
        <span>Pesées en fin de cycle ({flagged.length}) : 0,5 à 2 kg d’eau en plus sont fréquents à ce moment-là.
          {isWaterPhase(cycle, last.date) && <strong className="text-plum"> Ta dernière pesée ({new Date(last.date).toLocaleDateString('fr-FR')}) en fait partie : compare-la plutôt à la même phase du cycle précédent.</strong>}
        </span>
      </p>
      {flagged.length > 0 && <p className="mt-1 text-xs text-muted">Concernées : {flagged.map((m) => `${new Date(m.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })} (${m.weight} kg)`).join(', ')}</p>}
    </div>
  )
}
