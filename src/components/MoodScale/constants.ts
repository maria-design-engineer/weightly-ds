/** Ось State кита — 3 значения: оценка низкая, средняя или высокая. */
export const MOOD_SCALE_STATES = ['low', 'mid', 'high'] as const

export type MoodScaleState = (typeof MOOD_SCALE_STATES)[number]
