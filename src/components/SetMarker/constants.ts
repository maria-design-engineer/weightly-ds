/**
 * Ось State кита — 5 значений. Релиз 2 добавил `skipped` и `failed`
 * к трём прежним. Заменяет непубликуемый `.step-S` внутри `Stepper`.
 */
export const SET_MARKER_STATES = ['done', 'current', 'planned', 'skipped', 'failed'] as const

export type SetMarkerState = (typeof SET_MARKER_STATES)[number]
