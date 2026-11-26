import { Music2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Modal } from '../../components/ui'
import { useAuth } from '../auth/AuthProvider'

/** Feuille « Musique » de l'app d'origine : ouvrir sa playlist, ouvrir Spotify, enregistrer le lien. */
export function MusicSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { profile, saveProfile } = useAuth()
  const [link, setLink] = useState(profile?.spotifyUrl ?? '')
  const [saved, setSaved] = useState(false)
  useEffect(() => { if (open) setLink(profile?.spotifyUrl ?? '') }, [open, profile?.spotifyUrl])
  const valid = !link.trim() || /^https:\/\/(open\.)?spotify\.com\//.test(link.trim())
  return (
    <Modal open={open} onClose={onClose} title="Musique" subtitle="Lance ta playlist avant ta première série" maxWidth="max-w-sm">
      <div className="space-y-3">
        {profile?.spotifyUrl && (
          <a href={profile.spotifyUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-[#1DB954] py-3 text-sm font-semibold text-white"><Music2 size={16} /> Ouvrir ma playlist Spotify</a>
        )}
        <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-full bg-soft py-3 text-sm font-semibold text-plum"><Music2 size={16} /> Ouvrir Spotify</a>
        <form className="space-y-1.5" onSubmit={async (e) => { e.preventDefault(); if (!valid) return; await saveProfile({ spotifyUrl: link.trim() }); setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
          <label htmlFor="sp_l" className="text-sm font-semibold">Lien de ta playlist</label>
          <div className="flex gap-2">
            <input id="sp_l" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://open.spotify.com/playlist/…" className="min-w-0 flex-1 rounded-2xl border border-blush-line bg-surface px-3 py-2.5 text-sm" />
            <button disabled={!valid} className="rounded-full bg-[#781539] px-4 text-sm font-semibold text-white disabled:opacity-50">{saved ? '✓' : 'OK'}</button>
          </div>
          {!valid && <p className="text-xs text-rose-700">Colle un lien Spotify (open.spotify.com).</p>}
        </form>
      </div>
    </Modal>
  )
}
