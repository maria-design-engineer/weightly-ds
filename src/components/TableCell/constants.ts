/** Ось Tone кита — 3 значения. Источник: custom-components.md и обход мастеров. */
export const TABLE_CELL_TONES = ['secondary', 'primary', 'hint'] as const

export type TableCellTone = (typeof TABLE_CELL_TONES)[number]
