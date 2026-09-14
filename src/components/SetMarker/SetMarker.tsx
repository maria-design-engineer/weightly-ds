import type { ReactNode } from 'react'

import { Check, CircleDashed, Minus, Xmark } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { LiftsCell } from '../LiftsCell/LiftsCell'
import type { LiftMarkState } from '../LiftMark/constants'
import type { SetMarkerState } from './constants'
import './SetMarker.css'

const ICONS = {
  done: Check,
  current: CircleDashed,
  planned: CircleDashed,
  skipped: Minus,
  failed: Xmark,
  /* У `result` своего значка нет: вместо него идёт ряд отметок. */
  result: CircleDashed,
}

export type SetMarkerProps = {
  /** Figma State — подход выполнен, идёт, запланирован, пропущен или неуспешен. */
  state?: SetMarkerState
  /** Figma Text — номер подхода. */
  content?: ReactNode
  /**
   * Отметки подходов зоны, по одной на подход — `Product / lifts-cell` внутри
   * состояния `result`. Переданы — плашка показывает их вместо значка с номером.
   * В ките число отметок набирают булевыми `Lift 2`…`Lift 5`; во фронт такие
   * свойства не едут, вместо них список.
   */
  marks?: LiftMarkState[]
  /** Нажали на отметку. Не передан — отметка только показывает. */
  onPick?: () => void
  /** Подпись нажатия для чтения с экрана. */
  pickLabel?: string
}

/** Отметка подхода: значок и номер. */
export function SetMarker({ state = 'planned', content, marks, onPick, pickLabel }: SetMarkerProps) {
  /* Нажимаемая отметка — кнопка: её берут и с клавиатуры. Показывающая остаётся `span`. */
  const Tag = onPick ? 'button' : 'span'

  return (
    <Tag
      className={`w-set-marker w-set-marker_state_${state}`}
      {...(onPick ? { type: 'button' as const, onClick: onPick, 'aria-label': pickLabel } : {})}
    >
      {marks ? (
        <LiftsCell lifts={marks} />
      ) : (
        <>
          <span className="w-set-marker__icon">
            <Icon data={ICONS[state]} size={16} />
          </span>
          {content}
        </>
      )}
    </Tag>
  )
}
