/**
 * Ось Size кита — 2 значения: `m` дорожка 36 × 20, `l` дорожка 42 × 24.
 * Профиль: ui-kit/components/switch.md
 *
 * В продукте берётся только `l` — профиль, раздел «Роли в продукте».
 */
export const SWITCH_SIZES = ['m', 'l'] as const

export type SwitchSize = (typeof SWITCH_SIZES)[number]
