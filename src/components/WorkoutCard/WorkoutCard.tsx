import type { ReactNode } from 'react'

import './WorkoutCard.css'

export type WorkoutCardProps = {
  /** Заголовок карточки — что за тренировка. */
  content?: ReactNode
  /** Подпись под заголовком — числа тренировки. */
  caption?: ReactNode
  /** Плашка рядом с заголовком: в ките это экземпляр Label. */
  mark?: ReactNode
  /** Figma Actions — ряд кнопок под сведениями. */
  actions?: ReactNode
}

/** Карточка тренировки на рабочем столе: сведения и ряд действий. */
export function WorkoutCard({ content, caption, mark, actions }: WorkoutCardProps) {
  return (
    <div className="w-workout-card">
      <div className="w-workout-card__info">
        <div className="w-workout-card__title-row">
          <span className="w-workout-card__title">{content}</span>
          {mark}
        </div>
        {caption ? <span className="w-workout-card__caption">{caption}</span> : null}
      </div>
      {actions ? <div className="w-workout-card__actions">{actions}</div> : null}
    </div>
  )
}
