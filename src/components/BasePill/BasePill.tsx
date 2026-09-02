import type { ReactNode } from 'react'

import './BasePill.css'

export type BasePillProps = {
  /** Figma Text */
  content?: ReactNode
}

/** Плашка с коротким словом: упражнение в строке переписки. Свойство одно — текст. */
export function BasePill({ content }: BasePillProps) {
  return <span className="w-base-pill">{content}</span>
}
