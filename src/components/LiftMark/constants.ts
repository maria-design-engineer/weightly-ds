/**
 * Ось State кита — 4 значения: done ✓ успешно, failed ✕ неуспешно, skipped — пропущено,
 * not-started ◌ не начато. Последнее заведено правкой кита 14.09.2026 — в ките оно
 * зовётся `not started`, значок `circle-dashed`, цвет Text/Secondary.
 */
export const LIFT_MARK_STATES = ['done', 'failed', 'skipped', 'not-started'] as const

export type LiftMarkState = (typeof LIFT_MARK_STATES)[number]
