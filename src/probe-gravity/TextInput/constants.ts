/** Ось Size кита — 4 значения. Профиль: ui-kit/figma-components/text-input.md */
export const TEXT_INPUT_SIZES = ['s', 'm', 'l', 'xl'] as const

/** Ось View кита — 2 значения: в рамке и без коробки. */
export const TEXT_INPUT_VIEWS = ['normal', 'clear'] as const

export type TextInputSize = (typeof TEXT_INPUT_SIZES)[number]
export type TextInputView = (typeof TEXT_INPUT_VIEWS)[number]
