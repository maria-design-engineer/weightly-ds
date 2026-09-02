import type { ReactNode } from 'react'

import { CircleQuestion } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import './ExerciseCard.css'

export type ExerciseCardProps = {
  /** Figma Text — название упражнения. */
  content?: ReactNode
  /** Figma Caption — счётчик «упражнение 2 из 5». Figma Counter включает его. */
  caption?: ReactNode
  /**
   * Ступени задания. В Figma их число набирают булевыми свойствами Step 2…Step 5 —
   * во фронт такие свойства не едут, вместо них список чипов содержимым.
   */
  steps?: ReactNode
  /** Что делает значок подсказки. */
  onHint?: () => void
  /** Подпись значка подсказки для чтения с экрана. */
  hintLabel?: string
}

/** Карточка упражнения: счётчик, название и ряд ступеней задания. */
export function ExerciseCard({
  content,
  caption,
  steps,
  onHint,
  hintLabel = 'Как выполнять',
}: ExerciseCardProps) {
  return (
    <div className="w-exercise-card">
      <div className="w-exercise-card__head">
        {caption ? <span className="w-exercise-card__counter">{caption}</span> : null}
        {onHint ? (
          <button
            className="w-exercise-card__hint"
            type="button"
            onClick={onHint}
            aria-label={hintLabel}
            style={{ border: 0, background: 'none', padding: 0, cursor: 'pointer' }}
          >
            <Icon data={CircleQuestion} size={16} />
          </button>
        ) : null}
      </div>
      <span className="w-exercise-card__title">{content}</span>
      {steps ? <div className="w-exercise-card__steps">{steps}</div> : null}
    </div>
  )
}
