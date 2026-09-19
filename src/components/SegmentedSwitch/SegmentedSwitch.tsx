import { useState } from 'react'

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

/**
 * Переключатель периода — `Product / segmented-switch`, `50748:9966`. Заменяет
 * `SegmentedRadioGroup`: записка UI Designer 18.09.2026.
 *
 * Собран из `Button`, своей кнопки нет: выбранная — `raised`, остальные —
 * `flat-secondary`. Оси «какая выбрана» в ките нет, вид кнопки выбирается здесь
 * сам, поэтому выбранных не бывает две или ни одной.
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

  return (
    <div
      className={`w-segmented-switch w-segmented-switch_size_${size}`}
      role="group"
      aria-label={ariaLabel}
    >
      {items.map((item) => (
        <Button
          key={item.value}
          type="button"
          size={size === 's' ? 'xs' : 'm'}
          view={item.value === current ? 'raised' : 'flat-secondary'}
          content={item.content}
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
