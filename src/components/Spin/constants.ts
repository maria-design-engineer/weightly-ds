/** Ось Size кита — 5 значений. Сторона квадрата: 16, 24, 28, 32 и 36. */
export const SPIN_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const

export type SpinSize = (typeof SPIN_SIZES)[number]
