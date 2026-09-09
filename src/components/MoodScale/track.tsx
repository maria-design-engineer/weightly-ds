import { ChevronsExpandHorizontal } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { MOOD_TRACK_MARKS } from './constants'

/**
 * Дорожка оценки — внутренняя часть шкалы. Отдельным компонентом кита она
 * быть перестала: релиз 2 свёл её в `Product / mood-scale`.
 *
 * Слот с ручкой свою подпись не показывает, два других показывают: сдвинули
 * ручку влево — слева подписи нет, а «норм» и «супер» на месте. Ручка внутри
 * слота прижата к его краю, но не к краю дорожки: у той поля 4.
 * Ручка — экземпляр `Button`: вид берётся у кита, поведение задаёт родитель.
 */
export function MoodTrack({ value, handleLabel }: { value: number; handleLabel: string }) {
  return (
    <div className="w-mood-scale__track">
      {MOOD_TRACK_MARKS.map((mark, index) => (
        <span className={`w-mood-scale__slot w-mood-scale__slot_${index}`} key={mark}>
          {index === value ? (
            <Button
              view="primary"
              size="xs"
              startIcon={<Icon data={ChevronsExpandHorizontal} size={12} />}
              ariaLabel={handleLabel}
            />
          ) : (
            <span className="w-mood-scale__mark">{mark}</span>
          )}
        </span>
      ))}
    </div>
  )
}
