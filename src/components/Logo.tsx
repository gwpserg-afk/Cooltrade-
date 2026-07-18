import { brand } from '@/config/brand'

/**
 * Brand lockup — a refined cylinder mark + a two-tone serif wordmark
 * ("Cool" cobalt, "Trade" ink). Colours run through theme tokens so the mark
 * reads on light and dark. Uses the config brand name so a rename never touches
 * this component.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="shrink-0">
        {/* rounded tile */}
        <rect width="64" height="64" rx="16" className="fill-ink" />
        {/* refrigerant cylinder */}
        <rect x="23" y="17" width="18" height="34" rx="9" fill="#2743E6" />
        {/* valve */}
        <rect x="28.5" y="10" width="7" height="9" rx="2.5" className="fill-paper" />
        {/* level lines */}
        <path d="M28 30h8M28 38h8" className="stroke-paper" strokeWidth="2.2" strokeLinecap="round" />
        {/* cold spark */}
        <circle cx="47" cy="20" r="2.4" fill="#2743E6" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.42rem] font-semibold tracking-[-0.02em]">
          <span className="text-blue">Cool</span>
          <span className="text-ink">Trade</span>
        </span>
        <span className="mt-[3px] font-mono text-[0.54rem] font-medium uppercase tracking-[0.3em] text-ink-faint">
          {brand.address.country}
        </span>
      </span>
    </span>
  )
}
