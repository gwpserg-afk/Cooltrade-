/**
 * Custom hero illustration — a refrigeration "charging bench": three colour-coded
 * refrigerant cylinders (valve handwheel + labelled collar, like the real
 * bottles) and a pressure gauge, one cylinder linked to the gauge by a charging
 * hose. Clean line art in the brand palette — no stock photo, no emoji. Swap
 * this one component for a product photo later.
 */

function Cylinder({
  x,
  top,
  w,
  h,
  color,
  label,
  fontSize = 13,
}: {
  x: number
  top: number
  w: number
  h: number
  color: string
  label: string
  fontSize?: number
}) {
  const cx = x + w / 2
  return (
    <g>
      {/* contact shadow */}
      <ellipse cx={cx} cy={top + h + 4} rx={w * 0.52} ry="6" className="fill-ink" fillOpacity="0.08" />
      {/* body */}
      <rect x={x} y={top} width={w} height={h} rx={w * 0.42} className="fill-card stroke-ink" strokeWidth="2.5" />
      {/* valve neck */}
      <rect x={cx - 5} y={top - 16} width="10" height="18" rx="3" className="fill-card stroke-ink" strokeWidth="2.2" />
      {/* handwheel */}
      <circle cx={cx} cy={top - 18} r="7" className="fill-card stroke-ink" strokeWidth="2.2" />
      <path d={`M${cx - 7} ${top - 18}h14M${cx} ${top - 25}v14`} className="stroke-ink" strokeWidth="1.8" strokeLinecap="round" />
      {/* colour collar / label */}
      <rect x={x + 4} y={top + 20} width={w - 8} height="26" rx="6" fill={color} />
      <text
        x={cx}
        y={top + 38}
        textAnchor="middle"
        fontFamily="'IBM Plex Mono',monospace"
        fontSize={fontSize}
        fontWeight="600"
        fill="#0b0e14"
        fillOpacity="0.85"
      >
        {label}
      </text>
      {/* level ticks */}
      <path d={`M${x + 14} ${top + h - 60}h${w - 28}M${x + 14} ${top + h - 34}h${w - 28}`} className="stroke-ink" strokeOpacity="0.26" strokeWidth="2" strokeLinecap="round" />
    </g>
  )
}

export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 470" className={className} fill="none" aria-hidden="true" role="img">
      {/* Panel */}
      <rect x="14" y="20" width="492" height="430" rx="24" className="fill-card-2 stroke-line" strokeWidth="1" />
      {/* faint blueprint grid */}
      <g className="stroke-line" strokeOpacity="0.7">
        <path d="M14 130h492M14 240h492M14 350h492" />
        <path d="M140 20v430M270 20v430M400 20v430" />
      </g>

      {/* Bench line */}
      <path d="M52 392h416" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" />

      {/* Charging hose: R32 cylinder valve -> gauge port */}
      <path
        d="M129 138 C 129 96, 300 84, 362 128"
        stroke="#2743E6"
        strokeWidth="3.4"
        strokeLinecap="round"
        fill="none"
        strokeOpacity="0.9"
      />
      <circle cx="362" cy="130" r="4.5" fill="#2743E6" />

      {/* Cylinders */}
      <Cylinder x={90} top={168} w={78} h={224} color="#7E9CB6" label="R32" fontSize={14} />
      <Cylinder x={202} top={214} w={70} h={178} color="#C67DA0" label="R410A" fontSize={12} />
      <Cylinder x={306} top={258} w={62} h={134} color="#5C9DD0" label="R134a" fontSize={11} />

      {/* Pressure gauge — cobalt accent */}
      <g>
        <circle cx="418" cy="150" r="56" className="fill-card stroke-ink" strokeWidth="2.5" />
        <circle cx="418" cy="150" r="45" fill="none" className="stroke-line" />
        <g className="stroke-ink" strokeWidth="2" strokeLinecap="round">
          <path d="M418 110v8M456 150h-8M418 190v-8M380 150h8" />
          <path d="M390 122l6 6M446 122l-6 6M446 178l-6-6M390 178l6-6" strokeOpacity="0.4" />
        </g>
        <g className="motion-safe:animate-gauge" style={{ transformOrigin: '418px 150px' }}>
          <path d="M418 150l22-19" stroke="#2743E6" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <circle cx="418" cy="150" r="6" className="fill-ink" />
        <text x="418" y="228" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="11" className="fill-ink-faint" letterSpacing="1">PRESSION · BAR</text>
      </g>

      {/* Snow / cold accents */}
      <g stroke="#2743E6" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path d="M472 324v18M463 333h18M466 327l12 12M478 327l-12 12" />
        <path d="M60 116v12M54 122h12M56 118l8 8M64 118l-8 8" />
      </g>
    </svg>
  )
}
