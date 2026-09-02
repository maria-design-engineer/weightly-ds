import type { ReactNode } from 'react'

import './HistoryRow.css'

export type HistoryRowProps = {
  /** Figma Text — когда была тренировка. */
  content?: ReactNode
  /** Figma Caption — числа тренировки. */
  caption?: ReactNode
  /** Плашка справа: в ките это экземпляр Label с интенсивностью. */
  mark?: ReactNode
}

/** Строка истории: дата, числа и плашка интенсивности справа. */
export function HistoryRow({ content, caption, mark }: HistoryRowProps) {
  return (
    <div className="w-history-row">
      <span className="w-history-row__text">
        <span className="w-history-row__title">{content}</span>
        {caption ? <span className="w-history-row__caption">{caption}</span> : null}
      </span>
      {mark}
    </div>
  )
}
