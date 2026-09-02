import type { ReactNode } from 'react'

import './CorrespondenceRow.css'

export type CorrespondenceRowProps = {
  /** Figma Text — как упражнение назвал тренер. */
  content?: ReactNode
  /** Текст плашки: чему оно соответствует в справочнике. */
  pill?: ReactNode
}

/** Строка соответствия: название тренера слева, плашка справочника справа. */
export function CorrespondenceRow({ content, pill = 'База' }: CorrespondenceRowProps) {
  return (
    <div className="w-correspondence-row">
      <span className="w-correspondence-row__text">{content}</span>
      <span className="w-correspondence-row__pill">{pill}</span>
    </div>
  )
}
