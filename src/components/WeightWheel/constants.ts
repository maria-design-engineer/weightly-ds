/** Ось Direction кита — 2 значения: столбик и лента. */
export const WEIGHT_WHEEL_DIRECTIONS = ['vertical', 'horizontal'] as const

export type WeightWheelDirection = (typeof WEIGHT_WHEEL_DIRECTIONS)[number]
