/**
 * Ось Type кита — 5 значений: пустое состояние, нет связи, чиним, время и телефон.
 * `disconect` пишется так же, как в мастере: имя оси не переписываем.
 * `phone` добавлен правкой кита 04.10.2026.
 */
export const PICTURE_TYPES = ['empty-badge', 'disconect', 'fix', 'time', 'phone'] as const

export type PictureType = (typeof PICTURE_TYPES)[number]
