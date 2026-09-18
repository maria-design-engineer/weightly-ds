import type { ReactNode } from 'react'

import '../focus.css'
import './ProfileHeader.css'

export type ProfileHeaderProps = {
  /** Значок человека — экземпляр `Avatar` приходит содержимым. */
  avatar?: ReactNode
  /** Figma Имя — имя атлета, а до его заполнения логин из почты. */
  name?: ReactNode
  /** Figma Почта */
  email?: ReactNode
  /** Нажатие открывает шторку «Данные аккаунта». Не передано — шапка не нажимается. */
  onClick?: () => void
  /** Что откроется по нажатию — подпись для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Шапка профиля: значок слева, справа имя и почта — мастер
 * `Product / profile-header`, `50585:61042`, пересснят 18.09.2026. Ось State:
 * наведение красит шапку `Base/Simple Hover`, скругление полное.
 *
 * Нажимаемая — кнопка, ненажимаемая — обычный блок: выключенная кнопка на экране
 * выглядит как рабочая, а шапка без действия нажиматься не должна вовсе.
 */
export function ProfileHeader({ avatar, name, email, onClick, ariaLabel }: ProfileHeaderProps) {
  const content = (
    <>
      {avatar}
      <span className="w-profile-header__text">
        <span className="w-profile-header__name">{name}</span>
        <span className="w-profile-header__email">{email}</span>
      </span>
    </>
  )

  if (!onClick) return <div className="w-profile-header">{content}</div>

  return (
    <button
      className="w-profile-header w-profile-header_action"
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {content}
    </button>
  )
}
