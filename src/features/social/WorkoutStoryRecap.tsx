// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState } from 'react'
import { Logo } from '../../components/Logo'
import { Sheet } from '../../components/Sheet'
import { useSocial } from '../../store/SocialStore'
import { Check, Download, Eye, EyeOff, Share2, Sparkles } from 'lucide-react'
export const WorkoutStoryRecap = ({ isOpen, onClose, workout }) => {
  let { mySocialProfile, shareWorkoutToFeed } = useSocial(),
    [a, o] = useState(mySocialProfile.hideWeights),
    [s, c] = useState(`berry`),
    [l, u] = useState(null),
    d = workout || {
      id: `story-preview`,
      userId: `me`,
      name: `Booty Sculpt & Hypertrophie`,
      date: new Date().toISOString().split(`T`)[0],
      status: `completed`,
      durationMinutes: 48,
      finisher: `Marche inclinée 12% · 15 min`,
      exercises: [
        {
          id: `e1`,
          exerciseId: `romanian-deadlift`,
          exerciseName: `Soulevé de terre roumain (RDL)`,
          category: `lower-body`,
          equipment: `barbell`,
          restSeconds: 120,
          sets: [
            {
              id: `s1`,
              setNumber: 1,
              targetReps: 10,
              targetWeight: 60,
              completed: true,
            },
            {
              id: `s2`,
              setNumber: 2,
              targetReps: 10,
              targetWeight: 60,
              completed: true,
            },
            {
              id: `s3`,
              setNumber: 3,
              targetReps: 10,
              targetWeight: 65,
              completed: true,
            },
          ],
        },
        {
          id: `e2`,
          exerciseId: `hip-thrust-barbell`,
          exerciseName: `Hip Thrust à la barre`,
          category: `lower-body`,
          equipment: `barbell`,
          restSeconds: 120,
          sets: [
            {
              id: `s4`,
              setNumber: 1,
              targetReps: 10,
              targetWeight: 90,
              completed: true,
            },
            {
              id: `s5`,
              setNumber: 2,
              targetReps: 8,
              targetWeight: 95,
              completed: true,
              isPR: true,
            },
            {
              id: `s6`,
              setNumber: 3,
              targetReps: 8,
              targetWeight: 95,
              completed: true,
            },
          ],
        },
        {
          id: `e3`,
          exerciseId: `bulgarian-split-squat`,
          exerciseName: `Fentes bulgares aux haltères`,
          category: `lower-body`,
          equipment: `dumbbell`,
          restSeconds: 90,
          sets: [
            {
              id: `s7`,
              setNumber: 1,
              targetReps: 10,
              targetWeight: 16,
              completed: true,
            },
            {
              id: `s8`,
              setNumber: 2,
              targetReps: 10,
              targetWeight: 16,
              completed: true,
            },
            {
              id: `s9`,
              setNumber: 3,
              targetReps: 10,
              targetWeight: 16,
              completed: true,
            },
          ],
        },
        {
          id: `e4`,
          exerciseId: `cable-glute-kickback`,
          exerciseName: `Kick-back fessiers à la poulie`,
          category: `lower-body`,
          equipment: `cable`,
          restSeconds: 60,
          sets: [
            {
              id: `s10`,
              setNumber: 1,
              targetReps: 15,
              targetWeight: 17.5,
              completed: true,
            },
            {
              id: `s11`,
              setNumber: 2,
              targetReps: 15,
              targetWeight: 17.5,
              completed: true,
            },
            {
              id: `s12`,
              setNumber: 3,
              targetReps: 15,
              targetWeight: 17.5,
              completed: true,
            },
          ],
        },
      ],
    },
    f = d.exercises.slice(0, 4)
  return (
    <Sheet isOpen={isOpen} onClose={onClose} title="Carte Récap pour Story Instagram" subtitle="Génère ta carte 9:16 au design Glow Up Lab">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 bg-[#F4E9F0] p-3 rounded-2xl">
          <div className="flex items-center gap-1.5">
            {[
              {
                id: `berry`,
                label: `Bordeaux`,
              },
              {
                id: `blush`,
                label: `Rose Poudré`,
              },
              {
                id: `night`,
                label: `Nuit Intense`,
              },
            ].map((e) => (
              <button
                key={e.id}
                type="button"
                onClick={() => c(e.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${s === e.id ? `bg-[#781539] text-white shadow-2xs` : `bg-white text-[#7A616F] hover:text-[#1F0C17]`}`}
              >
                {e.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => o((e) => !e)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${a ? `bg-[#781539] text-white` : `bg-white text-[#781539] border border-[#FBCFE8]`}`}
          >
            {a ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{a ? `Charges masquées` : `Charges visibles`}</span>
          </button>
        </div>
        <div className="flex justify-center">
          <div
            className={`w-full max-w-[320px] aspect-[9/15] rounded-[32px] p-5 flex flex-col justify-between shadow-xl border relative overflow-hidden ${s === `berry` ? `bg-gradient-to-br from-[#781539] via-[#500724] to-[#1F0C17] text-white border-[#F472B6]/30` : s === `blush` ? `bg-grainy-pink text-[#1F0C17] border-[#F472B6]/40` : `bg-gradient-to-b from-[#180413] to-[#380A28] text-white border-[#EA3E8E]/30`}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center shadow-2xs">
                  <Logo size={32} variant="badge" />
                </span>
                <div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block leading-none ${s === `blush` ? `text-[#781539]` : `text-[#FBCFE8]`}`}
                  >
                    Glow Up Lab
                  </span>
                  <span className="text-xs font-bold">{mySocialProfile.handle}</span>
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${s === `blush` ? `bg-white/80 text-[#781539]` : `bg-white/15 text-[#FBCFE8]`}`}
              >
                {d.durationMinutes || 45} min
              </span>
            </div>
            <div className="space-y-2.5 my-auto py-3">
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${s === `blush` ? `text-[#781539]` : `text-[#F472B6]`}`}
                >
                  <Sparkles className="w-3 h-3" /> Séance validée
                </span>
                <h4 className="font-display font-extrabold text-lg leading-tight mt-0.5">{d.name}</h4>
              </div>
              <div className="space-y-1.5">
                {f.map((e, t) => {
                  let n = e.sets.reduce((e, t) => Math.max(e, t.actualWeight ?? t.targetWeight ?? 0), 0),
                    r = e.sets[0]?.actualReps || e.sets[0]?.targetReps || 10
                  return (
                    <div
                      key={e.id || t}
                      className={`p-2.5 rounded-2xl flex items-center justify-between gap-2 ${s === `blush` ? `bg-white/85 border border-white` : `bg-white/10 backdrop-blur-xs border border-white/10`}`}
                    >
                      <div className="min-w-0">
                        <span className={`text-[10px] font-bold block ${s === `blush` ? `text-[#781539]` : `text-[#FBCFE8]`}`}>
                          {t + 1}. {e.exerciseName}
                        </span>
                        <span className={`text-[11px] font-mono font-semibold ${s === `blush` ? `text-[#5C3A4D]` : `text-white/80`}`}>
                          {e.sets.length} séries × {r} reps
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-xl text-[11px] font-mono font-bold shrink-0 ${s === `blush` ? `bg-[#FCE7F3] text-[#781539]` : `bg-white/15 text-white`}`}
                      >
                        {a ? `🔒 Secret` : `${n} kg`}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-semibold opacity-85">
              <span>Planifie · Entraîne-toi · Progresse</span>
              <span>Code : {mySocialProfile.friendCode}</span>
            </div>
          </div>
        </div>
        {l && (
          <div className="p-3 rounded-2xl bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>{l}</span>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => {
              let e = document.createElement(`canvas`)
              ;((e.width = 1080), (e.height = 1920))
              let t = e.getContext(`2d`)
              if (!t) return
              let n = t.createLinearGradient(0, 0, 1080, 1920)
              ;(s === `berry`
                ? (n.addColorStop(0, `#781539`), n.addColorStop(0.5, `#500724`), n.addColorStop(1, `#1F0C17`))
                : s === `blush`
                  ? (n.addColorStop(0, `#FCE7F3`), n.addColorStop(0.5, `#FBCFE8`), n.addColorStop(1, `#F472B6`))
                  : (n.addColorStop(0, `#180413`), n.addColorStop(1, `#380A28`)),
                (t.fillStyle = n),
                t.fillRect(0, 0, 1080, 1920))
              let i = s === `blush`
              ;((t.fillStyle = i ? `#781539` : `#FBCFE8`),
                (t.font = `bold 38px sans-serif`),
                t.fillText(`GLOW UP LAB · RÉCAP SÉANCE`, 90, 170),
                (t.fillStyle = i ? `#1F0C17` : `#FFFFFF`),
                (t.font = `bold 68px sans-serif`),
                t.fillText(d.name.slice(0, 28), 90, 280),
                (t.fillStyle = i ? `#5C3A4D` : `#FBCFE8`),
                (t.font = `600 36px sans-serif`),
                t.fillText(`${d.durationMinutes || 45} min · ${f.length} exercices · ${mySocialProfile.handle}`, 90, 355),
                f.forEach((e, n) => {
                  let r = 470 + n * 250
                  ;((t.fillStyle = i ? `rgba(255,255,255,0.88)` : `rgba(255,255,255,0.12)`),
                    t.beginPath(),
                    t.roundRect(90, r, 900, 210, 42),
                    t.fill(),
                    (t.fillStyle = i ? `#781539` : `#F472B6`),
                    (t.font = `bold 32px sans-serif`),
                    t.fillText(`EXERCICE ${n + 1}`, 140, r + 68),
                    (t.fillStyle = i ? `#1F0C17` : `#FFFFFF`),
                    (t.font = `bold 42px sans-serif`),
                    t.fillText(e.exerciseName.slice(0, 32), 140, r + 125))
                  let o = e.sets.reduce((e, t) => Math.max(e, t.actualWeight ?? t.targetWeight ?? 0), 0),
                    s = e.sets[0]?.actualReps || e.sets[0]?.targetReps || 10,
                    c = a
                      ? `${e.sets.length} séries × ${s} reps · Charge masquée`
                      : `${e.sets.length} séries × ${s} reps · Top set : ${o} kg`
                  ;((t.fillStyle = i ? `#5C3A4D` : `#FBCFE8`), (t.font = `600 32px sans-serif`), t.fillText(c, 140, r + 175))
                }),
                (t.fillStyle = i ? `#781539` : `#FBCFE8`),
                (t.font = `bold 36px sans-serif`),
                t.fillText(`Planifie · Entraîne-toi · Progresse 🌸`, 90, 1780))
              let o = e.toDataURL(`image/png`),
                c = document.createElement(`a`)
              ;((c.href = o),
                (c.download = `glow-up-lab-story-${d.date}.png`),
                c.click(),
                u(`Image Story téléchargée en HD !`),
                setTimeout(() => u(null), 3e3))
            }}
            className="w-full py-3 px-4 rounded-full bg-[#781539] hover:bg-[#500724] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Télécharger pour Story Insta (PNG)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              ;(shareWorkoutToFeed(d),
                u(`Récap publié dans le fil d’activité du Club !`),
                setTimeout(() => {
                  ;(u(null), onClose())
                }, 1500))
            }}
            className="w-full py-3 px-4 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-98 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>Publier dans le Fil des amies</span>
          </button>
        </div>
      </div>
    </Sheet>
  )
}
