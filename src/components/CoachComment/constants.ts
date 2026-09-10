/** Ось Band кита — 3 значения: свечение за карточкой берётся по полосе. */
export const COACH_COMMENT_BANDS = ['pink', 'lime', 'neutral'] as const

/**
 * Ось State кита — 3 значения: развёрнут, свёрнут до шапки и развёрнут
 * с прокруткой. `scroll` заведён 10.09.2026: он же `open`, но высота текста
 * ограничена, а сам текст прокручивается. Длину комментария тренера заранее
 * никто не знает, поэтому в продукте стоит именно он.
 */
export const COACH_COMMENT_STATES = ['open', 'closed', 'scroll'] as const

export type CoachCommentBand = (typeof COACH_COMMENT_BANDS)[number]
export type CoachCommentState = (typeof COACH_COMMENT_STATES)[number]
