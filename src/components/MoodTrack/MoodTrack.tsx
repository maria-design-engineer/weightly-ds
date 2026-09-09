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
 */
export function MoodTrack({ value = 2, handleLabel = 'Оценка' }: MoodTrackProps) {
  return (
    <div className="w-mood-track">
      {MOOD_TRACK_MARKS.map((mark, index) => (
        <span className="w-mood-track__cell" key={index}>
          {index === value ? (
            <Button
              view="primary"
              size="xs"
              startIcon={<Icon data={ChevronsExpandHorizontal} size={12} />}
              ariaLabel={handleLabel}
            />
          ) : (
            <span className="w-mood-track__mark">{mark}</span>
          )}
        </span>
      ))}
    </div>
  )
}
