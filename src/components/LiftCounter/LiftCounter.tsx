import type { ReactNode } from 'react'

import { Minus, Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import './LiftCounter.css'

export type LiftCounterProps = {
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
 * Кнопки — экземпляры `Button` размера L: 42 × 42, своей иконочной кнопки в ките нет.
 */
export function LiftCounter({
  content,
  onDecrease,
  onIncrease,
  label = 'подъёмы',
  decreaseLabel,
  increaseLabel,
}: LiftCounterProps) {
  return (
    <div className="w-lift-counter">
      <div className="w-lift-counter__row">
        <Button
          view="secondary"
          size="l"
          startIcon={<Icon data={Minus} />}
          ariaLabel={decreaseLabel ?? `Убавить ${label}`}
          onClick={onDecrease}
        />
        <span className="w-lift-counter__value">{content}</span>
        <Button
          view="secondary"
          size="l"
          startIcon={<Icon data={Plus} />}
          ariaLabel={increaseLabel ?? `Прибавить ${label}`}
          onClick={onIncrease}
        />
      </div>
    </div>
  )
}
