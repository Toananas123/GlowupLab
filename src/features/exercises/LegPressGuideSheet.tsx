// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { FOOT_PLACEMENT_GUIDE } from '../../data/guides'
import { Icon } from '../../components/Icon'
import { LegPressGuide } from './LegPressGuide'
import { Sheet } from '../../components/Sheet'
export const LegPressGuideSheet = ({ isOpen, onClose }) => {
  let [placement, setPlacement] = useState(FOOT_PLACEMENT_GUIDE[0].id)
  return isOpen ? (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={
        <span className="flex items-center gap-2">
          <Icon name="kettlebell" className="w-5 h-5 text-[#EC4899] shrink-0" />
          <span>Guide Biomécanique Jambes</span>
        </span>
      }
      subtitle="Presse à cuisses 45° (7 positions)"
      footer={
        <button
          onClick={onClose}
          className="w-full py-3.5 px-6 rounded-full bg-[#831843] hover:bg-[#3B0726] text-white font-bold text-xs active:scale-98 transition-all min-h-[48px]"
        >
          Fermer le guide
        </button>
      }
    >
      <LegPressGuide selectedPlacement={placement} onSelectPlacement={setPlacement} />
    </Sheet>
  ) : null
}
