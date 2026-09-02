import type { WeightWheelItemState } from './constants'
import './WeightWheelItem.css'

export type WeightWheelItemProps = {
  /** Figma State */
  state?: WeightWheelItemState
  /** Figma Whole — целая часть веса. */
  whole: string
  /** Figma Fraction — дробная часть. */
  fraction: string
}

/** Значение веса в барабане: целая часть и дробная. */
export function WeightWheelItem({ state = 'active', whole, fraction }: WeightWheelItemProps) {
  return (
    <span className={`w-weight-wheel-item w-weight-wheel-item_state_${state}`}>
      <span>{whole}</span>
      <span>{fraction}</span>
    </span>
  )
}
