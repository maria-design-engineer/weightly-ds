/**
 * Ось View кита — 3 значения. Меняет она размер набора, а не раскрытость:
 * `collapsed` крупнее `expanded`.
 */
export const EXERCISE_BULLETS_VIEWS = ['collapsed', 'plan', 'expanded'] as const

export type ExerciseBulletsView = (typeof EXERCISE_BULLETS_VIEWS)[number]
