/**
 * Ось Type кита — 4 значения: пустое состояние, нет связи, чиним и время.
 * `disconect` пишется так же, как в мастере: имя оси не переписываем.
 */
export const PICTURE_TYPES = ['empty-badge', 'disconect', 'fix', 'time'] as const

export type PictureType = (typeof PICTURE_TYPES)[number]
