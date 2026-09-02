import './WeightWheelRow.css'

export type WeightWheelRowProps = {
  /** Целая часть веса. */
  whole: string
  /** Дробная часть веса. */
  fraction: string
  /**
   * Выбранная строка. В ui-docs у строки свойств нет, а состояние в ките нарисовано —
   * строка возврата дизайну лежит под этапом 4 плана.
   */
  selected?: boolean
}

/** Строка барабана веса. Из семи таких собран сам барабан. */
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
