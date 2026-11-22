// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { BackGuide } from './BackGuide'
import { CustomExerciseSheet } from './CustomExerciseSheet'
import { ExerciseDetailSheet } from './ExerciseDetailSheet'
import { GearList } from './GearList'
import { Icon, categoryIcon } from '../../components/Icon'
import { LegDayGuide } from './LegDayGuide'
import { LegPressGuide } from './LegPressGuide'
import { LegPressGuideSheet } from './LegPressGuideSheet'
import { MUSCLE_GROUPS } from '../../data/exercises'
import { equipmentMeta } from './meta'
import { useWorkout } from '../../store/WorkoutStore'
import { ChevronDown, ChevronRight, ChevronUp, Plus, Search, Star, Trash2 } from 'lucide-react'
export const ExercisesPage = ({ initialCategory = `lower-body`, onAddToActiveWorkout }) => {
  let { allExercises, favorites, toggleFavorite, isFavorite, getPreviousPerformance, deleteCustomExercise, routines, startWorkout } =
      useWorkout(),
    [category, setCategory] = useState(initialCategory === `favorites` ? `all` : initialCategory),
    [muscle, setMuscle] = useState(`all`),
    [favoritesOnly, setFavoritesOnly] = useState(initialCategory === `favorites`),
    [search, setSearch] = useState(``),
    [selected, setSelected] = useState(null),
    [legPressOpen, setLegPressOpen] = useState(false),
    [createOpen, setCreateOpen] = useState(false),
    [openGuide, setOpenGuide] = useState(null),
    [backGuideOpen, setBackGuideOpen] = useState(true),
    [placement, setPlacement] = useState(`high-wide`),
    tabs = [
      {
        id: `lower-body`,
        label: `Bas du corps`,
        count: allExercises.filter((e) => e.category === `lower-body`).length,
      },
      {
        id: `back`,
        label: `Dos`,
        count: allExercises.filter((e) => e.category === `back`).length,
      },
      {
        id: `pecs`,
        label: `Pecs`,
        count: allExercises.filter((e) => e.category === `pecs`).length,
      },
      {
        id: `arms`,
        label: `Bras`,
        count: allExercises.filter((e) => e.category === `arms`).length,
      },
      {
        id: `abs`,
        label: `Abdos`,
        count: allExercises.filter((e) => e.category === `abs`).length,
      },
      {
        id: `cardio`,
        label: `Cardio`,
        count: allExercises.filter((e) => e.category === `cardio`).length,
      },
      {
        id: `fav`,
        label: `Favoris`,
        count: favorites.length,
      },
    ],
    launchBackRoutine = () => {
      let e = routines.find((e) => e.id === `routine-back-sculpt-no-widen`) || routines.find((e) => e.targetZone === `back`)
      if (!e) return
      let n = e.exercises.map((e, t) => ({
        ...e,
        id: `ex_${Date.now()}_${t}`,
        sets: e.sets.map((e, t) => ({
          ...e,
          id: `s_${Date.now()}_${t}`,
          completed: false,
          actualWeight: e.targetWeight,
          actualReps: e.targetReps,
        })),
      }))
      ;(startWorkout({
        name: e.name,
        exercises: n,
        finisher: e.finisher,
        notes: e.notes,
      }),
        onAddToActiveWorkout && onAddToActiveWorkout())
    },
    muscleChips = category === `all` ? [] : MUSCLE_GROUPS.filter((e) => e.category === category),
    filtered = allExercises.filter((e) => {
      let t = !favoritesOnly || favorites.includes(e.id),
        n = favoritesOnly || category === `all` || e.category === category,
        i = muscle === `all` || e.specificMuscle === muscle,
        a = search.toLowerCase().trim(),
        o = !a || e.name.toLowerCase().includes(a) || e.primaryMuscle.toLowerCase().includes(a) || e.description.toLowerCase().includes(a)
      return t && n && i && o
    }),
    removeCustom = async (e, t) => {
      ;(e.stopPropagation(), await deleteCustomExercise(t.id), selected?.id === t.id && setSelected(null))
    }
  return (
    <div className="space-y-4 pb-12 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pt-1 gap-3">
        <h1 className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-[#2B091C]">Exercices</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCreateOpen(true)}
            className="px-4 py-2.5 rounded-full bg-[#831843] hover:bg-[#3B0726] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
            title="Créer mon propre exercice avec une fiche détaillée automatique"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Ajouter mon exo</span>
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-none border-b border-[#F1E4EC]">
        {tabs.map((e) => {
          let t = e.id === `fav` ? favoritesOnly : !favoritesOnly && category === e.id
          return (
            <button
              key={e.id}
              onClick={() => {
                e.id === `fav` ? (setFavoritesOnly(true), setMuscle(`all`)) : (setFavoritesOnly(false), setCategory(e.id), setMuscle(`all`))
              }}
              className={`pb-2.5 flex items-center gap-1.5 whitespace-nowrap text-sm transition-colors border-b-2 -mb-[1px] cursor-pointer ${t ? `border-[#831843] font-bold text-[#2B091C]` : `border-transparent font-medium text-[#8C6D7E] hover:text-[#2B091C]`}`}
            >
              <span>{e.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold tabular-nums ${t ? `bg-[#FCE7F3] text-[#831843]` : `bg-[#F6EDF2] text-[#8C6D7E]`}`}
              >
                {e.count}
              </span>
            </button>
          )
        })}
      </div>
      <div className="space-y-2.5">
        <div className="relative">
          <Search className="w-4 h-4 text-[#8C6D7E] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un exercice..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full bg-[#F6EDF2] text-[#2B091C] placeholder:text-[#8C6D7E] focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-[#FBCFE8]"
          />
        </div>
        {!favoritesOnly && muscleChips.length > 1 && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
            <button
              onClick={() => setMuscle(`all`)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${muscle === `all` ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#7A616F] hover:bg-[#F1E2EA]`}`}
            >
              Tous
            </button>
            {muscleChips.map((e) => {
              let t = muscle === e.id
              return (
                <button
                  key={e.id}
                  onClick={() => setMuscle(e.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${t ? `bg-[#831843] text-white` : `bg-[#F6EDF2] text-[#7A616F] hover:bg-[#F1E2EA]`}`}
                >
                  {e.label}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {!favoritesOnly && category === `lower-body` && (
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setOpenGuide((e) => (e === `legday` ? null : `legday`))}
              className={`rounded-[26px] border p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-3 text-left transition-all cursor-pointer ${openGuide === `legday` ? `bg-[#F1E2EA] border-[#EC4899]/50 shadow-2xs` : `bg-[#F6EDF2] border-[#FBCFE8] hover:bg-[#F1E2EA]`}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                  <Icon name="weightlifter" className="w-4 h-4 sm:w-5 sm:h-5 text-[#EC4899]" />
                </div>
                <div className="min-w-0">
                  <span className="font-compact text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#EC4899] block truncate">
                    Guide intégré · Bas du corps
                  </span>
                  <h2 className="font-display font-bold text-xs sm:text-sm text-[#2B091C] leading-snug line-clamp-2">
                    Comment structurer son leg day ?
                  </h2>
                </div>
              </div>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shrink-0 shadow-2xs">
                {openGuide === `legday` ? (
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setOpenGuide((e) => (e === `legpress` ? null : `legpress`))}
              className={`rounded-[26px] border p-3 sm:p-4 flex items-center justify-between gap-2 sm:gap-3 text-left transition-all cursor-pointer ${openGuide === `legpress` ? `bg-[#F1E2EA] border-[#EC4899]/50 shadow-2xs` : `bg-[#F6EDF2] border-[#FBCFE8] hover:bg-[#F1E2EA]`}`}
            >
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                  <Icon name="kettlebell" className="w-4 h-4 sm:w-5 sm:h-5 text-[#EC4899]" />
                </div>
                <div className="min-w-0">
                  <span className="font-compact text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#EC4899] block truncate">
                    Guide intégré · Bas du corps
                  </span>
                  <h2 className="font-display font-bold text-xs sm:text-sm text-[#2B091C] leading-snug line-clamp-2">
                    Guide Presse à cuisses 45°
                  </h2>
                </div>
              </div>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shrink-0 shadow-2xs">
                {openGuide === `legpress` ? (
                  <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                )}
              </span>
            </button>
          </div>
          {openGuide === `legday` && (
            <div className="rounded-[26px] bg-[#F6EDF2] border border-[#FBCFE8] p-4 animate-in fade-in duration-150">
              <LegDayGuide />
            </div>
          )}
          {openGuide === `legpress` && (
            <div className="rounded-[26px] bg-[#F6EDF2] border border-[#FBCFE8] p-4 animate-in fade-in duration-150">
              <LegPressGuide selectedPlacement={placement} onSelectPlacement={setPlacement} />
            </div>
          )}
        </div>
      )}
      {!favoritesOnly && category === `back` && (
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => setBackGuideOpen((e) => !e)}
            className={`w-full rounded-[26px] border p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left transition-all cursor-pointer ${backGuideOpen ? `bg-[#F1E2EA] border-[#EC4899]/50 shadow-2xs` : `bg-[#F6EDF2] border-[#FBCFE8] hover:bg-[#F1E2EA]`}`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white shadow-2xs flex items-center justify-center text-[#831843] shrink-0">
                <Icon name="dumbbell" className="w-5 h-5 text-[#EC4899]" />
              </div>
              <div className="min-w-0">
                <span className="font-compact text-[10px] font-extrabold uppercase tracking-wider text-[#EC4899] block">
                  Guide intégré · Dos (Ordre 1-2-3-4)
                </span>
                <h2 className="font-display font-bold text-sm sm:text-base text-[#2B091C] leading-snug">
                  Tips pour un dos dessiné sans l’élargir :
                </h2>
              </div>
            </div>
            <span className="w-8 h-8 rounded-full bg-white text-[#831843] flex items-center justify-center shrink-0 shadow-2xs">
              {backGuideOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </button>
          {backGuideOpen && (
            <div className="rounded-[26px] bg-[#F6EDF2] border border-[#FBCFE8] p-4 animate-in fade-in duration-150">
              <BackGuide onLaunchBackRoutine={launchBackRoutine} />
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-2.5 lg:grid-cols-2">
        {filtered.length === 0 ? (
          <div className="p-8 rounded-[28px] bg-[#F6EDF2] text-center space-y-3 lg:col-span-2">
            <p className="text-sm font-semibold text-[#2B091C]">Aucun exercice trouvé</p>
            <button
              onClick={() => setCreateOpen(true)}
              className="px-4 py-2 rounded-full bg-[#831843] text-white font-semibold text-xs inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter un exercice</span>
            </button>
          </div>
        ) : (
          filtered.map((e) => {
            let t = isFavorite(e.id),
              n = getPreviousPerformance(e.id),
              r = equipmentMeta(e.equipment),
              s = MUSCLE_GROUPS.find((t) => t.id === e.specificMuscle)
            return (
              <div
                key={e.id}
                onClick={() => setSelected(e)}
                className="group p-3.5 sm:p-4 rounded-[26px] bg-white border border-[#F3E5ED] hover:border-[#FBCFE8] hover:bg-[#FFF7FA] hover:shadow-sm hover:shadow-[#831843]/5 transition-all flex items-center justify-between gap-3.5 cursor-pointer active:scale-99"
              >
                <div className="flex items-center gap-3.5 min-w-0 flex-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#FCE7F3] flex items-center justify-center text-[#831843] shrink-0">
                    <Icon name={categoryIcon(e.category)} className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h3 className="font-display font-semibold text-[15px] text-[#2B091C] leading-snug line-clamp-2">{e.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-[#7A616F]">
                      <span className="inline-flex items-center gap-1.5 font-medium text-[#831843]">
                        <span className="w-2 h-2 rounded-full bg-[#EC4899]" />
                        <span>{s?.label || e.primaryMuscle}</span>
                      </span>
                      <span>·</span>
                      <span>{r.label}</span>
                      <span>·</span>
                      <span className="font-mono font-semibold text-[#2B091C] tabular-nums">
                        {n ? `${n.weight} kg` : `${e.defaultSets}×${e.defaultReps}`}
                      </span>
                    </div>
                    <GearList exercise={e} variant="pill-list" className="pt-0.5" />
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {e.isCustom && (
                    <button
                      onClick={(t) => removeCustom(t, e)}
                      className="w-8 h-8 rounded-full text-[#8C6D7E] hover:text-red-600 flex items-center justify-center"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(t) => {
                      ;(t.stopPropagation(), toggleFavorite(e.id))
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#831843]"
                    title="Favori"
                  >
                    <Star className={`w-4 h-4 ${t ? `fill-[#EC4899] text-[#EC4899]` : `text-[#B89BAC]`}`} />
                  </button>
                  <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#831843] shadow-2xs">
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            )
          })
        )}
      </div>
      <ExerciseDetailSheet
        exercise={selected}
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        onOpenLegPressGuide={() => {
          ;(setSelected(null), setLegPressOpen(true))
        }}
        onAddToWorkout={onAddToActiveWorkout}
      />
      <LegPressGuideSheet isOpen={legPressOpen} onClose={() => setLegPressOpen(false)} />
      <CustomExerciseSheet isOpen={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  )
}
