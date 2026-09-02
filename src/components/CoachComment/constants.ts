/** Ось Band кита — 3 значения: свечение за карточкой берётся по полосе. */
export const COACH_COMMENT_BANDS = ['pink', 'lime', 'neutral'] as const

/** Ось State кита — 2 значения: комментарий развёрнут или свёрнут до шапки. */
export const COACH_COMMENT_STATES = ['open', 'closed'] as const

export type CoachCommentBand = (typeof COACH_COMMENT_BANDS)[number]
export type CoachCommentState = (typeof COACH_COMMENT_STATES)[number]
