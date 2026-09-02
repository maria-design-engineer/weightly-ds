/** Ось Size кита — 4 значения. Профиль: ui-kit/figma-components/text-area.md */
export const TEXT_AREA_SIZES = ['s', 'm', 'l', 'xl'] as const

/** Ось View кита — 2 значения. */
export const TEXT_AREA_VIEWS = ['normal', 'clear'] as const

export type TextAreaSize = (typeof TEXT_AREA_SIZES)[number]
export type TextAreaView = (typeof TEXT_AREA_VIEWS)[number]
