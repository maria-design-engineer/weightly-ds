import type { ReactNode } from 'react'

import './BlockTabs.css'

export type BlockTabsProps = {
  /** Вкладки блоков. В ките внутри стоят четыре `Custom / block-tab`. */
  children?: ReactNode
}

/**
 * Ряд вкладок блоков тренировки. Своих свойств у него нет: состояние
 * каждой вкладки живёт на самой вкладке.
 */
export function BlockTabs({ children }: BlockTabsProps) {
  return <div className="w-block-tabs">{children}</div>
}
