/** Ось Shadow кита — 2 значения. В релизе 1 свойство переименовано из Property 1. */
export const BLOCK_CARD_SHADOWS = ['on', 'off'] as const

export type BlockCardShadow = (typeof BLOCK_CARD_SHADOWS)[number]
