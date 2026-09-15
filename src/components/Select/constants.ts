import type { ReactNode } from 'react'

/** Ось Size кита — 4 значения. Профиль: ui-kit/figma-components/select.md */
export const SELECT_SIZES = ['s', 'm', 'l', 'xl'] as const

/** Ось View кита — 2 значения. */
export const SELECT_VIEWS = ['normal', 'clear'] as const

export type SelectSize = (typeof SELECT_SIZES)[number]
export type SelectView = (typeof SELECT_VIEWS)[number]

/**
 * Пункт списка — строка `List-item` кита. Слоты строки: `Start Icon` слева,
 * `Content` посередине, `Secondary content` справа. Тип `Divider` отделяет группу
 * от группы — кадр `1277:135207` продуктового файла, решение пользователя 15.09.2026.
 */
export type SelectItem =
  | {
      type?: 'item'
      value: string
      label: string
      /** Figma Start Icon — значок слева от подписи. */
      icon?: ReactNode
      /** Figma Secondary content — метка справа: «Своё» у своей основы. */
      secondary?: ReactNode
    }
  | { type: 'separator'; value: string }
