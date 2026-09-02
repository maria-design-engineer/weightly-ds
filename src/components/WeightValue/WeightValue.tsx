import type { WeightValueState } from './constants'
import './WeightValue.css'

export type WeightValueProps = {
  /** Figma State */
  state?: WeightValueState
  /** Figma Whole — целая часть веса. */
  whole: string
  /** Figma Fraction — дробная часть. */
  fraction: string
}

/** Значение веса в ленте выбора: целая часть и дробная. */
export function WeightValue({ state = 'active', whole, fraction }: WeightValueProps) {
  return (
    <span className={`w-weight-value w-weight-value_state_${state}`}>
      <span>{whole}</span>
      <span>{fraction}</span>
    </span>
  )
}
