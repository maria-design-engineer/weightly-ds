import type { KeyboardEvent } from 'react'
import { useEffect, useRef } from 'react'

import type { DropdownMenuItem, DropdownMenuSize } from './constants'
import '../focus.css'
import './DropdownMenu.css'

export type DropdownMenuProps = {
  /** Figma Size — высота строки: `s` 24, `m` 28, `l` 36, `xl` 44. */
  size?: DropdownMenuSize
  /** Пункты и разделители по порядку. */
  items: DropdownMenuItem[]
  /** Закрыть меню: нажали пункт, Esc или ушли с него. */
  onClose?: () => void
  /** Подпись списка для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Меню действий: карточка со строками. В ките это ровно она — кнопки, с которой
 * меню открывают, в мастере нет, и компонент её не рисует. Где карточка лежит —
 * у кнопки, на парандже, в углу экрана — решает экран: решение пользователя
 * 14.09.2026, до него кнопка была внутри компонента.
 *
 * Строки меню в ките — отдельный набор `List-item`: он же стоит в списках.
 * Отдельным компонентом в код не заводится — в продукте он живёт только здесь.
 */
export function DropdownMenu({ size = 'xl', items, onClose, ariaLabel }: DropdownMenuProps) {
  const card = useRef<HTMLDivElement>(null)

  /*
   * Открытое меню забирает фокус на первую строку: иначе человек с клавиатуры
   * остаётся на кнопке, а список читается где-то в стороне.
   */
  useEffect(() => {
    const first = card.current?.querySelector<HTMLButtonElement>('[role="menuitem"]:not([disabled])')
    first?.focus()
  }, [])

  /*
   * Обход строк стрелками — этого ждёт роль `menu`: Tab уводит из меню целиком,
   * а вверх и вниз ходят по пунктам. Esc закрывает.
   */
  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.stopPropagation()
      onClose?.()
      return
    }
    if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return

    const rows = Array.from(
      card.current?.querySelectorAll<HTMLButtonElement>('[role="menuitem"]:not([disabled])') ?? [],
    )
    if (rows.length === 0) return

    event.preventDefault()
    const here = rows.indexOf(document.activeElement as HTMLButtonElement)
    const step = event.key === 'ArrowDown' ? 1 : -1
    const next = (here + step + rows.length) % rows.length
    rows[next]?.focus()
  }

  return (
    <div
      ref={card}
      className={`w-dropdown-menu w-dropdown-menu_size_${size}`}
      role="menu"
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
    >
      {items.map((item) =>
        item.type === 'separator' ? (
          <div key={item.id} className="w-dropdown-menu__separator" role="separator" />
        ) : (
          <button
            key={item.id}
            type="button"
            className="w-dropdown-menu__item"
            role="menuitem"
            disabled={item.disabled}
            onClick={() => {
              onClose?.()
              item.onPick?.()
            }}
          >
            {item.icon ? <span className="w-dropdown-menu__icon">{item.icon}</span> : null}
            <span className="w-dropdown-menu__text">{item.content}</span>
          </button>
        ),
      )}
    </div>
  )
}
