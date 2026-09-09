import type { ReactNode } from 'react'

import { WeightWheel } from '../WeightWheel/WeightWheel'
import type { WeightWheelValue } from '../WeightWheel/WeightWheel'
import type { WeightFieldState } from './constants'
import './WeightField.css'

export type WeightFieldProps = {
  /** Figma State — обычное, в фокусе или с ошибкой. */
  state?: WeightFieldState
  /** Значения барабана. */
  values: WeightWheelValue[]
  /** Номер выбранного значения. */
  selected: number
  /** Что происходит, когда в середину встало другое значение. */
  onSelect?: (index: number) => void
  /** Figma Error text — сообщение под полем. Показывается при State=error. */
  errorText?: ReactNode
  /** Подпись поля для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Барабан ввода веса как поле формы: значения в рамке, края растворяются,
 * под полем строка ошибки. Кольцо фокуса рисуется снаружи с отступом 1,
 * сама рамка при этом не меняется — так же, как у `TextInput`.
 */
export function WeightField({
  state = 'default',
  values,
  selected,
  onSelect,
  errorText,
  ariaLabel,
}: WeightFieldProps) {
  return (
    <div className="w-weight-field">
      <div className={`w-weight-field__box w-weight-field__box_state_${state}`}>
        <WeightWheel
          direction="vertical"
          values={values}
          selected={selected}
          onSelect={onSelect}
          ariaLabel={ariaLabel}
        />
        {/* Растворения краёв — часть поля, а не барабана: барабан внутри едет целиком. */}
        <span className="w-weight-field__fade w-weight-field__fade_top" aria-hidden="true" />
        <span className="w-weight-field__fade w-weight-field__fade_bottom" aria-hidden="true" />
      </div>
      {state === 'error' && errorText ? (
        <span className="w-weight-field__error">{errorText}</span>
      ) : null}
    </div>
  )
}
