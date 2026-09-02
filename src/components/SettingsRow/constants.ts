/** Ось Card кита — 2 значения: строка на карточке и без неё. */
export const SETTINGS_ROW_CARDS = ['on', 'off'] as const

export type SettingsRowCard = (typeof SETTINGS_ROW_CARDS)[number]
