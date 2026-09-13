/**
 * Ось Fill кита — 2 значения. Правка кита 13.09.2026: ось `Shadow` заменена на
 * `Fill`, тени у карточки больше нет, вместо неё заливка `Base/Selection`.
 */
export const BLOCK_CARD_FILLS = ['on', 'off'] as const

export type BlockCardFill = (typeof BLOCK_CARD_FILLS)[number]
