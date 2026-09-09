/** Ось Actions кита — 2 значения: кнопки столбиком или в строку. */
export const DRAWER_ACTIONS = ['column', 'row'] as const

export type DrawerActions = (typeof DRAWER_ACTIONS)[number]
