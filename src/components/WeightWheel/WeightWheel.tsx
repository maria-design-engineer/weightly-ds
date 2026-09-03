import type { KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'

import { WeightWheelItem } from '../WeightWheelItem/WeightWheelItem'
import type { WeightWheelDirection } from './constants'
import './WeightWheel.css'

/*
 * Где стоит значение, спрашиваем у самой разметки, а не считаем шагом: число
 * бывает шире 69 — «82.5» длиннее «60.0», — и постоянный шаг уводит выбранное
 * из середины. Найдено на обзорной странице 03.09.2026.
 */
function offsetFromCenter(node: HTMLElement, option: Element, direction: WeightWheelDirection) {
  const wheel = node.getBoundingClientRect()
  const item = option.getBoundingClientRect()
  return direction === 'vertical'
    ? item.top + item.height / 2 - (wheel.top + wheel.height / 2)
    : item.left + item.width / 2 - (wheel.left + wheel.width / 2)
}

function options(node: HTMLElement) {
  return Array.from(node.querySelectorAll('.w-weight-wheel__option'))
}

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
  /* Первая постановка — сразу, без прокрутки: выбранное значение обязано стоять в середине. */
  const placed = useRef(false)
  /*
   * Без `onSelect` барабан ведёт выбор сам: иначе чёрное значение остаётся на
   * месте, а лента уезжает — в середине оказывается серое.
   */
  const [ownSelected, setOwnSelected] = useState(selected)
  const current = onSelect ? selected : ownSelected

  useEffect(() => {
    const node = listRef.current
    if (!node) return
    const option = options(node)[current]
    if (!option) return
    const shift = offsetFromCenter(node, option, direction)
    /* Меньше пикселя — считаем, что значение уже стоит в середине. */
    if (Math.abs(shift) < 1) {
      placed.current = true
      return
    }
    node.scrollBy({
      top: direction === 'vertical' ? shift : 0,
      left: direction === 'horizontal' ? shift : 0,
      behavior: placed.current ? 'smooth' : 'auto',
    })
    placed.current = true
  }, [current, direction, values])

  function handleScroll() {
    const node = listRef.current
    if (!node) return
    let next = current
    let nearest = Infinity
    options(node).forEach((option, index) => {
      const distance = Math.abs(offsetFromCenter(node, option, direction))
      if (distance < nearest) {
        nearest = distance
        next = index
      }
    })
    if (next === current) return
    setOwnSelected(next)
    onSelect?.(next)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLUListElement>) {
    const previousKey = direction === 'vertical' ? 'ArrowUp' : 'ArrowLeft'
    const nextKey = direction === 'vertical' ? 'ArrowDown' : 'ArrowRight'
    if (event.key === previousKey && current > 0) {
      event.preventDefault()
      setOwnSelected(current - 1)
      onSelect?.(current - 1)
    }
    if (event.key === nextKey && current < values.length - 1) {
      event.preventDefault()
      setOwnSelected(current + 1)
      onSelect?.(current + 1)
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
          aria-selected={index === current}
        >
          <WeightWheelItem
            state={index === current ? 'active' : 'dim'}
            whole={value.whole}
            fraction={value.fraction}
          />
        </li>
      ))}
    </ul>
  )
}
