/** Ось Size кита — 7 значений. Профиль: ui-kit/figma-components/avatar.md */
export const AVATAR_SIZES = ['3xs', '2xs', 'xs', 's', 'm', 'l', 'xl'] as const

/** Ось View кита — 2 значения. */
export const AVATAR_VIEWS = ['filled', 'outlined'] as const

/** Ось Theme кита — 2 значения. */
export const AVATAR_THEMES = ['brand', 'normal'] as const

/** Оси Type у внутреннего набора .Custom border — 7 значений, в коде это проп. */
export const AVATAR_BORDER_COLORS = [
  'misc',
  'warning',
  'danger',
  'brand',
  'positive',
  'utility',
  'info',
] as const

export type AvatarSize = (typeof AVATAR_SIZES)[number]
export type AvatarView = (typeof AVATAR_VIEWS)[number]
export type AvatarTheme = (typeof AVATAR_THEMES)[number]
export type AvatarBorderColor = (typeof AVATAR_BORDER_COLORS)[number]
