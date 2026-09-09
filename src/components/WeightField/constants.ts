/** Ось State кита — 3 значения. Повторяют состояния TextInput, чтобы поля вели себя одинаково. */
export const WEIGHT_FIELD_STATES = ['default', 'active', 'error'] as const

export type WeightFieldState = (typeof WEIGHT_FIELD_STATES)[number]
