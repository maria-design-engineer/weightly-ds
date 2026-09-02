import type { ReactNode } from 'react'

import type { IntensityChipBand, IntensityChipSize, IntensityChipState } from './constants'
import './IntensityChip.css'

export type IntensityChipProps = {
  /** Figma Size — 52 или 60. */
  size?: IntensityChipSize
  /** Figma State — активный чип обведён кольцом Base/Brand. */
  state?: IntensityChipState
  /** Figma Band — полоса интенсивности: neutral до 70 процентов, lime с 70, pink с 90. */
  band?: IntensityChipBand
  /** Figma Text — процент от максимума. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
}

/**
 * Чип задания: процент и раскладка подходов. Один компонент на две прежние роли —
 * ступень задания и полосу интенсивности; решение пользователя 03.09.2026.
 */
export function IntensityChip({
  size = 's',
  state = 'default',
  band = 'neutral',
  content,
  caption,
}: IntensityChipProps) {
  const className = [
    'w-intensity-chip',
    `w-intensity-chip_size_${size}`,
    `w-intensity-chip_state_${state}`,
    `w-intensity-chip_band_${band}`,
  ].join(' ')

  return (
    <div className={className}>
      <span className="w-intensity-chip__value">{content}</span>
      {caption ? <span className="w-intensity-chip__caption">{caption}</span> : null}
    </div>
  )
}
