/** Ось Tone кита — 2 значения: обычное число и брендовое. */
export const STAT_TILE_TONES = ['plain', 'brand'] as const

export type StatTileTone = (typeof STAT_TILE_TONES)[number]
