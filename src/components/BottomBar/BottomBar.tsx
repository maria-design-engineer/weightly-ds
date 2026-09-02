import type { ReactNode } from 'react'

import { BottomBarItem } from '../BottomBarItem/BottomBarItem'
import type { BottomBarSection } from './constants'
import { BOTTOM_BAR_SECTIONS } from './constants'
import { BOTTOM_BAR_TABS } from './defaults'
import './BottomBar.css'

export type BottomBarTab = {
  /** Раздел: он же значение оси Active. */
  id: BottomBarSection
  label: ReactNode
  icon: ReactNode
  /** Адрес раздела — нижняя навигация меняет раздел, а не панель. */
  href?: string
  onClick?: () => void
}

export type BottomBarProps = {
  /** Figma Active — раздел, в котором человек сейчас. */
  active?: BottomBarSection
  /** Состав вкладок. По умолчанию три из кита. */
  tabs?: BottomBarTab[]
  /** Подпись навигации для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Нижняя навигация. Смена раздела, а не переключение панелей: это `nav`
 * со ссылками и `aria-current`, роль вкладок не берётся.
 */
export function BottomBar({
  active = BOTTOM_BAR_SECTIONS[0],
  tabs = BOTTOM_BAR_TABS,
  ariaLabel,
}: BottomBarProps) {
  return (
    <nav className="w-bottom-bar" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <BottomBarItem
          key={tab.id}
          state={tab.id === active ? 'active' : 'inactive'}
          label={tab.label}
          icon={tab.icon}
          href={tab.href}
          onClick={tab.onClick}
        />
      ))}
    </nav>
  )
}
