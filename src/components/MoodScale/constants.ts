/** Ось State кита — 3 значения: оценка низкая, средняя или высокая. */
export const MOOD_SCALE_STATES = ['low', 'mid', 'high'] as const

export type MoodScaleState = (typeof MOOD_SCALE_STATES)[number]

/**
 * Подписи слотов дорожки из кита. Слотов три; тот, где стоит ручка,
 * подписи не показывает, два других показывают свою.
 */
export const MOOD_TRACK_MARKS = ['ну так', 'норм', 'супер'] as const
