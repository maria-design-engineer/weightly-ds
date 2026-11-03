/** Ось State кита — 2 значения. Профиль: custom-components.md, обход мастеров 03.09.2026. */
export const BOTTOM_BAR_ITEM_STATES = ['active', 'inactive'] as const

export type BottomBarItemState = (typeof BOTTOM_BAR_ITEM_STATES)[number]

/**
 * Ось Devise кита — 2 значения: нижняя панель телефона и боковое меню кабинета.
 * Имя оси в ките с опечаткой — `Devise`, — в коде оно то же: имена один в один.
 * Набор `49064:26938`, четыре мастера, обход 03.11.2026.
 */
export const BOTTOM_BAR_ITEM_DEVISES = ['mobile', 'desktop'] as const

export type BottomBarItemDevise = (typeof BOTTOM_BAR_ITEM_DEVISES)[number]
