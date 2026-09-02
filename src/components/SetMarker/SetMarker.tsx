import type { ReactNode } from 'react'

import { CircleCheckFill, CircleDashed } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { SetMarkerState } from './constants'
import './SetMarker.css'

export type SetMarkerProps = {
  /** Figma State — подход выполнен, идёт сейчас или запланирован. */
  state?: SetMarkerState
  /** Figma Text — номер подхода. */
  content?: ReactNode
}

/** Отметка подхода: кружок со значком и номер. */
export function SetMarker({ state = 'planned', content }: SetMarkerProps) {
  return (
    <span className={`w-set-marker w-set-marker_state_${state}`}>
      <span className="w-set-marker__icon">
        <Icon data={state === 'done' ? CircleCheckFill : CircleDashed} size={16} />
      </span>
      {content}
    </span>
  )
}
