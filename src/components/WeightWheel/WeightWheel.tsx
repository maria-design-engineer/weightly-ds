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

/** Человек выключил движение в системе — прокручиваем без анимации. */
function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
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
   * Человек крутит барабан прямо сейчас. Пока крутит, программная доводка молчит:
   * иначе она дерётся с инерцией браузера и швыряет ленту в край — на прогоне
   * 11.09.2026 быстрый рывок сбрасывал вес в ноль. Признак снимается, когда
   * прокрутка утихла.
   */
  const scrolling = useRef(false)
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null)
  /*
   * Без `onSelect` барабан ведёт выбор сам: иначе чёрное значение остаётся на
   * месте, а лента уезжает — в середине оказывается серое.
   */
  const [ownSelected, setOwnSelected] = useState(selected)
  const current = onSelect ? selected : ownSelected

  /*
   * Проп ведёт барабан и без `onSelect`: до правки состояние заполнялось один
   * раз и с пропом больше не сверялось — находка 6 ревью этапа 14.
   * Правится прямо в отрисовке, а не эффектом: так React советует чинить
   * состояние, зависящее от пропа, — лишнего круга отрисовки не будет.
   */
  const [lastSelected, setLastSelected] = useState(selected)
  if (lastSelected !== selected) {
    setLastSelected(selected)
    setOwnSelected(selected)
  }

  useEffect(() => {
    const node = listRef.current
    if (!node) return

    /**
     * `instant` — поправка, а не движение: барабан переставляют не потому, что человек
     * выбрал другое значение, а потому что под ним переложилась разметка — доехала
     * гарнитура или поменялся размер. Плавная прокрутка в этом случае читается как
     * дёрганье: числа стоят чуть ниже середины и подъезжают вверх сами собой.
     * Найдено на прогоне 11.09.2026, экран своего веса.
     */
    function place(instant = false) {
      const wheel = listRef.current
      if (!wheel) return
      /* Человек крутит — не мешаем: он сам остановится там, где хотел. */
      if (scrolling.current) return
      const option = options(wheel)[current]
      if (!option) return
      /*
       * Нулевой размер — значит замерять нечего: барабан скрыт или ещё не
       * разложен. Первую постановку не засчитываем, иначе она застревает
       * навсегда и после подмены гарнитуры середина уезжает — находка 7.
       */
      const size = direction === 'vertical' ? wheel.clientHeight : wheel.clientWidth
      if (size === 0) return

      const shift = offsetFromCenter(wheel, option, direction)
      /* Меньше пикселя — считаем, что значение уже стоит в середине. */
      if (Math.abs(shift) >= 1) {
        wheel.scrollBy({
          top: direction === 'vertical' ? shift : 0,
          left: direction === 'horizontal' ? shift : 0,
          /* Движение выключается вместе с системной настройкой — находка 8. */
          behavior: placed.current && !instant && !prefersReducedMotion() ? 'smooth' : 'auto',
        })
      }
      placed.current = true
    }

    place()

    /*
     * Ставим заново, когда доехал шрифт: ширина значений меняется, а размер
     * самого барабана — нет, поэтому одного наблюдателя мало.
     */
    let alive = true
    document.fonts?.ready.then(() => {
      if (alive) place(true)
    })

    /* Размер меняется, когда переложилась страница или значение стало шире. */
    const observer = new ResizeObserver(() => place(true))
    observer.observe(node)
    const option = options(node)[current]
    if (option) observer.observe(option)

    return () => {
      alive = false
      observer.disconnect()
      /* Ждать окончания прокрутки после ухода компонента некому и незачем. */
      if (settle.current) clearTimeout(settle.current)
    }
  }, [current, direction, values])

  /**
   * Какое значение стоит в середине. Ищем двоичным поиском по самой разметке,
   * а не считаем шагом: значения разной ширины — «0.0» уже, чем «17.5», — и шаг
   * между ними непостоянный. Средний шаг давал ошибку, которая копилась от начала
   * шкалы: в середине стояло одно значение, чёрным было соседнее, а на быстрой
   * прокрутке чёрное пропадало с экрана вовсе. Находка приёмки 12.09.2026.
   *
   * Перебирать все нельзя: у своего веса их две тысячи, и мерить каждое на каждое
   * событие прокрутки — тысячи замеров на кадр. Двоичный поиск берёт одиннадцать.
   */
  function currentFromScroll(node: HTMLUListElement): number {
    const list = options(node) as HTMLElement[]
    if (list.length === 0) return 0
    const vertical = direction === 'vertical'

    /* Середина окна в тех же координатах, в каких лежат сами значения. */
    const target = vertical
      ? node.offsetTop + node.clientTop + node.scrollTop + node.clientHeight / 2
      : node.offsetLeft + node.clientLeft + node.scrollLeft + node.clientWidth / 2

    const middleOf = (item: HTMLElement) =>
      vertical ? item.offsetTop + item.offsetHeight / 2 : item.offsetLeft + item.offsetWidth / 2

    let low = 0
    let high = list.length - 1
    while (low < high) {
      const middle = (low + high) >> 1
      if (middleOf(list[middle]!) < target) low = middle + 1
      else high = middle
    }

    /* Ближайшим бывает и предыдущее: двоичный поиск останавливается на первом за серединой. */
    if (low > 0) {
      const here = Math.abs(middleOf(list[low]!) - target)
      const before = Math.abs(middleOf(list[low - 1]!) - target)
      if (before <= here) return low - 1
    }
    return low
  }

  function handleScroll() {
    const node = listRef.current
    if (!node) return

    scrolling.current = true
    if (settle.current) clearTimeout(settle.current)
    /* Прокрутка считается законченной, когда событий не было 120 мс. */
    settle.current = setTimeout(() => {
      scrolling.current = false
    }, 120)

    const next = currentFromScroll(node)
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
