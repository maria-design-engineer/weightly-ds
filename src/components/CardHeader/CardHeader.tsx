import type { MouseEventHandler, ReactNode } from 'react'

import { Button } from '../Button/Button'
import type { ButtonSize } from '../Button/constants'
import type { CardHeaderSize } from './constants'
import './CardHeader.css'

/**
 * Кнопка действия раздела. Вид и размер ставит шапка: `flat-secondary`, только
 * значок, размер по оси Size. Экран передаёт значок, подпись и что делать.
 */
export type CardHeaderAction = {
  /** Значок 12 — в ките «⋮» по умолчанию, подменяется в экземпляре. */
  icon: ReactNode
  /** Подпись для чтения с экрана: кнопка несёт только значок. */
  ariaLabel: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export type CardHeaderProps = {
  /** Текст заголовка — слой `label` вложенного `.Product / title`. */
  title: ReactNode
  /** Figma `description` — пояснение раздела под строкой заголовка. Не передано — строки нет. */
  description?: ReactNode
  /** Figma Size — стиль заголовка, размер кнопок действий и стиль пояснения разом. */
  size?: CardHeaderSize
  /** Figma `icon` вложенного `.Product / title` — значок слева. Не передан — значка нет. */
  icon?: ReactNode
  /**
   * Figma `button` вложенного `.Product / title` — кнопка сразу за заголовком.
   * В мастерах шапки выключена: действия стоят справа. Решение пользователя 03.11.2026.
   */
  button?: CardHeaderAction
  /** Figma `action-1`…`action-3` — кнопки действий справа, слева направо. Не передана — нет. */
  action1?: CardHeaderAction
  action2?: CardHeaderAction
  action3?: CardHeaderAction
  /** Уровень заголовка в документе. В ките его нет: он задаётся местом на странице. */
  headingLevel?: 2 | 3 | 4 | 5 | 6
}

/* Размер кнопок по оси Size — мастера набора `51673:42222`: 22, 22, 26, 34. */
const BUTTON_SIZE: Record<CardHeaderSize, ButtonSize> = {
  'caption-1': 'xs',
  'subheader-2': 'xs',
  'header-2': 's',
  'header-1': 'm',
}

/**
 * Шапка раздела-карточки — набор `Product / card-header` `51673:42222`, четыре
 * мастера по оси Size. Строка заголовка: `.Product / title` слева, ряд действий
 * справа; под ней пояснение. Внутренний `.Product / title` наружу отдельно не
 * отдаётся — его выключатели стоят пропами здесь.
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
  const actions = [action1, action2, action3].filter((action) => action !== undefined)

  const render = (action: CardHeaderAction, key?: number) => (
    <Button
      key={key}
      view="flat-secondary"
      size={BUTTON_SIZE[size]}
      startIcon={action.icon}
      ariaLabel={action.ariaLabel}
      onClick={action.onClick}
      disabled={action.disabled}
    />
  )

  return (
    <div className={`w-card-header w-card-header_size_${size}`}>
      <div className="w-card-header__row">
        <div className="w-card-header__title">
          {icon ? <span className="w-card-header__icon">{icon}</span> : null}
          <Heading className="w-card-header__label">{title}</Heading>
          {button ? render(button) : null}
        </div>
        {actions.length > 0 ? (
          <div className="w-card-header__actions">{actions.map((action, index) => render(action, index))}</div>
        ) : null}
      </div>
      {description ? <p className="w-card-header__description">{description}</p> : null}
    </div>
  )
}
