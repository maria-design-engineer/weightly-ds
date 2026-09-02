import type { KeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'

import { WeightWheelItem } from '../WeightWheelItem/WeightWheelItem'
import type { WeightWheelDirection } from './constants'
import './WeightWheel.css'

/** Шаг барабана: значение плюс промежуток. Вертикально 40 + 4, горизонтально 69 + 16. */
const STEP = { vertical: 44, horizontal: 85 }

export type WeightWheelValue = {
  /** Целая часть веса. */
  whole: string
  /** Дробная часть. */
  fraction: string
}

export type WeightWheelProps = {
  /** Figma Direction — столбик на экране ввода, лента на экране подхода. */
  direction?: WeightWheelDirection
  /** Значения барабана. Крутится по ним, видно пять сразу. */
  values: WeightWheelValue[]
  /** Номер выбранного значения — того, что стоит в середине. */
  selected: number
  /** Что происходит, когда в середину встало другое значение. */
  onSelect?: (index: number) => void
  /** Подпись барабана для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Барабан веса. Крутится прокруткой — колесом, пальцем или стрелками с клавиатуры;
 * значение прилипает к середине, и выбрано то, что в ней стоит.
 */
export function WeightWheel({
  direction = 'vertical',
  values,
  selected,
  onSelect,
  ariaLabel = 'Вес штанги, килограммы',
}: WeightWheelProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const step = STEP[direction]

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    const offset = selected * step
    const current = direction === 'vertical' ? node.scrollTop : node.scrollLeft
    if (Math.round(current / step) !== selected) {
      node.scrollTo({
        top: direction === 'vertical' ? offset : 0,
        left: direction === 'horizontal' ? offset : 0,
        behavior: 'smooth',
      })
    }
  }, [selected, step, direction])

  function handleScroll() {
    const node = listRef.current
    if (!node) return
    const position = direction === 'vertical' ? node.scrollTop : node.scrollLeft
    const next = Math.min(Math.max(Math.round(position / step), 0), values.length - 1)
    if (next !== selected) onSelect?.(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const previousKey = direction === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
    const nextKey = direction === 'vertical' ? 'ArrowDown' : 'ArrowRight'
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
      ref={listRef}
      role="listbox"
      aria-label={ariaLabel}
      aria-orientation={direction}
      tabIndex={0}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
    >
      {values.map((value, index) => (
        <li
          className="w-weight-wheel__option"
          key={`${value.whole}-${value.fraction}`}
          role="option"
          aria-selected={index === selected}
        >
          <WeightWheelItem
            state={index === selected ? 'active' : 'dim'}
            whole={value.whole}
            fraction={value.fraction}
          />
        </li>
      ))}
    </ul>
  )
}
