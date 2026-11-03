/**
 * Разделы кабинета тренера — семь пунктов мастера `Product / coach-side-bar`
 * `50821:15850` в его порядке. Осей у меню нет: какой пункт текущий, в ките задаёт
 * `State` у пункта, в коде — проп `active` у меню.
 */
export const COACH_SIDE_BAR_SECTIONS = [
  'plans',
  'athletes',
  'calendar',
  'methods',
  'templates',
  'articles',
  'profile',
] as const

export type CoachSideBarSection = (typeof COACH_SIDE_BAR_SECTIONS)[number]
