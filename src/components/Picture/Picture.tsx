import type { ReactNode } from 'react'

import type { PictureType } from './constants'
import './Picture.css'

/**
 * Рисунки мастера `Product / picture`, `50053:7574`, сняты выгрузкой 18.09.2026.
 * Это не иконки из иконотеки: в ките они нарисованы внутри самого компонента —
 * указание пользователя. Круг подложки рисует CSS, здесь только сам знак;
 * цвет берётся от `currentColor`, обводка 2, поле 45 × 45 как в мастере.
 */
const DRAWINGS: Record<PictureType, ReactNode> = {
  'empty-badge': (
    <>
      <path
        d="M18 19V21.6667M27 19V21.6667M18 27H27"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="22.5"
        cy="22.5"
        r="13.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="6 6"
      />
    </>
  ),
  disconect: (
    <>
      <path
        d="M32.25 31.25L13 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27 30.7881H14.834L14.5498 30.7803C11.6326 30.6323 9.31273 28.2205 9.3125 25.2666C9.3125 22.2172 11.7845 19.7442 14.834 19.7441C14.8535 19.7441 14.8731 19.7449 14.8926 19.7451C14.8549 19.4434 14.834 19.1361 14.834 18.8242C14.834 18.3721 14.8748 17.9296 14.9528 17.5M17.6923 13C18.9373 12.0358 20.4998 11.4619 22.1963 11.4619C25.6286 11.462 28.5117 13.8113 29.3271 16.9893C33.0329 17.1101 36 20.1506 36 23.8857C36 25.7807 35.2363 27.4972 34 28.7443"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  fix: (
    <path
      d="M23.7149 25.2132L25.3372 25.5137C25.7708 25.594 26.2199 25.6364 26.6818 25.6364C30.7235 25.6364 34 22.3599 34 18.3182L33.5842 17.9422L31.0361 20.4903C30.4187 21.1077 29.5813 21.4545 28.7082 21.4545C25.8569 21.4545 23.5455 19.1431 23.5455 16.2918C23.5455 15.4187 23.8923 14.5813 24.5097 13.9639L27.0473 11.4263L26.6818 11C22.6401 11 19.3636 14.2765 19.3636 18.3182C19.3636 18.7801 19.406 19.2292 19.4863 19.6628L19.7868 21.2851L11.8135 29.2583C11.2926 29.7792 11 30.4857 11 31.2224C11 32.7564 12.2436 34 13.7776 34C14.5143 34 15.2208 33.7074 15.7417 33.1865L23.7149 25.2132Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  ),
  time: (
    <>
      <path
        d="M23 35C29.9036 35 35.5 29.4036 35.5 22.5C35.5 15.5964 29.9036 10 23 10C16.0964 10 10.5 15.5964 10.5 22.5C10.5 27.0228 12.902 30.9846 16.5 33.1792M10 33.1792H16.5V26.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M23 16V22L25.5 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>
  ),
}

const TITLES: Record<PictureType, string> = {
  'empty-badge': 'Пусто',
  disconect: 'Нет связи',
  fix: 'Чиним',
  time: 'Время',
}

export type PictureProps = {
  /** Figma Type — пустое состояние, нет связи, чиним или время. */
  type?: PictureType
}

/**
 * Круглый значок на брендовой подложке: стоит в пустых состояниях, на экранах
 * сбоя и там, где показывают время. Знак нарисован в самом компоненте, как
 * в ките, — из иконотеки он не берётся.
 */
export function Picture({ type = 'empty-badge' }: PictureProps) {
  return (
    <span className="w-picture" role="img" aria-label={TITLES[type]}>
      <svg
        className="w-picture__drawing"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {DRAWINGS[type]}
      </svg>
    </span>
  )
}
