/** Ось State кита — 2 значения: есть данные подхода или пусто. */
export const SET_PANEL_STATES = ['default', 'empty'] as const

export type SetPanelState = (typeof SET_PANEL_STATES)[number]
