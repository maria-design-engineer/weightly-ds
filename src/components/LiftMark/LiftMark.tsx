import { Check, Minus, Xmark } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { LiftMarkState } from './constants'
import './LiftMark.css'

const ICONS = { done: Check, failed: Xmark, skipped: Minus }

const TITLES = { done: 'Подъём выполнен', failed: 'Подъём неуспешен', skipped: 'Подъём пропущен' }

export type LiftMarkProps = {
  /** Figma State — отметка подъёма. */
  state?: LiftMarkState
}

/** Отметка одного подъёма: галка, крест или прочерк. Подход и подъём — разные вещи. */
export function LiftMark({ state = 'done' }: LiftMarkProps) {
  return (
    <span className={`w-lift-mark w-lift-mark_state_${state}`} role="img" aria-label={TITLES[state]}>
      <Icon data={ICONS[state]} size={16} />
    </span>
  )
}
