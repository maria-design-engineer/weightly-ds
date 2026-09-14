import type { ReactNode } from 'react'

import { TrashBin } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { DeleteZoneState } from './constants'
import './DeleteZone.css'

export type DeleteZoneProps = {
  /** Figma State — `over`, когда перетаскиваемая карточка над зоной. */
  state?: DeleteZoneState
  /** Figma Content — подпись зоны. */
  content?: ReactNode
}

/**
 * Зона удаления под списком упражнений: появляется, пока карточку тянут,
 * и принимает её — кадры `7в` и `7д`.
 *
 * Зона стоит под списком, а не поверх него: список не перекрывается, а сдвигается.
 * Удаление — пометка, а не стирание: после отпускания экран показывает алерт
 * «Упражнение удалено» с кнопкой «Вернуть». Это работа экрана, не компонента.
 */
export function DeleteZone({ state = 'idle', content }: DeleteZoneProps) {
  return (
    <div className={`w-delete-zone w-delete-zone_state_${state}`}>
      <Icon data={TrashBin} size={20} />
      <span className="w-delete-zone__text">{content}</span>
    </div>
  )
}
