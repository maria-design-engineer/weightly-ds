import type { ReactNode } from 'react'

import './ExerciseRow.css'

export type ExerciseRowProps = {
  /** Figma Content — название упражнения. Не передано — строки названия нет (Figma Name). */
  content?: ReactNode
  /** Figma Caption — состав справа от названия: подходы, повторы и вес. */
  caption?: ReactNode
  /** Figma Value text — вторая строка состава, например время. Показывается под названием. */
  value?: ReactNode
  /** Figma Comment text — комментарий тренера к упражнению, последней строкой. */
  comment?: ReactNode
}

/**
 * Строка упражнения: название слева, состав справа, под ними — вторая строка состава
 * и комментарий. Части необязательные: у упражнений ОФП состав записи разный —
 * требование спеки 5, кадр `5а` сценария «Прохождение тренировки».
 *
 * Мастер расширен 11.09.2026: до этого строка несла только название и одну подпись,
 * и строки с разным составом дизайн собирал руками.
 */
export function ExerciseRow({ content, caption, value, comment }: ExerciseRowProps) {
  return (
    <div className="w-exercise-row">
      {content || caption ? (
        <div className="w-exercise-row__line">
          {content ? <span className="w-exercise-row__text">{content}</span> : null}
          {caption ? <span className="w-exercise-row__caption">{caption}</span> : null}
        </div>
      ) : null}
      {value ? <span className="w-exercise-row__value">{value}</span> : null}
      {comment ? <span className="w-exercise-row__comment">{comment}</span> : null}
    </div>
  )
}
