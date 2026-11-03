import type { MouseEvent, ReactNode } from 'react'

import { BottomBarItem } from '../BottomBarItem/BottomBarItem'
import { Divider } from '../Divider/Divider'
import type { CoachSideBarSection } from './constants'
import { COACH_SIDE_BAR_ITEMS } from './defaults'
import './CoachSideBar.css'

export type CoachSideBarItem = {
  /** Раздел: по нему меню узнаёт текущий пункт. */
  id: CoachSideBarSection
  label: ReactNode
  icon: ReactNode
  /** Адрес раздела — меню меняет раздел, а не панель. */
  href?: string
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void
}

export type CoachSideBarProps = {
  /** Раздел, в котором тренер сейчас. В ките — `State=Active` у его пункта. */
  active?: CoachSideBarSection
  /** Состав пунктов. По умолчанию семь из кита; последний встаёт под разделитель. */
  items?: CoachSideBarItem[]
  /** Подпись навигации для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Боковое меню кабинета тренера — `Product / coach-side-bar` `50821:15850`.
 * Панель со значком продукта сверху, шесть разделов, разделитель и «Профиль»
 * отдельно внизу. Пункты — `BottomBarItem` с `devise="desktop"`. Это `nav`
 * со ссылками и `aria-current`, как нижняя панель атлета.
 */
export function CoachSideBar({
  active,
  items = COACH_SIDE_BAR_ITEMS,
  ariaLabel,
}: CoachSideBarProps) {
  const top = items.slice(0, -1)
  const bottom = items.slice(-1)

  const render = (item: CoachSideBarItem) => (
    <BottomBarItem
      key={item.id}
      devise="desktop"
      state={item.id === active ? 'active' : 'inactive'}
      label={item.label}
      icon={item.icon}
      href={item.href}
      onClick={item.onClick}
    />
  )

  return (
    <nav className="w-coach-side-bar" aria-label={ariaLabel}>
      <div className="w-coach-side-bar__panel">
        {/*
          Значок продукта — экземпляр `Product / app-icon` 56 × 56 на плашке
          `Branding/Base Dark`, радиус 16. Слово «ТЯЖ» снято с мастера векторами.
          Своей подписи в рамке доступности у значка нет — он декоративный.
        */}
        <div className="w-coach-side-bar__app-icon-box">
          <span className="w-coach-side-bar__app-icon" aria-hidden="true">
            <svg width="36" height="13" viewBox="0 0 36 13" fill="currentColor">
              <path d="M3.9314 4.53584V11.8991H6.50006L8.51323 8.29934C8.51323 8.29934 6.94576 7.2947 7.0658 4.54529C7.18068 1.91414 9.05408 0.875 9.05408 0.875H0.984375V4.53584H3.9314Z" />
              <path d="M9.64676 8.03027L7.46191 11.8991H12.4618L13.9534 8.69588H14.3946V11.8991H16.156L18.9153 6.23979L16.4033 0.875H12.7139C11.5935 0.875 10.6762 1.04834 9.96188 1.39501C9.2476 1.72781 8.7224 2.19235 8.38627 2.78862C8.05014 3.38489 7.88208 4.08517 7.88208 4.88944C7.88208 5.58278 8.02213 6.19985 8.30224 6.74066C8.58235 7.2676 9.03052 7.69747 9.64676 8.03027ZM12.777 5.49265C12.5949 5.36785 12.5039 5.16678 12.5039 4.88944C12.5039 4.59824 12.5949 4.39717 12.777 4.28623C12.973 4.1753 13.1971 4.11983 13.4492 4.11983H14.3946V5.65905H13.4492C13.1971 5.65905 12.973 5.60358 12.777 5.49265Z" />
              <path d="M17.0625 11.8991L19.7856 6.19985L17.272 0.875H21.9642L23.4095 4.61904H23.619V0.875H28.2274V4.61904H28.4369L30.0079 0.875H34.6582L32.2077 6.19985L34.8677 11.8991H29.8822L28.4369 7.94707H28.2274V11.8991H23.619V7.94707H23.4095L21.8385 11.8991H17.0625Z" />
            </svg>
          </span>
        </div>
        <div className="w-coach-side-bar__items">{top.map(render)}</div>
        <div className="w-coach-side-bar__divider">
          <Divider />
        </div>
        <div className="w-coach-side-bar__items">{bottom.map(render)}</div>
      </div>
    </nav>
  )
}
