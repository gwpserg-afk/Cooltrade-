/**
 * Custom hero illustration — a refrigeration "spec bench": three colour-coded
 * cylinders and a pressure gauge, drawn as clean line art in the brand palette.
 * On-subject and professional (no stock photo, no emoji). Structured so a real
 * product photo can replace it later by swapping this one component.
 *
 * Theme-aware colours use Tailwind fill-/stroke- utilities (which emit the CSS
 * token vars); cylinder caps + accents use fixed hex that read on both themes.
 */
export function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 460" className={className} fill="none" aria-hidden="true" role="img">
      {/* Panel */}
      <rect x="14" y="20" width="492" height="420" rx="24" className="fill-card-2 stroke-line" strokeWidth="1" />
      {/* faint blueprint grid */}
      <g className="stroke-line" strokeOpacity="0.6">
        <path d="M14 120h492M14 220h492M14 320h492" />
        <path d="M140 20v420M270 20v420M400 20v420" />
      </g>

      {/* Bench line */}
      <path d="M52 372h416" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" />

      {/* Cylinder 1 — tall (R32 / steel) */}
      <g>
        <rect x="86" y="150" width="78" height="222" rx="30" className="fill-card stroke-ink" strokeWidth="2.5" />
        <rect x="112" y="120" width="26" height="34" rx="8" fill="#7E9CB6" />
        <path d="M104 210h42M104 250h42M104 290h42" className="stroke-ink" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
        <text x="125" y="345" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="15" fontWeight="600" className="fill-ink">R32</text>
      </g>

      {/* Cylinder 2 — medium (R410A / rose) */}
      <g>
        <rect x="200" y="196" width="70" height="176" rx="28" className="fill-card stroke-ink" strokeWidth="2.5" />
        <rect x="223" y="168" width="24" height="32" rx="8" fill="#C67DA0" />
        <path d="M216 244h38M216 282h38" className="stroke-ink" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
        <text x="235" y="345" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="13" fontWeight="600" className="fill-ink">R410A</text>
      </g>

      {/* Cylinder 3 — short (R134a / blue) */}
      <g>
        <rect x="306" y="240" width="62" height="132" rx="26" className="fill-card stroke-ink" strokeWidth="2.5" />
        <rect x="326" y="214" width="22" height="30" rx="7" fill="#5C9DD0" />
        <path d="M320 288h34" className="stroke-ink" strokeOpacity="0.32" strokeWidth="2" strokeLinecap="round" />
        <text x="337" y="345" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="12" fontWeight="600" className="fill-ink">R134a</text>
      </g>

      {/* Pressure gauge — cobalt accent */}
      <g>
        <circle cx="416" cy="150" r="58" className="fill-card stroke-ink" strokeWidth="2.5" />
        <circle cx="416" cy="150" r="47" fill="none" className="stroke-line" />
        <g className="stroke-ink" strokeWidth="2" strokeLinecap="round">
          <path d="M416 108v9M458 150h-9M416 192v-9M374 150h9" />
          <path d="M386 120l6 6M446 120l-6 6M446 180l-6-6M386 180l6-6" strokeOpacity="0.4" />
        </g>
        <g className="motion-safe:animate-gauge" style={{ transformOrigin: '416px 150px' }}>
          <path d="M416 150l24-20" stroke="#2743E6" strokeWidth="3.5" strokeLinecap="round" />
        </g>
        <circle cx="416" cy="150" r="6" className="fill-ink" />
        <text x="416" y="232" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="11" className="fill-ink-faint" letterSpacing="1">PRESSION · BAR</text>
      </g>

      {/* Snow accents */}
      <g stroke="#2743E6" strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <path d="M470 300v18M461 309h18M464 303l12 12M476 303l-12 12" />
        <path d="M62 96v12M56 102h12M58 98l8 8M66 98l-8 8" />
      </g>
    </svg>
  )
}
