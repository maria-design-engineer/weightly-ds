import { ChevronsExpandHorizontal } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { MOOD_TRACK_MARKS } from './constants'
import './MoodTrack.css'

export type MoodTrackProps = {
  /** Положение ручки: деление от 0 до 4. По умолчанию среднее. */
  value?: number
  /** Подпись ручки для чтения с экрана. */
  handleLabel?: string
}

/**
 * Дорожка оценки: пять делений с подписями и ручка между ними.
 * Отдельно не ставится — идёт внутри `Product / mood-scale`.
 * Ручка — экземпляр `Button`: вид берётся у кита, поведение задаёт родитель.
 *
 * Ручка лежит поверх делений и едет по ним долей ширины: на крайних значениях
 * она встаёт вплотную к краю дорожки, а подписи при этом никуда не деваются.
 */
export function MoodTrack({ value = 2, handleLabel = 'Оценка' }: MoodTrackProps) {
  const last = MOOD_TRACK_MARKS.length - 1
  const position = Math.min(Math.max(value, 0), last) / last

  return (
    <div className="w-mood-track">
      {MOOD_TRACK_MARKS.map((mark, index) => (
        <span className="w-mood-track__cell" key={index}>
          <span className="w-mood-track__mark">{mark}</span>
        </span>
      ))}
      <span className="w-mood-track__handle" style={{ left: `calc(${position * 100}% - ${position * 24}px)` }}>
        <Button
          view="primary"
          size="xs"
          startIcon={<Icon data={ChevronsExpandHorizontal} size={12} />}
          ariaLabel={handleLabel}
        />
      </span>
    </div>
  )
}
