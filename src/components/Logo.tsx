import { brand } from '@/config/brand'

/**
 * Brand lockup — a refined cylinder mark (echoing the hero illustration's
 * labelled bottles) + a two-tone serif wordmark ("Cool" cobalt, "Trade" ink).
 * Colours run through theme tokens so it reads on light and dark.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="38" height="38" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="17" className="fill-ink" />
        {/* cylinder body */}
        <rect x="23" y="16" width="18" height="35" rx="9" className="fill-paper" />
        {/* blue label collar */}
        <rect x="23" y="27" width="18" height="7" fill="#2743E6" />
        {/* valve + handwheel */}
        <rect x="28.5" y="9" width="7" height="8" rx="2.5" className="fill-paper" />
        <circle cx="32" cy="8" r="3.2" className="fill-paper" />
        {/* cold spark */}
        <path d="M48 20v6M45 23h6" stroke="#2743E6" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.44rem] font-semibold tracking-[-0.02em]">
          <span className="text-blue">Cool</span>
          <span className="text-ink">Trade</span>
        </span>
        <span className="mt-[3px] font-mono text-[0.55rem] font-medium uppercase tracking-[0.24em] text-ink-faint">
          {brand.address.city} • {brand.address.country}
        </span>
      </span>
    </span>
  )
}
