/** Ось State кита — 2 значения: есть данные подхода или пусто. */
export const SET_PANEL_STATES = ['default', 'empty'] as const

export type SetPanelState = (typeof SET_PANEL_STATES)[number]

/**
 * Ось Band кита — 3 значения, те же, что у `Custom / chip`: neutral до 70 процентов,
 * lime с 70, pink с 90. Панель красится заливкой полосы, выбранное значение барабана —
 * её текстом. Мастер 16.09.2026, узел `50562:56578`.
 */
export const SET_PANEL_BANDS = ['neutral', 'lime', 'pink'] as const

export type SetPanelBand = (typeof SET_PANEL_BANDS)[number]
