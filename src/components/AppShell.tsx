import { ChevronDown, Download, LogOut, Music2, Plus, Share, Sparkles, WifiOff, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthProvider'
import { signOut } from '../features/auth/authService'
import { ProfileModal } from '../features/profile/ProfileModal'
import { useWorkout } from '../store/WorkoutStore'
import { Icon, type IconName } from './Icon'
import { Logo } from './Logo'
import { Modal } from './ui'

export const DEFAULT_SPOTIFY = 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM'

const NAV: { to: string; label: string; short?: string; icon: IconName; mobile?: boolean }[] = [
  { to: '/', label: 'Accueil', icon: 'home', mobile: true },
  { to: '/programmes', label: 'Programmes', icon: 'sparkle', mobile: true },
  { to: '/exercices', label: 'Exercices', icon: 'dumbbell', mobile: true },
  { to: '/seances', label: 'Séances', icon: 'weightlifter' },
  { to: '/planning', label: 'Planning', icon: 'calendar', mobile: true },
  { to: '/suivi', label: 'Suivi', icon: 'heart-pulse', mobile: true },
  { to: '/social', label: 'Social & Amies', short: 'Social', icon: 'user', mobile: true },
]

export function AppShell() {
  const { profile, user } = useAuth()
  const { activeWorkout, cancelActiveWorkout } = useWorkout()
  const location = useLocation()
  const navigate = useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const inSession = location.pathname === '/seance'
  const dark = !!activeWorkout
  const name = profile?.displayName || user?.displayName || 'Mon Espace'
  const spotify = profile?.spotifyUrl || DEFAULT_SPOTIFY

  // Le thème sombre s'applique aussi aux fenêtres modales (rendues dans <body>).
  useEffect(() => {
    document.body.classList.toggle('theme-session', dark)
    document.querySelector('meta[name=theme-color]')?.setAttribute('content', dark ? '#12030d' : '#fdfbfd')
  }, [dark])

  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  const confirmCancel = () => {
    if (window.confirm('Fermer la séance en cours ? Les séries non enregistrées seront perdues.')) cancelActiveWorkout()
  }

  return (
    <div className="min-h-dvh bg-bg text-ink transition-colors md:flex">
      <OfflineBanner />

      {/* Barre latérale (ordinateur) */}
      <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-line bg-surface px-4 py-6 md:flex">
        <button onClick={() => navigate('/')} className="mb-6 flex items-center justify-between px-2 text-left" title="Retour à l'accueil">
          <span>
            <span className="block font-display text-lg font-bold">Glow Up Lab</span>
            <span className="block max-w-36 truncate text-xs text-muted">{name}</span>
          </span>
          <Logo size={36} />
        </button>
        <button onClick={() => navigate('/seances')} className="mb-6 flex items-center justify-center gap-2 rounded-full bg-[#831843] py-3 text-sm font-semibold text-white shadow-md shadow-[#831843]/25 transition hover:bg-[#6d1438]">
          <Plus size={16} /> Nouvelle séance
        </button>
        <nav className="flex flex-1 flex-col gap-1" aria-label="Navigation principale">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === '/'}
              className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-4 py-2.5 text-sm font-medium transition ${isActive || (n.to === '/suivi' && location.pathname.startsWith('/suivi')) ? 'bg-soft font-semibold text-plum' : 'text-muted hover:bg-soft/60 hover:text-ink'}`}>
              <Icon name={n.icon} className="size-4 text-pink" /> {n.label}
            </NavLink>
          ))}
          {activeWorkout && !inSession && (
            <div className="mt-4 rounded-2xl border border-blush-line bg-soft p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-plum">Séance en cours</span>
                <button onClick={confirmCancel} title="Fermer la séance" className="text-muted hover:text-ink"><X size={14} /></button>
              </div>
              <p className="mb-2 truncate text-sm font-semibold">{activeWorkout.name}</p>
              <button onClick={() => navigate('/seance')} className="w-full rounded-full bg-pink py-2 text-xs font-bold text-white">Reprendre →</button>
            </div>
          )}
        </nav>
        <div className="flex items-center gap-2 border-t border-line pt-4">
          <button onClick={() => setProfileOpen(true)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-soft py-2.5 text-sm font-semibold text-ink-2 hover:bg-blush">
            <Icon name="user" className="size-4 text-plum" /> Profil
          </button>
          <a href={spotify} target="_blank" rel="noopener noreferrer" title="Playlist Spotify" className="grid size-10 place-items-center rounded-full bg-soft text-plum hover:bg-blush"><Music2 size={16} /></a>
          <button onClick={() => signOut()} title="Se déconnecter" className="grid size-10 place-items-center rounded-full bg-soft text-plum hover:bg-blush"><LogOut size={16} /></button>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* En-tête mobile */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/90 px-4 py-2.5 backdrop-blur-md md:hidden">
          <button onClick={() => navigate('/')} aria-label="Accueil"><Logo size={36} /></button>
          <div className="flex items-center gap-2">
            <InstallButton />
            <a href={spotify} target="_blank" rel="noopener noreferrer" aria-label="Playlist Spotify" className="grid size-9 place-items-center rounded-full border border-line bg-soft text-plum"><Music2 size={15} /></a>
            <button onClick={() => setProfileOpen(true)} aria-label="Mon profil et réglages" className="flex items-center gap-1.5 rounded-full border border-line bg-soft py-1 pr-3 pl-1 text-sm font-semibold">
              <span className="grid size-7 place-items-center rounded-full bg-[#831843] text-xs font-bold text-white">{name.charAt(0).toUpperCase()}</span>
              <span className="max-w-24 truncate">{profile?.displayName || 'Profil'}</span>
              <ChevronDown size={14} className="text-plum" />
            </button>
          </div>
        </header>

        <main className="pb-28 md:pb-10">
          {activeWorkout && !inSession && (
            <div className="sticky top-[57px] z-20 px-4 pt-3 md:top-0 md:px-8">
              <div className="flex items-center justify-between gap-3 rounded-2xl bg-[#831843] px-3 py-2.5 text-white shadow-lg shadow-[#831843]/30">
                <button onClick={() => navigate('/seance')} className="flex min-w-0 items-center gap-3 text-left">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/15"><Icon name="weightlifter" className="size-5" /></span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-blush-line">Séance en cours</span>
                    <span className="block truncate text-sm font-semibold">{activeWorkout.name}</span>
                  </span>
                </button>
                <div className="flex shrink-0 items-center gap-1">
                  <button onClick={() => navigate('/seance')} className="rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-[#831843]">Reprendre</button>
                  <button onClick={confirmCancel} aria-label="Fermer la séance" className="grid size-8 place-items-center rounded-full hover:bg-white/15"><X size={16} /></button>
                </div>
              </div>
            </div>
          )}
          <div key={location.pathname} className="animate-fade-up mx-auto max-w-5xl px-4 pt-5 md:px-8 md:pt-8">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Navigation basse (mobile) */}
      {!inSession && (
        <nav aria-label="Navigation principale" className="pb-safe fixed inset-x-0 bottom-0 z-40 md:hidden">
          <div className="relative mx-3 mb-3 flex items-center rounded-[1.75rem] bg-[#3b0726]/95 px-1 py-1.5 shadow-xl backdrop-blur-md">
            {NAV.filter((n) => n.mobile).slice(0, 3).map((n) => <BottomItem key={n.to} {...n} />)}
            <button onClick={() => navigate(activeWorkout ? '/seance' : '/seances')} aria-label="Séance"
              className="mx-1 -mt-7 flex size-14 shrink-0 flex-col items-center justify-center rounded-full bg-pink text-white shadow-lg shadow-pink/40 ring-4 ring-bg">
              <Plus size={20} /><span className="text-[9px] font-bold">Séance</span>
            </button>
            {NAV.filter((n) => n.mobile).slice(3).map((n) => <BottomItem key={n.to} {...n} />)}
          </div>
        </nav>
      )}

      <ProfileModal open={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  )
}

function BottomItem({ to, label, short, icon }: { to: string; label: string; short?: string; icon: IconName }) {
  return (
    <NavLink to={to} end={to === '/'} className={({ isActive }) => `flex flex-1 flex-col items-center gap-0.5 py-1 text-[10px] font-semibold transition ${isActive ? 'text-white' : 'text-[#fbcfe8]/70'}`}>
      {({ isActive }) => (<>
        <Icon name={icon} className={`size-5 ${isActive ? 'scale-110' : ''} transition`} />
        <span>{short ?? label}</span>
      </>)}
    </NavLink>
  )
}

function OfflineBanner() {
  const [online, setOnline] = useState(navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true), off = () => setOnline(false)
    window.addEventListener('online', on); window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])
  if (online) return null
  return (
    <div className="fixed inset-x-0 top-0 z-[70] flex items-center justify-center gap-2 bg-amber-100 px-4 py-1.5 text-xs font-semibold text-amber-900">
      <WifiOff size={14} /> Mode hors ligne · Vos séances sont sauvegardées localement
    </div>
  )
}

interface InstallPromptEvent extends Event { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> }

/** Bouton d'installation PWA (Android/ordinateur) ou guide iPhone. */
function InstallButton() {
  const [prompt, setPrompt] = useState<InstallPromptEvent | null>(null)
  const [standalone] = useState(() => window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true)
  const [ios] = useState(() => /iphone|ipad|ipod/i.test(navigator.userAgent))
  const [guide, setGuide] = useState(false)
  useEffect(() => {
    const onPrompt = (e: Event) => { e.preventDefault(); setPrompt(e as InstallPromptEvent) }
    const onInstalled = () => setPrompt(null)
    window.addEventListener('beforeinstallprompt', onPrompt); window.addEventListener('appinstalled', onInstalled)
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled) }
  }, [])
  if (standalone || (!prompt && !ios)) return null
  const cls = 'grid size-9 place-items-center rounded-full border border-line bg-soft text-plum'
  if (prompt) return <button className={cls} aria-label="Installer l'application" onClick={async () => { await prompt.prompt(); if ((await prompt.userChoice).outcome === 'accepted') setPrompt(null) }}><Download size={15} /></button>
  return (<>
    <button className={cls} aria-label="Installer sur iPhone" onClick={() => setGuide(true)}><Share size={15} /></button>
    <Modal open={guide} onClose={() => setGuide(false)} title={<span className="flex items-center gap-2"><Sparkles size={18} className="text-pink" /> Installer sur iPhone / iPad</span>} maxWidth="max-w-sm">
      <ol className="space-y-3 text-sm">
        {[<>Touchez le bouton <strong>Partager</strong> dans la barre Safari.</>, <>Faites défiler et appuyez sur <strong>« Sur l’écran d’accueil »</strong>.</>, <>Appuyez sur <strong>Ajouter</strong> en haut à droite.</>].map((t, i) => (
          <li key={i} className="flex gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#831843] text-xs font-bold text-white">{i + 1}</span><p>{t}</p></li>
        ))}
      </ol>
      <button onClick={() => setGuide(false)} className="mt-5 w-full rounded-full bg-[#831843] py-3 text-sm font-semibold text-white">Compris</button>
    </Modal>
  </>)
}
