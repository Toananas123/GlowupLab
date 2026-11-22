import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Accepte les variables SUPABASE_* du README en plus des VITE_*.
  envPrefix: ['VITE_', 'SUPABASE_'],
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icon.svg', 'apple-touch-icon.png'],
      manifest: {
        name: 'Glow Up Lab',
        short_name: 'GlowUpLab',
        description: 'Application personnelle et esthétique de musculation et suivi de progression.',
        start_url: '/',
        display: 'standalone',
        background_color: '#fcf9fc',
        theme_color: '#fcf9fc',
        lang: 'fr',
        icons: [
          { src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/pwa-maskable-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: { globPatterns: ['**/*.{js,css,html,svg,png,webp}'], navigateFallback: '/index.html' },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        // Firebase dans son propre fichier : mis en cache séparément du code de l'app.
        advancedChunks: { groups: [{ name: 'firebase', test: /node_modules[\\/](@firebase|firebase)/ }, { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)/ }] },
      },
    },
  },
})
