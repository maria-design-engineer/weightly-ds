/**
 * Ось View кита — 3 значения, порядок мастера: `panel` — ряды сверху вниз, `columns` —
 * три колонки, `empty` — интенсивность не задана, подходов нет. Профиль
 * `product-components/set-panel.md`. До 0.6.0 в коде было две оси — `view` и
 * `state` — и витрина звала раскладку «Property 1»; приёмка релиза 0.5.3.
 */
export const SET_PANEL_VIEWS = ['panel', 'columns', 'empty'] as const

export type SetPanelView = (typeof SET_PANEL_VIEWS)[number]

/**
 * Ось Band кита — 3 значения, те же, что у `Custom / chip`: neutral до 70 процентов,
 * lime с 70, pink с 90. Панель красится заливкой полосы, выбранное значение барабана —
 * её текстом. Мастер 16.09.2026, узел `50562:56578`.
 */
export const SET_PANEL_BANDS = ['neutral', 'lime', 'pink'] as const

export type SetPanelBand = (typeof SET_PANEL_BANDS)[number]
