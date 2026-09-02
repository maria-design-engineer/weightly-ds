import type { ReactNode } from 'react'

import type { TableCellTone } from './constants'
import './TableCell.css'

export type TableCellProps = {
  /** Figma Tone — меняет только цвет текста. */
  tone?: TableCellTone
  /** Figma Text */
  content?: ReactNode
}

/** Ячейка таблицы подходов: текст на стилях, поведения внутри нет. */
export function TableCell({ tone = 'secondary', content }: TableCellProps) {
  return <div className={`w-table-cell w-table-cell_tone_${tone}`}>{content}</div>
}
