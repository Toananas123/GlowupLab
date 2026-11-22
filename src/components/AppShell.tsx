import { Home, LogOut, User } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthProvider'
import { signOut } from '../features/auth/authService'

/** Coquille de l'app connectée : la navigation complète viendra avec les règles de gestion. */
export function AppShell() {
  const { profile, user } = useAuth()
  const link = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-blush-100 text-plum-700' : 'text-plum-900/70 hover:bg-blush-100/60'}`
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-blush-200 bg-white p-4 md:w-60 md:border-r md:border-b-0">
        <p className="font-display text-xl font-bold">Glow Up Lab</p>
        <p className="mb-4 text-xs text-plum-700/60">{profile?.displayName || user?.email}</p>
        <nav className="flex gap-1 md:flex-col">
          <NavLink to="/" end className={link}><Home size={16} /> Accueil</NavLink>
          <NavLink to="/profil" className={link}><User size={16} /> Profil</NavLink>
          <button onClick={() => signOut()} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-plum-900/70 hover:bg-blush-100/60"><LogOut size={16} /> Déconnexion</button>
        </nav>
      </aside>
      <main className="flex-1"><Outlet /></main>
    </div>
  )
}

export function HomePlaceholder() {
  const { profile } = useAuth()
  return (
    <div className="px-6 py-10">
      <h1 className="font-display text-3xl font-bold">Bonjour {profile?.displayName}</h1>
      <p className="mt-2 text-plum-700/70">Le tableau de bord arrive avec les règles de gestion.</p>
    </div>
  )
}
