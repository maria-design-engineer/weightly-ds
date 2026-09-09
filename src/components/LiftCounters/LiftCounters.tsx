import type { ReactNode } from 'react'

import './LiftCounters.css'

export type LiftCountersProps = {
  /**
   * Счётчики движений — до четырёх. В ките их число набирают булевыми
   * `Lift 2`…`Lift 4`; во фронт такие свойства не едут, вместо них список.
   */
  children?: ReactNode
}

/**
 * Ряд счётчиков подъёмов: по счётчику на движение упражнения.
 * Своей заливки нет — её дают вложенные `Product / lift-counter`.
 */
export function LiftCounters({ children }: LiftCountersProps) {
  return <div className="w-lift-counters">{children}</div>
}
