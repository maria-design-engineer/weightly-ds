import type { ReactNode } from 'react'

import type { BottomBarItemState } from './constants'
import './BottomBarItem.css'

export type BottomBarItemProps = {
  /** Figma State — активный раздел красится брендовым цветом. */
  state?: BottomBarItemState
  /** Figma Label — подпись вкладки. */
  label?: ReactNode
  /** Figma Icon — подмена значка. */
  icon?: ReactNode
  /** Адрес раздела: нижняя навигация меняет раздел, а не панель. */
  href?: string
  onClick?: () => void
}

/**
 * Вкладка нижней навигации. Смена раздела, а не переключение панелей:
 * активная помечается aria-current, как ссылка текущей страницы.
 */
export function BottomBarItem({
  state = 'inactive',
  label,
  icon,
  href,
  onClick,
}: BottomBarItemProps) {
  const className = `w-bottom-bar-item w-bottom-bar-item_state_${state}`
  const content = (
    <>
      <span className="w-bottom-bar-item__icon">{icon}</span>
      {label}
    </>
  )

  if (href) {
    return (
      <a className={className} href={href} aria-current={state === 'active' ? 'page' : undefined}>
        {content}
      </a>
    )
  }

  return (
    <button className={className} type="button" onClick={onClick} aria-current={state === 'active' ? 'page' : undefined}>
      {content}
    </button>
  )
}
