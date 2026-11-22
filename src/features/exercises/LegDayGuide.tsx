// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { LEG_DAY_STEPS } from '../../data/guides'
import { Sparkles } from 'lucide-react'
export const LegDayGuide = () => (
  <div className="space-y-2.5 pt-2">
    {LEG_DAY_STEPS.map((e) => (
      <div key={e.num} className="p-3 rounded-2xl bg-white border border-[#F2E4EC] shadow-2xs flex items-start gap-2.5 transition-all">
        <span className="w-6 h-6 rounded-full bg-[#831843] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
          {e.num}
        </span>
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="font-display font-bold text-xs text-[#2B091C]">
              {e.num} - {e.type} :
            </span>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FCE7F3] text-[#831843]">{e.tag}</span>
          </div>
          <p className="text-[11px] text-[#7A616F] font-medium leading-relaxed">{e.examples}</p>
        </div>
      </div>
    ))}
    <div className="p-2.5 rounded-xl bg-white/80 text-[11px] text-[#831843] font-semibold flex items-center gap-1.5">
      <Sparkles className="w-3.5 h-3.5 text-[#EC4899] shrink-0" />
      <span>Applique cet ordre pour maximiser tes gains fessiers & cuisses !</span>
    </div>
  </div>
)
