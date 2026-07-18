import { brand } from '@/config/brand'

/**
 * Brand lockup — serif wordmark + a compact cylinder mark (ink body, cobalt
 * cylinder, paper valve). Uses the config brand name so a rename never touches
 * this component.
 */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 64 64" fill="none" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="15" fill="#181410" />
        <rect x="22" y="14" width="20" height="38" rx="7" fill="#2743E6" />
        <rect x="27.5" y="8" width="9" height="8" rx="2.5" fill="#F1ECE2" />
        <path d="M28 26h8M28 33h8M28 40h8" stroke="#F1ECE2" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[1.4rem] font-semibold tracking-tight text-ink">
          Cool<span>Trade</span>
        </span>
        <span className="mt-0.5 font-mono text-[0.54rem] font-medium uppercase tracking-[0.26em] text-ink-faint">
          {brand.address.country}
        </span>
      </span>
    </span>
  )
}
