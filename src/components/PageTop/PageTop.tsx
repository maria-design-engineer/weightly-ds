import type { ReactNode } from 'react'

import './PageTop.css'

export type PageTopProps = {
  /**
   * Figma `breadcrumbs` — путь до страницы, экземпляр `Breadcrumbs`. Не передан —
   * строка стоит пустой и держит место: заголовок страницы не прыгает от экрана
   * к экрану. Решение пользователя 03.11.2026.
   */
  breadcrumbs?: ReactNode
}

/**
 * Первая строка полотна кабинета — `Product / page-top` `51663:41905`: над
 * заголовком страницы, высота 42 на любом экране.
 */
export function PageTop({ breadcrumbs }: PageTopProps) {
  return <div className="w-page-top">{breadcrumbs ?? null}</div>
}
