/**
 * Ось View кита — 2 значения. `panel` — в панели подхода, на заливке; `field` — в форме
 * шторки, в рамке поля: шторки своей интенсивности и своего подхода, кадры `6`, `8`.
 */
export const LIFT_COUNTER_VIEWS = ['panel', 'field'] as const

export type LiftCounterView = (typeof LIFT_COUNTER_VIEWS)[number]
