/**
 * Ось State кита — 2 значения: выбранный чип и невыбранный. Состояния
 * «недоступен» нет намеренно: движения с другой базой в списке не предлагаются
 * вовсе, а не гасятся — профиль `product-components/chip-select.md`.
 */
export const CHIP_SELECT_STATES = ['default', 'selected'] as const

export type ChipSelectState = (typeof CHIP_SELECT_STATES)[number]
