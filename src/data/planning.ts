// Données reprises de l'app d'origine.
import type { ActivityTypeMeta, WeekTemplate } from '../types'
export const ACTIVITY_TYPES: Record<string, ActivityTypeMeta> = {
  "Séance Bas du corps": {
    "label": "Séance Bas du corps",
    "icon": "weightlifter",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Séance Bas du corps : Quads, Ischios & Presse",
    "defaultRoutineId": "routine-lower-complete"
  },
  "Séance Fessiers": {
    "label": "Séance Fessiers",
    "icon": "kettlebell",
    "colorClass": "bg-[#FCE7F3] text-[#9D174D] border-[#F472B6]/50",
    "defaultSession": "Booty Sculpt : Hip Thrust, Kickback & Abduction",
    "defaultRoutineId": "routine-glutes-focus"
  },
  "Séance Dos": {
    "label": "Séance Dos",
    "icon": "dumbbell",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)",
    "defaultRoutineId": "routine-back-sculpt-no-widen"
  },
  "Séance Dos / Pecs": {
    "label": "Séance Dos / Pecs",
    "icon": "dumbbell",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Combo Dos / Pecs (Upper Body Dessiné & Galbe)",
    "defaultRoutineId": "routine-dos-pecs-antagonist"
  },
  "Séance Pecs / Bras": {
    "label": "Séance Pecs / Bras",
    "icon": "biceps",
    "colorClass": "bg-[#FDF2F8] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Combo Pecs / Bras (Buste Tonique & Bras Fermes)",
    "defaultRoutineId": "routine-pecs-arms-push"
  },
  "Séance Pecs": {
    "label": "Séance Pecs",
    "icon": "dumbbell",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Focus Pecs & Maintien du Buste (4 exos)",
    "defaultRoutineId": "routine-pecs-sculpt"
  },
  "Séance Bras": {
    "label": "Séance Bras",
    "icon": "biceps",
    "colorClass": "bg-[#FDF2F8] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Séance Bras & Épaules Galbées",
    "defaultRoutineId": "routine-upper-sculpt"
  },
  "Repos": {
    "label": "Repos",
    "icon": "water",
    "colorClass": "bg-[#FFF0F5] text-[#7A616F] border-[#FBCFE8]",
    "defaultSession": "Repos total ou récupération active"
  },
  "TSE": {
    "label": "TSE",
    "icon": "stretch",
    "colorClass": "bg-[#FDF2F8] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Séance TSE (Training Spécifique)"
  },
  "Pilates": {
    "label": "Pilates",
    "icon": "stretch",
    "colorClass": "bg-[#FDF2F8] text-[#9D174D] border-[#FBCFE8]",
    "defaultSession": "Pilates Flow, Posture & Gainage profond"
  },
  "Course": {
    "label": "Course",
    "icon": "runner",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Course à pied / Footing endurance"
  },
  "Cardio": {
    "label": "Cardio",
    "icon": "runner",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Marche inclinée 12-5-30 ou StairMaster",
    "defaultRoutineId": "routine-cardio-incline-walk"
  },
  "Abdos": {
    "label": "Abdos",
    "icon": "stretch",
    "colorClass": "bg-[#FDF2F8] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Circuit Abdos & Gainage",
    "defaultRoutineId": "routine-abs-standing-weighted"
  },
  "Autre": {
    "label": "Autre",
    "icon": "bike",
    "colorClass": "bg-[#FFF0F5] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Activité personnalisée au choix"
  },
  "Musculation": {
    "label": "Séance Bas du corps",
    "icon": "weightlifter",
    "colorClass": "bg-[#FCE7F3] text-[#831843] border-[#FBCFE8]",
    "defaultSession": "Séance Bas du corps / Fessiers ou Dos"
  }
}

export const WEEK_TEMPLATES: WeekTemplate[] = [
  {
    "id": "split-3j-sculpt",
    "title": "Split 3 Jours : Fessiers · Dos (1-2-3-4) · Pecs/Bras",
    "subtitle": "Lundi Bas du corps, Mercredi Dos Dessiné, Vendredi Pecs & Bras",
    "badge": "3 séances / sem",
    "days": {
      "0": {
        "activity": "Repos"
      },
      "1": {
        "activity": "Séance Fessiers",
        "workoutName": "Focus Fessiers Galbe & Volume (Ordre 1-2-3-4)",
        "routineId": "routine-glutes-focus",
        "finisherType": "abs",
        "finisher": "Circuit Abdos Debout avec Charge (3 tours) (14 min · Gainage debout, Obliques, Transverse & Ceinture 360° (sans s’allonger))"
      },
      "2": {
        "activity": "Repos"
      },
      "3": {
        "activity": "Séance Dos",
        "workoutName": "Dos Dessiné sans l’Élargir (Ordre 1-2-3-4)",
        "routineId": "routine-back-sculpt-no-widen",
        "finisherType": "cardio",
        "finisher": "Marche Inclinée — Débutant (Pente 6 · Vitesse 4,5 · 20 min) (Tapis de course · 20 min)"
      },
      "4": {
        "activity": "Repos"
      },
      "5": {
        "activity": "Séance Pecs / Bras",
        "workoutName": "Séance Pecs / Bras (Buste Tonique & Bras Fermes)",
        "routineId": "routine-pecs-arms-push",
        "finisherType": "abs",
        "finisher": "Circuit Abdos Complet & Planche Lestée 60s (3 tours) (16 min · Bas des abdos, Grand droit, Obliques & Planche lestée sur le dos)"
      },
      "6": {
        "activity": "Repos"
      }
    }
  },
  {
    "id": "split-4j-combos",
    "title": "Split 4 Jours : 2 Bas du corps + Dos/Pecs + Pecs/Bras",
    "subtitle": "Lundi Fessiers, Mardi Dos/Pecs, Jeudi Jambes, Vendredi Pecs/Bras",
    "badge": "4 séances / sem",
    "days": {
      "0": {
        "activity": "Repos"
      },
      "1": {
        "activity": "Séance Fessiers",
        "workoutName": "Focus Fessiers Galbe & Volume",
        "routineId": "routine-glutes-focus",
        "finisherType": "abs",
        "finisher": "Circuit Abdos Debout avec Charge (3 tours) (14 min · Gainage debout, Obliques, Transverse & Ceinture 360° (sans s’allonger))"
      },
      "2": {
        "activity": "Séance Dos / Pecs",
        "workoutName": "Séance Dos / Pecs (Upper Body Dessiné & Galbe)",
        "routineId": "routine-dos-pecs-antagonist",
        "finisherType": "cardio",
        "finisher": "Marche Inclinée — Débutant (Pente 6 · Vitesse 4,5 · 20 min) (Tapis de course · 20 min)"
      },
      "3": {
        "activity": "Repos"
      },
      "4": {
        "activity": "Séance Bas du corps",
        "workoutName": "Bas du Corps Complet & Galbe",
        "routineId": "routine-lower-complete",
        "finisherType": "none"
      },
      "5": {
        "activity": "Séance Pecs / Bras",
        "workoutName": "Séance Pecs / Bras (Buste Tonique & Bras Fermes)",
        "routineId": "routine-pecs-arms-push",
        "finisherType": "abs",
        "finisher": "Circuit Over-Unders, Cocoon & Plate Hollow Hold (3 tours) (15 min · Endurance abdominale (Séries de 20), Dead Bugs lestés & Hollow Hold au max)"
      },
      "6": {
        "activity": "Repos"
      }
    }
  },
  {
    "id": "free-mode",
    "title": "Mode Libre (Sans programme fixe)",
    "subtitle": "Remet tous les jours en libre / repos : tu lances tes séances quand tu veux !",
    "badge": "Zéro contrainte",
    "days": {
      "0": {
        "activity": "Repos"
      },
      "1": {
        "activity": "Repos"
      },
      "2": {
        "activity": "Repos"
      },
      "3": {
        "activity": "Repos"
      },
      "4": {
        "activity": "Repos"
      },
      "5": {
        "activity": "Repos"
      },
      "6": {
        "activity": "Repos"
      }
    }
  }
]
