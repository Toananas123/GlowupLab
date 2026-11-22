/** Logo fleur Glow Up Lab (repris à l'identique). */
export function Logo({ size = 36, variant = 'badge', className = '' }: { size?: number; variant?: 'badge' | 'circle' | 'plain'; className?: string }) {
  const rx = variant === 'circle' ? 256 : variant === 'badge' ? 128 : 0
  return (
    <svg viewBox="0 0 512 512" width={size} height={size} className={`inline-block shrink-0 select-none ${className}`} role="img" aria-label="Glow Up Lab">
      <defs>
        <radialGradient id="flowerBgGlow" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="#EDB2D3" />
          <stop offset="100%" stopColor="#E599C0" />
        </radialGradient>
      </defs>
      {variant !== 'plain' && <rect width="512" height="512" rx={rx} fill="url(#flowerBgGlow)" />}
      <g fill="#FFFFFF">
        {[0, 72, 144, 216, 288].map((a) => <ellipse key={a} cx="256" cy="180" rx="66" ry="88" transform={`rotate(${a} 256 256)`} />)}
        <circle cx="256" cy="256" r="75" />
      </g>
      <path d="M 256 195 Q 256 256 317 256 Q 256 256 256 317 Q 256 256 195 256 Q 256 256 256 195 Z" fill="#D9468F" />
    </svg>
  )
}
