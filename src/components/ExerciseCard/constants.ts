/** Ось Type кита — 3 значения: план, задание, идущее упражнение. */
export const EXERCISE_CARD_TYPES = ['plan', 'task', 'running'] as const

export type ExerciseCardType = (typeof EXERCISE_CARD_TYPES)[number]
