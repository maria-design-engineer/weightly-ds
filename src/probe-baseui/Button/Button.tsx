import type { MouseEventHandler, ReactNode } from 'react'

import { Button as BaseButton } from '@base-ui/react/button'

import type { ButtonSize, ButtonView } from './constants'
import './Button.css'

export type ButtonProps = {
  /** Figma View */
  view?: ButtonView
  /** Figma Size */
  size?: ButtonSize
  /** Figma Content — подпись кнопки. Icon only = иконка без подписи. */
  content?: ReactNode
  /** Figma Start icon */
  startIcon?: ReactNode
  /** Figma End icon */
  endIcon?: ReactNode
  /** Figma State=Disabled */
  disabled?: boolean
  /** Figma State=Loading */
  loading?: boolean
  /** Figma State=Selected */
  selected?: boolean
  onClick?: MouseEventHandler<HTMLButtonElement>
  /** Подпись для чтения с экрана, когда кнопка несёт только иконку. */
  ariaLabel?: string
}

/**
 * Кнопка. Вид собран по киту целиком, из Base UI приходит только поведение:
 * доступность, отключённое состояние, нажатие с клавиатуры.
 */
export function Button({
  view = 'normal',
  size = 'm',
  content,
  startIcon,
  endIcon,
  disabled,
  loading,
  selected,
  onClick,
  ariaLabel,
}: ButtonProps) {
  const iconOnly = content === undefined && (Boolean(startIcon) || Boolean(endIcon))

  const className = [
    'w-button',
    `w-button_view_${view}`,
    `w-button_size_${size}`,
    iconOnly ? 'w-button_icon-only' : '',
    selected ? 'w-button_selected' : '',
    loading ? 'w-button_loading' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <BaseButton
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      aria-pressed={selected}
    >
      {startIcon}
      {content}
      {endIcon}
    </BaseButton>
  )
}
