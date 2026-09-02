/** Ось Band кита — 3 значения. Полосы интенсивности: neutral до 70 %, lime с 70, pink с 90. */
export const STEP_CHIP_BANDS = ['neutral', 'lime', 'pink'] as const

export type StepChipBand = (typeof STEP_CHIP_BANDS)[number]
