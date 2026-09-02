import type { ReactNode } from 'react'

import { ChevronDown, ChevronUp, Comment } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
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
  /**
   * Что делает кнопка «свернуть». Не передан — шеврона нет вовсе:
   * комментарий, который не сворачивают.
   */
  onToggle?: () => void
}

/** Комментарий тренера: шапка всегда видна, текст показывается в развёрнутом виде. */
export function CoachComment({
  band = 'neutral',
  state = 'open',
  content,
  author,
  body,
  onToggle,
}: CoachCommentProps) {
  const className = [
    'w-coach-comment',
    `w-coach-comment_band_${band}`,
    `w-coach-comment_state_${state}`,
  ].join(' ')

  return (
    <div className={className}>
      <div className="w-coach-comment__head">
        <span className="w-coach-comment__icon">
          <Icon data={Comment} size={16} />
        </span>
        <span className="w-coach-comment__title">{content}</span>
        {onToggle ? (
          <Button
            view="flat"
            size="m"
            ariaLabel={state === 'open' ? 'Свернуть' : 'Развернуть'}
            startIcon={<Icon data={state === 'open' ? ChevronUp : ChevronDown} size={16} />}
            onClick={onToggle}
          />
        ) : null}
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
