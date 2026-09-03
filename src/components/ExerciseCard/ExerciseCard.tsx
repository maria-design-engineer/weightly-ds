import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { useEffect, useRef } from 'react'

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
  /* Отписка от текущего перетаскивания: держим её здесь, чтобы снять и при уходе с экрана. */
  const stopDragRef = useRef<(() => void) | null>(null)

  /*
   * Слушатели снимаются не только по `pointerup`, но и по `pointercancel`, и при
   * размонтировании: отпустил за краем окна или ушёл с экрана посреди движения —
   * лента ехала за мышью без нажатой кнопки. Находка 9 ревью этапа 14.
   */
  useEffect(() => () => stopDragRef.current?.(), [])

  /**
   * Пальцем и тачпадом ряд прокручивается сам; мышкой — только перетаскиванием,
   * поэтому оно написано руками. Тач не трогаем: у него прокрутка своя.
   */
  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const node = stepsRef.current
    if (!node || event.pointerType !== 'mouse') return

    stopDragRef.current?.()

    const startX = event.clientX
    const startScroll = node.scrollLeft

    function handleMove(moveEvent: PointerEvent) {
      node!.scrollLeft = startScroll - (moveEvent.clientX - startX)
    }

    function stop() {
      node!.classList.remove('w-exercise-card__steps_dragging')
      document.removeEventListener('pointermove', handleMove)
      document.removeEventListener('pointerup', stop)
      document.removeEventListener('pointercancel', stop)
      stopDragRef.current = null
    }

    node.classList.add('w-exercise-card__steps_dragging')
    document.addEventListener('pointermove', handleMove)
    document.addEventListener('pointerup', stop)
    document.addEventListener('pointercancel', stop)
    stopDragRef.current = stop
  }

  const hint = onHint ? (
    <button className="w-exercise-card__hint" type="button" onClick={onHint} aria-label={hintLabel}>
      <Icon data={CircleQuestion} size={16} />
    </button>
  ) : null

  return (
    <div className={`w-exercise-card w-exercise-card_type_${type}`}>
      <div className="w-exercise-card__info">
        {/* Шапки нет вовсе, когда нечего в неё положить: в ките при Counter=false её тоже нет. */}
        {type === 'running' || caption || hint ? (
          <div className="w-exercise-card__head">
            {type === 'running' ? (
              <span className="w-exercise-card__title">{content}</span>
            ) : (
              caption && <span className="w-exercise-card__counter">{caption}</span>
            )}
            {hint}
          </div>
        ) : null}
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
