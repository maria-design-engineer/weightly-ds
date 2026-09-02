import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { WeightWheelRow } from './WeightWheelRow'
import './WeightWheel.css'

const ROW_HEIGHT = 40
const MIN_KG = 20
const MAX_KG = 200
const STEP_KG = 0.5

/** Шкала веса: от 20 до 200 килограммов с шагом полкило. */
const VALUES = Array.from(
  { length: Math.round((MAX_KG - MIN_KG) / STEP_KG) + 1 },
  (_, index) => MIN_KG + index * STEP_KG,
)

const START_INDEX = VALUES.indexOf(100)

/**
 * Custom / weight-wheel — вертикальный барабан ввода веса, 328 × 256.
 * Своё целиком: у Gravity такого компонента нет. Свойств в ui-docs нет,
 * шкала и выбранное значение живут внутри — строка возврата дизайнеру.
 */
export function WeightWheel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(START_INDEX)

  useEffect(() => {
    const node = scrollRef.current
    if (node) {
      node.scrollTop = START_INDEX * ROW_HEIGHT
    }
  }, [])

  function handleScroll() {
    const node = scrollRef.current
    if (node) {
      setIndex(Math.round(node.scrollTop / ROW_HEIGHT))
    }
  }

  function moveTo(next: number) {
    const node = scrollRef.current
    const clamped = Math.min(Math.max(next, 0), VALUES.length - 1)
    if (node) {
      node.scrollTo({ top: clamped * ROW_HEIGHT, behavior: 'smooth' })
    }
    setIndex(clamped)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveTo(index + 1)
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveTo(index - 1)
    }
  }

  return (
    <div className="w-weight-wheel">
      <div className="w-weight-wheel__caption">кг</div>
      <div className="w-weight-wheel__values">
        <div
          className="w-weight-wheel__scroll"
          ref={scrollRef}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          role="listbox"
          aria-label="Вес штанги, килограммы"
          tabIndex={0}
        >
          {VALUES.map((value, valueIndex) => (
            <WeightWheelRow
              key={value}
              whole={String(Math.trunc(value))}
              fraction={value % 1 === 0 ? '0' : '5'}
              selected={valueIndex === index}
            />
          ))}
        </div>
        <div className="w-weight-wheel__fade w-weight-wheel__fade_top" />
        <div className="w-weight-wheel__fade w-weight-wheel__fade_bottom" />
      </div>
    </div>
  )
}
