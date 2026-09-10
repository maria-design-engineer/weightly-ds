import type { ReactNode } from 'react'

import './StickyBar.css'

export type StickyBarProps = {
  /** Содержимое панели. В ките внутри стоят две кнопки размера XL. */
  children?: ReactNode
}

/**
 * Нижняя панель действий: растворение фоном экрана и размытие, содержимое
 * делит ширину поровну.
 *
 * Булево кита `Right button` во фронт не едет — то же правило, что у булевых
 * `Drawer`: кнопки приходят содержимым, и «правой кнопки нет» выражается тем,
 * что её не передали. Передашь одну — она займёт всю ширину сама.
 */
export function StickyBar({ children }: StickyBarProps) {
  return <div className="w-sticky-bar">{children}</div>
}
