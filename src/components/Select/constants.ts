/** Ось Size кита — 4 значения. Профиль: ui-kit/figma-components/select.md */
export const SELECT_SIZES = ['s', 'm', 'l', 'xl'] as const

/** Ось View кита — 2 значения. */
export const SELECT_VIEWS = ['normal', 'clear'] as const

export type SelectSize = (typeof SELECT_SIZES)[number]
export type SelectView = (typeof SELECT_VIEWS)[number]

export type SelectItem = { value: string; label: string }
