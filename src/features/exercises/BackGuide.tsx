// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { BACK_ORDER_GUIDE } from '../../data/guides'
import { Play, Sparkles } from 'lucide-react'
export const BackGuide = ({ onLaunchBackRoutine }) => (
  <div className="space-y-4">
    <div className="p-3.5 rounded-2xl bg-[#FCE7F3]/75 border border-[#FBCFE8] flex items-start justify-between gap-3 flex-wrap">
      <div className="flex items-start gap-2.5 flex-1 min-w-[220px]">
        <Sparkles className="w-4 h-4 text-[#831843] shrink-0 mt-0.5" />
        <p className="text-xs text-[#4A1D35] leading-relaxed font-medium">
          <strong className="font-bold text-[#831843]">Tips pour un dos dessiné sans l’élargir :</strong> Respecte cet ordre précis en{' '}
          <strong>4 étapes</strong>. On met l’accent sur le <strong>milieu du dos</strong> (1 ou 2 exos coudes ouverts) et on limite le{' '}
          <strong>grand dorsal à 1 seul exercice</strong> pour sculpter les détails du dos tout en gardant la taille fine.
        </p>
      </div>
      {onLaunchBackRoutine && (
        <button
          type="button"
          onClick={onLaunchBackRoutine}
          className="px-4 py-2 rounded-full bg-[#831843] hover:bg-[#500724] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 shrink-0 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Lancer la séance Dos dans l’ordre (1-2-3-4)</span>
        </button>
      )}
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {BACK_ORDER_GUIDE.map((e) => (
        <div key={e.number} className="p-4 rounded-2xl bg-[#FAF5F8] border border-[#F2E3EC] flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-7 h-7 rounded-xl font-display font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs ${e.badgeColor}`}
                >
                  {e.number}
                </span>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#2B091C] leading-tight">{e.title}</h4>
                  <span className="text-[11px] font-extrabold text-[#831843]">{e.subtitle}</span>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-[#831843] border border-[#F3E5ED] text-[10px] font-bold">
                Étape {e.number}/4
              </span>
            </div>
            <p className="text-xs text-[#6E4F60] leading-relaxed">{e.rule}</p>
          </div>
          <div className="pt-2 border-t border-[#F0E0E9]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6D7E] block mb-1.5">
              Exercices au choix dans l’ordre :
            </span>
            <ul className="space-y-1">
              {e.exercises.map((e) => (
                <li
                  key={e}
                  className="px-2.5 py-1.5 rounded-xl bg-white border border-[#F0E0E9] text-[11px] font-bold text-[#4A1D35] flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] shrink-0" />
                  <span>{e}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  </div>
)
