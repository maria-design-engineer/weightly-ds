import type { ReactNode } from 'react'

import type { IntensityChipState } from './constants'
import './IntensityChip.css'

export type IntensityChipProps = {
  /** Figma State — выбранная полоса обведена брендовым цветом. */
  state?: IntensityChipState
  /** Figma Text — процент интенсивности. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
}

/** Полоса интенсивности тренировки целиком, не ступень задания. */
export function IntensityChip({ state = 'default', content, caption }: IntensityChipProps) {
  return (
    <div className={`w-intensity-chip w-intensity-chip_state_${state}`}>
      <div className="w-intensity-chip__body">
        <span className="w-intensity-chip__value">{content}</span>
        {caption ? <span className="w-intensity-chip__caption">{caption}</span> : null}
      </div>
    </div>
  )
}
