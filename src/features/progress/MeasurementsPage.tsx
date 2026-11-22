// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { Icon } from '../../components/Icon'
import { MeasurementChart } from './MeasurementChart'
import { Sheet } from '../../components/Sheet'
import { useAuth } from '../auth/AuthProvider'
import { useWorkout } from '../../store/WorkoutStore'
import { ArrowLeft, Calendar, Plus, Scale, Trash2 } from 'lucide-react'
export const MeasurementsPage = ({ onBackToProgress }) => {
  let { measurements, addMeasurement, deleteMeasurement } = useWorkout(),
    { profile } = useAuth(),
    a = profile?.unitSystem || `metric`,
    o = a === `metric` ? `kg` : `lbs`,
    s = a === `metric` ? `cm` : `in`,
    [c, l] = useState(new Date().toISOString().split(`T`)[0]),
    [u, d] = useState(``),
    [f, p] = useState(``),
    [m, h] = useState(``),
    [g, v] = useState(``),
    [y, b] = useState(``),
    [x, S] = useState(``),
    [C, w] = useState(``),
    [T, E] = useState(false),
    [D, ee] = useState(measurements[1]?.id || ``),
    [O, te] = useState(measurements[0]?.id || ``),
    k = async (e) => {
      ;(e.preventDefault(),
        await addMeasurement({
          date: c,
          weight: u ? parseFloat(u) : void 0,
          waist: f ? parseFloat(f) : void 0,
          hips: m ? parseFloat(m) : void 0,
          thighs: g ? parseFloat(g) : void 0,
          arms: y ? parseFloat(y) : void 0,
          chest: x ? parseFloat(x) : void 0,
          notes: C.trim() || void 0,
          unit: a,
        }),
        d(``),
        p(``),
        h(``),
        v(``),
        b(``),
        S(``),
        w(``),
        E(false))
    },
    ne = measurements.find((e) => e.id === D),
    re = measurements.find((e) => e.id === O),
    ie = (e, t) => (e === void 0 || t === void 0 ? null : Number((t - e).toFixed(1))),
    ae =
      measurements.length >= 2
        ? measurements
            .slice(0, 6)
            .reverse()
            .map((e) => e.hips || 94)
        : [92, 93, 93.5, 94.5, 95]
  return (
    <div className="space-y-5 pb-12 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1">
          {onBackToProgress && (
            <button
              onClick={onBackToProgress}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#781539] hover:text-[#3B0726] mb-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour au Suivi</span>
            </button>
          )}
          <h1 className="text-2xl sm:text-3xl font-semibold font-display text-[#3B0726] tracking-tight flex items-center gap-2.5">
            <Icon name="body" className="w-6 h-6 text-[#EA3E8E] shrink-0" />
            <span>Suivi des Mensurations</span>
          </h1>
          <p className="text-xs text-[#7A5267] font-medium">
            Mesures physiques corporelles, évolution et comparaison ({o} & {s})
          </p>
        </div>
        <button
          onClick={() => E(true)}
          className="flex items-center gap-1.5 px-5 py-3 text-xs font-bold text-white bg-[#781539] hover:bg-[#3B0726] rounded-full transition-all active:scale-95 shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Nouvelle prise de mesures</span>
        </button>
      </div>
      <Sheet
        isOpen={T}
        onClose={() => E(false)}
        title="Enregistrer mes mesures du jour"
        subtitle="Renseigne les zones que tu souhaites suivre"
      >
        <form onSubmit={k} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-bold text-[#781539] uppercase mb-1">Date</label>
            <input
              type="date"
              required
              value={c}
              onChange={(e) => l(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Poids ({o})</label>
              <input
                type="number"
                step="0.1"
                placeholder="ex: 58.5"
                value={u}
                onChange={(e) => d(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Taille ({s})</label>
              <input
                type="number"
                step="0.5"
                placeholder="ex: 64"
                value={f}
                onChange={(e) => p(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Hanches ({s})</label>
              <input
                type="number"
                step="0.5"
                placeholder="ex: 94"
                value={m}
                onChange={(e) => h(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Cuisses ({s})</label>
              <input
                type="number"
                step="0.5"
                placeholder="ex: 54"
                value={g}
                onChange={(e) => v(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Bras ({s})</label>
              <input
                type="number"
                step="0.5"
                placeholder="ex: 27"
                value={y}
                onChange={(e) => b(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Poitrine ({s})</label>
              <input
                type="number"
                step="0.5"
                placeholder="ex: 86"
                value={x}
                onChange={(e) => S(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs font-mono font-bold text-[#3B0726] tabular-nums"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-[#7A5267] uppercase mb-1">Notes facultatives</label>
            <input
              type="text"
              value={C}
              onChange={(e) => w(e.target.value)}
              placeholder="ex: Prise le matin à jeun"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8] text-xs text-[#3B0726]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => E(false)}
              className="px-4 py-2.5 rounded-full bg-[#FFF0F5] text-[#3B0726] text-xs font-bold"
            >
              Annuler
            </button>
            <button type="submit" className="px-6 py-2.5 rounded-full bg-[#781539] hover:bg-[#3B0726] text-white text-xs font-bold">
              Enregistrer
            </button>
          </div>
        </form>
      </Sheet>
      {measurements.length >= 2 && (
        <div className="p-6 rounded-[28px] bg-white border border-[#FBCFE8] space-y-4 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#EA3E8E] font-bold block">Évolution corporelle</span>
              <h3 className="font-bold text-[#3B0726] text-base font-display">Comparateur entre deux dates</h3>
            </div>
            <div className="w-40">
              <MeasurementChart data={ae} width={150} height={38} strokeColor="#781539" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Date initiale (A)</label>
              <select
                value={D}
                onChange={(e) => ee(e.target.value)}
                className="w-full p-2.5 rounded-2xl border border-[#FBCFE8] bg-[#FFF0F5] text-[#3B0726] text-xs font-bold tabular-nums"
              >
                {measurements.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.date}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-[#7A5267] uppercase mb-1">Date récente (B)</label>
              <select
                value={O}
                onChange={(e) => te(e.target.value)}
                className="w-full p-2.5 rounded-2xl border border-[#FBCFE8] bg-[#FFF0F5] text-[#3B0726] text-xs font-bold tabular-nums"
              >
                {measurements.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.date}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {ne && re && (
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 pt-2">
              {[
                {
                  label: `Poids`,
                  valA: ne.weight,
                  valB: re.weight,
                  u: o,
                },
                {
                  label: `Taille`,
                  valA: ne.waist,
                  valB: re.waist,
                  u: s,
                },
                {
                  label: `Hanches`,
                  valA: ne.hips,
                  valB: re.hips,
                  u: s,
                },
                {
                  label: `Cuisses`,
                  valA: ne.thighs,
                  valB: re.thighs,
                  u: s,
                },
                {
                  label: `Bras`,
                  valA: ne.arms,
                  valB: re.arms,
                  u: s,
                },
                {
                  label: `Poitrine`,
                  valA: ne.chest,
                  valB: re.chest,
                  u: s,
                },
              ].map((e) => {
                let t = ie(e.valA, e.valB)
                return (
                  <div key={e.label} className="p-3 rounded-2xl bg-[#FFF0F5] border border-[#FBCFE8]/60 text-center">
                    <span className="text-[10px] uppercase font-bold text-[#7A5267] block">{e.label}</span>
                    <span className="font-display font-bold text-[#3B0726] text-lg tabular-nums block mt-0.5">
                      {e.valB === void 0 ? `-` : `${e.valB}`}
                    </span>
                    {t === null ? (
                      <span className="text-[10px] text-[#7A5267]">-</span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-[#781539] tabular-nums">
                        {t > 0 ? `+${t}` : t} {e.u}
                      </span>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
      <div className="space-y-3">
        <h3 className="font-bold font-display text-[#3B0726] text-sm pl-1">Historique chronologique</h3>
        {measurements.length === 0 ? (
          <div className="p-8 rounded-[28px] bg-white border border-[#FBCFE8] text-center space-y-2">
            <Scale className="w-8 h-8 text-[#EA3E8E] mx-auto" />
            <h4 className="font-bold font-display text-[#3B0726] text-base">Aucune mesure pour l'instant</h4>
            <p className="text-xs text-[#7A5267] max-w-sm mx-auto">
              Prends tes mensurations de départ pour suivre l'évolution de ta silhouette dans le temps.
            </p>
          </div>
        ) : (
          measurements.map((e) => (
            <div key={e.id} className="p-5 rounded-[28px] bg-white border border-[#FBCFE8] space-y-3 shadow-2xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#FBCFE8]/60">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#EA3E8E]" />
                  <span className="font-bold text-[#3B0726] text-xs font-mono tabular-nums">{e.date}</span>
                  {e.notes && <span className="text-xs text-[#7A5267]">· {e.notes}</span>}
                </div>
                <button
                  onClick={() => deleteMeasurement(e.id)}
                  className="p-1.5 text-[#7A5267] hover:text-red-600 rounded-full hover:bg-[#FFF0F5]"
                  title="Supprimer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 text-xs">
                {e.weight !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Poids</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.weight} <span className="text-[10px] font-sans">{o}</span>
                    </span>
                  </div>
                )}
                {e.waist !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Taille</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.waist} <span className="text-[10px] font-sans">{s}</span>
                    </span>
                  </div>
                )}
                {e.hips !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Hanches</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.hips} <span className="text-[10px] font-sans">{s}</span>
                    </span>
                  </div>
                )}
                {e.thighs !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Cuisses</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.thighs} <span className="text-[10px] font-sans">{s}</span>
                    </span>
                  </div>
                )}
                {e.arms !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Bras</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.arms} <span className="text-[10px] font-sans">{s}</span>
                    </span>
                  </div>
                )}
                {e.chest !== void 0 && (
                  <div className="p-2.5 rounded-2xl bg-[#FFF0F5]">
                    <span className="text-[10px] font-bold text-[#7A5267] block uppercase">Poitrine</span>
                    <span className="font-display text-lg font-bold text-[#3B0726] tabular-nums">
                      {e.chest} <span className="text-[10px] font-sans">{s}</span>
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
