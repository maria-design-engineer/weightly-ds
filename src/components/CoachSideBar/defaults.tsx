import { BookOpen, Calendar, FileText, Person, Persons, Rectangles4, SlidersVertical } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { CoachSideBarItem } from './CoachSideBar'

/**
 * Семь пунктов кита с подписями и значками. Значки — иконотека Gravity, имена
 * из мастера `50821:15850`: rectangles-4, persons, calendar, sliders-vertical,
 * file-text, book-open, person.
 */
export const COACH_SIDE_BAR_ITEMS: CoachSideBarItem[] = [
  { id: 'plans', label: 'Планы', icon: <Icon data={Rectangles4} size={20} /> },
  { id: 'athletes', label: 'Атлеты', icon: <Icon data={Persons} size={20} /> },
  { id: 'calendar', label: 'Календарь', icon: <Icon data={Calendar} size={20} /> },
  { id: 'methods', label: 'Методика', icon: <Icon data={SlidersVertical} size={20} /> },
  { id: 'templates', label: 'Шаблоны', icon: <Icon data={FileText} size={20} /> },
  { id: 'articles', label: 'Статьи', icon: <Icon data={BookOpen} size={20} /> },
  { id: 'profile', label: 'Профиль', icon: <Icon data={Person} size={20} /> },
]
