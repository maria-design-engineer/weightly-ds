/** Ось State кита — 2 значения. Имя свойства в релизе 1 приведено к State с большой буквы. */
export const INTENSITY_CHIP_STATES = ['active', 'default'] as const

export type IntensityChipState = (typeof INTENSITY_CHIP_STATES)[number]
