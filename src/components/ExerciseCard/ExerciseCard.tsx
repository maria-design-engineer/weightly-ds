import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { useRef } from 'react'

import { CircleQuestion } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { ExerciseCardType } from './constants'
import './ExerciseCard.css'

export type ExerciseCardProps = {
  /** Figma Type — план, задание или идущее упражнение. */
  type?: ExerciseCardType
  /** Figma Text — название упражнения. */
  content?: ReactNode
  /** Figma Caption — счётчик «упражнение 2 из 5». Figma Counter включает его. */
  caption?: ReactNode
  /**
   * Ступени задания. В Figma их число набирают булевыми свойствами Step 2…Step 5 —
   * во фронт такие свойства не едут, вместо них список чипов содержимым.
   * Ряд не влезает в карточку — прокручивается вбок, как в ките.
   */
  steps?: ReactNode
  /** Что делает значок подсказки. */
  onHint?: () => void
  /** Подпись значка подсказки для чтения с экрана. */
  hintLabel?: string
}

/**
 * Карточка упражнения: счётчик, название и ряд ступеней задания.
 * У вида `running` счётчика нет — название стоит в одной строке со значком.
 */
export function ExerciseCard({
  type = 'plan',
  content,
  caption,
  steps,
  onHint,
  hintLabel = 'Как выполнять',
}: ExerciseCardProps) {
  const stepsRef = useRef<HTMLDivElement>(null)

  /**
   * Пальцем и тачпадом ряд прокручивается сам; мышкой — только перетаскиванием,
   * поэтому оно написано руками. Тач не трогаем: у него прокрутка своя.
   */
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const node = stepsRef.current
    if (!node || event.pointerType !== 'mouse') return

    const startX = event.clientX
    const startScroll = node.scrollLeft

    function handleMove(moveEvent: PointerEvent) {
      node!.scrollLeft = startScroll - (moveEvent.clientX - startX)
    }

    function handleUp() {
      node!.classList.remove('w-exercise-card__steps_dragging')
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', handleUp)
    }

    node.classList.add('w-exercise-card__steps_dragging')
    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', handleUp)
  }

  const hint = onHint ? (
    <button className="w-exercise-card__hint" type="button" onClick={onHint} aria-label={hintLabel}>
      <Icon data={CircleQuestion} size={16} />
    </button>
  ) : null

  return (
    <div className={`w-exercise-card w-exercise-card_type_${type}`}>
      <div className="w-exercise-card__info">
        <div className="w-exercise-card__head">
          {type === 'running' ? (
            <span className="w-exercise-card__title">{content}</span>
          ) : (
            caption && <span className="w-exercise-card__counter">{caption}</span>
          )}
          {hint}
        </div>
        {type === 'running' ? null : <span className="w-exercise-card__title">{content}</span>}
      </div>
      {steps ? (
        <div className="w-exercise-card__steps" ref={stepsRef} onPointerDown={handlePointerDown}>
          {steps}
        </div>
      ) : null}
    </div>
  )
}
