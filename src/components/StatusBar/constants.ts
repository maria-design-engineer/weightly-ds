/** Ось Tone кита — 2 значения: light поверх фотографии, dark везде остальное. */
export const STATUS_BAR_TONES = ['dark', 'light'] as const

export type StatusBarTone = (typeof STATUS_BAR_TONES)[number]
