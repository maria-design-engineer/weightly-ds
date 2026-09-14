import type { ReactNode } from 'react'

/**
 * Ось Size кита — 4 значения. Задаёт высоту кнопки, радиус рамки и боковой отступ:
 * `S` 24, `M` 28, `L` 36, `XL` 44. Профиль — `ui-kit/components/segmented-radio-group.md`.
 */
export const SEGMENTED_RADIO_GROUP_SIZES = ['s', 'm', 'l', 'xl'] as const

/** Ось Width кита — 2 значения: `auto` собирает ряд по содержимому, `max` тянет во всю ширину. */
export const SEGMENTED_RADIO_GROUP_WIDTHS = ['auto', 'max'] as const

export type SegmentedRadioGroupSize = (typeof SEGMENTED_RADIO_GROUP_SIZES)[number]
export type SegmentedRadioGroupWidth = (typeof SEGMENTED_RADIO_GROUP_WIDTHS)[number]

/**
 * Кнопка ряда. `Selected` пропом не является: выбранной кнопку делает значение
 * группы. `Item N` — приём Figma, в код не едет: кнопок столько, сколько в массиве.
 */
export type SegmentedRadioGroupOption = {
  /** Значение кнопки: им группа отмечает выбранную. */
  value: string
  /** Figma ↳ Text — подпись кнопки. */
  content: ReactNode
  /** Figma Icon — значок слева от подписи. */
  icon?: ReactNode
  /** Figma Counter — число справа от подписи. */
  counter?: ReactNode
  /** Figma State=Disabled — кнопка видна, но не выбирается. */
  disabled?: boolean
}
