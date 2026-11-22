// @ts-nocheck — composant porté automatiquement depuis l'app d'origine.
export const MeasurementChart = ({ data = [38, 42, 36, 48, 44, 58, 64], badgeText, strokeColor = `#EC4899`, width = 200, height = 56 }) => {
  let a = data.length >= 2 ? data : [35, 42, 38, 52, 48, 62],
    o = Math.min(...a),
    s = Math.max(...a) - o || 1,
    c = width - 20,
    l = height - 24,
    u = a.map((e, t) => ({
      x: 10 + (t / (a.length - 1)) * c,
      y: 12 + l - ((e - o) / s) * l,
    })),
    d = ((e) => {
      if (e.length === 0) return ``
      let t = `M ${e[0].x.toFixed(1)} ${e[0].y.toFixed(1)}`
      for (let n = 0; n < e.length - 1; n++) {
        let r = e[n],
          i = e[n + 1],
          a = r.x + (i.x - r.x) * 0.45,
          o = r.y,
          s = r.x + (i.x - r.x) * 0.55,
          c = i.y
        t += ` C ${a.toFixed(1)} ${o.toFixed(1)}, ${s.toFixed(1)} ${c.toFixed(1)}, ${i.x.toFixed(1)} ${i.y.toFixed(1)}`
      }
      return t
    })(u),
    f = u[u.length - 2] || u[u.length - 1]
  return (
    <div className="relative w-full select-none">
      {badgeText && (
        <div className="absolute -top-1 right-2 px-2 py-0.5 rounded-full bg-[#FCFBF9] border border-[#E6E2D8] text-[10px] font-semibold text-[#141414] tabular-nums shadow-2xs">
          {badgeText}
        </div>
      )}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full overflow-visible"
        style={{
          height,
        }}
      >
        {[0.2, 0.45, 0.7, 0.9].map((e, t) => (
          <line
            key={t}
            x1={10 + c * e}
            y1={4}
            x2={10 + c * e}
            y2={height - 2}
            stroke="currentColor"
            strokeOpacity="0.1"
            strokeDasharray="2 2"
            strokeWidth="1"
          />
        ))}
        <path d={d} fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" />
        {f && (
          <g>
            <circle cx={f.x} cy={f.y} r="6" fill={strokeColor} fillOpacity="0.22" />
            <circle cx={f.x} cy={f.y} r="3" fill={strokeColor} />
          </g>
        )}
      </svg>
    </div>
  )
}
