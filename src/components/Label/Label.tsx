import type { ReactNode } from 'react'

import type { LabelSize, LabelTheme } from './constants'
import './Label.css'

export type LabelProps = {
  /** Figma Size — 3 значения: высоты 20, 24, 28. */
  size?: LabelSize
  /** Figma Theme — 8 значений. Имя темы и имя токена расходятся: Success красится Positive. */
  theme?: LabelTheme
  /** Figma Key text — основной текст. Icon only = иконка без текста. */
  content?: ReactNode
  /** Figma ↳ Value text — второй кусок текста. */
  value?: ReactNode
  /** Figma Icon */
  icon?: ReactNode
  /** Figma End icon */
  endIcon?: ReactNode
}

/**
 * Метка: короткий текст на цветной плашке. Пары в Base UI нет — поведения
 * внутри нет, это текст на токенах. Ось Hover живёт только в Figma, в коде это рантайм.
 */
export function Label({ size = 's', theme = 'normal', content, value, icon, endIcon }: LabelProps) {
  const className = ['w-label', `w-label_size_${size}`, `w-label_theme_${theme}`].join(' ')

  return (
    <span className={className}>
      {icon ? <span className="w-label__icon">{icon}</span> : null}
      {content}
      {value ? <span className="w-label__value">{value}</span> : null}
      {endIcon ? <span className="w-label__icon">{endIcon}</span> : null}
    </span>
  )
}
