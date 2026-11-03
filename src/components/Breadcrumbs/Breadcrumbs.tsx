import type { MouseEvent, ReactNode } from 'react'
import { Fragment, useLayoutEffect, useRef, useState } from 'react'

import { ChevronRight } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import './Breadcrumbs.css'

export type BreadcrumbsItem = {
  /** Figma `Page text` — подпись звена. */
  label: ReactNode
  /** Адрес звена. У текущей страницы не нужен. */
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  /**
   * Figma `Icons` у `.breadcrumbs-current` — до трёх значков 16 после подписи
   * текущей страницы, промежуток 8. У звеньев пути значков в ките нет.
   */
  icons?: ReactNode
}

export type BreadcrumbsProps = {
  /**
   * Звенья пути по порядку; последнее — страница, на которой человек стоит.
   * В ките глубину задают булевы `Nesting page 1…5` — приём Figma, в код не едет.
   */
  items: BreadcrumbsItem[]
  /** Подпись навигации для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Путь до открытой страницы — `Breadcrumbs` `53593:3494`, обход 03.11.2026.
 * Звенья пути — `.breadcrumbs-item`: подпись `Text/Secondary` и разделитель
 * `chevron-right` 10; текущая страница — `.breadcrumbs-current`, `Text/Primary`,
 * без разделителя. Не помещается строка — середина пути сворачивается в звено
 * `Expand=On` с «...»; первое звено и текущая страница остаются всегда.
 */
export function Breadcrumbs({ items, ariaLabel }: BreadcrumbsProps) {
  const navRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLOListElement>(null)
  /* Сколько звеньев после первого свёрнуто. Пересчитывается от нуля на смене ширины. */
  const [folded, setFolded] = useState(0)

  const path = items.slice(0, -1)
  const current = items.at(-1)
  const maxFolded = Math.max(path.length - 1, 0)

  useLayoutEffect(() => {
    const nav = navRef.current
    const list = listRef.current
    if (!nav || !list) return
    if (list.scrollWidth > nav.clientWidth && folded < maxFolded) setFolded(folded + 1)
  }, [folded, maxFolded, items])

  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav || typeof ResizeObserver === 'undefined') return
    let width = nav.clientWidth
    const observer = new ResizeObserver(() => {
      if (nav.clientWidth === width) return
      width = nav.clientWidth
      setFolded(0)
    })
    observer.observe(nav)
    return () => observer.disconnect()
  }, [])

  const shown = folded > 0 ? [path[0], ...path.slice(1 + folded)] : path

  const separator = (
    <span className="w-breadcrumbs__separator">
      <Icon data={ChevronRight} size={10} />
    </span>
  )

  return (
    <nav ref={navRef} className="w-breadcrumbs" aria-label={ariaLabel}>
      <ol ref={listRef} className="w-breadcrumbs__list">
        {shown.map((item, index) => (
          <Fragment key={index}>
            <li className="w-breadcrumbs__item">
              {item.href ? (
                <a className="w-breadcrumbs__link" href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <span className="w-breadcrumbs__link">{item.label}</span>
              )}
              {separator}
            </li>
            {/* Свёрнутая середина встаёт сразу за первым звеном — `Expand=On`. */}
            {index === 0 && folded > 0 ? (
              <li className="w-breadcrumbs__item">
                <span className="w-breadcrumbs__link">...</span>
                {separator}
              </li>
            ) : null}
          </Fragment>
        ))}
        {current ? (
          <li className="w-breadcrumbs__current" aria-current="page">
            <span className="w-breadcrumbs__current-label">{current.label}</span>
            {current.icons ? <span className="w-breadcrumbs__icons">{current.icons}</span> : null}
          </li>
        ) : null}
      </ol>
    </nav>
  )
}
