import { ArrowChevronRight, Play, Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import type { StickyBarWorkoutAction } from './StickyBarWorkout'

/** Три действия кита: неуспешно, успешно, пропустить. */
export const STICKY_BAR_WORKOUT_ACTIONS: StickyBarWorkoutAction[] = [
  {
    id: 'fail',
    button: (
      <Button view="flat-danger" size="xl" startIcon={<Icon data={Xmark} size={20} />} ariaLabel="Неуспешно" />
    ),
    caption: 'Неуспешно',
  },
  {
    id: 'success',
    button: (
      <Button view="primary-brand" size="xl" startIcon={<Icon data={Play} size={20} />} ariaLabel="Успешно" />
    ),
    caption: 'Успешно',
  },
  {
    id: 'skip',
    button: (
      <Button
        view="flat-secondary"
        size="xl"
        startIcon={<Icon data={ArrowChevronRight} size={20} />}
        ariaLabel="Пропустить"
      />
    ),
    caption: 'Пропустить',
  },
]
