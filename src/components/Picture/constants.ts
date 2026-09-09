/** Ось Type кита — 2 значения: пустое состояние и время. */
export const PICTURE_TYPES = ['empty-badge', 'time'] as const

export type PictureType = (typeof PICTURE_TYPES)[number]
