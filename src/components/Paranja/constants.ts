/** Ось Type кита — 2 значения: под шторкой Effect/Veil, под окном Effect/Shadow. */
export const PARANJA_TYPES = ['drawer', 'info'] as const

export type ParanjaType = (typeof PARANJA_TYPES)[number]
