import type { ReactNode } from 'react'

import type { CardHeaderSize } from './constants'
import './CardHeader.css'

export type CardHeaderProps = {
  /** Текст заголовка — слой `label` вложенного `.Product / title`. */
  title: ReactNode
  /** Figma `description` — пояснение раздела под строкой заголовка. Не передано — строки нет. */
  description?: ReactNode
  /** Figma Size вложенного `.Product / title` — стиль заголовка и размер значка. */
  size?: CardHeaderSize
  /** Figma `icon` вложенного `.Product / title` — значок слева. Не передан — значка нет. */
  icon?: ReactNode
  /**
   * Figma `button` вложенного `.Product / title` — кнопка сразу за заголовком.
   * Вид `flat-secondary`, только значок, размер по `size`: XS, XS, S, M.
   */
  button?: ReactNode
  /**
   * Figma `action-1`…`action-3` — кнопки действий раздела справа, слева направо.
   * Вид `flat-secondary`, размер M, только значок. Не передана — кнопки нет.
   */
  action1?: ReactNode
  action2?: ReactNode
  action3?: ReactNode
  /** Уровень заголовка в документе. В ките его нет: он задаётся местом на странице. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

/**
 * Шапка раздела-карточки — `Product / card-header` `50990:74036`. Строка заголовка:
 * `.Product / title` слева, ряд действий справа; под ней пояснение. Внутренний
 * `.Product / title` наружу отдельно не отдаётся — его оси стоят пропами здесь.
 */
export function CardHeader({
  title,
  description,
  size = 'header-1',
  icon,
  button,
  action1,
  action2,
  action3,
  headingLevel = 2,
}: CardHeaderProps) {
  const Heading = `h${headingLevel}` as const
  const hasActions = Boolean(action1 || action2 || action3)

  return (
    <div className="w-card-header">
      <div className="w-card-header__row">
        <div className={`w-card-header__title w-card-header__title_size_${size}`}>
          {icon ? <span className="w-card-header__icon">{icon}</span> : null}
          <Heading className="w-card-header__label">{title}</Heading>
          {button ?? null}
        </div>
        {hasActions ? (
          <div className="w-card-header__actions">
            {action1 ?? null}
            {action2 ?? null}
            {action3 ?? null}
          </div>
        ) : null}
      </div>
      {description ? <p className="w-card-header__description">{description}</p> : null}
    </div>
  )
}
