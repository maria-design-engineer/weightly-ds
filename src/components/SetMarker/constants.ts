/**
 * Ось State кита — 6 значений. Релиз 2 добавил `skipped` и `failed` к трём прежним;
 * правка 14.09.2026 — `result`: вместо значка с номером плашка несёт ряд отметок,
 * по одной на подход зоны. Заменяет непубликуемый `.step-S` внутри `Stepper`.
 */
export const SET_MARKER_STATES = ['done', 'current', 'planned', 'skipped', 'failed', 'result'] as const

export type SetMarkerState = (typeof SET_MARKER_STATES)[number]
