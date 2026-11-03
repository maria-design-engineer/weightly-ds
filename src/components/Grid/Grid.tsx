import type { ReactNode } from 'react'

import './Grid.css'

export type GridProps = {
  /** Содержимое раздела: строка `PageTop` и блок страницы. */
  children?: ReactNode
}

/**
 * Полотно страницы кабинета — `Product / grid` `50821:4512`. Подложка, на которой
 * лежит раздел; сетки колонок в нём нет, имя от кита. Осей и свойств нет.
 */
export function Grid({ children }: GridProps) {
  return <div className="w-grid">{children}</div>
}
