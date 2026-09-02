import type { ReactNode } from 'react'

import type { ChipBand, ChipSize, ChipState } from './constants'
import './Chip.css'

export type ChipProps = {
  /** Figma Size — 52 или 60. */
  size?: ChipSize
  /** Figma State — активный чип обведён кольцом Base/Brand. */
  state?: ChipState
  /** Figma Band — полоса интенсивности: neutral до 70 процентов, lime с 70, pink с 90. */
  band?: ChipBand
  /** Figma Text — процент от максимума. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
}

/**
 * Чип задания: процент и раскладка подходов. Один компонент на две прежние роли —
 * ступень задания и полосу интенсивности; решение пользователя 03.09.2026.
 */
export function Chip({
  size = 's',
  state = 'default',
  band = 'neutral',
  content,
  caption,
}: ChipProps) {
  const className = [
    'w-chip',
    `w-chip_size_${size}`,
    `w-chip_state_${state}`,
    `w-chip_band_${band}`,
  ].join(' ')

  return (
    <div className={className}>
      <span className="w-chip__value">{content}</span>
      {caption ? <span className="w-chip__caption">{caption}</span> : null}
    </div>
  )
}
