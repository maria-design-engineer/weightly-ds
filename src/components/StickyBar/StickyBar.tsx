import type { ReactNode } from 'react'

import './StickyBar.css'

export type StickyBarProps = {
  /** Содержимое панели. В ките внутри стоят две кнопки размера XL. */
  children?: ReactNode
}

/**
 * Нижняя панель действий: растворение белым и размытие фона, содержимое
 * делит ширину поровну. Своих свойств у неё нет.
 */
export function StickyBar({ children }: StickyBarProps) {
  return <div className="w-sticky-bar">{children}</div>
}
