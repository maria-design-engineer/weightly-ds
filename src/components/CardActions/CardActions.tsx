import type { PointerEvent as ReactPointerEvent } from 'react'

import { Grip, PencilToLine, TrashBin } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import './CardActions.css'

export type CardActionsProps = {
  /** Figma `Правка` — кнопка с карандашом. Включена по умолчанию. */
  edit?: boolean
  /** Figma `Удаление` — кнопка с корзиной. Включена по умолчанию. */
  remove?: boolean
  /** Figma `Перетаскивание` — ручка. Включена по умолчанию. */
  drag?: boolean
  onEdit?: () => void
  onRemove?: () => void
  /** Ручка тянет карточку: экран сам решает, как двигать список. */
  onDragStart?: (event: ReactPointerEvent<HTMLButtonElement>) => void
  /** Подписи кнопок для скринридера — их пишет UX Writer, ставит экран. */
  editLabel?: string
  removeLabel?: string
  dragLabel?: string
}

/**
 * Панель действий на карточке упражнения — `Product / card-actions` `51148:39056`,
 * профиль `ui-kit/product-components/card-actions.md`, 17.11.2026: правка, удаление
 * и ручка перетаскивания. Три кнопки-иконки на непрозрачной подложке с тенью.
 *
 * Выключатели-дубли мастера `Правка2`, `Удаление2`, `Перетаскивание2` ни к чему
 * не привязаны — профиль, «Остальные свойства»; в код не идут.
 *
 * Видимостью панели управляет карточка, `ExerciseCard`: панель лежит поверх неё
 * у правого верхнего угла.
 */
export function CardActions({
  edit = true,
  remove = true,
  drag = true,
  onEdit,
  onRemove,
  onDragStart,
  editLabel,
  removeLabel,
  dragLabel,
}: CardActionsProps) {
  return (
    <div className="w-card-actions">
      {edit ? (
        <Button view="flat-secondary" size="s" ariaLabel={editLabel} startIcon={<Icon data={PencilToLine} size={12} />} onClick={onEdit} />
      ) : null}
      {remove ? (
        <Button view="flat-secondary" size="s" ariaLabel={removeLabel} startIcon={<Icon data={TrashBin} size={12} />} onClick={onRemove} />
      ) : null}
      {drag ? (
        /* Ручку тянут, а не нажимают: `Button` из `ds` слушает только нажатие, поэтому кнопка своя на тех же классах. */
        <button
          type="button"
          className="w-button w-button_view_flat-secondary w-button_size_s w-button_icon-only w-card-actions__grip"
          aria-label={dragLabel}
          onPointerDown={onDragStart}
        >
          <Icon data={Grip} size={12} />
        </button>
      ) : null}
    </div>
  )
}
