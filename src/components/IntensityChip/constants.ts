/** Ось Size кита — 2 значения: 52 и 60. Источник: обход мастеров Custom / chip 03.09.2026. */
export const INTENSITY_CHIP_SIZES = ['s', 'l'] as const

/** Ось State кита — 2 значения: у активного вокруг чипа кольцо Base/Brand. */
export const INTENSITY_CHIP_STATES = ['default', 'active'] as const

/** Ось Band кита — 3 значения: neutral до 70 процентов, lime с 70, pink с 90. */
export const INTENSITY_CHIP_BANDS = ['neutral', 'lime', 'pink'] as const

export type IntensityChipSize = (typeof INTENSITY_CHIP_SIZES)[number]
export type IntensityChipState = (typeof INTENSITY_CHIP_STATES)[number]
export type IntensityChipBand = (typeof INTENSITY_CHIP_BANDS)[number]
