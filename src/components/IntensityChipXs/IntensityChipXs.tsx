import type { ReactNode } from 'react'

import { CircleQuestion } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'

import type { IntensityChipXsBand, IntensityChipXsSize } from './constants'
import './IntensityChipXs.css'

export type IntensityChipXsProps = {
  /** Figma Band — полоса интенсивности: neutral до 70 процентов, lime с 70, pink с 90. */
  band?: IntensityChipXsBand
  /** Процент от максимума — в ките это текстовый слой «%». */
  content?: ReactNode
  /** Figma Size — рост плашки: S 24, M 28. Отличаются только поля. */
  size?: IntensityChipXsSize
  /** Figma Icon — значок подсказки справа от числа. По умолчанию его нет. */
  icon?: boolean
}

/**
 * Product / intensity-chip-xs — маленькая плашка интенсивности. Вытащена из
 * `IntensityChip` отдельным мастером 11.09.2026: там чип несёт ступень задания
 * с раскладкой подходов, здесь — одно число в строке.
 *
 * Значок подсказки в ките ничего не делает — это булево свойство показа.
 * Понадобится нажатие — заводим обработчик отдельно, по кадру, где он появится.
 */
export function IntensityChipXs({
  band = 'neutral',
  size = 's',
  content,
  icon = false,
}: IntensityChipXsProps) {
  const className = [
    'w-intensity-chip-xs',
    `w-intensity-chip-xs_band_${band}`,
    `w-intensity-chip-xs_size_${size}`,
  ].join(' ')

  return (
    <span className={className}>
      <span className="w-intensity-chip-xs__value">{content}</span>
      {icon ? (
        <span className="w-intensity-chip-xs__icon">
          <Icon data={CircleQuestion} size={14} />
        </span>
      ) : null}
    </span>
  )
}
