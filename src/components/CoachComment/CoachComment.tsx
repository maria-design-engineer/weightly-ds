import type { ReactNode } from 'react'

import type { CoachCommentBand, CoachCommentState } from './constants'
import './CoachComment.css'

export type CoachCommentProps = {
  /** Figma Band — свечение за карточкой берётся по полосе интенсивности. */
  band?: CoachCommentBand
  /** Figma State — развёрнут или свёрнут до шапки. */
  state?: CoachCommentState
  /** Figma Text — заголовок в шапке. */
  content?: ReactNode
  /** Figma Author — кто написал. */
  author?: ReactNode
  /** Figma Body — сам комментарий. */
  body?: ReactNode
  /** Значок и кнопка в шапке: в ките это comment и Button. */
  actions?: ReactNode
}

/** Комментарий тренера: шапка всегда видна, текст показывается в развёрнутом виде. */
export function CoachComment({
  band = 'neutral',
  state = 'open',
  content,
  author,
  body,
  actions,
}: CoachCommentProps) {
  const className = [
    'w-coach-comment',
    `w-coach-comment_band_${band}`,
    `w-coach-comment_state_${state}`,
  ].join(' ')

  return (
    <div className={className}>
      <div className="w-coach-comment__head">
        <span className="w-coach-comment__title">{content}</span>
        {actions}
      </div>
      {state === 'open' ? (
        <>
          {author ? <span className="w-coach-comment__author">{author}</span> : null}
          {body ? <span className="w-coach-comment__body">{body}</span> : null}
        </>
      ) : null}
    </div>
  )
}
