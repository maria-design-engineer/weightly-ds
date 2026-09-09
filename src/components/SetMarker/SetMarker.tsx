import type { ReactNode } from 'react'

import { Check, CircleDashed, Minus, Xmark } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { SetMarkerState } from './constants'
import './SetMarker.css'

const ICONS = {
  done: Check,
  current: CircleDashed,
  planned: CircleDashed,
  skipped: Minus,
  failed: Xmark,
}

export type SetMarkerProps = {
  /** Figma State — подход выполнен, идёт, запланирован, пропущен или неуспешен. */
  state?: SetMarkerState
  /** Figma Text — номер подхода. */
  content?: ReactNode
}

/** Отметка подхода: значок и номер. */
export function SetMarker({ state = 'planned', content }: SetMarkerProps) {
  return (
    <span className={`w-set-marker w-set-marker_state_${state}`}>
      <span className="w-set-marker__icon">
        <Icon data={ICONS[state]} size={16} />
      </span>
      {content}
    </span>
  )
}
