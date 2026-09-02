/** Ось State кита — 2 значения: выбранное значение и соседнее. */
export const WEIGHT_VALUE_STATES = ['active', 'dim'] as const

export type WeightValueState = (typeof WEIGHT_VALUE_STATES)[number]
