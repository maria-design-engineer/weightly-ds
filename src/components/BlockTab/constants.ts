/** Ось State кита — 3 значения. */
export const BLOCK_TAB_STATES = ['active', 'done', 'default'] as const

export type BlockTabState = (typeof BLOCK_TAB_STATES)[number]
