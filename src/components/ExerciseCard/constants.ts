/** Ось Type кита — 3 значения: план, задание, идущее упражнение. */
export const EXERCISE_CARD_TYPES = ['plan', 'task', 'running'] as const

/**
 * Ось View кита — 2 значения, заведена релизом 2. `plan` и `running` живут
 * только в `collapsed`; ось меняет размер набора у списка движений.
 */
export const EXERCISE_CARD_VIEWS = ['collapsed', 'expanded'] as const

/** Ось State кита — 2 значения: обычная карточка и та, которую тянут. */
export const EXERCISE_CARD_STATES = ['default', 'drag'] as const

export type ExerciseCardType = (typeof EXERCISE_CARD_TYPES)[number]
export type ExerciseCardView = (typeof EXERCISE_CARD_VIEWS)[number]
export type ExerciseCardState = (typeof EXERCISE_CARD_STATES)[number]
