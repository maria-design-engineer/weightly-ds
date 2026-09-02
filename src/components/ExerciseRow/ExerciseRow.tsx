import type { ReactNode } from 'react'

import './ExerciseRow.css'

export type ExerciseRowProps = {
  /** Figma Text — название упражнения. */
  content?: ReactNode
  /** Figma Caption — подходы и повторы. */
  caption?: ReactNode
}

/** Строка упражнения в разминке: название слева, раскладка справа. */
export function ExerciseRow({ content, caption }: ExerciseRowProps) {
  return (
    <div className="w-exercise-row">
      <span className="w-exercise-row__text">{content}</span>
      {caption ? <span className="w-exercise-row__caption">{caption}</span> : null}
    </div>
  )
}
