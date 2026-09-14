import type { ReactNode } from 'react'

import { Menu } from '@base-ui/react/menu'
import { Ellipsis } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { DropdownMenuItem, DropdownMenuSize } from './constants'
import './DropdownMenu.css'

export type DropdownMenuProps = {
  /** Figma Size — высота строки: `s` 24, `m` 28, `l` 36, `xl` 44. */
  size?: DropdownMenuSize
  /** Пункты и разделители по порядку. */
  items: DropdownMenuItem[]
  /**
   * Что стоит на кнопке, с которой меню открывается. Не передано — многоточие.
   * Саму кнопку рисует компонент: меню держится за неё якорем, и подменить
   * её снаружи значит оторвать якорь.
   */
  renderSwitcher?: () => ReactNode
  /** Подпись кнопки-многоточия для чтения с экрана. */
  switcherLabel?: string
  /** Меню открыто. Не передано — компонент держит это сам. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Подпись списка для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Меню у кнопки-многоточия: список действий, открывающийся якорем к кнопке.
 * Вид карточки и строк собран по киту на токенах, из Base UI приходит
 * поведение: клавиатура, чтение с экрана, закрытие по нажатию и по Esc.
 *
 * Строки меню в ките — отдельный набор `List-item`: он же стоит в списках.
 * В коде отдельным компонентом не заводится — в продукте он живёт только здесь,
 * решение пользователя 14.09.2026.
 */
export function DropdownMenu({
  size = 'xl',
  items,
  renderSwitcher,
  switcherLabel,
  open,
  onOpenChange,
  ariaLabel,
}: DropdownMenuProps) {
  return (
    <Menu.Root open={open} onOpenChange={(next) => onOpenChange?.(next)}>
      {/*
        Кнопку рисует сам `Menu.Trigger` — он и есть `<button>`. Своя кнопка
        внутрь не вкладывается: кнопка в кнопке ломает и разметку, и клавиатуру.
      */}
      <Menu.Trigger className="w-dropdown-menu__switcher" aria-label={switcherLabel}>
        {renderSwitcher ? renderSwitcher() : <Icon data={Ellipsis} />}
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="w-dropdown-menu__positioner" sideOffset={4} align="end">
          <Menu.Popup className={`w-dropdown-menu w-dropdown-menu_size_${size}`} aria-label={ariaLabel}>
            {items.map((item) =>
              item.type === 'separator' ? (
                <div key={item.id} className="w-dropdown-menu__separator" role="separator" />
              ) : (
                <Menu.Item
                  key={item.id}
                  className="w-dropdown-menu__item"
                  disabled={item.disabled}
                  onClick={() => item.onPick?.()}
                >
                  {item.icon ? (
                    <span className="w-dropdown-menu__icon">{item.icon}</span>
                  ) : null}
                  <span className="w-dropdown-menu__text">{item.content}</span>
                </Menu.Item>
              ),
            )}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
