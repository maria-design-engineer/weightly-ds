import type { ReactNode } from 'react'

/**
 * Ось Size кита — 4 значения. Меняет высоту строки, а с ней и высоту меню:
 * `S` 24, `M` 28, `L` 36, `XL` 44. Профиль — `ui-kit/components/dropdown-menu.md`.
 */
export const DROPDOWN_MENU_SIZES = ['s', 'm', 'l', 'xl'] as const

export type DropdownMenuSize = (typeof DROPDOWN_MENU_SIZES)[number]

/**
 * Пункт меню. Ось `Type` кита — Basic · With icons · Grouped — пропом не является:
 * значок приходит полем пункта, а группы разделяются элементом `separator`.
 */
export type DropdownMenuItem =
  | {
      type?: 'item'
      /** Свой ключ пункта. */
      id: string
      /** Figma ↳ Content text — подпись пункта. */
      content: ReactNode
      /** Figma Start icon — значок слева от подписи. */
      icon?: ReactNode
      /** Figma State=Disabled — пункт виден, но не нажимается. */
      disabled?: boolean
      /** Нажали пункт. Не передан — пункт стоит и ничего не делает. */
      onPick?: () => void
    }
  | { type: 'separator'; id: string }
