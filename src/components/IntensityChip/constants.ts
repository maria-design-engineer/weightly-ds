/** Ось Size кита — 2 значения: 52 и 60. Источник: обход мастеров Custom / chip 03.09.2026. */
export const INTENSITY_CHIP_SIZES = ['s', 'l'] as const

/**
 * Ось State кита — 3 значения. Релиз 2 добавил `done` лаймовой и розовой полосам:
 * у активного вокруг чипа кольцо Base/Brand, у сделанного — галка Text/Positive.
 */
export const INTENSITY_CHIP_STATES = ['default', 'active', 'done'] as const

/**
 * Ось Band кита — 4 значения: neutral до 70 процентов, lime с 70, pink с 90; error — зона
 * не распозналась, «Разбор файла» тренера, кадр `4а`. `error` добавлен релизом 0.14.0.
 */
export const INTENSITY_CHIP_BANDS = ['neutral', 'lime', 'pink', 'error'] as const

export type IntensityChipSize = (typeof INTENSITY_CHIP_SIZES)[number]
export type IntensityChipState = (typeof INTENSITY_CHIP_STATES)[number]
export type IntensityChipBand = (typeof INTENSITY_CHIP_BANDS)[number]
