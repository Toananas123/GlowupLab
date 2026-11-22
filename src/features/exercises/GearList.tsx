// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { gearForExercise, gearForExercises } from './meta'
import { Backpack, Sparkles } from 'lucide-react'
export const GearList = ({ exercise, exercises, variant = `card`, title, className = `` }) => {
  let gear = exercises ? gearForExercises(exercises) : exercise ? gearForExercise(exercise) : []
  return gear.length === 0 ? null : variant === `pill-list` ? (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`}>
      <span className="text-[11px] font-bold text-[#781539] flex items-center gap-1 shrink-0">
        <Backpack className="w-3.5 h-3.5" />
        <span>Matériel :</span>
      </span>
      {gear.map((e) => (
        <span
          key={e.id}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FCE7F3] text-[#781539] text-[11px] font-semibold"
          title={e.tip}
        >
          <span>{e.icon}</span>
          <span>{e.shortLabel}</span>
        </span>
      ))}
    </div>
  ) : variant === `banner` ? (
    <div
      className={`rounded-2xl bg-gradient-to-r from-[#FFF0F5] to-[#FCE7F3] border border-[#FBCFE8] p-3.5 flex items-start gap-3 shadow-2xs ${className}`}
    >
      <div className="w-9 h-9 rounded-xl bg-[#781539] text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
        <Backpack className="w-4 h-4 text-[#FBCFE8]" />
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-display font-bold text-xs text-[#1F0C17]">{title || `Pense à prendre ton matériel avant de démarrer !`}</h4>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#781539] shrink-0">
            {gear.length} {gear.length > 1 ? `équipements` : `équipement`}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {gear.map((e) => (
            <span
              key={e.id}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#1F0C17] text-[11px] font-semibold shadow-2xs"
            >
              <span>{e.icon}</span>
              <span className="font-bold text-[#781539]">{e.shortLabel}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={`rounded-[26px] bg-white border border-[#F4E9F0] p-4 sm:p-5 shadow-2xs space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-[#FCE7F3] text-[#781539] flex items-center justify-center shrink-0">
            <Backpack className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-sm text-[#1F0C17]">{title || `Matériel personnel à prévoir`}</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0F5] text-[11px] font-semibold text-[#781539]">À emporter</span>
      </div>
      <div className="divide-y divide-[#F4E9F0] text-xs">
        {gear.map((e) => (
          <div key={e.id} className="py-2.5 flex items-start gap-2.5">
            <span className="text-base shrink-0 mt-0.5">{e.icon}</span>
            <div className="min-w-0 flex-1 space-y-0.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-[#1F0C17]">{e.name}</span>
                <span className="text-[10px] font-semibold text-[#781539] bg-[#FCE7F3] px-2 py-0.5 rounded-full shrink-0">{e.reason}</span>
              </div>
              <p className="text-[#7A616F] text-[11px] leading-relaxed">{e.tip}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#781539] font-medium bg-[#FFF5F8] p-2.5 rounded-xl">
        <Sparkles className="w-3.5 h-3.5 text-[#EA3E8E] shrink-0" />
        <span>Glisse ce matériel dans ton sac pour être 100% autonome et performante !</span>
      </div>
    </div>
  )
}
