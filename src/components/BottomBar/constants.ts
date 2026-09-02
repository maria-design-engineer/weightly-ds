/** Ось Active кита — 3 значения: раздел, в котором человек сейчас. */
export const BOTTOM_BAR_SECTIONS = ['workouts', 'history', 'profile'] as const

export type BottomBarSection = (typeof BOTTOM_BAR_SECTIONS)[number]
