import type { ReactNode } from 'react'

import { Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import type { AlertCorners, AlertTheme, AlertView } from './constants'
import './Alert.css'

export type AlertProps = {
  /** Figma Theme — 6 значений. Success красится токенами Positive. */
  theme?: AlertTheme
  /** Figma View */
  view?: AlertView
  /** Figma Corners */
  corners?: AlertCorners
  /** Figma Layout у внутреннего .Content — где стоят кнопки. */
  /** Figma ↳ Title text */
  title?: ReactNode
  /** Figma Content text */
  message?: ReactNode
  /** Figma Icon (optional) */
  icon?: ReactNode
  /** Figma Show buttons, Button 2, Button 3 */
  actions?: ReactNode
  /** Figma Close button — крестик справа. */
  onClose?: () => void
  /** Подпись крестика для чтения с экрана. */
  closeLabel?: string
}

/**
 * Строка-предупреждение на странице. Пары в Base UI нет: её alert-dialog —
 * модальное окно, а это плита в потоке. Текст сообщения в ките живёт
 * на вложенном .Content, во фронт он отдельным компонентом не едет.
 */
export function Alert({
  theme = 'normal',
  view = 'filled',
  corners = 'rounded',
  title,
  message,
  icon,
  actions,
  onClose,
  closeLabel = 'Закрыть',
}: AlertProps) {
  const className = [
    'w-alert',
    `w-alert_theme_${theme}`,
    `w-alert_view_${view}`,
    `w-alert_corners_${corners}`,
  ].join(' ')

  return (
    <div
      className={className}
      /*
       * Опасное и предупреждающее читается немедленно, остальное — в порядке
       * очереди. Раньше роль стояла строкой для всех шести тем, и `danger`
       * читался вежливо. Находка 2 ревью этапа 14.
       */
      role={theme === 'danger' || theme === 'warning' ? 'alert' : 'status'}
    >
      {icon ? <span className="w-alert__icon">{icon}</span> : null}
      <div className="w-alert__content">
        <div className="w-alert__text">
          {title ? <span className="w-alert__title">{title}</span> : null}
          {message}
        </div>
        {actions ? <div className="w-alert__actions">{actions}</div> : null}
      </div>
      {onClose ? (
        <span className="w-alert__close">
          <Button
            view="flat"
            size="s"
            ariaLabel={closeLabel}
            startIcon={<Icon data={Xmark} size={16} />}
            onClick={onClose}
          />
        </span>
      ) : null}
    </div>
  )
}
