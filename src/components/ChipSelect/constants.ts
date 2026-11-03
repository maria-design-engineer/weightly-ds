/**
 * Ось State кита — 2 значения: выбранный чип и невыбранный. Состояния
 * «недоступен» нет намеренно: движения с другой базой в списке не предлагаются
 * вовсе, а не гасятся — профиль `product-components/chip-select.md`.
 */
export const CHIP_SELECT_STATES = ['default', 'selected'] as const

export type ChipSelectState = (typeof CHIP_SELECT_STATES)[number]

/**
 * Ось Size кита — 3 значения: S 26, M 34, L 42. Сведена на размерный ряд 26.10.2026;
 * прежний `M` стал `S` — вид чипов атлета не меняется. Сторона тренера стоит на `M`.
 * Профиль `product-components/chip-select.md`, приёмка релиза 0.5.3.
 */
export const CHIP_SELECT_SIZES = ['s', 'm', 'l'] as const

export type ChipSelectSize = (typeof CHIP_SELECT_SIZES)[number]
