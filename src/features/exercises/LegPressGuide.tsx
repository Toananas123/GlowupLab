// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { FOOT_PLACEMENT_GUIDE } from '../../data/guides'
import { ShieldAlert, Sparkles } from 'lucide-react'
export const LegPressGuide = ({ selectedPlacement, onSelectPlacement }) => {
  let placement = FOOT_PLACEMENT_GUIDE.find((t) => t.id === selectedPlacement) || FOOT_PLACEMENT_GUIDE[0]
  return (
    <div className="space-y-4">
      <div>
        <span className="text-[11px] font-bold text-[#7A616F] block mb-2">Sélectionne une position :</span>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none -mx-1 px-1">
          {FOOT_PLACEMENT_GUIDE.map((n, r) => {
            let i = n.id === selectedPlacement
            return (
              <button
                key={n.id}
                type="button"
                onClick={() => onSelectPlacement(n.id)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap transition-all shrink-0 ${i ? `bg-[#831843] text-white shadow-2xs` : `bg-white text-[#7A616F] hover:bg-[#F1E2EA]`}`}
              >
                {r + 1}. {n.title.split(`. `)[1] || n.title}
              </button>
            )
          })}
        </div>
      </div>
      <div className="p-3.5 sm:p-4 rounded-3xl bg-white border border-[#F2E4EC]">
        <p className="text-[10px] font-bold text-[#831843] uppercase tracking-wider text-center mb-2.5">
          Plateau de la Presse 45° · Touche pour voir l'impact
        </p>
        <div className="relative w-full max-w-xs mx-auto bg-[#2B091C] rounded-2xl p-2.5 shadow-inner border-2 border-[#831843]/40 flex flex-col gap-1.5">
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => onSelectPlacement(`high-wide`)}
              className={`p-1.5 rounded-lg text-center transition-all ${selectedPlacement === `high-wide` ? `bg-[#EC4899] text-white font-extrabold shadow-xs scale-102 ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
            >
              <span className="block text-[10px] leading-tight">Haut Écarté</span>
              <span className="block text-[8px] opacity-80 leading-tight">Fessiers/Add</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectPlacement(`high-center`)}
              className={`p-1.5 rounded-lg text-center transition-all ${selectedPlacement === `high-center` ? `bg-[#EC4899] text-white font-extrabold shadow-xs scale-102 ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
            >
              <span className="block text-[10px] leading-tight">Haut Centre</span>
              <span className="block text-[8px] opacity-80 leading-tight">Ischios/Glutes</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectPlacement(`high-narrow`)}
              className={`p-1.5 rounded-lg text-center transition-all ${selectedPlacement === `high-narrow` ? `bg-[#EC4899] text-white font-extrabold shadow-xs scale-102 ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
            >
              <span className="block text-[10px] leading-tight">Haut Serré</span>
              <span className="block text-[8px] opacity-80 leading-tight">Haut Fessier</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlacement(`standard-center`)}
            className={`w-full py-2 px-2.5 rounded-lg text-center transition-all ${selectedPlacement === `standard-center` ? `bg-[#EC4899] text-white font-extrabold shadow-xs ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
          >
            <span className="text-[11px] font-bold">Standard Centre (Complet / Polyvalent)</span>
          </button>
          <div className="grid grid-cols-2 gap-1">
            <button
              type="button"
              onClick={() => onSelectPlacement(`low-narrow`)}
              className={`p-1.5 rounded-lg text-center transition-all ${selectedPlacement === `low-narrow` ? `bg-[#EC4899] text-white font-extrabold shadow-xs scale-102 ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
            >
              <span className="block text-[10px] leading-tight">Bas Serré</span>
              <span className="block text-[8px] opacity-80 leading-tight">Vaste externe</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectPlacement(`low-wide`)}
              className={`p-1.5 rounded-lg text-center transition-all ${selectedPlacement === `low-wide` ? `bg-[#EC4899] text-white font-extrabold shadow-xs scale-102 ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
            >
              <span className="block text-[10px] leading-tight">Bas Écarté</span>
              <span className="block text-[8px] opacity-80 leading-tight">Vaste interne</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => onSelectPlacement(`unilateral`)}
            className={`w-full py-1.5 px-2 rounded-lg text-center transition-all ${selectedPlacement === `unilateral` ? `bg-[#EC4899] text-white font-extrabold shadow-xs ring-2 ring-white` : `bg-white/10 text-[#FBCFE8] hover:bg-white/20`}`}
          >
            <span className="text-[10px] font-bold">Unilatéral (1 jambe · Correction déséquilibre)</span>
          </button>
        </div>
      </div>
      <div className="p-4 rounded-3xl bg-[#FCE7F3]/70 border border-[#FBCFE8] space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <span className="font-display font-bold text-sm text-[#831843]">{placement.title}</span>
          <span className="px-2.5 py-1 rounded-full bg-white text-[#831843] text-[10px] font-extrabold shrink-0 shadow-2xs">
            {placement.focus}
          </span>
        </div>
        <p className="text-xs text-[#2B091C] leading-relaxed">{placement.description}</p>
        {placement.recommendation && (
          <div className="p-2.5 rounded-xl bg-white/80 text-[11px] text-[#7A616F] flex items-start gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#EC4899] shrink-0 mt-0.5" />
            <span>
              <strong>Conseil pro :</strong> {placement.recommendation}
            </span>
          </div>
        )}
      </div>
      <div className="p-3.5 rounded-2xl bg-white border border-[#F2E4EC] text-xs text-[#2B091C] space-y-1.5">
        <div className="flex items-center gap-1.5 font-bold text-[#831843]">
          <ShieldAlert className="w-4 h-4 text-[#831843] shrink-0" />
          <span>Règles d'or à la presse</span>
        </div>
        <ul className="list-disc list-inside space-y-1 text-[#7A616F] text-[11px]">
          <li>Ne décolle jamais le bas du dos et le sacrum du dossier en bas de mouvement.</li>
          <li>Ne verrouille jamais les genoux en haut (garde 5° de flexion protectrice).</li>
        </ul>
      </div>
    </div>
  )
}
