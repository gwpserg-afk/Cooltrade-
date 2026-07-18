import { brand } from '@/config/brand'

/**
 * Brand lockup. The mark is a stylised gas cylinder with a cold "sun" valve —
 * the frost/steel/sun palette in one glyph. Uses the config brand name so a
 * rename never touches this component.
 */
export function Logo({
  variant = 'dark',
  className = '',
}: {
  variant?: 'dark' | 'light'
  className?: string
}) {
  const textColor = variant === 'light' ? 'text-white' : 'text-steel-900'
  const subColor = variant === 'light' ? 'text-frost-200' : 'text-frost-600'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="38"
        height="38"
        viewBox="0 0 64 64"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect width="64" height="64" rx="14" fill="#0e303d" />
        <rect x="22" y="14" width="20" height="38" rx="7" fill="#35c2d5" />
        <rect x="27.5" y="8" width="9" height="8" rx="2.5" fill="#e9831a" />
        <path
          d="M28 26h8M28 33h8M28 40h8"
          stroke="#0e303d"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-700 font-bold ${textColor}`}>
          Cool<span className={subColor}>Trade</span>
        </span>
        <span
          className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${
            variant === 'light' ? 'text-steel-300' : 'text-steel-400'
          }`}
        >
          {brand.address.country}
        </span>
      </span>
    </span>
  )
}
