import type { ReactNode } from 'react'

import { IntensityChip } from '../IntensityChip/IntensityChip'
import type { IntensityChipBand, IntensityChipState } from '../IntensityChip/constants'
import { SetMarker } from '../SetMarker/SetMarker'
import type { SetMarkerState } from '../SetMarker/constants'
import './StepCell.css'

export type StepCellProps = {
  /** Процент от максимума — Figma Text у чипа. */
  content?: ReactNode
  /** Подходы и повторы — Figma Caption у чипа. */
  caption?: ReactNode
  /** Полоса интенсивности — Figma Band у чипа. */
  band?: IntensityChipBand
  /** Figma State у чипа: у идущей ступени вокруг чипа кольцо. */
  chipState?: IntensityChipState
  /** Figma State у отметки: подход сделан, идёт или запланирован. */
  markerState?: SetMarkerState
  /** Номер подхода — Figma Text у отметки. */
  markerContent?: ReactNode
}

/**
 * Ступень с отметкой: чип интенсивности и отметка подхода под ним.
 * В ките это `Custom / step-cell`, 52 × 76 — чип 46, промежуток 4, отметка 26.
 * Стоит внутри карточки упражнения вида `running`.
 */
export function StepCell({
  content,
  caption,
  band = 'neutral',
  chipState = 'default',
  markerState = 'planned',
  markerContent,
}: StepCellProps) {
  return (
    <div className="w-step-cell">
      <IntensityChip band={band} state={chipState} content={content} caption={caption} />
      <SetMarker state={markerState} content={markerContent} />
    </div>
  )
}
