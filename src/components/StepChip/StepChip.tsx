import type { ReactNode } from 'react'

import type { StepChipBand } from './constants'
import './StepChip.css'

export type StepChipProps = {
  /** Figma Band — полоса интенсивности: neutral до 70 %, lime с 70, pink с 90. */
  band?: StepChipBand
  /** Figma Text — процент от максимума. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
}

/** Ступень задания: процент и раскладка подходов. Текст на стилях. */
export function StepChip({ band = 'neutral', content, caption }: StepChipProps) {
  return (
    <div className={`w-step-chip w-step-chip_band_${band}`}>
      <span className="w-step-chip__value">{content}</span>
      {caption ? <span className="w-step-chip__caption">{caption}</span> : null}
    </div>
  )
}
