import { CirclePlay, ClockArrowRotateLeft, Person } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { BottomBarTab } from './BottomBar'

/**
 * Три вкладки кита с их подписями и значками. Значки — иконотека Gravity:
 * circle-play, clock-arrow-rotate-left, person.
 */
export const BOTTOM_BAR_TABS: BottomBarTab[] = [
  { id: 'workouts', label: 'Тренировки', icon: <Icon data={CirclePlay} size={20} /> },
  { id: 'history', label: 'История', icon: <Icon data={ClockArrowRotateLeft} size={20} /> },
  { id: 'profile', label: 'Профиль', icon: <Icon data={Person} size={20} /> },
]
