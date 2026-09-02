import type { StatusBarTone } from './constants'
import './StatusBar.css'

export type StatusBarProps = {
  /** Figma Tone — light поверх фотографии, dark везде остальное. */
  tone?: StatusBarTone
  /** Figma Время */
  time?: string
}

/**
 * Системная панель телефона: время слева, сигнал, Wi-Fi и батарея справа.
 * Стоит на каждом экране продукта, прижата к верху.
 */
export function StatusBar({ tone = 'dark', time = '9:41' }: StatusBarProps) {
  return (
    <div className={`w-status-bar w-status-bar_tone_${tone}`}>
      <span className="w-status-bar__time">{time}</span>
      <span className="w-status-bar__indicators" aria-hidden>
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="6" width="3" height="6" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill="currentColor">
          <path d="M8.5 12 5.6 8.9a4.2 4.2 0 0 1 5.8 0L8.5 12Zm5-5.4a8 8 0 0 0-10 0L1.4 4.4a11 11 0 0 1 14.2 0l-2.1 2.2Z" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2" y="2" width="18" height="9" rx="2" fill="currentColor" />
          <path d="M25 4.5v4a2.5 2.5 0 0 0 0-4Z" fill="currentColor" opacity="0.4" />
        </svg>
      </span>
    </div>
  )
}
