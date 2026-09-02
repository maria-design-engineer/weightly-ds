/** Ось State кита — 3 значения: done ✓ успешно, failed ✕ неуспешно, skipped — пропущено. */
export const LIFT_MARK_STATES = ['done', 'failed', 'skipped'] as const

export type LiftMarkState = (typeof LIFT_MARK_STATES)[number]
