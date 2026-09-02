/** Ось State кита — 2 значения: выбранное значение и соседнее. */
export const WEIGHT_WHEEL_ITEM_STATES = ['active', 'dim'] as const

export type WeightWheelItemState = (typeof WEIGHT_WHEEL_ITEM_STATES)[number]
