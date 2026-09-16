import type { ReactNode } from 'react'

import { ChevronRight, CloudSlash } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'

import '../focus.css'
import './HistoryRow.css'

export type HistoryRowProps = {
  /** Figma Text — когда была тренировка. */
  content?: ReactNode
  /** Figma Caption — числа тренировки. */
  caption?: ReactNode
  /** Плашка справа: в ките это экземпляр Label с интенсивностью. */
  mark?: ReactNode
  /** Figma Offline — значок «без сети» между текстом и плашкой. Заведён релизом 2. */
  offline?: boolean
  /** Подпись значка «без сети» для чтения с экрана. */
  offlineLabel?: string
  /** Строка открывает тренировку. Не передано — строка не нажимается. */
  onClick?: () => void
  /** Что откроется по нажатию — подпись для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Строка истории: дата, числа, плашка интенсивности и шеврон справа — мастер
 * `50626:9630`, пересобран 16.09.2026: тень снята, добавлен шеврон, заведено
 * состояние наведения.
 *
 * Нажимаемая строка — кнопка, ненажимаемая — блок: строка без действия нажиматься
 * не должна вовсе. Так же устроена шапка профиля.
 */
export function HistoryRow({
  content,
  caption,
  mark,
  offline = false,
  offlineLabel = 'Тренировка ещё не выгружена',
  onClick,
  ariaLabel,
}: HistoryRowProps) {
  const inside = (
    <>
      <span className="w-history-row__text">
        <span className="w-history-row__title">{content}</span>
        {caption ? <span className="w-history-row__caption">{caption}</span> : null}
      </span>
      {offline ? (
        <span className="w-history-row__offline" role="img" aria-label={offlineLabel}>
          <Icon data={CloudSlash} size={14} />
        </span>
      ) : null}
      {mark}
      <span className="w-history-row__chevron">
        <Icon data={ChevronRight} size={16} />
      </span>
    </>
  )

  if (!onClick) return <div className="w-history-row">{inside}</div>

  return (
    <button
      className="w-history-row w-history-row_action"
      type="button"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {inside}
    </button>
  )
}
