import { createClient } from '@supabase/supabase-js'

// Noms des variables tels que dans le README (SUPABASE_URL / SUPABASE_ANON_KEY), exposés via envPrefix.
const url = import.meta.env.SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)

export const supabase = createClient(url || 'https://configuration-manquante.supabase.co', anonKey || 'missing', {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
})

/**
 * Mode démo de développement : utilisatrice fictive, données uniquement dans le navigateur.
 * Activé seulement avec `VITE_DEMO=1` sur un build local — jamais sur Vercel.
 */
export const demoMode = import.meta.env.VITE_DEMO === '1' && !supabaseConfigured
