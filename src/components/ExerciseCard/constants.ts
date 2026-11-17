/** Ось Type кита — 3 значения: план, задание, идущее упражнение. */
export const EXERCISE_CARD_TYPES = ['plan', 'task', 'running'] as const

/**
 * Ось View кита — 2 значения, заведена релизом 2. `plan` и `running` живут
 * только в `collapsed`; ось меняет размер набора у списка движений.
 */
export const EXERCISE_CARD_VIEWS = ['collapsed', 'expanded'] as const

/**
 * Ось State кита — 5 значений: default · drag · error · hover · hover-error. В коде три:
 * `hover` и `hover-error` — наведение браузера и фокус с клавиатуры внутри карточки,
 * пропа у них нет, как у `Hover` тумблера. Профиль `exercise-card.md`, правка 17.11.2026.
 */
export const EXERCISE_CARD_STATES = ['default', 'drag', 'error'] as const

export type ExerciseCardType = (typeof EXERCISE_CARD_TYPES)[number]
export type ExerciseCardView = (typeof EXERCISE_CARD_VIEWS)[number]
export type ExerciseCardState = (typeof EXERCISE_CARD_STATES)[number]
