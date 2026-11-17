import { cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react'

import type { ButtonProps } from '../Button/Button'
import { Picture, type PictureIcon } from '../Picture/Picture'
import type { PictureType } from '../Picture/constants'
import type { PlaceholderSize } from './constants'
import './Placeholder.css'

export type PlaceholderProps = {
  /**
   * Figma Size — размер кнопок в ряду действий: `l` — 42, телефон; `m` — 34, настольные
   * экраны. Остальное в вариантах совпадает. Профиль `ui-kit/components/placeholder.md`,
   * правка кита 17.11.2026.
   */
  size?: PlaceholderSize
  /**
   * Figma `icon` и подмена `Product / picture` — значок над текстом, тип набора.
   * Не передан — значка нет.
   */
  picture?: PictureType
  /** Подмена иконки в `Product / picture` типа `phone` — значок с новой картинкой. */
  pictureIcon?: PictureIcon
  /** Заголовок — текст на экземпляре, своего свойства в ките нет. */
  title?: ReactNode
  /** Figma `caption` — пояснение под заголовком. Не передано — строки нет. */
  caption?: ReactNode
  /** Figma `button-1` — главное действие: `Button` вида `Normal-contrast`; размер ставит ось `size`. */
  button1?: ReactNode
  /** Figma `button-2` — `Button` вида `Flat-secondary`; размер ставит ось `size`. */
  button2?: ReactNode
  /** Figma `button-3` — `Button` вида `Flat-secondary`; размер ставит ось `size`. */
  button3?: ReactNode
}

/**
 * Заглушка на месте, где показывать нечего, — `Placeholder` `50732:19704`, релиз
 * кита 6. Два случая одним устройством: содержимого ещё нет — пустой список,
 * пустая история, — и содержимое не показалось — нет сети, сбой. До релиза
 * звалась `ErrorState`, в ките `Error`.
 *
 * Булевы кита `icon`, `caption`, `button-1` … `button-3` во фронт не едут: часть
 * показывается, когда для неё передано содержимое, — как у шторки и окна. Своих
 * строк компонент не несёт: тексты и кнопки ставит экран. Ширину задаёт место.
 */
export function Placeholder({
  size = 'l',
  picture,
  pictureIcon,
  title,
  caption,
  button1,
  button2,
  button3,
}: PlaceholderProps) {
  const actions = button1 || button2 || button3

  /* Кнопкам ряда размер даёт ось: в ките `Size=L` — кнопки L, `Size=M` — кнопки M. */
  const sized = (button: ReactNode) =>
    isValidElement(button) ? cloneElement(button as ReactElement<ButtonProps>, { size }) : button

  return (
    <div className="w-placeholder">
      {picture ? (
        /*
          Значок декоративный: рядом заголовок, он говорит то же словами. Рамка
          «Доступность · список атлетов» `1974:500`, решение пользователя 04.11.2026.
        */
        <div className="w-placeholder__illustration" aria-hidden="true">
          <Picture type={picture} icon={pictureIcon} />
        </div>
      ) : null}
      {title || caption ? (
        <div className="w-placeholder__text">
          {title ? <span className="w-placeholder__title">{title}</span> : null}
          {caption ? <span className="w-placeholder__caption">{caption}</span> : null}
        </div>
      ) : null}
      {actions ? (
        <div className="w-placeholder__actions">
          {sized(button1)}
          {sized(button2)}
          {sized(button3)}
        </div>
      ) : null}
    </div>
  )
}
