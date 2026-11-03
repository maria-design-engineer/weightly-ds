/**
 * Ось Size набора `Product / card-header` `51673:42222` — 4 значения, названы по стилю
 * текста заголовка. Тянет за собой стиль заголовка, размер кнопок и стиль пояснения.
 * Ось заведена 03.11.2026. Порядок — от мелкого к крупному.
 */
export const CARD_HEADER_SIZES = ['caption-1', 'subheader-2', 'header-2', 'header-1'] as const

export type CardHeaderSize = (typeof CARD_HEADER_SIZES)[number]
