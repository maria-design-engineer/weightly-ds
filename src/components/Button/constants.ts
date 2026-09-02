/** Ось View кита — 21 значение. Профиль: ui-kit/figma-components/button.md */
export const BUTTON_VIEWS = [
  'secondary',
  'primary-brand',
  'primary',
  'outlined-info',
  'outlined-success',
  'outlined-warning',
  'outlined-danger',
  'outlined-utility',
  'outlined-action',
  'flat',
  'flat-info',
  'flat-success',
  'flat-warning',
  'flat-danger',
  'flat-utility',
  'flat-action',
  'flat-secondary',
  'raised',
  'normal-contrast',
  'outlined-contrast',
  'flat-contrast',
] as const

/** Ось Size кита — 5 значений. */
export const BUTTON_SIZES = ['xs', 's', 'm', 'l', 'xl'] as const

export type ButtonView = (typeof BUTTON_VIEWS)[number]
export type ButtonSize = (typeof BUTTON_SIZES)[number]
