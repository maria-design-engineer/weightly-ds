/**
 * Ось Size вложенного `.Product / title` `50832:21967` — 4 значения, названы по стилю
 * текста заголовка. Решение пользователя 03.11.2026. Порядок — от мелкого к крупному.
 */
export const CARD_HEADER_SIZES = ['caption-1', 'subheader-2', 'header-2', 'header-1'] as const

export type CardHeaderSize = (typeof CARD_HEADER_SIZES)[number]
