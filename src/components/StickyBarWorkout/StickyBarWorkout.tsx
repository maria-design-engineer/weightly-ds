import type { ReactNode } from 'react'

import { STICKY_BAR_WORKOUT_ACTIONS } from './defaults'
import './StickyBarWorkout.css'

export type StickyBarWorkoutAction = {
  id: string
  /** Кнопка действия. В ките это экземпляр `Button` размера XL со значком без подписи. */
  button: ReactNode
  /** Подпись под кнопкой. */
  caption: ReactNode
}

export type StickyBarWorkoutProps = {
  /** Состав действий. По умолчанию три из кита. */
  actions?: StickyBarWorkoutAction[]
}

/**
 * Нижняя панель подхода: три действия колонками — кнопка и подпись под ней.
 * Своих свойств у неё нет, состав приходит содержимым.
 */
export function StickyBarWorkout({ actions = STICKY_BAR_WORKOUT_ACTIONS }: StickyBarWorkoutProps) {
  return (
    <div className="w-sticky-bar-workout">
      <div className="w-sticky-bar-workout__row">
        {actions.map((action) => (
          <div className="w-sticky-bar-workout__action" key={action.id}>
            {action.button}
            <span className="w-sticky-bar-workout__caption">{action.caption}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
