import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function CylinderIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="7" y="6" width="10" height="15" rx="4" />
      <path d="M10 3.5h4v2.5h-4z" />
      <path d="M8 11h8M8 15h8" />
    </svg>
  )
}

export function CompressorIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="8" width="14" height="11" rx="2.5" />
      <circle cx="10" cy="13.5" r="3" />
      <path d="M17 11h3.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H17" />
      <path d="M6 8V6.5a1.5 1.5 0 0 1 1.5-1.5h2" />
    </svg>
  )
}

export function GaugeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 12l3.5-3" />
      <path d="M12 4v1.5M20 12h-1.5M12 20v-1.5M4 12h1.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function WrenchIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M14.5 6.5a3.5 3.5 0 0 0-4.6 4.2L4 16.6 7.4 20l5.9-5.9a3.5 3.5 0 0 0 4.2-4.6l-2.1 2.1-2.1-.5-.5-2.1z" />
    </svg>
  )
}

export function TruckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 6.5h11v9H3z" />
      <path d="M14 9h3.5l2.5 3v3.5H14z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </svg>
  )
}

export function ShieldIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 3l7 2.5v5c0 4.5-3 7.8-7 9.5-4-1.7-7-5-7-9.5v-5z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

export function WalletIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="6" width="18" height="13" rx="2.5" />
      <path d="M3 10h18" />
      <circle cx="16.5" cy="14.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SnowflakeIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
      <path d="M12 6l-2-2M12 6l2-2M12 18l-2 2M12 18l2 2M6 12l-2-2M6 12l-2 2M18 12l2-2M18 12l2 2" />
    </svg>
  )
}

export function WhatsAppIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1 14.65-11.6 9.36 9.36 0 0 1 2.76 6.66c0 5.2-4.24 9.42-9.44 9.42zM20.52 3.48A11.77 11.77 0 0 0 12.05 0C5.5 0 .16 5.33.16 11.9c0 2.1.55 4.14 1.6 5.95L0 24l6.3-1.65a11.86 11.86 0 0 0 5.74 1.46h.01c6.55 0 11.89-5.33 11.89-11.9a11.8 11.8 0 0 0-3.42-8.43z" />
    </svg>
  )
}

export function PhoneIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 5.5C4 4.7 4.7 4 5.5 4H8l1.5 4-2 1.3a11 11 0 0 0 5.2 5.2L14 12.5 18 14v2.5c0 .8-.7 1.5-1.5 1.5A13.5 13.5 0 0 1 4 5.5z" />
    </svg>
  )
}

export function MailIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 5.5L20 7" />
    </svg>
  )
}

export function MapPinIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M12 21c4-4.5 6-7.6 6-10.5A6 6 0 1 0 6 10.5c0 2.9 2 6 6 10.5z" />
      <circle cx="12" cy="10.5" r="2.2" />
    </svg>
  )
}

export function ClockIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  )
}

export function CheckIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12.5l4.5 4.5L19 6.5" />
    </svg>
  )
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

export function MenuIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function CloseIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  )
}

export function UsersIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.5a3 3 0 0 1 0 5.5M17 19a5.5 5.5 0 0 0-2-4.3" />
    </svg>
  )
}

export function BuildingIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17" />
      <path d="M15 9h3a1 1 0 0 1 1 1v11" />
      <path d="M8 7h1M11 7h1M8 11h1M11 11h1M8 15h1M11 15h1M3 21h18" />
    </svg>
  )
}

export function HotelIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M4 21V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v16" />
      <path d="M8 8h2M14 8h2M8 12h2M14 12h2M10 21v-4h4v4M3 21h18" />
    </svg>
  )
}

export function SunIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}

export function MoonIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M20 14.5A8 8 0 0 1 9.5 4a7 7 0 1 0 10.5 10.5z" />
    </svg>
  )
}

export function CartIcon(p: IconProps) {
  return (
    <svg {...base} {...p}>
      <path d="M3 4h2l2 12h11l2-8H6" />
      <circle cx="9" cy="19.5" r="1.4" />
      <circle cx="17" cy="19.5" r="1.4" />
    </svg>
  )
}

/** Resolve a category icon by its name in the data model. */
export function ProductIcon({
  name,
  ...rest
}: { name: 'cylinder' | 'compressor' | 'gauge' | 'wrench' } & IconProps) {
  switch (name) {
    case 'cylinder':
      return <CylinderIcon {...rest} />
    case 'compressor':
      return <CompressorIcon {...rest} />
    case 'gauge':
      return <GaugeIcon {...rest} />
    case 'wrench':
      return <WrenchIcon {...rest} />
  }
}
