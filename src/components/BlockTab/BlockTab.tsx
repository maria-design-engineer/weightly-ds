import type { ReactNode } from 'react'

import type { BlockTabState } from './constants'
import './BlockTab.css'

export type BlockTabProps = {
  /** Figma State — блок идёт сейчас, пройден или ещё впереди. */
  state?: BlockTabState
  /** Figma Text — имя блока тренировки. */
  content?: ReactNode
  onClick?: () => void
}

/** Вкладка блока тренировки: подпись и полоса под ней. */
export function BlockTab({ state = 'default', content, onClick }: BlockTabProps) {
  return (
    <button
      className={`w-block-tab w-block-tab_state_${state}`}
      type="button"
      onClick={onClick}
      aria-current={state === 'active' ? 'step' : undefined}
    >
      {content}
      <span className="w-block-tab__bar" />
    </button>
  )
}
