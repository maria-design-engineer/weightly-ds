import type { PointerEvent as ReactPointerEvent } from 'react'
import { useRef, useState } from 'react'

import { ChevronsExpandHorizontal } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { MOOD_TRACK_MARKS } from './constants'

/**
 * Дорожка оценки — внутренняя часть шкалы. Отдельным компонентом кита она
 * быть перестала: релиз 2 свёл её в `Product / mood-scale`.
 *
 * Слот с ручкой свою подпись не показывает, два других показывают: сдвинули
 * ручку влево — слева подписи нет, а соседние на месте. Ручка внутри слота
 * прижата к его краю, но не к краю дорожки: у той поля 4.
 *
 * **Оценку ставят тремя способами:** тянут ручку, жмут метку, жмут кнопку с края.
 * Перетаскивание главное — им пользуются пальцем, остальные два ему в помощь.
 *
 * Подписи приходят снаружи: у продукта концы шкал свои, и зашитые в ките
 * «ну так · норм · супер» им не подходят.
 */
export function MoodTrack({
  value,
  handleLabel,
  marks = MOOD_TRACK_MARKS,
  onPick,
}: {
  value: number
  handleLabel: string
  /** Подписи слотов по порядку. Не переданы — берутся китовые. */
  marks?: readonly string[]
  /** Выбрали слот — нажатием или перетаскиванием. Не передан — дорожка только показывает. */
  onPick?: (index: number) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)

  /** Какой слот под этой точкой: дорожка делится на равные доли по числу слотов. */
  function slotAt(clientX: number): number {
    const node = trackRef.current
    if (!node) return value
    const box = node.getBoundingClientRect()
    if (box.width === 0) return value
    const share = (clientX - box.left) / box.width
    const index = Math.floor(share * marks.length)
    return Math.min(Math.max(index, 0), marks.length - 1)
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!onPick) return
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!dragging || !onPick) return
    const next = slotAt(event.clientX)
    if (next !== value) onPick(next)
  }

  function stopDragging(event: ReactPointerEvent<HTMLSpanElement>) {
    if (!dragging) return
    event.currentTarget.releasePointerCapture(event.pointerId)
    setDragging(false)
  }

  return (
    <div className="w-mood-scale__track" ref={trackRef}>
      {marks.map((mark, index) => (
        <span className={`w-mood-scale__slot w-mood-scale__slot_${index}`} key={index}>
          {index === value ? (
            <span
              className={`w-mood-scale__handle${dragging ? ' w-mood-scale__handle_dragging' : ''}`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={stopDragging}
              onPointerCancel={stopDragging}
            >
              <Button
                view="primary"
                size="xs"
                startIcon={<Icon data={ChevronsExpandHorizontal} size={12} />}
                ariaLabel={handleLabel}
              />
            </span>
          ) : onPick ? (
            /* По метке можно нажать: оценка ставится сразу, без шага с края. */
            <button
              type="button"
              className="w-mood-scale__mark w-mood-scale__mark_pick"
              onClick={() => onPick(index)}
            >
              {mark}
            </button>
          ) : (
            <span className="w-mood-scale__mark">{mark}</span>
          )}
        </span>
      ))}
    </div>
  )
}
