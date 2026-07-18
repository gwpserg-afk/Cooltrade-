import { useTranslation } from 'react-i18next'
import { brand } from '@/config/brand'
import { Reveal } from './Reveal'

/**
 * Founder's note — editorial serif quote with a hand-drawn signature and an
 * initials portrait. Shared by Home and About; `num` shows the section index
 * when used inside a numbered sequence.
 */
export function FounderNote({ num }: { num?: string }) {
  const { t } = useTranslation()
  const initials = brand.founder
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')

  return (
    <section className="border-y border-line bg-card-2">
      <div className="container-page grid grid-cols-1 items-center gap-8 py-14 sm:py-20 lg:grid-cols-[1.6fr_1fr] lg:gap-16 lg:py-24">
        <Reveal>
          <div className="mb-5 flex items-baseline gap-3">
            {num && <span className="sec-num">{num}</span>}
            <span className="kicker">{t('about.founder.title')}</span>
          </div>
          <blockquote className="font-serif text-2xl font-medium leading-[1.24] tracking-tight sm:text-3xl lg:text-[2.35rem]">
            {t('about.founder.quote')}
          </blockquote>
          <div className="mt-6 flex items-center gap-4">
            <svg
              width="92"
              height="30"
              viewBox="0 0 94 34"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="text-blue opacity-80"
              aria-hidden="true"
            >
              <path d="M3 24c6-14 10-16 12-8s2 14 6 8 5-16 9-14 3 15 8 11 6-18 11-15 2 14 8 12 8-9 13-8" />
            </svg>
            <div>
              <div className="font-semibold text-ink">{t('about.founder.name')}</div>
              <div className="mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.09em] text-ink-faint">
                {t('about.founder.role')}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="hidden lg:block">
          <div
            className="relative ml-auto flex aspect-square max-w-[230px] items-center justify-center overflow-hidden rounded-[20px] font-serif text-[clamp(2.6rem,5vw,4rem)] font-semibold"
            style={{
              background: 'linear-gradient(155deg,#12161f,#1b2130)',
              color: '#F2F5FA',
            }}
          >
            <span
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at 70% 20%, rgba(39,67,230,0.4), transparent 55%)',
              }}
            />
            <span className="relative">{initials}</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
