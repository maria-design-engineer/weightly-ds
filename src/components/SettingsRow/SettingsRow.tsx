import type { ReactNode } from 'react'

import { ChevronRight } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { SettingsRowCard } from './constants'
import './SettingsRow.css'

export type SettingsRowProps = {
  /** Figma Card — строка лежит на карточке или прямо на фоне. */
  card?: SettingsRowCard
  /** Figma Text — название. */
  content?: ReactNode
  /** Figma Caption — подпись под названием. */
  caption?: ReactNode
  onClick?: () => void
}

/** Строка настройки или упражнения: текст слева, шеврон справа. */
export function SettingsRow({ card = 'off', content, caption, onClick }: SettingsRowProps) {
  return (
    <button className={`w-settings-row w-settings-row_card_${card}`} type="button" onClick={onClick}>
      <span className="w-settings-row__text">
        <span className="w-settings-row__title">{content}</span>
        {caption ? <span className="w-settings-row__caption">{caption}</span> : null}
      </span>
      <span className="w-settings-row__chevron">
        <Icon data={ChevronRight} size={16} />
      </span>
    </button>
  )
}
