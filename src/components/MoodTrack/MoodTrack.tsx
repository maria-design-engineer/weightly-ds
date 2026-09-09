import { ChevronsExpandHorizontal } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { MOOD_TRACK_MARKS } from './constants'
import './MoodTrack.css'

export type MoodTrackProps = {
  /** Слот ручки: 0 слева, 1 в середине, 2 справа. */
  value?: number
  /** Подпись ручки для чтения с экрана. */
  handleLabel?: string
}

/**
 * Дорожка оценки: три слота по 76 и ручка в одном из них.
 * Отдельно не ставится — идёт внутри `Product / mood-scale`.
 *
 * Слот с ручкой свою подпись не показывает, две другие показывают: сдвинули
 * ручку влево — слева подписи нет, а «норм» и «супер» на месте. Ручка внутри
 * слота прижата к его краю, но не к краю дорожки: у той поля 4.
 * Ручка — экземпляр `Button`: вид берётся у кита, поведение задаёт родитель.
 */
export function MoodTrack({ value = 1, handleLabel = 'Оценка' }: MoodTrackProps) {
  return (
    <div className="w-mood-track">
      {MOOD_TRACK_MARKS.map((mark, index) => (
        <span className={`w-mood-track__slot w-mood-track__slot_${index}`} key={mark}>
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
