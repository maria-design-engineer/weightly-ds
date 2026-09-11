/**
 * Ось Band кита — 3 значения: neutral до 70 процентов, lime с 70, pink с 90.
 * Те же пороги, что у большого `IntensityChip`: одно правило на весь продукт.
 */
export const INTENSITY_CHIP_XS_BANDS = ['neutral', 'lime', 'pink'] as const

export type IntensityChipXsBand = (typeof INTENSITY_CHIP_XS_BANDS)[number]

/**
 * Ось Size кита — 2 значения: S ростом 24, M ростом 28. Заведена 11.09.2026,
 * когда чип понадобился в строке со временем тренировки: там он крупнее.
 * Отличаются только поля и рост — радиус, промежуток и стиль числа общие.
 */
export const INTENSITY_CHIP_XS_SIZES = ['s', 'm'] as const

export type IntensityChipXsSize = (typeof INTENSITY_CHIP_XS_SIZES)[number]
