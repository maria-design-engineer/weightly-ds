import type { ReactNode } from 'react'

import type { ChipSelectState } from './constants'
import '../focus.css'
import './ChipSelect.css'

export type ChipSelectProps = {
  /** Figma State — выбран чип или нет. */
  state?: ChipSelectState
  /** Figma Content — подпись чипа. */
  content?: ReactNode
  /**
   * Нажали на чип. Не передан — чип только показывает: так он стоит там,
   * где выбор уже сделан и меняться не может.
   */
  onPick?: () => void
}

/**
 * Выбираемый чип формы: одно значение из группы — база предельного максимума
 * и элементы движения, кадр `3`.
 *
 * **В группе выбирается один.** Поэтому нажимаемый чип приходит с ролью `radio`:
 * ряд чипов оборачивается на экране в `role="radiogroup"` с подписью группы —
 * иначе с клавиатуры он читается набором отдельных кнопок, а не выбором из списка.
 */
export function ChipSelect({ state = 'default', content, onPick }: ChipSelectProps) {
  const className = ['w-chip-select', `w-chip-select_state_${state}`].join(' ')

  if (!onPick) {
    return <span className={className}>{content}</span>
  }

  return (
    <button
      type="button"
      className={className}
      role="radio"
      aria-checked={state === 'selected'}
      onClick={onPick}
    >
      {content}
    </button>
  )
}
