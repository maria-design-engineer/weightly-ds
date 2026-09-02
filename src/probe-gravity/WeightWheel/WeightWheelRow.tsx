import './WeightWheel.css'

export type WeightWheelRowProps = {
  /** Целая часть веса. */
  whole: string
  /** Дробная часть веса. */
  fraction: string
  /**
   * Выбранная строка. Свойства в ui-docs у строки нет, а состояние в ките нарисовано:
   * выбранная красится Text/Primary, соседние — Text/Hint. Строка возврата дизайнеру.
   */
  selected?: boolean
}

/** Custom / weight-wheel-row — 304 × 40, две ячейки по 136. */
export function WeightWheelRow({ whole, fraction, selected }: WeightWheelRowProps) {
  return (
    <div
      className={`w-weight-wheel-row${selected ? ' w-weight-wheel-row_selected' : ''}`}
      role="option"
      aria-selected={Boolean(selected)}
    >
      <span className="w-weight-wheel-row__cell w-weight-wheel-row__cell_whole">{whole}</span>
      <span className="w-weight-wheel-row__cell w-weight-wheel-row__cell_fraction">{fraction}</span>
    </div>
  )
}
