/** Ось Size кита — 3 значения. Профиль: ui-kit/figma-components/label.md */
export const LABEL_SIZES = ['xs', 's', 'm'] as const

/** Ось Theme кита — 8 значений. */
export const LABEL_THEMES = [
  'normal',
  'info',
  'success',
  'warning',
  'danger',
  'unknown',
  'utility',
  'clear',
] as const

export type LabelSize = (typeof LABEL_SIZES)[number]
export type LabelTheme = (typeof LABEL_THEMES)[number]
