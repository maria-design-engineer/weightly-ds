import type { KeyboardEvent } from 'react'

import { WeightWheelItem } from '../WeightWheelItem/WeightWheelItem'
import type { WeightWheelDirection } from './constants'
import './WeightWheel.css'

export type WeightWheelValue = {
  /** Целая часть веса. */
  whole: string
  /** Дробная часть. */
  fraction: string
}

export type WeightWheelProps = {
  /** Figma Direction — столбик на экране ввода, лента на экране подхода. */
  direction?: WeightWheelDirection
  /** Значения барабана. В ките их пять, число в коде не зашито. */
  values: WeightWheelValue[]
  /** Номер выбранного значения. */
  selected: number
  /** Что происходит при выборе. */
  onSelect?: (index: number) => void
  /** Подпись барабана для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Барабан веса: пять значений, выбранное отличается цветом.
 * Ходит стрелками с клавиатуры и нажатием по значению.
 */
export function WeightWheel({
  direction = 'vertical',
  values,
  selected,
  onSelect,
  ariaLabel = 'Вес штанги, килограммы',
}: WeightWheelProps) {
  const previousKey = direction === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
  const nextKey = direction === 'vertical' ? 'ArrowDown' : 'ArrowRight'

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    if (event.key === previousKey && selected > 0) {
      event.preventDefault()
      onSelect?.(selected - 1)
    }
    if (event.key === nextKey && selected < values.length - 1) {
      event.preventDefault()
      onSelect?.(selected + 1)
    }
  }

  return (
    <ul
      className={`w-weight-wheel w-weight-wheel_direction_${direction}`}
      role="listbox"
      aria-label={ariaLabel}
      aria-orientation={direction}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {values.map((value, index) => (
        <li key={`${value.whole}-${value.fraction}`} role="option" aria-selected={index === selected}>
          <button
            className="w-weight-wheel__option"
            type="button"
            tabIndex={-1}
            onClick={() => onSelect?.(index)}
          >
            <WeightWheelItem
              state={index === selected ? 'active' : 'dim'}
              whole={value.whole}
              fraction={value.fraction}
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
