/**
 * Ось State кита — 2 значения: `idle` — карточку тянут, но она не над зоной;
 * `over` — карточка над зоной, отпускание удалит. Без перетаскивания зона
 * не показывается вовсе.
 */
export const DELETE_ZONE_STATES = ['idle', 'over'] as const

export type DeleteZoneState = (typeof DELETE_ZONE_STATES)[number]
