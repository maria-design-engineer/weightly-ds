import type { MouseEventHandler, ReactNode } from 'react'

import { Button as GravityButton } from '@gravity-ui/uikit'

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
 * Кнопка. Наше имя и наши свойства снаружи, поведение Gravity внутри.
 * Чужое имя наружу не выходит: продукт зовёт этот компонент.
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
  return (
    <GravityButton
      view={view}
      size={size}
      disabled={disabled}
      loading={loading}
      selected={selected}
      onClick={onClick}
      aria-label={ariaLabel}
      className={view === 'outlined' ? 'w-button_view_outlined' : undefined}
    >
      {startIcon ? <GravityButton.Icon side="start">{startIcon}</GravityButton.Icon> : null}
      {content}
      {endIcon ? <GravityButton.Icon side="end">{endIcon}</GravityButton.Icon> : null}
    </GravityButton>
  )
}
