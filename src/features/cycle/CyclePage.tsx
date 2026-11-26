import { CalendarPlus, Droplets, Lock, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { localISO } from '../../lib/utils'
import { useWorkout } from '../../store/WorkoutStore'
import { useNavigate } from 'react-router-dom'
import { phaseSession } from '../workouts/generators'
import {
  averageCycleLength, checkInAdjust, cycleStatus, DEFAULT_CYCLE, isWaterPhase, PHASES, statsByPhase, todayAdjust,
  type CheckIn, type Phase, type PhaseAdjust,
} from './cycle'
import { useCycle } from './useCycle'

const PHASE_ORDER: Phase[] = ['menstrual', 'follicular', 'ovulatory', 'luteal']
const fmt = (d: string) => new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })

export function CyclePage() {
  const [cycle, save] = useCycle()
  const { workouts, favorites, startWorkout } = useWorkout()
  const navigate = useNavigate()
  const today = localISO()
  const status = cycleStatus(cycle, today)
  const adj = todayAdjust(cycle, today)
  const stats = useMemo(() => statsByPhase(cycle, workouts), [cycle, workouts])
  const [otherDate, setOtherDate] = useState('')
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  if (!cycle.enabled) {
    return (
      <div className="mx-auto max-w-xl space-y-5">
        <h1 className="font-display text-3xl font-bold">Mon cycle</h1>
        <div className="space-y-4 rounded-3xl border border-line bg-surface p-6">
          <span className="grid size-12 place-items-center rounded-2xl bg-soft text-plum"><Lock size={22} /></span>
          <h2 className="text-lg font-bold">Adapte tes séances à ton cycle</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li>Phase du jour estimée et charges ajustées automatiquement (0, –5 ou –10 %, au choix).</li>
            <li>Check-in du jour (énergie, crampes, sommeil) qui ajuste les charges, au maximum de –20 %.</li>
            <li>Séance adaptée à la phase, rappel d’hydratation et statistiques de performance par phase.</li>
          </ul>
          <p className="rounded-2xl bg-soft px-4 py-3 text-sm font-medium text-plum">Facultatif et privé : ces données ne sont visibles que par toi et ne sont jamais partagées au Club.</p>
          <button onClick={() => save({ enabled: true })} className="w-full rounded-full bg-[#781539] py-3 text-sm font-semibold text-white">Activer le suivi du cycle</button>
        </div>
      </div>
    )
  }

  const addPeriod = (date: string) => {
    if (!date || cycle.periods.includes(date)) return
    save({ periods: [...cycle.periods, date].sort() })
  }
  const checkin = cycle.checkins[today]
  const setCheck = (patch: Partial<CheckIn>) =>
    save({ checkins: { ...cycle.checkins, [today]: { ...{ e: false, c: false, s: false }, ...checkin, ...patch } } })

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold">Mon cycle</h1>
          <p className="flex items-center gap-1.5 text-sm text-muted"><Lock size={13} /> Privé, jamais partagé au Club</p>
        </div>
        <Link to="/" className="text-sm font-semibold text-plum">Retour à l’accueil</Link>
      </header>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Phase du jour */}
        <section className="rounded-3xl border border-line bg-surface p-5">
          {status ? (
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
              <CycleRing day={status.day} length={status.length} />
              <div className="space-y-1.5 text-center sm:text-left">
                <p className="text-sm text-muted">Jour {status.day} sur {status.length}</p>
                <h2 className="font-display text-2xl font-bold" style={{ color: PHASES[status.phase].color }}>{PHASES[status.phase].label}</h2>
                <p className="text-sm text-muted">Prochaines règles estimées dans {status.nextPeriodIn} j</p>
                <p className="text-sm">{PHASES[status.phase].advice}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Indique le premier jour de tes dernières règles pour estimer ta phase.</p>
          )}
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button onClick={() => addPeriod(today)} disabled={cycle.periods.includes(today)}
              className="flex-1 rounded-full bg-[#781539] px-4 py-3 text-sm font-semibold text-white disabled:opacity-50">
              {cycle.periods.includes(today) ? 'Noté pour aujourd’hui' : 'Mes règles ont commencé aujourd’hui'}
            </button>
            <label className="flex items-center gap-2 rounded-full border border-blush-line bg-surface px-4 py-2 text-sm">
              <CalendarPlus size={16} className="text-plum" />
              <input type="date" max={today} value={otherDate} onChange={(e) => setOtherDate(e.target.value)} className="bg-transparent outline-none" aria-label="Autre date de début" />
              <button onClick={() => { addPeriod(otherDate); setOtherDate('') }} disabled={!otherDate} className="font-semibold text-plum disabled:opacity-40">Ajouter</button>
            </label>
          </div>
        </section>

        {/* Check-in du jour */}
        <section className="space-y-4 rounded-3xl border border-line bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-bold">Check-in du jour</h2>
            <span className={`font-mono text-sm font-bold ${adj.total < 0 ? 'text-plum' : 'text-muted'}`}>{adj.total === 0 ? 'Charges normales' : `Charges ${adj.total} %`}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {([['e', 'Énergie basse'], ['c', 'Crampes'], ['s', 'Mal dormi']] as const).map(([k, l]) => (
              <button key={k} onClick={() => setCheck({ [k]: !checkin?.[k] })} aria-pressed={!!checkin?.[k]}
                className={`rounded-2xl px-2 py-3 text-sm font-semibold ${checkin?.[k] ? 'bg-[#781539] text-white' : 'bg-soft'}`}>{l}<span className="block font-mono text-xs opacity-80">–5 %</span></button>
            ))}
          </div>
          <p className="text-xs text-muted">
            Phase : {adj.phaseAdj} % · Check-in : {checkInAdjust(checkin)} % · Total plafonné à –20 %. L’ajustement s’applique aux charges proposées quand tu lances une séance.
          </p>
        </section>
      </div>

      {status && (
        <section className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2 rounded-3xl bg-soft p-5">
            <h3 className="font-bold">Séance adaptée à ta phase</h3>
            <p className="text-sm text-muted">{PHASES[status.phase].session}{PHASES[status.phase].tweak ? ` · sur toutes tes séances : ${PHASES[status.phase].tweak}` : ''}</p>
            <button onClick={() => { const s = phaseSession(status.phase, favorites); startWorkout({ name: s.name, exercises: s.exercises, notes: s.description, skipCycleTweak: true }); navigate('/seance') }}
              className="rounded-full bg-[#781539] px-4 py-2 text-sm font-semibold text-white">Lancer cette séance</button>
          </div>
          <div className="rounded-3xl bg-soft p-5">
            <h3 className="mb-1 flex items-center gap-1.5 font-bold"><Droplets size={16} className="text-pink" /> Hydratation</h3>
            <p className="text-sm text-muted">{isWaterPhase(cycle, today) ? 'Fin de cycle : 0,5 à 2 kg d’eau en plus sont fréquents. Bois régulièrement et compare ta pesée à la même phase du cycle précédent.' : 'Bois régulièrement pendant la séance (environ 500 ml).'}</p>
          </div>
        </section>
      )}

      {/* Réglages par phase */}
      <section className="rounded-3xl border border-line bg-surface p-5">
        <h2 className="mb-1 text-lg font-bold">Ajustement des charges par phase</h2>
        <p className="mb-4 text-sm text-muted">Choisis de combien alléger tes charges selon la phase.</p>
        <label className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-soft px-4 py-3 text-sm font-semibold">Durée de mes règles
          <span className="flex items-center gap-2"><button onClick={() => save({ periodLength: Math.max(2, (cycle.periodLength || 5) - 1) })} aria-label="Moins" className="grid size-8 place-items-center rounded-full bg-surface">−</button>
          <span className="w-10 text-center font-mono">{cycle.periodLength || 5} j</span>
          <button onClick={() => save({ periodLength: Math.min(9, (cycle.periodLength || 5) + 1) })} aria-label="Plus" className="grid size-8 place-items-center rounded-full bg-surface">+</button></span>
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {PHASE_ORDER.map((ph) => (
            <div key={ph} className="flex items-center justify-between gap-3 rounded-2xl bg-soft px-4 py-3">
              <span className="text-sm font-semibold" style={{ color: PHASES[ph].color }}>{PHASES[ph].short}</span>
              <div className="flex rounded-full bg-surface p-0.5">
                {([0, -5, -10] as PhaseAdjust[]).map((v) => (
                  <button key={v} onClick={() => save({ adjust: { ...cycle.adjust, [ph]: v } })} aria-pressed={cycle.adjust[ph] === v}
                    className={`rounded-full px-3 py-1 font-mono text-xs font-bold ${cycle.adjust[ph] === v ? 'bg-[#781539] text-white' : 'text-muted'}`}>{v === 0 ? '0 %' : `${v} %`}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Statistiques */}
      <section className="rounded-3xl border border-line bg-surface p-5">
        <h2 className="mb-4 text-lg font-bold">Performance par phase</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {PHASE_ORDER.map((ph) => (
            <div key={ph} className="rounded-2xl bg-soft p-4">
              <p className="text-sm font-semibold" style={{ color: PHASES[ph].color }}>{PHASES[ph].short}</p>
              <p className="font-mono text-2xl font-bold">{stats[ph].sessions}</p>
              <p className="text-xs text-muted">séance{stats[ph].sessions > 1 ? 's' : ''}</p>
              {stats[ph].sessions > 0 && <p className="mt-2 text-xs text-muted">Volume moyen <span className="font-mono font-bold text-ink">{stats[ph].volume} kg</span><br />Ressenti <span className="font-mono font-bold text-ink">{stats[ph].rating}/5</span></p>}
            </div>
          ))}
        </div>
      </section>

      {/* Historique */}
      <section className="rounded-3xl border border-line bg-surface p-5">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-lg font-bold">Mes dates de règles</h2>
          <span className="text-sm text-muted">Cycle moyen : <span className="font-mono font-bold text-ink">{averageCycleLength(cycle.periods)} j</span></span>
        </div>
        {cycle.periods.length === 0 ? <p className="text-sm text-muted">Aucune date pour l’instant.</p> : (
          <ul className="divide-y divide-line">
            {[...cycle.periods].reverse().map((d) => (
              <li key={d} className="flex items-center justify-between py-2.5 text-sm">
                <span>{fmt(d)}</span>
                <button onClick={() => (confirmDelete === d ? (save({ periods: cycle.periods.filter((x) => x !== d) }), setConfirmDelete(null)) : setConfirmDelete(d))}
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${confirmDelete === d ? 'bg-rose-600 text-white' : 'text-muted hover:bg-soft'}`}>
                  <Trash2 size={13} /> {confirmDelete === d ? 'Confirmer' : 'Supprimer'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button onClick={() => save({ enabled: false })} className="flex-1 rounded-full border border-blush-line bg-surface py-3 text-sm font-semibold">Désactiver le suivi</button>
        <button onClick={() => (confirmDelete === 'ALL' ? (save({ ...DEFAULT_CYCLE }), setConfirmDelete(null)) : setConfirmDelete('ALL'))}
          className={`flex-1 rounded-full py-3 text-sm font-semibold ${confirmDelete === 'ALL' ? 'bg-rose-600 text-white' : 'text-rose-600 hover:bg-rose-50'}`}>
          {confirmDelete === 'ALL' ? 'Confirmer : tout effacer' : 'Effacer mes données de cycle'}
        </button>
      </div>
    </div>
  )
}

/** Anneau du cycle : quatre arcs colorés par phase, point sur le jour actuel. */
export function CycleRing({ day, length, size = 132 }: { day: number; length: number; size?: number }) {
  const r = 52, c = 2 * Math.PI * r
  const ov = length - 14
  const segs: [Phase, number, number][] = [['menstrual', 1, 5], ['follicular', 6, ov - 2], ['ovulatory', ov - 1, ov + 1], ['luteal', ov + 2, length]]
  const angle = ((day - 0.5) / length) * 2 * Math.PI - Math.PI / 2
  return (
    <svg viewBox="0 0 132 132" width={size} height={size} role="img" aria-label={`Jour ${day} sur ${length}`}>
      {segs.map(([ph, a, b]) => (
        <circle key={ph} cx="66" cy="66" r={r} fill="none" stroke={PHASES[ph].color} strokeWidth="12" strokeOpacity={0.85}
          strokeDasharray={`${((b - a + 1) / length) * c - 2} ${c}`} strokeDashoffset={-((a - 1) / length) * c}
          transform="rotate(-90 66 66)" />
      ))}
      <circle cx={66 + r * Math.cos(angle)} cy={66 + r * Math.sin(angle)} r="9" fill="#fff" stroke="#1f0c17" strokeWidth="3" />
      <text x="66" y="64" textAnchor="middle" className="font-mono" fontSize="26" fontWeight="700" fill="currentColor">J{day}</text>
      <text x="66" y="82" textAnchor="middle" fontSize="11" fill="#7a616f">sur {length}</text>
    </svg>
  )
}
