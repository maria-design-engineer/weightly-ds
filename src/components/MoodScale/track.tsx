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
 * Ручка — экземпляр `Button`: вид берётся у кита, поведение задаёт родитель.
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
  /** Выбрали слот по метке. Не передан — дорожка только показывает оценку. */
  onPick?: (index: number) => void
}) {
  return (
    <div className="w-mood-scale__track">
      {marks.map((mark, index) => (
        <span className={`w-mood-scale__slot w-mood-scale__slot_${index}`} key={index}>
          {index === value ? (
            <Button
              view="primary"
              size="xs"
              startIcon={<Icon data={ChevronsExpandHorizontal} size={12} />}
              ariaLabel={handleLabel}
            />
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
