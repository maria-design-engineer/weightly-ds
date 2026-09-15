import type { ReactNode } from 'react'

import { Minus, Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import type { LiftCounterView } from './constants'
import './LiftCounter.css'

export type LiftCounterProps = {
  /** Figma View — `panel` в панели подхода, `field` в форме шторки. */
  view?: LiftCounterView
  /** Figma Content — число подъёмов. */
  content?: ReactNode
  /** Убавить на единицу. */
  onDecrease?: () => void
  /** Прибавить единицу. */
  onIncrease?: () => void
  /** Что считаем — уходит в подписи кнопок для чтения с экрана. */
  label?: string
  /**
   * Готовые подписи кнопок для чтения с экрана. Нужны там, где продукт диктует
   * их целиком: на экране подхода это «Убрать подъём» и «Добавить подъём» —
   * `content-guide/accessibility.md`. Не переданы — подпись собирается из `label`.
   */
  decreaseLabel?: string
  increaseLabel?: string
}

/**
 * Счётчик подъёмов: минус, число, плюс. Один счётчик — одно движение упражнения.
 * Кнопки — экземпляры `Button`: размера L, 42 × 42, у `panel`; размера M, 34 × 34,
 * у `field`. Своей иконочной кнопки в ките нет.
 */
export function LiftCounter({
  view = 'panel',
  content,
  onDecrease,
  onIncrease,
  label = 'подъёмы',
  decreaseLabel,
  increaseLabel,
}: LiftCounterProps) {
  const size = view === 'field' ? 'm' : 'l'

  return (
    <div className={`w-lift-counter w-lift-counter_view_${view}`}>
      <div className="w-lift-counter__row">
        <Button
          view="secondary"
          size={size}
          startIcon={<Icon data={Minus} />}
          ariaLabel={decreaseLabel ?? `Убавить ${label}`}
          onClick={onDecrease}
        />
        {/* Число объявляется после нажатия. */}
        <span className="w-lift-counter__value" aria-live="polite">
          {content}
        </span>
        <Button
          view="secondary"
          size={size}
          startIcon={<Icon data={Plus} />}
          ariaLabel={increaseLabel ?? `Прибавить ${label}`}
          onClick={onIncrease}
        />
      </div>
    </div>
  )
}
