/**
 * Ось Band кита — 3 значения: neutral до 70 процентов, lime с 70, pink с 90.
 * Те же пороги, что у большого `IntensityChip`: одно правило на весь продукт.
 */
export const INTENSITY_CHIP_XS_BANDS = ['neutral', 'lime', 'pink'] as const

export type IntensityChipXsBand = (typeof INTENSITY_CHIP_XS_BANDS)[number]
