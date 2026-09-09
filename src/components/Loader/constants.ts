/** Ось Size кита — 3 значения. Размеры полоски и промежутка растут вместе с ней. */
export const LOADER_SIZES = ['s', 'm', 'l'] as const

export type LoaderSize = (typeof LOADER_SIZES)[number]
