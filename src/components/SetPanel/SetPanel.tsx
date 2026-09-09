import type { ReactNode } from 'react'

import { Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Picture } from '../Picture/Picture'
import type { SetPanelState } from './constants'
import './SetPanel.css'

export type SetPanelProps = {
  /** Figma State — есть данные подхода или пусто. */
  state?: SetPanelState
  /** Заголовок блока подходов. */
  title?: ReactNode
  /**
   * Ряд отметок подхода. В ките их пять и лишние гасятся булевыми
   * `Set 3`…`Set 5`; во фронт такие свойства не едут, вместо них список.
   */
  markers?: ReactNode
  /** Добавить подход — кнопка со значком в конце ряда. */
  onAddSet?: () => void
  /** Подпись кнопки «добавить подход» для чтения с экрана. */
  addSetLabel?: string
  /** Строка над барабаном: сколько процентов от максимума. */
  caption?: ReactNode
  /** Figma Max button — кнопка максимума справа от строки. */
  maxButton?: ReactNode
  /** Барабан веса. В ките он горизонтальный, в рамке с растворением по краям. */
  wheel?: ReactNode
  /** Заголовок блока подъёмов. */
  liftsTitle?: ReactNode
  /** Счётчики подъёмов — `Product / lift-counters`. */
  lifts?: ReactNode
  /** Пустое состояние: заголовок, подпись и кнопка. */
  emptyTitle?: ReactNode
  emptyCaption?: ReactNode
  emptyAction?: ReactNode
}

/**
 * Панель подхода на экране прохождения: ряд отметок с кнопкой «плюс»,
 * барабан веса и счётчики подъёмов. Самый крупный продуктовый компонент.
 *
 * Пустое состояние — отдельный вариант, а не спрятанные блоки: состав внутри другой.
 */
export function SetPanel({
  state = 'default',
  title,
  markers,
  onAddSet,
  addSetLabel = 'Добавить подход',
  caption,
  maxButton,
  wheel,
  liftsTitle,
  lifts,
  emptyTitle,
  emptyCaption,
  emptyAction,
}: SetPanelProps) {
  if (state === 'empty') {
    return (
      <div className="w-set-panel">
        <div className="w-set-panel__empty">
          <Picture type="empty-badge" />
          <div className="w-set-panel__empty-text">
            <span className="w-set-panel__empty-title">{emptyTitle}</span>
            <span className="w-set-panel__empty-caption">{emptyCaption}</span>
          </div>
          {emptyAction}
        </div>
      </div>
    )
  }

  return (
    <div className="w-set-panel">
      <div className="w-set-panel__block">
        <span className="w-set-panel__title">{title}</span>
        <div className="w-set-panel__markers">
          {markers}
          {onAddSet ? (
            <Button
              view="normal-contrast"
              size="m"
              startIcon={<Icon data={Plus} />}
              ariaLabel={addSetLabel}
              onClick={onAddSet}
            />
          ) : null}
        </div>
        {caption || maxButton ? (
          <div className="w-set-panel__caption-row">
            {/* Кнопка максимума стоит слева, процент от максимума — справа. */}
            {maxButton}
            <span className="w-set-panel__caption">{caption}</span>
          </div>
        ) : null}
        {wheel ? <div className="w-set-panel__wheel">{wheel}</div> : null}
      </div>
      {lifts ? (
        <div className="w-set-panel__block">
          <span className="w-set-panel__lifts-title">{liftsTitle}</span>
          {lifts}
        </div>
      ) : null}
    </div>
  )
}
