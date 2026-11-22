import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppShell, HomePlaceholder } from './components/AppShell'
import { AuthProvider, useAuth } from './features/auth/AuthProvider'
import { ProfilePage } from './features/profile/ProfilePage'
import { firebaseConfigured } from './lib/firebase'
import { LandingPage } from './pages/LandingPage'

function Routed() {
  const { user, loading } = useAuth()
  if (loading) return <div className="grid min-h-screen place-items-center text-plum-700">Chargement…</div>
  if (!user) return (
    <Routes>
      <Route path="*" element={<LandingPage />} />
    </Routes>
  )
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<HomePlaceholder />} />
        <Route path="profil" element={<ProfilePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      {!firebaseConfigured && (
        <div className="bg-amber-100 px-4 py-2 text-center text-sm text-amber-900">Firebase n'est pas configuré : copie <code>.env.example</code> en <code>.env</code>.</div>
      )}
      <AuthProvider><Routed /></AuthProvider>
    </BrowserRouter>
  )
}
