import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'

import { Button } from '../Button/Button'
import type { SegmentedSwitchItem, SegmentedSwitchSize } from './constants'
import './SegmentedSwitch.css'

export type SegmentedSwitchProps = {
  /** Figma Size — `s` на кнопках XS, `l` на кнопках M. */
  size?: SegmentedSwitchSize
  /** Figma Item 1 … Item 5 — кнопки по порядку, от двух до пяти. */
  items: SegmentedSwitchItem[]
  /** Выбранное значение. Не передано — переключатель держит выбор сам. */
  value?: string
  /** Выбранное сначала; не передано — первая кнопка. */
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Подпись переключателя для чтения с экрана. */
  ariaLabel?: string
}

/** Где стоит плашка: отступ слева и ширина выбранной кнопки. */
type Place = { left: number; width: number }

/**
 * Переключатель периода — `Product / segmented-switch`, `50748:9966`. Заменяет
 * `SegmentedRadioGroup`: записка UI Designer 18.09.2026.
 *
 * Собран из `Button`, своей кнопки нет: выбранная — `raised`, остальные —
 * `flat-secondary`. Оси «какая выбрана» в ките нет, вид кнопки выбирается здесь
 * сам, поэтому выбранных не бывает две или ни одной.
 *
 * Белая подложка выбранной — одна на переключатель и переезжает к нажатой, как
 * плашка нижней навигации. Просьба пользователя 19.09.2026. Кнопки разной ширины,
 * поэтому место и ширина плашки снимаются замером, а не умножением.
 */
export function SegmentedSwitch({
  size = 's',
  items,
  value,
  defaultValue,
  onValueChange,
  ariaLabel,
}: SegmentedSwitchProps) {
  const [own, setOwn] = useState(defaultValue ?? items[0]?.value)
  const current = value ?? own
  const at = items.findIndex((item) => item.value === current)

  const root = useRef<HTMLDivElement | null>(null)
  const [place, setPlace] = useState<Place | null>(null)

  useLayoutEffect(() => {
    const box = root.current
    if (box === null) return
    const measure = () => {
      const button = box.querySelectorAll<HTMLElement>(':scope > .w-button')[at]
      const next = button ? { left: button.offsetLeft, width: button.offsetWidth } : null
      /*
       * Ставим, только если место сдвинулось: экран передаёт список кнопок новым
       * массивом на каждой отрисовке, и замер без сверки гонял отрисовку по кругу —
       * страница истории вставала намертво. Находка прогона 19.09.2026.
       */
      setPlace((was) =>
        was?.left === next?.left && was?.width === next?.width ? was : next,
      )
    }
    measure()
    /* Ширина кнопок меняется, когда догружается шрифт: плашка идёт за ними. */
    const observer = new ResizeObserver(measure)
    for (const button of box.querySelectorAll(':scope > .w-button')) observer.observe(button)
    return () => observer.disconnect()
  }, [at, items.length, size])

  return (
    <div
      ref={root}
      className={`w-segmented-switch w-segmented-switch_size_${size}`}
      role="group"
      aria-label={ariaLabel}
    >
      {/* Подложка — краска, а не кнопка: не читается и не нажимается. */}
      {place === null ? null : (
        <span
          className="w-segmented-switch__plate"
          style={
            {
              '--w-segmented-switch-left': `${place.left}px`,
              '--w-segmented-switch-width': `${place.width}px`,
            } as CSSProperties
          }
          aria-hidden="true"
        />
      )}
      {items.map((item) => (
        <Button
          key={item.value}
          type="button"
          size={size === 's' ? 'xs' : 'm'}
          view={item.value === current ? 'raised' : 'flat-secondary'}
          content={item.content}
          ariaLabel={item.ariaLabel}
          pressed={item.value === current}
          onClick={() => {
            if (item.value === current) return
            setOwn(item.value)
            onValueChange?.(item.value)
          }}
        />
      ))}
    </div>
  )
}
