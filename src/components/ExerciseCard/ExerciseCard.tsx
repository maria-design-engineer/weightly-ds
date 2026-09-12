import type { PointerEvent as ReactPointerEvent, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

import { CircleQuestion } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { ExerciseCardState, ExerciseCardType, ExerciseCardView } from './constants'
import './ExerciseCard.css'

export type ExerciseCardProps = {
  /** Figma Type — план, задание или идущее упражнение. */
  type?: ExerciseCardType
  /** Figma View — размер набора у списка движений. Заведена релизом 2. */
  view?: ExerciseCardView
  /** Figma State — обычная карточка или та, которую тянут. */
  state?: ExerciseCardState
  /** Figma Text, Single title — название упражнения одной строкой. */
  content?: ReactNode
  /**
   * Список движений — `Product / exercise-bullets`. В ките его набирают булевыми
   * `Bullets` и `Move 2`…`Move 4`; во фронт такие свойства не едут, вместо них
   * список. Передан — название собирается из движений, а не строкой.
   */
  bullets?: ReactNode
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
  view = 'collapsed',
  state = 'default',
  content,
  bullets,
  caption,
  steps,
  onHint,
  hintLabel = 'Как выполнять',
}: ExerciseCardProps) {
  const stepsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLSpanElement>(null)
  /*
   * Название влезло не целиком. У задания оно держит ровно три строки, и лишнее
   * прячется многоточием; по линии обрезки в мастере стоит разделитель. Влезло —
   * разделителя нет. Спросить об этом можно только саму разметку: сколько строк
   * займёт текст, заранее не знает никто.
   */
  const [clipped, setClipped] = useState(false)

  useEffect(() => {
    const node = titleRef.current
    if (!node) return

    const check = () => setClipped(node.scrollHeight > node.clientHeight + 1)
    check()
    /* Ширина меняется вместе с экраном, а высота — когда доедет гарнитура. */
    const observer = new ResizeObserver(check)
    observer.observe(node)
    return () => observer.disconnect()
  }, [content, bullets, type])

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
    <div
      className={`w-exercise-card w-exercise-card_type_${type} w-exercise-card_view_${view} w-exercise-card_state_${state}`}
    >
      <div className="w-exercise-card__info">
        {type === 'task' ? (
          /*
           * У задания шапка стоит столбиком — обход мастера `Type=task` 12.09.2026:
           * строка со значком подсказки и счётчиком, под ней название. У плана
           * и идущего всё это идёт одной строкой.
           */
          <>
            <div className="w-exercise-card__head">
              {hint}
              {caption ? <span className="w-exercise-card__counter">{caption}</span> : null}
            </div>
            <span className="w-exercise-card__title" ref={titleRef}>
              {bullets ?? content}
            </span>
            {/*
             * Разделитель снизу — знак того, что название влезло не целиком:
             * в мастере он лежит по линии обрезки. Название помещается — линии нет.
             * Гайд `Custom / exercise-card`, заметка фронту.
             */}
            {clipped ? <span className="w-exercise-card__rule" /> : null}
          </>
        ) : (
          /*
           * Шапка кита горизонтальная: значок подсказки слева, за ним название,
           * следом счётчик — он в мастере скрыт и включается булевым `Counter`.
           * Переснято 10.09.2026: раньше значок стоял в строке счётчика,
           * над названием, и на карточке без счётчика висел сам по себе.
           */
          <div className="w-exercise-card__head">
            {hint}
            <span className="w-exercise-card__title">{bullets ?? content}</span>
            {caption ? <span className="w-exercise-card__counter">{caption}</span> : null}
          </div>
        )}
      </div>
      {steps ? (
        <div className="w-exercise-card__steps" ref={stepsRef} onPointerDown={handlePointerDown}>
          {steps}
        </div>
      ) : null}
    </div>
  )
}
