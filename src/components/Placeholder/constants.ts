/**
 * Ось Size кита — 2 значения: `l` — кнопки 42, `m` — кнопки 34. Профиль:
 * ui-kit/components/placeholder.md, правка кита 17.11.2026.
 *
 * Телефонные экраны — `l`, настольные экраны кабинета тренера — `m`.
 */
export const PLACEHOLDER_SIZES = ['l', 'm'] as const

export type PlaceholderSize = (typeof PLACEHOLDER_SIZES)[number]
