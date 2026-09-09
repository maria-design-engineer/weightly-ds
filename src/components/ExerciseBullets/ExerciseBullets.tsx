import type { ReactNode } from 'react'

import type { ExerciseBulletsView } from './constants'
import './ExerciseBullets.css'

export type ExerciseBulletsProps = {
  /** Figma View — размер набора: collapsed, plan или expanded. */
  view?: ExerciseBulletsView
  /** Название движения. В ките текст правится на экземпляре. */
  content?: ReactNode
}

/**
 * Строка движения с буллитом. Отдельно не ставится — идёт внутри
 * `Product / exercise-card`, до четырёх строк на карточку.
 */
export function ExerciseBullets({ view = 'collapsed', content }: ExerciseBulletsProps) {
  return (
    <span className={`w-exercise-bullets w-exercise-bullets_view_${view}`}>
      <span className="w-exercise-bullets__bullet" aria-hidden="true" />
      <span className="w-exercise-bullets__text">{content}</span>
    </span>
  )
}
