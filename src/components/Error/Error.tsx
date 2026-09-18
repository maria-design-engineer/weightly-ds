import type { ReactNode } from 'react'

import { Picture } from '../Picture/Picture'
import type { PictureType } from '../Picture/constants'
import './Error.css'

export type ErrorStateProps = {
  /** Figma Значок · пусто — ось Type компонента `Product / picture`. */
  picture?: PictureType
  /** Figma «Нет сети» — заголовок состояния. */
  title?: ReactNode
  /** Figma «Проверь связь и перезагрузи страницу» — пояснение под заголовком. */
  message?: ReactNode
  /** Figma Button — кнопка под текстом; не передали, значит её нет. */
  action?: ReactNode
}

/**
 * Пустое состояние экрана — мастер `Error`, `50732:19704`. Показывает, почему
 * показывать нечего, и даёт выход одной кнопкой. Своих строк не несёт: заголовок,
 * пояснение и кнопку ставит экран.
 *
 * Имя в коде — `ErrorState`: `Error` в браузере занят своим классом, и одноимённый
 * компонент читался бы как он.
 */
export function ErrorState({ picture = 'empty-badge', title, message, action }: ErrorStateProps) {
  return (
    <div className="w-error">
      <Picture type={picture} />
      <span className="w-error__text">
        {title ? <span className="w-error__title">{title}</span> : null}
        {message ? <span className="w-error__message">{message}</span> : null}
      </span>
      {action}
    </div>
  )
}
