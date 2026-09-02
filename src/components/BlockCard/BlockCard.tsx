import type { ReactNode } from 'react'

import type { BlockCardShadow } from './constants'
import './BlockCard.css'

export type BlockCardProps = {
  /** Figma Shadow */
  shadow?: BlockCardShadow
  /** Figma Text — имя блока. */
  content?: ReactNode
  /** Figma Caption — что в блоке. */
  caption?: ReactNode
  /** Кнопки справа: в ките это два экземпляра Button. */
  actions?: ReactNode
}

/** Карточка блока внутри тренировки. Не путать с карточкой тренировки: состав другой. */
export function BlockCard({ shadow = 'off', content, caption, actions }: BlockCardProps) {
  return (
    <div className={`w-block-card w-block-card_shadow_${shadow}`}>
      <span className="w-block-card__text">
        <span className="w-block-card__title">{content}</span>
        {caption ? <span className="w-block-card__caption">{caption}</span> : null}
      </span>
      {actions ? <span className="w-block-card__actions">{actions}</span> : null}
    </div>
  )
}
