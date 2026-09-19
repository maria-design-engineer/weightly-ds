/**
 * Ось Size кита — 2 значения: `s` на кнопках XS, `l` на кнопках M.
 * Профиль: ui-kit/product-components/segmented-switch.md
 */
export const SEGMENTED_SWITCH_SIZES = ['s', 'l'] as const

export type SegmentedSwitchSize = (typeof SEGMENTED_SWITCH_SIZES)[number]

/** Кнопка переключателя. Булевы `Item 1`-`Item 5` кита — это длина списка. */
export type SegmentedSwitchItem = {
  value: string
  content: string
}
