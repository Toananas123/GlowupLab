// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
import { useState, useMemo, useRef } from 'react'
import { Icon } from '../../components/Icon'
import { STORY_THEMES } from './storyThemes'
import { Sheet } from '../../components/Sheet'
import { WorkoutStoryRecap } from './WorkoutStoryRecap'
import { useAuth } from '../auth/AuthProvider'
import { useSocial } from '../../store/SocialStore'
import { useWorkout } from '../../store/WorkoutStore'
import {
  ArrowDown,
  Calendar,
  Check,
  Copy,
  Download,
  Eye,
  EyeOff,
  Flame,
  MessageCircle,
  PenLine,
  RefreshCw,
  Send,
  Share2,
  Sparkles,
  Trash2,
  Trophy,
  UserPlus,
  X,
  Zap,
} from 'lucide-react'
export const SocialPage = () => {
  let { user, profile } = useAuth(),
    { workouts, routines, weeklyPlans } = useWorkout(),
    {
      mySocialProfile,
      updateMySocialProfile,
      friends,
      friendRequests,
      feedPosts,
      gymDates,
      collectiveChallenge,
      badges,
      pokedFriendIds,
      sendFriendRequestByQuery,
      renameFriend,
      acceptFriendRequest,
      declineFriendRequest,
      removeFriend,
      toggleReaction,
      addComment,
      shareWorkoutToFeed,
      sharePRToFeed,
      shareObjectiveToFeed,
      shareRoutineToClub,
      pokeFriend,
      createGymDateInvite,
      respondToGymDate,
      deleteGymDateInvite,
      importSharedRoutine,
      setDuoPartner,
      updateCollectiveChallengeTarget,
      refreshSocialData,
    } = useSocial(),
    ie = user?.uid || `guest`,
    ae = profile?.displayName || user?.displayName || `Mon Espace`,
    [oe, se] = useState(`feed`),
    [A, ce] = useState(null),
    [le, ue] = useState(false),
    [de, fe] = useState(0),
    pe = useRef(null),
    [me, he] = useState(null),
    [ge, _e] = useState(false),
    [ve, ye] = useState(null),
    j = useRef(null),
    [be, xe] = useState({}),
    [Se, Ce] = useState(`post-1`),
    [we, Te] = useState(false),
    [Ee, De] = useState(false),
    [Oe, ke] = useState(null),
    [Ae, je] = useState(`all`),
    [Me, Ne] = useState(null),
    [Pe, Fe] = useState(``),
    [Ie, Le] = useState(``),
    [Re, ze] = useState(``),
    [Be, Ve] = useState(`Hip Thrust à la barre`),
    [He, Ue] = useState(`90`),
    [We, Ge] = useState(`8`),
    [Ke, qe] = useState(``),
    [Je, Ye] = useState(friends[0]?.id || ``),
    [Xe, Ze] = useState(friends[0]?.id || ``),
    [Qe, $e] = useState(``),
    [et, tt] = useState(5),
    [nt, rt] = useState(`18h00`),
    [it, at] = useState(`Leg Day & Fessiers (4 exos)`),
    [ot, st] = useState(`On pense à nos sangles de cheville et notre gourde !`),
    [ct, lt] = useState({}),
    [ut, dt] = useState(``),
    [ft, pt] = useState(``),
    [mt, ht] = useState(false),
    [gt, _t] = useState(mySocialProfile.handle),
    [vt, yt] = useState(mySocialProfile.bioStatus),
    [bt, xt] = useState(mySocialProfile.favoriteExercise),
    [St, Ct] = useState(false),
    [wt, Tt] = useState(String(collectiveChallenge.targetSessions)),
    Et = (e) => {
      ;(ce(e), setTimeout(() => ce(null), 3600))
    },
    Dt = async () => {
      if (!le) {
        ue(true)
        try {
          ;(await refreshSocialData(), await new Promise((e) => setTimeout(e, 450)), Et(`Fil, amies et invitations actualisés ✓`))
        } finally {
          ;(ue(false), fe(0))
        }
      }
    },
    Ot = (e) => {
      window.scrollY <= 10 && !le ? (pe.current = e.touches[0].clientY) : (pe.current = null)
    },
    kt = (e) => {
      if (pe.current === null || le) return
      let t = e.touches[0].clientY - pe.current
      if (t > 0 && window.scrollY <= 10) {
        let e = Math.min(110, Math.round(t * 0.5))
        fe(e)
      } else fe(0)
    },
    At = () => {
      pe.current !== null && ((pe.current = null), de >= 65 ? Dt() : fe(0))
    },
    jt = (e) => {
      let t = pokeFriend(e.id),
        n = t?.friendName || e.displayName,
        r =
          t?.time ||
          new Date().toLocaleTimeString(`fr-FR`, {
            hour: `2-digit`,
            minute: `2-digit`,
          })
      ;(_e(true),
        he({
          friendName: n,
          time: r,
        }),
        Et(`⚡ WIZZ envoyé à ${n} ! Retrouve son retour dans le Fil & Activité.`),
        setTimeout(() => _e(false), 700),
        setTimeout(() => he(null), 4500))
    },
    Mt = useMemo(() => friendRequests.filter((e) => e.status === `pending` && e.direction === `incoming`), [friendRequests]),
    Nt = useMemo(() => friends.find((e) => e.id === Je) || friends[0], [friends, Je]),
    Pt = useMemo(() => friends.find((e) => e.id === mySocialProfile.duoPartnerId) || friends[0], [friends, mySocialProfile.duoPartnerId]),
    Ft = useMemo(() => collectiveChallenge.contributions.reduce((e, t) => e + t.sessionsCount, 0), [collectiveChallenge]),
    It = Math.min(100, Math.round((Ft / Math.max(1, collectiveChallenge.targetSessions)) * 100)),
    Lt = useMemo(() => {
      let e = Math.max(2, workouts.filter((e) => e.status === `completed`).length || 2)
      return [
        {
          id: ie,
          name: `${ae} (Toi)`,
          handle: mySocialProfile.handle,
          avatarColor: mySocialProfile.avatarColor,
          sessionsDone: e,
          sessionsTarget: 3,
          streakWeeks: mySocialProfile.duoStreakWeeks,
          objectivesDone: 3,
          score: Math.min(100, Math.round((e / 3) * 100)),
        },
        ...friends.map((e) => ({
          id: e.id,
          name: e.displayName,
          handle: e.handle,
          avatarColor: e.avatarColor,
          sessionsDone: e.weeklySessionsDone,
          sessionsTarget: e.weeklySessionsTarget,
          streakWeeks: e.streakWeeks,
          objectivesDone: e.objectivesDoneCount,
          score: Math.min(100, Math.round((e.weeklySessionsDone / Math.max(1, e.weeklySessionsTarget)) * 100)),
        })),
      ].sort((e, t) => t.score - e.score || t.streakWeeks - e.streakWeeks)
    }, [workouts, ie, ae, mySocialProfile, friends]),
    Rt = async (e) => {
      ;(await importSharedRoutine(e),
        lt((t) => ({
          ...t,
          [e.name]: true,
        })),
        Et(`La séance « ${e.name} » a été ajoutée à tes routines !`))
    },
    zt = () => {
      let e = `${window.location.origin}/?invite=${mySocialProfile.friendCode}`
      ;(navigator.clipboard?.writeText(e).catch(() => {}), Et(`Lien d’invitation copié (${mySocialProfile.friendCode}) !`))
    },
    Bt = () => {
      let e = `Réaliser mes 3 séances complètes de la semaine`
      try {
        let t = localStorage.getItem(`glowup_suivi_objectives_v1`)
        if (t) {
          let n = JSON.parse(t)
          if (Array.isArray(n)) {
            let t = n.find((e) => e.completed) || n[0]
            t?.label && (e = t.label)
          }
        }
      } catch {}
      ;(shareObjectiveToFeed(e), Et(`Ton objectif du moment a été partagé dans le Fil !`))
    },
    Vt = (e) => {
      e.preventDefault()
      let t = sendFriendRequestByQuery(ut, ft)
      ;(Et(t.message), t.success && (dt(``), pt(``)))
    },
    Ht = (e) => {
      ;(Ne(e), Fe(e.displayName), Le(e.handle), ze(e.bioStatus))
    },
    Ut = (e) => {
      ;(e.preventDefault(),
        Me &&
          Pe.trim() &&
          (renameFriend(Me.id, Pe.trim(), Ie.trim(), Re.trim()),
          Oe?.id === Me.id &&
            ke({
              ...Oe,
              displayName: Pe.trim(),
              handle: Ie.trim().startsWith(`@`) ? Ie.trim() : `@${Ie.trim()}`,
              bioStatus: Re.trim() || Oe.bioStatus,
            }),
          Et(`Prénom / surnom mis à jour : ${Pe.trim()} ✨`),
          Ne(null)))
    },
    Wt = useMemo(
      () =>
        Ae === `friends`
          ? feedPosts.filter((e) => e.authorId !== ie)
          : Ae === `mine`
            ? feedPosts.filter((e) => e.authorId === ie)
            : feedPosts,
      [feedPosts, Ae, ie],
    )
  return (
    <div
      onTouchStart={Ot}
      onTouchMove={kt}
      onTouchEnd={At}
      className={`space-y-5 animate-in fade-in duration-150 transition-transform ${ge ? `translate-x-1 -translate-y-0.5` : ``}`}
    >
      {(de > 0 || le) && (
        <div
          className="overflow-hidden transition-all duration-200 flex items-center justify-center"
          style={{
            height: le ? 52 : de,
          }}
        >
          <div className="px-4 py-2 rounded-full bg-[#FCE7F3] border border-[#F472B6]/40 text-[#781539] text-xs font-bold flex items-center gap-2 shadow-2xs">
            {le ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Actualisation du Club en cours...</span>
              </>
            ) : de >= 65 ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 rotate-180 transition-transform" />
                <span>Relâche pour actualiser ↑</span>
              </>
            ) : (
              <>
                <ArrowDown className="w-3.5 h-3.5" />
                <span>Glisse vers le bas pour actualiser ↓</span>
              </>
            )}
          </div>
        </div>
      )}
      <div className="pt-1 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="font-compact text-[11px] font-semibold uppercase tracking-wider text-[#781539] block">
            Le Club · Gym Besties & Motivation
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-bold tracking-tight text-[#1F0C17] mt-0.5">Social & Amies</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={Dt}
            disabled={le}
            className="px-3 py-2 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-60"
            title="Actualiser le fil, les amies et les invitations (ou glisser vers le bas)"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${le ? `animate-spin` : ``}`} />
            <span>{le ? `Actualisation...` : `Actualiser`}</span>
          </button>
          <button
            type="button"
            onClick={() =>
              updateMySocialProfile({
                hideWeights: !mySocialProfile.hideWeights,
              }).then(() =>
                Et(
                  mySocialProfile.hideWeights
                    ? `Tes charges (kg) sont de nouveau visibles pour tes amies.`
                    : `Mode Confidentialité activé : tes charges (kg) sont masquées.`,
                ),
              )
            }
            className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${mySocialProfile.hideWeights ? `bg-[#781539] text-white shadow-2xs` : `bg-[#F4E9F0] text-[#781539] hover:bg-[#FCE7F3]`}`}
            title="Activer ou désactiver le masquage de tes charges en kg"
          >
            {mySocialProfile.hideWeights ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{mySocialProfile.hideWeights ? `Charges masquées` : `Charges visibles`}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              ;(navigator.clipboard?.writeText(mySocialProfile.friendCode).catch(() => {}),
                Et(`Code ami ${mySocialProfile.friendCode} copié dans le presse-papiers !`))
            }}
            className="px-3 py-2 rounded-full bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Cliquer pour copier ton code ami"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copier Code : {mySocialProfile.friendCode}</span>
          </button>
          <button
            type="button"
            onClick={() => Te(true)}
            className="px-3.5 py-2 rounded-full bg-[#781539] hover:bg-[#500724] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FBCFE8]" />
            <span>Story Récap</span>
          </button>
        </div>
      </div>
      {me && (
        <div className="p-4 rounded-[24px] bg-gradient-to-r from-[#781539] via-[#BE185D] to-[#EA3E8E] text-white shadow-md flex items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-[#FBCFE8]" />
            </span>
            <div>
              <p className="font-display font-extrabold text-sm">
                ⚡ WIZZ ENVOYÉ À {me.friendName.toUpperCase()} ({me.time}) !
              </p>
              <p className="text-xs text-white/90">
                Vibration + boost de motivation envoyés ! Ton Wizz et sa réponse sont affichés dans le Fil d’activité.
              </p>
            </div>
          </div>
          <button type="button" onClick={() => he(null)} className="text-white/80 hover:text-white shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      {A && (
        <div className="p-3.5 rounded-2xl bg-[#781539] text-white text-xs font-bold flex items-center justify-between gap-2 shadow-md animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#FBCFE8] shrink-0" />
            <span>{A}</span>
          </div>
          <button type="button" onClick={() => ce(null)} className="text-white/70 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-[24px] bg-[#F4E9F0]">
        {[
          {
            id: `feed`,
            label: `Fil & Activité`,
            badge: feedPosts.length,
          },
          {
            id: `besties`,
            label: `Gym Besties & RDV`,
            badge: gymDates.length > 0 ? gymDates.length : void 0,
          },
          {
            id: `challenges`,
            label: `Défis & Podium`,
            badge: void 0,
          },
          {
            id: `friends`,
            label: `Amies & Profil`,
            badge: Mt.length > 0 ? Mt.length : friends.length > 0 ? friends.length : void 0,
          },
        ].map((e) => {
          let t = oe === e.id
          return (
            <button
              key={e.id}
              type="button"
              onClick={() => se(e.id)}
              className={`py-2.5 px-3 rounded-[18px] text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${t ? `bg-[#781539] text-white shadow-xs` : `text-[#7A616F] hover:text-[#1F0C17] hover:bg-white/60`}`}
            >
              <span className="truncate">{e.label}</span>
              {e.badge !== void 0 && (
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${t ? `bg-white/20 text-white` : `bg-[#FCE7F3] text-[#781539]`}`}
                >
                  {e.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
      {oe === `feed` && (
        <div className="space-y-5">
          <div className="p-4 sm:p-5 rounded-[28px] bg-grainy-pink border border-[#F472B6]/30 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">En direct du planning</span>
                <h2 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">Qui s’entraîne aujourd’hui ?</h2>
              </div>
              <button type="button" onClick={() => se(`besties`)} className="text-xs font-bold text-[#781539] hover:underline">
                Comparer nos plannings →
              </button>
            </div>
            {friends.length === 0 ? (
              <div className="p-4 rounded-[22px] bg-white/90 border border-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div>
                  <p className="font-display font-bold text-sm text-[#1F0C17]">Tu n’as pas encore de Gym Bestie dans ton cercle 🌸</p>
                  <p className="text-xs text-[#7A616F] mt-0.5">
                    Ajoute une amie avec son @pseudo ou partage-lui ton code{' '}
                    <strong className="text-[#781539]">{mySocialProfile.friendCode}</strong> pour voir ses séances du jour !
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => se(`friends`)}
                  className="px-4 py-2 rounded-full bg-[#781539] hover:bg-[#500724] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Ajouter une amie</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {friends.map((e) => {
                  let t = pokedFriendIds[e.id] || e.lastPokedAt
                  return (
                    <div
                      key={e.id}
                      className="p-3.5 rounded-[22px] bg-white/90 border border-white flex flex-col justify-between gap-2.5 shadow-2xs"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <button type="button" onClick={() => ke(e)} className="flex items-center gap-2.5 text-left min-w-0 cursor-pointer">
                          <span
                            className="w-9 h-9 rounded-2xl text-white font-display font-bold text-sm flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: e.avatarColor,
                            }}
                          >
                            {e.displayName.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17] truncate">{e.displayName}</p>
                            <p className="text-[11px] text-[#7A616F] truncate">{e.handle}</p>
                          </div>
                        </button>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${e.isTrainingToday ? `bg-[#FCE7F3] text-[#781539]` : `bg-[#F4E9F0] text-[#7A616F]`}`}
                        >
                          {e.isTrainingToday ? `À la salle` : `Repos`}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1F0C17] truncate">{e.todayActivity}</p>
                        {e.todayWorkoutName && <p className="text-[11px] text-[#7A616F] truncate">{e.todayWorkoutName}</p>}
                      </div>
                      <button
                        type="button"
                        onClick={() => jt(e)}
                        className={`w-full py-2 px-3 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer ${t ? `bg-[#FCE7F3] text-[#781539] border border-[#F472B6]/40` : `bg-[#781539] hover:bg-[#500724] text-white shadow-2xs`}`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>{t ? `⚡ Wizz envoyé (${t}) · Relancer` : `⚡ Envoyer un Wizz motivation`}</span>
                      </button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          {gymDates.length > 0 && (
            <div className="p-4 sm:p-5 rounded-[28px] bg-white border-2 border-[#F472B6]/45 shadow-2xs space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-2xl bg-[#FCE7F3] text-[#781539] flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">
                      Rendez-vous « On s’entraîne ensemble ? »
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-[#1F0C17]">
                      Tes invitations de séance programmées ({gymDates.length})
                    </h3>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => se(`besties`)}
                  className="px-3 py-1.5 rounded-full bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold shrink-0 cursor-pointer"
                >
                  Gérer dans RDV →
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {gymDates.map((e) => (
                  <div
                    key={e.id}
                    className="p-3.5 rounded-2xl bg-[#FAF5F8] border border-[#F3E5ED] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-9 h-9 rounded-xl text-white font-display font-bold text-xs flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: e.friendAvatarColor,
                        }}
                      >
                        {e.friendName.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17] truncate">
                          Avec {e.friendName} · {e.dayLabel} à {e.timeSlot}
                        </p>
                        <p className="text-[11px] font-semibold text-[#781539] truncate">{e.workoutTheme}</p>
                        {e.locationNote && <p className="text-[10px] text-[#7A616F] truncate italic">« {e.locationNote} »</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="px-2.5 py-1 rounded-full bg-[#FCE7F3] text-[#781539] text-[10px] font-bold">
                        {e.status === `accepted` ? `Envoyée ✓` : `En attente`}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          ;(deleteGymDateInvite(e.id), Et(`Invitation de séance retirée.`))
                        }}
                        className="p-1.5 rounded-full text-[#8C6D7E] hover:text-[#781539] hover:bg-white cursor-pointer"
                        title="Annuler ce RDV"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="p-4 rounded-[26px] bg-[#F4E9F0] flex flex-wrap items-center justify-between gap-2.5">
            <span className="text-xs font-bold text-[#1F0C17]">Partager avec tes amies :</span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  let e = workouts[0]
                  e ? (shareWorkoutToFeed(e), Et(`Ta séance « ${e.name} » est publiée dans le Club !`)) : Te(true)
                }}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Icon name="weightlifter" className="w-3.5 h-3.5" />
                <span>Ma dernière séance</span>
              </button>
              <button
                type="button"
                onClick={() => De(true)}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Trophy className="w-3.5 h-3.5 text-[#EA3E8E]" />
                <span>Célébrer un PR</span>
              </button>
              <button
                type="button"
                onClick={Bt}
                className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Check className="w-3.5 h-3.5 text-[#EA3E8E]" />
                <span>Mes 3 objectifs</span>
              </button>
              <button
                type="button"
                onClick={() => se(`besties`)}
                className="px-3 py-1.5 rounded-full bg-[#781539] hover:bg-[#500724] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FBCFE8]" />
                <span>Inviter en séance</span>
              </button>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex items-center gap-1.5">
              {[
                {
                  id: `all`,
                  label: `Tout le fil (${feedPosts.length})`,
                },
                {
                  id: `friends`,
                  label: `Séances des amies (${feedPosts.filter((e) => e.authorId !== ie).length})`,
                },
                {
                  id: `mine`,
                  label: `Mes publications (${feedPosts.filter((e) => e.authorId === ie).length})`,
                },
              ].map((e) => (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => je(e.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${Ae === e.id ? `bg-[#781539] text-white` : `bg-[#F4E9F0] text-[#7A616F] hover:text-[#1F0C17]`}`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {Wt.map((e) => {
              let t = Se === e.id
              return (
                <article key={e.id} className="p-4 sm:p-5 rounded-[28px] bg-white border border-[#F3E5ED] shadow-2xs space-y-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-2xl text-white font-display font-bold text-sm flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: e.authorAvatarColor,
                        }}
                      >
                        {e.authorName.charAt(0)}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-display font-bold text-sm text-[#1F0C17]">{e.authorName}</span>
                          <span className="text-xs text-[#7A616F]">{e.authorHandle}</span>
                        </div>
                        <span className="text-[11px] text-[#8C6D7E] block">{e.createdAt}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${e.type === `pr` || e.type === `wizz` ? `bg-grainy-pink text-[#781539] border border-[#F472B6]/40` : e.type === `objective` || e.type === `gym_date` ? `bg-[#FCE7F3] text-[#781539]` : `bg-[#F4E9F0] text-[#781539]`}`}
                    >
                      {e.type === `pr` && `🏆 Record Personnel (PR)`}
                      {e.type === `workout` && `🏋️‍♀️ Séance · ${e.durationMinutes || 45} min`}
                      {e.type === `objective` && `🎯 Objectif coché`}
                      {e.type === `routine_share` && `📋 Routine partagée`}
                      {e.type === `wizz` && `⚡ Wizz Motivation`}
                      {e.type === `gym_date` && `📅 Invitation de séance`}
                    </span>
                  </div>
                  {e.type === `wizz` && (
                    <div className="p-3.5 rounded-2xl bg-grainy-pink border border-[#F472B6]/40 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                          <Zap className="w-5 h-5 text-[#FBCFE8]" />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">
                            Boost d’énergie envoyé
                          </span>
                          <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">
                            Wizz envoyé à {e.wizzTargetName || `ta Gym Bestie`} {e.wizzTargetHandle ? `(${e.wizzTargetHandle})` : ``}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white text-[#781539] font-mono font-bold text-[11px] shrink-0 shadow-2xs">
                        ⚡ Vibrations
                      </span>
                    </div>
                  )}
                  {e.type === `gym_date` && e.gymDateSummary && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF5F8] border border-[#FBCFE8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                          <Calendar className="w-5 h-5 text-[#FBCFE8]" />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">RDV Salle programmé</span>
                          <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">
                            Avec {e.gymDateSummary.friendName} · {e.gymDateSummary.dayLabel} à {e.gymDateSummary.timeSlot}
                          </p>
                          <p className="text-xs font-semibold text-[#781539]">{e.gymDateSummary.workoutTheme}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => se(`besties`)}
                        className="px-3 py-1.5 rounded-full bg-[#FCE7F3] text-[#781539] text-xs font-bold shrink-0 cursor-pointer"
                      >
                        Voir mes RDV →
                      </button>
                    </div>
                  )}
                  {e.type === `pr` && e.prExerciseName && (
                    <div className="p-3.5 rounded-2xl bg-grainy-pink border border-[#F472B6]/35 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-2xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                          <Icon name="trophy" className="w-5 h-5 text-[#FBCFE8]" />
                        </span>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Nouveau Record Battu</span>
                          <p className="font-display font-bold text-sm sm:text-base text-[#1F0C17]">{e.prExerciseName}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1.5 rounded-xl bg-white text-[#781539] font-mono font-extrabold text-xs sm:text-sm shrink-0 shadow-2xs">
                        {e.hideWeights ? `${e.prReps || 8} reps (Charge masquée)` : `${e.prWeight} kg × ${e.prReps || 8}`}
                      </span>
                    </div>
                  )}
                  {e.type === `objective` && e.objectiveLabel && (
                    <div className="p-3.5 rounded-2xl bg-[#F4E9F0] border border-[#FBCFE8] flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-[#781539] text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </span>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Objectif Suivi validé</span>
                        <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">{e.objectiveLabel}</p>
                      </div>
                    </div>
                  )}
                  {e.exercisesSummary && e.exercisesSummary.length > 0 && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF5F8] space-y-2">
                      {e.workoutName && (
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">{e.workoutName}</span>
                          {e.hideWeights && (
                            <span className="text-[10px] font-semibold text-[#781539] flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Charges masquées
                            </span>
                          )}
                        </div>
                      )}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {e.exercisesSummary.map((t, n) => (
                          <div
                            key={n}
                            className="px-3 py-2 rounded-xl bg-white flex items-center justify-between text-xs border border-[#F3E5ED]"
                          >
                            <span className="font-semibold text-[#1F0C17] truncate pr-2">
                              {n + 1}. {t.name}
                            </span>
                            <span className="font-mono text-[11px] font-bold text-[#781539] shrink-0">
                              {e.hideWeights || !t.topWeight ? `${t.setsCount}×${t.reps}` : `${t.setsCount}×${t.reps} · ${t.topWeight}kg`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {e.sharedRoutine && (
                    <div className="p-3.5 rounded-2xl bg-[#F4E9F0] flex items-center justify-between gap-3">
                      <div>
                        <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">{e.sharedRoutine.name}</p>
                        <p className="text-[11px] text-[#7A616F]">{e.sharedRoutine.exercises.length} exercices structurés</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => Rt(e.sharedRoutine)}
                        className="px-3 py-2 rounded-full bg-[#781539] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Importer</span>
                      </button>
                    </div>
                  )}
                  {e.caption && <p className="text-xs sm:text-sm text-[#1F0C17] leading-relaxed">{e.caption}</p>}
                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-[#F3E5ED]">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {STORY_THEMES.map((t) => {
                        let n = e.reactions[t.key] || [],
                          r = n.includes(ie)
                        return (
                          <button
                            key={t.key}
                            type="button"
                            onClick={() => toggleReaction(e.id, t.key)}
                            className={`px-2.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${r ? `bg-[#781539] text-white shadow-2xs` : `bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#1F0C17]`}`}
                          >
                            <span>{t.emoji}</span>
                            <span className="text-[11px]">{t.label}</span>
                            {n.length > 0 && (
                              <span
                                className={`font-mono text-[10px] px-1 rounded-full ${r ? `bg-white/20 text-white` : `text-[#781539]`}`}
                              >
                                {n.length}
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                    <button
                      type="button"
                      onClick={() => Ce(t ? null : e.id)}
                      className="px-3 py-1.5 rounded-full bg-[#FAF5F8] hover:bg-[#F4E9F0] text-xs font-bold text-[#7A616F] flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-[#781539]" />
                      <span>{e.comments.length > 0 ? `${e.comments.length} mot${e.comments.length > 1 ? `s` : ``}` : `Encourager`}</span>
                    </button>
                  </div>
                  {t && (
                    <div className="pt-2 space-y-2.5">
                      {e.comments.map((e) => (
                        <div key={e.id} className="p-2.5 rounded-2xl bg-[#FAF5F8] flex items-start justify-between gap-2 text-xs">
                          <div>
                            <span className="font-bold text-[#781539] mr-1.5">{e.authorName}</span>
                            <span className="text-[#1F0C17]">{e.text}</span>
                          </div>
                          <span className="text-[10px] text-[#8C6D7E] shrink-0">{e.createdAt}</span>
                        </div>
                      ))}
                      <form
                        onSubmit={(t) => {
                          t.preventDefault()
                          let n = be[e.id] || ``
                          n.trim() &&
                            (addComment(e.id, n),
                            xe((t) => ({
                              ...t,
                              [e.id]: ``,
                            })))
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          type="text"
                          value={be[e.id] || ``}
                          onChange={(t) =>
                            xe((n) => ({
                              ...n,
                              [e.id]: t.target.value,
                            }))
                          }
                          placeholder={`Écrire un mot d’encouragement à ${e.authorName}...`}
                          className="flex-1 px-3.5 py-2 rounded-full bg-[#F4E9F0] text-xs text-[#1F0C17] font-medium focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 rounded-full bg-[#781539] text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    </div>
                  )}
                </article>
              )
            })}
            {feedPosts.length === 0 && (
              <div className="p-6 rounded-[28px] bg-white border border-[#F3E5ED] text-center space-y-2 shadow-2xs">
                <p className="font-display font-bold text-sm text-[#1F0C17]">Le fil d’activité est encore vierge ✨</p>
                <p className="text-xs text-[#7A616F] max-w-md mx-auto">
                  Ajoute tes amies, envoie un Wizz ou publie ta dernière séance, un record personnel (PR) ou une invitation de séance pour
                  inaugurer le Club !
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {oe === `besties` && (
        <div className="space-y-5">
          <div className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Trouver vos créneaux communs</span>
                <h2 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">Comparateur de planning 7 jours</h2>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {friends.map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => Ye(e.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${Nt?.id === e.id ? `bg-[#781539] text-white` : `bg-[#F4E9F0] text-[#7A616F] hover:text-[#1F0C17]`}`}
                  >
                    Avec {e.displayName}
                  </button>
                ))}
              </div>
            </div>
            {Nt ? (
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6, 0].map((e) => {
                  let t = weeklyPlans.find((t) => Number(t.dayOfWeek) === e),
                    n = Nt.weeklySchedule.find((t) => Number(t.dayOfWeek) === e),
                    r = t?.activity || `Repos`,
                    a = n?.activity || `Repos`,
                    o = r !== `Repos` && t?.status !== `rest`,
                    s = !!n?.isTraining && a !== `Repos`,
                    c = o && s
                  return (
                    <div
                      key={e}
                      className={`p-3 rounded-2xl grid grid-cols-12 items-center gap-2 text-xs border ${c ? `bg-grainy-pink border-[#F472B6]/40` : `bg-[#FAF5F8] border-transparent`}`}
                    >
                      <div className="col-span-3 sm:col-span-2 font-display font-bold text-[#1F0C17] flex items-center gap-1.5">
                        <span>{t?.dayName || n?.dayName}</span>
                      </div>
                      <div className="col-span-4 sm:col-span-4">
                        <span className="text-[10px] font-semibold text-[#7A616F] block">Toi</span>
                        <span className="font-bold text-[#1F0C17] truncate block">{r}</span>
                      </div>
                      <div className="col-span-5 sm:col-span-4">
                        <span className="text-[10px] font-semibold text-[#7A616F] block">{Nt.displayName}</span>
                        <span className="font-bold text-[#781539] truncate block">{a}</span>
                      </div>
                      <div className="col-span-12 sm:col-span-2 flex sm:justify-end">
                        {c ? (
                          <span className="px-2.5 py-1 rounded-full bg-[#781539] text-white text-[10px] font-bold inline-flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#FBCFE8]" /> Match !
                          </span>
                        ) : (
                          <span className="text-[10px] text-[#8C6D7E]">Décalé</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-[#FAF5F8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-xs text-[#7A616F]">
                  Ajoute une amie pour comparer vos plannings 7 jours et repérer vos créneaux d’entraînement communs.
                </p>
                <button
                  type="button"
                  onClick={() => se(`friends`)}
                  className="px-3.5 py-2 rounded-full bg-[#781539] text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Ajouter une amie
                </button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="p-5 rounded-[28px] bg-[#F4E9F0] space-y-3.5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Rendez-vous à la salle</span>
                <h3 className="font-display font-bold text-base text-[#1F0C17]">Proposer « On s’entraîne ensemble ? »</h3>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  let t = createGymDateInvite({
                    friendId: Xe || friends[0]?.id || ``,
                    customFriendQuery: Qe,
                    dayOfWeek: et,
                    dayLabel:
                      {
                        1: `Lundi`,
                        2: `Mardi`,
                        3: `Mercredi`,
                        4: `Jeudi`,
                        5: `Vendredi`,
                        6: `Samedi`,
                        0: `Dimanche`,
                      }[et] || `Vendredi`,
                    timeSlot: nt,
                    workoutTheme: it,
                    locationNote: ot,
                  })
                  t
                    ? ($e(``),
                      ye(t.id),
                      Et(
                        `📅 Invitation envoyée à ${t.friendName} (${t.dayLabel} à ${t.timeSlot}) ! Visible dans « Séances communes programmées » et dans le Fil.`,
                      ),
                      setTimeout(() => {
                        j.current?.scrollIntoView({
                          behavior: `smooth`,
                          block: `nearest`,
                        })
                      }, 100),
                      setTimeout(() => ye(null), 5e3))
                    : Et(`Entre le @pseudo d’une amie ou ajoute une Gym Bestie pour envoyer l’invitation !`)
                }}
                className="space-y-3"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Gym Bestie</label>
                    {friends.length > 0 ? (
                      <select
                        value={Xe || friends[0]?.id || ``}
                        onChange={(e) => Ze(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-white text-xs font-bold text-[#1F0C17]"
                      >
                        {friends.map((e) => (
                          <option key={e.id} value={e.id}>
                            {e.displayName} ({e.handle})
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={Qe}
                        onChange={(e) => $e(e.target.value)}
                        placeholder="Prénom ou @pseudo (ex: @lea.glow)"
                        className="w-full px-3 py-2 rounded-xl bg-white text-xs font-bold text-[#1F0C17]"
                      />
                    )}
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Jour & Heure</label>
                    <div className="flex gap-1.5">
                      <select
                        value={et}
                        onChange={(e) => tt(Number(e.target.value))}
                        className="flex-1 px-2.5 py-2 rounded-xl bg-white text-xs font-bold text-[#1F0C17]"
                      >
                        <option value={1}>Lundi</option>
                        <option value={2}>Mardi</option>
                        <option value={3}>Mercredi</option>
                        <option value={4}>Jeudi</option>
                        <option value={5}>Vendredi</option>
                        <option value={6}>Samedi</option>
                        <option value={0}>Dimanche</option>
                      </select>
                      <input
                        type="text"
                        value={nt}
                        onChange={(e) => rt(e.target.value)}
                        className="w-18 px-2.5 py-2 rounded-xl bg-white text-xs font-bold text-[#1F0C17]"
                        placeholder="18h00"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Séance prévue ensemble</label>
                  <input
                    type="text"
                    value={it}
                    onChange={(e) => at(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white text-xs font-semibold text-[#1F0C17]"
                    placeholder="Ex: Leg Day & Fessiers (4 exos)"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Petit rappel matériel / note</label>
                  <input
                    type="text"
                    value={ot}
                    onChange={(e) => st(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white text-xs text-[#5C3A4D]"
                    placeholder="Ex: N'oublie pas tes sangles de cheville !"
                  />
                </div>
                <button
                  type="submit"
                  disabled={friends.length === 0 && !Qe.trim()}
                  className="w-full py-2.5 px-4 rounded-full bg-[#781539] hover:bg-[#500724] disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {friends.length === 0 && !Qe.trim()
                      ? `Entre le @pseudo d’une amie ci-dessus pour inviter`
                      : `Envoyer l’invitation de séance`}
                  </span>
                </button>
              </form>
            </div>
            <div ref={j} className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">
                    Vos créneaux à deux (affichés ici & dans le Fil)
                  </span>
                  <h3 className="font-display font-bold text-base text-[#1F0C17]">Séances communes programmées ({gymDates.length})</h3>
                </div>
                {gymDates.length > 0 && (
                  <span className="px-2.5 py-1 rounded-full bg-[#FCE7F3] text-[#781539] font-mono text-xs font-bold">
                    {gymDates.length} RDV
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                {gymDates.length === 0 && (
                  <p className="text-xs text-[#7A616F] py-4 text-center">
                    Aucune séance commune programmée pour le moment. Remplis le formulaire à gauche pour envoyer une invitation !
                  </p>
                )}
                {gymDates.map((e) => {
                  let t = ve === e.id
                  return (
                    <div
                      key={e.id}
                      className={`p-3.5 rounded-2xl border space-y-2 transition-all ${t ? `bg-grainy-pink border-[#781539] ring-2 ring-[#F472B6]/50 shadow-sm` : `bg-[#FAF5F8] border-[#F3E5ED]`}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="w-8 h-8 rounded-xl text-white font-display font-bold text-xs flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: e.friendAvatarColor,
                            }}
                          >
                            {e.friendName.charAt(0)}
                          </span>
                          <div className="min-w-0">
                            <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17] truncate">
                              Avec {e.friendName} · {e.dayLabel} à {e.timeSlot}
                            </p>
                            <p className="text-[11px] font-semibold text-[#781539] truncate">{e.workoutTheme}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${e.status === `accepted` ? `bg-[#FCE7F3] text-[#781539]` : e.status === `declined` ? `bg-gray-100 text-gray-500` : `bg-amber-100 text-amber-800`}`}
                          >
                            {e.status === `accepted` ? `Invitation envoyée ✓` : e.status === `declined` ? `Reporté` : `En attente`}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              ;(deleteGymDateInvite(e.id), Et(`Invitation de séance annulée.`))
                            }}
                            className="p-1.5 rounded-full text-[#8C6D7E] hover:text-[#781539] hover:bg-white cursor-pointer"
                            title="Supprimer cette invitation"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      {e.locationNote && <p className="text-[11px] text-[#7A616F] italic">« {e.locationNote} »</p>}
                      <div className="flex items-center justify-between text-[10px] text-[#8C6D7E]">
                        <span>{e.createdAt}</span>
                        <span>Visible aussi dans l’onglet Fil & Activité</span>
                      </div>
                      {e.status === `pending` && (
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              ;(respondToGymDate(e.id, true), Et(`Séance de ${e.dayLabel} confirmée avec ${e.friendName} !`))
                            }}
                            className="flex-1 py-2 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer"
                          >
                            Accepter le RDV
                          </button>
                          <button
                            type="button"
                            onClick={() => respondToGymDate(e.id, false)}
                            className="px-3 py-2 rounded-full bg-white text-[#7A616F] text-xs font-bold cursor-pointer"
                          >
                            Plus tard
                          </button>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Bibliothèque entre amies</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">
                  Séances personnalisées partagées par tes amies
                </h3>
              </div>
            </div>
            {friends.flatMap((e) => e.sharedRoutines).length === 0 ? (
              <p className="text-xs text-[#7A616F] py-3">
                Dès qu’une amie rejoint ton cercle et partage une de ses séances en 4 exercices, tu pourras l’importer ici en 1 clic.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {friends
                  .flatMap((e) =>
                    e.sharedRoutines.map((t) => ({
                      friend: e,
                      routine: t,
                    })),
                  )
                  .map(({ friend, routine }) => {
                    let n = !!ct[routine.name]
                    return (
                      <div
                        key={routine.name}
                        className="p-4 rounded-[24px] bg-[#FAF5F8] border border-[#F3E5ED] flex flex-col justify-between gap-3"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-[#FCE7F3] text-[#781539] text-[10px] font-bold">
                              Par {friend.displayName} ({friend.handle})
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[#7A616F]">{routine.exercises.length} exercices</span>
                          </div>
                          <h4 className="font-display font-bold text-sm sm:text-base text-[#1F0C17]">{routine.name}</h4>
                          {routine.description && <p className="text-xs text-[#7A616F]">{routine.description}</p>}
                          <div className="space-y-1 pt-1">
                            {routine.exercises.map((e, t) => (
                              <p key={e.id} className="text-xs font-medium text-[#1F0C17]">
                                <strong className="text-[#781539]">{t + 1}.</strong> {e.exerciseName} ({e.sets.length} séries)
                              </p>
                            ))}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => Rt(routine)}
                          className={`w-full py-2.5 px-4 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${n ? `bg-[#FCE7F3] text-[#781539]` : `bg-[#781539] hover:bg-[#500724] text-white`}`}
                        >
                          {n ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span>Ajoutée dans tes séances</span>
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4" />
                              <span>Importer dans mes séances</span>
                            </>
                          )}
                        </button>
                      </div>
                    )
                  })}
              </div>
            )}
            <div className="pt-2 border-t border-[#F3E5ED] flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold text-[#7A616F]">Envoyer une de tes routines au Club :</span>
              <div className="flex flex-wrap gap-2">
                {routines.slice(0, 3).map((e) => (
                  <button
                    key={e.id}
                    type="button"
                    onClick={() => {
                      ;(shareRoutineToClub(e), Et(`Ta routine « ${e.name} » a été partagée à tes amies !`))
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Share2 className="w-3 h-3" />
                    <span>{e.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {oe === `challenges` && (
        <div className="space-y-5">
          <div className="p-5 rounded-[28px] bg-grainy-pink border border-[#F472B6]/35 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-[#781539] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Flame className="w-6 h-6 text-[#FBCFE8]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Série de régularité en binôme</span>
                  <h2 className="font-display font-bold text-lg sm:text-xl text-[#1F0C17]">
                    {Pt ? `Duo Streak : ${mySocialProfile.duoStreakWeeks} semaines d’affilée 🔥` : `Duo Streak : Aucun binôme actif`}
                  </h2>
                  <p className="text-xs text-[#5C3A4D]">
                    {Pt ? (
                      <>
                        En binôme avec <strong>{Pt.displayName}</strong> — vous avez toutes les deux tenu votre planning !
                      </>
                    ) : (
                      `Ajoute une Gym Bestie pour démarrer votre série de régularité à deux !`
                    )}
                  </p>
                </div>
              </div>
              {friends.length > 0 ? (
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#781539]">Binôme :</span>
                  {friends.map((e) => (
                    <button
                      key={e.id}
                      type="button"
                      onClick={() => {
                        ;(setDuoPartner(e.id), Et(`${e.displayName} est maintenant ton binôme Duo Streak !`))
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${Pt?.id === e.id ? `bg-[#781539] text-white shadow-2xs` : `bg-white/80 text-[#781539] hover:bg-white`}`}
                    >
                      {e.displayName}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => se(`friends`)}
                  className="px-3.5 py-2 rounded-full bg-[#781539] text-white text-xs font-bold shrink-0 cursor-pointer"
                >
                  Ajouter une amie
                </button>
              )}
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] shadow-2xs space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Défi collectif hebdomadaire</span>
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">{collectiveChallenge.title}</h3>
                <p className="text-xs text-[#7A616F] mt-0.5">{collectiveChallenge.description}</p>
              </div>
              <button
                type="button"
                onClick={() => Ct((e) => !e)}
                className="px-3 py-1.5 rounded-full bg-[#F4E9F0] text-[#781539] text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <PenLine className="w-3.5 h-3.5" />
                <span>Objectif</span>
              </button>
            </div>
            {St && (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  let t = parseInt(wt, 10) || 12
                  ;(updateCollectiveChallengeTarget(t), Ct(false), Et(`Cagnotte mise à jour : ${t} séances collectives !`))
                }}
                className="p-3 rounded-2xl bg-[#F4E9F0] flex items-center gap-2"
              >
                <span className="text-xs font-bold text-[#1F0C17]">Cible de séances cette semaine :</span>
                <input
                  type="number"
                  min={3}
                  max={40}
                  value={wt}
                  onChange={(e) => Tt(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl bg-white text-xs font-mono font-bold text-[#781539]"
                />
                <button type="submit" className="px-3.5 py-1.5 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer">
                  Valider
                </button>
              </form>
            )}
            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="font-mono font-extrabold text-xl text-[#781539]">
                  {Ft} / {collectiveChallenge.targetSessions} séances
                </span>
                <span className="text-xs font-bold text-[#7A616F]">{It}% de la cagnotte</span>
              </div>
              <div className="w-full h-3.5 rounded-full bg-[#F4E9F0] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#781539] to-[#EA3E8E] transition-all duration-500"
                  style={{
                    width: `${It}%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              {collectiveChallenge.contributions.map((e) => (
                <div key={e.userId} className="p-3 rounded-2xl bg-[#FAF5F8] border border-[#F3E5ED] flex items-center gap-2.5">
                  <span
                    className="w-8 h-8 rounded-xl text-white font-display font-bold text-xs flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: e.avatarColor,
                    }}
                  >
                    {e.name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <p className="font-display font-bold text-xs text-[#1F0C17] truncate">{e.name}</p>
                    <p className="font-mono text-[11px] font-bold text-[#781539]">+{e.sessionsCount} séances</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] shadow-2xs space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">
                100 % basé sur l’assiduité · Zéro comparaison de poids
              </span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">Podium de régularité bienveillant</h3>
            </div>
            <div className="space-y-2.5">
              {Lt.map((e, t) => (
                <div
                  key={e.id}
                  className={`p-3.5 rounded-2xl flex items-center justify-between gap-3 ${t === 0 ? `bg-grainy-pink border border-[#F472B6]/40` : `bg-[#FAF5F8] border border-[#F3E5ED]`}`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-7 h-7 rounded-full bg-white text-[#781539] font-mono font-extrabold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      #{t + 1}
                    </span>
                    <span
                      className="w-9 h-9 rounded-2xl text-white font-display font-bold text-sm flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: e.avatarColor,
                      }}
                    >
                      {e.name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17] truncate">{e.name}</p>
                      <p className="text-[11px] text-[#7A616F]">
                        {e.sessionsDone}/{e.sessionsTarget} séances · Série de {e.streakWeeks} sem.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="px-3 py-1 rounded-full bg-white text-[#781539] font-mono font-bold text-xs shadow-2xs">
                      {e.score}% régulière
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-[#F4E9F0] space-y-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Tes trophées Glow Up Lab</span>
              <h3 className="font-display font-bold text-base sm:text-lg text-[#1F0C17]">
                Badges sociaux & régularité ({badges.filter((e) => e.unlocked).length}/{badges.length})
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((e) => (
                <div
                  key={e.id}
                  className={`p-4 rounded-[22px] border flex flex-col justify-between gap-2 ${e.unlocked ? `bg-white border-[#FBCFE8] shadow-2xs` : `bg-white/50 border-transparent opacity-70`}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center ${e.unlocked ? `bg-[#FCE7F3] text-[#781539]` : `bg-[#F4E9F0] text-[#8C6D7E]`}`}
                    >
                      <Icon name={e.icon} className="w-5 h-5" />
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${e.unlocked ? `bg-[#781539] text-white` : `bg-[#F4E9F0] text-[#7A616F]`}`}
                    >
                      {e.unlocked ? `Débloqué ✓` : `En cours`}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#1F0C17]">{e.title}</h4>
                    <p className="text-[11px] text-[#7A616F] mt-0.5">{e.description}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#781539]">{e.progressText}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {oe === `friends` && (
        <div className="space-y-5">
          <div className="p-5 rounded-[28px] bg-grainy-pink border border-[#F472B6]/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                <span className="w-14 h-14 rounded-2xl bg-[#781539] text-white font-display font-extrabold text-xl flex items-center justify-center shrink-0 shadow-sm">
                  {ae.charAt(0).toUpperCase()}
                </span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="font-display font-bold text-lg text-[#1F0C17]">{ae}</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/85 text-[#781539] font-mono font-bold text-xs">
                      {mySocialProfile.handle}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#781539] text-white font-mono font-bold text-[11px]">
                      Code : {mySocialProfile.friendCode}
                    </span>
                  </div>
                  <p className="text-xs text-[#5C3A4D] mt-1">{mySocialProfile.bioStatus}</p>
                  <p className="text-[11px] font-semibold text-[#781539] mt-0.5">
                    Exercice favori : <strong>{mySocialProfile.favoriteExercise}</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    ;(_t(mySocialProfile.handle), yt(mySocialProfile.bioStatus), xt(mySocialProfile.favoriteExercise), ht((e) => !e))
                  }}
                  className="px-3.5 py-2 rounded-full bg-white text-[#781539] text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Personnaliser</span>
                </button>
                <button
                  type="button"
                  onClick={zt}
                  className="px-3.5 py-2 rounded-full bg-[#781539] text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copier mon lien d’invitation</span>
                </button>
              </div>
            </div>
            {mt && (
              <form
                onSubmit={async (e) => {
                  ;(e.preventDefault(),
                    await updateMySocialProfile({
                      handle: gt.trim() || mySocialProfile.handle,
                      bioStatus: vt.trim() || mySocialProfile.bioStatus,
                      favoriteExercise: bt.trim() || mySocialProfile.favoriteExercise,
                    }),
                    ht(false),
                    Et(`Ta carte de profil sportif a été mise à jour !`))
                }}
                className="p-4 rounded-2xl bg-white/90 space-y-3 border border-white"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Ton @pseudo unique</label>
                    <input
                      type="text"
                      value={gt}
                      onChange={(e) => _t(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4E9F0] text-xs font-bold text-[#1F0C17]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Ton exercice favori</label>
                    <input
                      type="text"
                      value={bt}
                      onChange={(e) => xt(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#F4E9F0] text-xs font-bold text-[#1F0C17]"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-[#7A616F] block mb-1">Statut motivant (visible par tes amies)</label>
                  <input
                    type="text"
                    value={vt}
                    onChange={(e) => yt(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F4E9F0] text-xs text-[#1F0C17]"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => ht(false)}
                    className="px-3.5 py-1.5 rounded-full bg-[#F4E9F0] text-xs font-bold text-[#7A616F]"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="px-4 py-1.5 rounded-full bg-[#781539] text-white text-xs font-bold">
                    Enregistrer
                  </button>
                </div>
              </form>
            )}
            <div className="p-3.5 rounded-2xl bg-white/85 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                {mySocialProfile.hideWeights ? <EyeOff className="w-4 h-4 text-[#781539]" /> : <Eye className="w-4 h-4 text-[#781539]" />}
                <div>
                  <p className="text-xs font-bold text-[#1F0C17]">Mode Confidentialité (« Masquer mes charges »)</p>
                  <p className="text-[11px] text-[#7A616F]">
                    Tes mensurations restent toujours 100 % privées. Active cette option pour partager tes séances sans afficher les kg.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() =>
                  updateMySocialProfile({
                    hideWeights: !mySocialProfile.hideWeights,
                  })
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${mySocialProfile.hideWeights ? `bg-[#781539] text-white` : `bg-[#F4E9F0] text-[#781539]`}`}
              >
                {mySocialProfile.hideWeights ? `Activé 🔒` : `Désactivé`}
              </button>
            </div>
          </div>
          <div className="p-5 rounded-[28px] bg-white border border-[#F3E5ED] shadow-2xs space-y-3.5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#781539] block">Ajouter une Gym Bestie</span>
              <h3 className="font-display font-bold text-base text-[#1F0C17]">Ajoute une amie et choisis comment tu veux l’appeler</h3>
            </div>
            <form onSubmit={Vt} className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <input
                type="text"
                value={ft}
                onChange={(e) => pt(e.target.value)}
                placeholder="Son prénom ou surnom (ex: Ma Chloé, Camille...)"
                className="sm:col-span-5 px-4 py-2.5 rounded-full bg-[#F4E9F0] text-xs font-semibold text-[#1F0C17] focus:outline-hidden"
              />
              <input
                type="text"
                value={ut}
                onChange={(e) => dt(e.target.value)}
                placeholder="@pseudo ou Code Ami (ex: @chloe ou GLOW-53M)..."
                className="sm:col-span-5 px-4 py-2.5 rounded-full bg-[#F4E9F0] text-xs font-semibold text-[#1F0C17] focus:outline-hidden"
              />
              <button
                type="submit"
                className="sm:col-span-2 px-4 py-2.5 rounded-full bg-[#781539] hover:bg-[#500724] text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Ajouter</span>
              </button>
            </form>
            {Mt.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold text-[#781539] block">Demandes d’amies reçues ({Mt.length})</span>
                {Mt.map((e) => (
                  <div
                    key={e.id}
                    className="p-3.5 rounded-2xl bg-[#FCE7F3]/60 border border-[#FBCFE8] flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-10 h-10 rounded-2xl text-white font-display font-bold text-sm flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: e.fromUser.avatarColor,
                        }}
                      >
                        {e.fromUser.displayName.charAt(0)}
                      </span>
                      <div>
                        <p className="font-display font-bold text-xs sm:text-sm text-[#1F0C17]">
                          {e.fromUser.displayName} <span className="text-[#7A616F] font-normal">({e.fromUser.handle})</span>
                        </p>
                        <p className="text-[11px] text-[#7A616F]">{e.fromUser.bioStatus}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          ;(acceptFriendRequest(e.id), Et(`${e.fromUser.displayName} fait maintenant partie de tes amies !`))
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer"
                      >
                        Accepter
                      </button>
                      <button
                        type="button"
                        onClick={() => declineFriendRequest(e.id)}
                        className="px-3 py-1.5 rounded-full bg-white text-[#7A616F] text-xs font-bold cursor-pointer"
                      >
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="font-display font-bold text-base text-[#1F0C17] px-1">Mes Gym Besties ({friends.length})</h3>
            {friends.length === 0 ? (
              <div className="p-6 rounded-[26px] bg-white border border-[#F3E5ED] shadow-2xs text-center space-y-2">
                <p className="font-display font-bold text-sm text-[#1F0C17]">Aucune amie dans ton cercle pour l’instant 🌸</p>
                <p className="text-xs text-[#7A616F] max-w-md mx-auto">
                  Utilise la barre de recherche ci-dessus pour ajouter une amie avec son @pseudo ou son code GLOW-XXX, ou partage ton QR
                  Code !
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {friends.map((e) => (
                  <div
                    key={e.id}
                    className="p-4 rounded-[26px] bg-white border border-[#F3E5ED] shadow-2xs flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-11 h-11 rounded-2xl text-white font-display font-bold text-base flex items-center justify-center shrink-0"
                            style={{
                              backgroundColor: e.avatarColor,
                            }}
                          >
                            {e.displayName.charAt(0)}
                          </span>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <p className="font-display font-bold text-sm text-[#1F0C17]">{e.displayName}</p>
                              <button
                                type="button"
                                onClick={() => Ht(e)}
                                className="p-1 rounded-full bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#781539] cursor-pointer"
                                title="Renommer cette amie comme tu veux"
                              >
                                <PenLine className="w-3 h-3" />
                              </button>
                            </div>
                            <p className="text-xs text-[#7A616F]">{e.handle}</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-[#F4E9F0] text-[#781539] font-mono text-[10px] font-bold">
                          {e.totalWorkouts} séances
                        </span>
                      </div>
                      <p className="text-xs text-[#5C3A4D]">{e.bioStatus}</p>
                      <p className="text-[11px] text-[#7A616F]">
                        Ex. favori : <strong className="text-[#781539]">{e.favoriteExercise}</strong>
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 pt-1">
                      <button
                        type="button"
                        onClick={() => Ht(e)}
                        className="px-3 py-2 rounded-full bg-[#FCE7F3] hover:bg-[#FBCFE8] text-[#781539] text-xs font-bold flex items-center gap-1 cursor-pointer"
                        title="Choisir son nom / surnom"
                      >
                        <PenLine className="w-3 h-3" />
                        <span>Renommer</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => ke(e)}
                        className="flex-1 py-2 rounded-full bg-[#F4E9F0] hover:bg-[#FCE7F3] text-[#781539] text-xs font-bold cursor-pointer"
                      >
                        Carte
                      </button>
                      <button
                        type="button"
                        onClick={() => jt(e)}
                        className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${pokedFriendIds[e.id] || e.lastPokedAt ? `bg-[#FCE7F3] text-[#781539] border border-[#F472B6]/40` : `bg-[#781539] hover:bg-[#500724] text-white`}`}
                        title="Envoyer un Wizz motivation"
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Wizz ⚡</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <WorkoutStoryRecap isOpen={we} onClose={() => Te(false)} workout={workouts[0] || null} />
      <Sheet
        isOpen={!!Me}
        onClose={() => Ne(null)}
        title={Me ? `Renommer ${Me.displayName}` : `Renommer mon amie`}
        subtitle="Choisis le prénom, surnom ou pseudo que tu veux afficher pour elle"
      >
        {Me && (
          <form onSubmit={Ut} className="space-y-3.5">
            <div>
              <label className="text-xs font-bold text-[#1F0C17] block mb-1">Prénom ou surnom affiché *</label>
              <input
                type="text"
                required
                value={Pe}
                onChange={(e) => Fe(e.target.value)}
                placeholder="Ex: Ma Chloé, Camille, Sarah Bestie..."
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs font-bold text-[#1F0C17]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1F0C17] block mb-1">Son @pseudo</label>
              <input
                type="text"
                value={Ie}
                onChange={(e) => Le(e.target.value)}
                placeholder="@chloe.glow"
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs font-semibold text-[#781539]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1F0C17] block mb-1">Petite bio / note sur sa carte</label>
              <input
                type="text"
                value={Re}
                onChange={(e) => ze(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs text-[#1F0C17]"
              />
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer">
              Enregistrer son nouveau nom ✨
            </button>
          </form>
        )}
      </Sheet>
      <Sheet
        isOpen={Ee}
        onClose={() => De(false)}
        title="Célébrer un Record Personnel (PR)"
        subtitle="Partage ta victoire avec tes Gym Besties"
      >
        <form
          onSubmit={(e) => {
            ;(e.preventDefault(),
              sharePRToFeed(Be, parseFloat(He) || 80, parseInt(We, 10) || 8, Ke),
              De(false),
              qe(``),
              Et(`Ton nouveau PR a été publié dans le Fil ! 🏆`))
          }}
          className="space-y-3.5"
        >
          <div>
            <label className="text-xs font-bold text-[#1F0C17] block mb-1">Exercice</label>
            <input
              type="text"
              required
              value={Be}
              onChange={(e) => Ve(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs font-bold text-[#1F0C17]"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-[#1F0C17] block mb-1">Charge record (kg)</label>
              <input
                type="number"
                step="0.5"
                required
                value={He}
                onChange={(e) => Ue(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs font-mono font-bold text-[#781539]"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-[#1F0C17] block mb-1">Répétitions</label>
              <input
                type="number"
                required
                value={We}
                onChange={(e) => Ge(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs font-mono font-bold text-[#781539]"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-[#1F0C17] block mb-1">Petit mot (optionnel)</label>
            <input
              type="text"
              value={Ke}
              onChange={(e) => qe(e.target.value)}
              placeholder="Ex: Trop fière, la barre est montée super vite !"
              className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4E9F0] text-xs text-[#1F0C17]"
            />
          </div>
          <button type="submit" className="w-full py-3 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer">
            Publier mon Record Personnel 🏆
          </button>
        </form>
      </Sheet>
      <Sheet isOpen={!!Oe} onClose={() => ke(null)} title={Oe ? `Profil de ${Oe.displayName}` : `Profil`} subtitle={Oe?.handle}>
        {Oe && (
          <div className="space-y-4">
            <div className="p-4 rounded-[26px] bg-grainy-pink border border-[#F472B6]/35 space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <span
                    className="w-14 h-14 rounded-2xl text-white font-display font-extrabold text-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: Oe.avatarColor,
                    }}
                  >
                    {Oe.displayName.charAt(0)}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#1F0C17]">{Oe.displayName}</h4>
                    <p className="text-xs text-[#5C3A4D]">{Oe.bioStatus}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => Ht(Oe)}
                  className="px-3 py-1.5 rounded-full bg-white text-[#781539] text-xs font-bold flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <PenLine className="w-3.5 h-3.5" />
                  <span>Renommer</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-2xl bg-white/85">
                  <span className="font-mono font-extrabold text-base text-[#781539] block">{Oe.totalWorkouts}</span>
                  <span className="text-[10px] font-bold text-[#7A616F]">Séances</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/85">
                  <span className="font-mono font-extrabold text-base text-[#781539] block">{Oe.streakWeeks} sem.</span>
                  <span className="text-[10px] font-bold text-[#7A616F]">Régularité</span>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/85">
                  <span className="font-mono font-extrabold text-base text-[#781539] block">{Oe.objectivesDoneCount}/3</span>
                  <span className="text-[10px] font-bold text-[#7A616F]">Objectifs</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-white/85 text-xs">
                <span className="text-[#7A616F] font-semibold">Exercice favori : </span>
                <strong className="text-[#781539]">{Oe.favoriteExercise}</strong>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {Oe.badges.map((e) => (
                  <span key={e} className="px-2.5 py-1 rounded-full bg-[#781539] text-white text-[10px] font-bold">
                    🏅 {e}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => {
                  ;(jt(Oe), ke(null))
                }}
                className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#781539] to-[#EA3E8E] text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Envoyer un Wizz ⚡</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  ;(Ye(Oe.id), Ze(Oe.id), ke(null), se(`besties`))
                }}
                className="flex-1 py-2.5 px-3 rounded-full bg-[#781539] text-white text-xs font-bold cursor-pointer"
              >
                Inviter / Planning
              </button>
              <button
                type="button"
                onClick={() => {
                  ;(removeFriend(Oe.id), ke(null), Et(`${Oe.displayName} a été retirée de ta liste.`))
                }}
                className="px-4 py-2.5 rounded-full bg-[#F4E9F0] text-[#7A616F] text-xs font-bold cursor-pointer"
              >
                Retirer
              </button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  )
}
