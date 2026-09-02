/** Ось State кита — 3 значения. Заменяет непубликуемый .step-S внутри Stepper. */
export const SET_MARKER_STATES = ['done', 'current', 'planned'] as const

export type SetMarkerState = (typeof SET_MARKER_STATES)[number]
