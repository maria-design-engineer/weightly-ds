import { LiftMark } from '../LiftMark/LiftMark'
import type { LiftMarkState } from '../LiftMark/constants'
import './LiftsCell.css'

export type LiftsCellProps = {
  /**
   * Отметки подъёмов по порядку. В Figma число подъёмов набирают булевыми
   * свойствами Lift 2…Lift 5 — во фронт такие свойства не едут, вместо них список.
   */
  lifts: LiftMarkState[]
}

/** Ячейка подъёмов: до пяти отметок в строку. */
export function LiftsCell({ lifts }: LiftsCellProps) {
  return (
    <span className="w-lifts-cell">
      {lifts.map((state, index) => (
        <LiftMark key={index} state={state} />
      ))}
    </span>
  )
}
