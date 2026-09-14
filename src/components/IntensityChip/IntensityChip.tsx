import type { ReactNode } from 'react'

import { Check } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'

import type { IntensityChipBand, IntensityChipSize, IntensityChipState } from './constants'
import './IntensityChip.css'

export type IntensityChipProps = {
  /** Figma Size — 52 или 60. */
  size?: IntensityChipSize
  /** Figma State — активный обведён кольцом Base/Brand, у сделанного стоит галка. */
  state?: IntensityChipState
  /** Figma Band — полоса интенсивности: neutral до 70 процентов, lime с 70, pink с 90. */
  band?: IntensityChipBand
  /** Figma Text — процент от максимума. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
  /**
   * Нажали на чип. Не передан — чип только показывает: так он стоит в списках,
   * где выбирать нечего.
   */
  onPick?: () => void
  /** Подпись нажатия для чтения с экрана. */
  pickLabel?: string
}

/**
 * Чип задания: процент и раскладка подходов. Один компонент на две прежние роли —
 * ступень задания и полосу интенсивности; решение пользователя 03.09.2026.
 */
export function IntensityChip({
  size = 's',
  state = 'default',
  band = 'neutral',
  content,
  caption,
  onPick,
  pickLabel,
}: IntensityChipProps) {
  const className = [
    'w-intensity-chip',
    `w-intensity-chip_size_${size}`,
    `w-intensity-chip_state_${state}`,
    `w-intensity-chip_band_${band}`,
  ].join(' ')

  /*
   * Нажимаемый чип — кнопка, а не `div` с обработчиком: иначе он не берётся
   * с клавиатуры и не читается как действие. Показывающий остаётся `div`.
   */
  const Tag = onPick ? 'button' : 'div'

  return (
    <Tag
      className={className}
      {...(onPick ? { type: 'button' as const, onClick: onPick, 'aria-label': pickLabel } : {})}
    >
      <span className="w-intensity-chip__value">{content}</span>
      {caption ? <span className="w-intensity-chip__caption">{caption}</span> : null}
      {/* Галка стоит углом чипа, вне потока: в потоке она сдвигала процент. */}
      {state === 'done' ? (
        <span className="w-intensity-chip__done">
          <Icon data={Check} size={16} />
        </span>
      ) : null}
    </Tag>
  )
}
