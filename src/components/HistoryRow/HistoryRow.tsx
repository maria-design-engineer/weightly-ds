import type { ReactNode } from 'react'

import { CloudSlash } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'

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
}

/** Строка истории: дата, числа и плашка интенсивности справа. */
export function HistoryRow({
  content,
  caption,
  mark,
  offline = false,
  offlineLabel = 'Тренировка ещё не выгружена',
}: HistoryRowProps) {
  return (
    <div className="w-history-row">
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
    </div>
  )
}
