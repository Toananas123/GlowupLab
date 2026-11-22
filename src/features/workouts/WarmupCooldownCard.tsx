// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { GuidedTimer } from '../cardio/GuidedTimer'
import { Icon } from '../../components/Icon'
import { WARMUPS } from '../../data/guides'
export const WarmupCooldownCard = ({ category = `lower-body` }) => {
  let [guided, setGuided] = useState(false),
    [t, n] = useState(`warmup`),
    [r, i] = useState(
      category === `arms`
        ? `arms`
        : category === `back`
          ? `back`
          : category === `abs`
            ? `abs`
            : category === `cardio`
              ? `cardio`
              : `lower-body`,
    ),
    a = WARMUPS[r] || WARMUPS[`lower-body`]
  return (
    <div className="rounded-[28px] bg-white border border-[#E6E2D8] p-4 sm:p-5 shadow-xs space-y-3.5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-[#F5B8EE]">
        <div className="flex items-center gap-2">
          <Icon name="stretch" className="w-5 h-5 text-[#EA3E8E] shrink-0" />
          <div>
            <h3 className="font-display font-semibold text-sm text-[#141414]">Échauffement & Étirements Spécifiques</h3>
            <p className="text-[11px] text-[#6E6A63]">Protégez vos articulations et accélérez votre récupération</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#F2EFE9] p-1 rounded-full self-start sm:self-auto">
          <button
            type="button"
            onClick={() => n(`warmup`)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${t === `warmup` ? `bg-[#3B0726] text-white shadow-xs` : `text-neutral-600 hover:text-neutral-900`}`}
          >
            <Icon name="runner" className="w-3.5 h-3.5 shrink-0" />
            <span>Échauffement (5-8 min)</span>
          </button>
          <button
            type="button"
            onClick={() => n(`stretching`)}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${t === `stretching` ? `bg-[#3B0726] text-white shadow-xs` : `text-neutral-600 hover:text-neutral-900`}`}
          >
            <Icon name="stretch" className="w-3.5 h-3.5 shrink-0" />
            <span>Étirements Fin de séance</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        {[
          {
            id: `lower-body`,
            label: `Bas du corps & Quads`,
            icon: `kettlebell`,
          },
          {
            id: `glutes`,
            label: `Focus Fessiers`,
            icon: `kettlebell`,
          },
          {
            id: `back`,
            label: `Dos & Posture`,
            icon: `dumbbell`,
          },
          {
            id: `arms`,
            label: `Épaules & Bras`,
            icon: `biceps`,
          },
          {
            id: `abs`,
            label: `Abdos & Gainage`,
            icon: `stretch`,
          },
          {
            id: `cardio`,
            label: `Cardio & Fractionné`,
            icon: `runner`,
          },
        ].map((e) => (
          <button
            key={e.id}
            type="button"
            onClick={() => i(e.id)}
            className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${r === e.id ? `bg-[#F8A5F8] text-[#3B0726] border border-[#F8A5F8]` : `bg-[#F2EFE9] text-neutral-600 hover:bg-[#EAE6DE]`}`}
          >
            <Icon name={e.icon} className="w-3.5 h-3.5 text-[#EA3E8E] shrink-0" />
            <span>{e.label}</span>
          </button>
        ))}
      </div>
      <div className="p-3.5 rounded-2xl bg-[#FCFBF9] border border-[#E6E2D8]">
        {t === `warmup` ? (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#3B0726]">
              <span>Protocole d'activation dynamique avant la séance :</span>
              <span className="text-[10px] text-neutral-500 font-normal">À faire avant les premières charges</span>
            </div>
            <ol className="space-y-2">
              {a.warmup.map((e, t) => (
                <li key={t} className="flex items-start gap-2.5 text-xs text-neutral-800">
                  <span className="w-5 h-5 rounded-full bg-[#F3E3F5] text-[#3B0726] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {t + 1}
                  </span>
                  <span className="leading-relaxed">{e}</span>
                </li>
              ))}
            </ol>
            {/* README : mode guidé minuté (45 s par mouvement). */}
            <button type="button" onClick={() => setGuided(true)} className="w-full rounded-full bg-[#781539] py-2 text-xs font-bold text-white">Échauffement guidé · {Math.round(a.warmup.length * 45 / 60)} min</button>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-semibold text-[#3B0726]">
              <span>Retour au calme & Étirements passifs décompressants :</span>
              <span className="text-[10px] text-neutral-500 font-normal">Tenir chaque étirement sans à-coups</span>
            </div>
            <ol className="space-y-2">
              {a.cooldown.map((e, t) => (
                <li key={t} className="flex items-start gap-2.5 text-xs text-neutral-800">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {t + 1}
                  </span>
                  <span className="leading-relaxed">{e}</span>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => setGuided(true)} className="w-full rounded-full bg-emerald-700 py-2 text-xs font-bold text-white">Étirements guidés · {Math.round(a.cooldown.length * 45 / 60)} min</button>
          </div>
        )}
      </div>
      {guided && (
        <GuidedTimer title={t === `warmup` ? `Échauffement` : `Étirements`} onClose={() => setGuided(false)}
          steps={(t === `warmup` ? a.warmup : a.cooldown).map((e, i) => ({ label: `Mouvement ${i + 1}`, seconds: 45, cue: e, effort: t === `warmup` }))} />
      )}
    </div>
  )
}
