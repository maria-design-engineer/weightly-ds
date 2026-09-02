/** Ось State кита — 2 значения. Профиль: custom-components.md, обход мастеров 03.09.2026. */
export const BOTTOM_BAR_ITEM_STATES = ['active', 'inactive'] as const

export type BottomBarItemState = (typeof BOTTOM_BAR_ITEM_STATES)[number]
