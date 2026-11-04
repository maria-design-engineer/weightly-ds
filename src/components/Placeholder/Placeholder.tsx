import type { ReactNode } from 'react'

import { Picture } from '../Picture/Picture'
import type { PictureType } from '../Picture/constants'
import './Placeholder.css'

export type PlaceholderProps = {
  /**
   * Figma `icon` и подмена `Product / picture` — значок над текстом, тип набора.
   * Не передан — значка нет.
   */
  picture?: PictureType
  /** Заголовок — текст на экземпляре, своего свойства в ките нет. */
  title?: ReactNode
  /** Figma `caption` — пояснение под заголовком. Не передано — строки нет. */
  caption?: ReactNode
  /** Figma `button-1` — главное действие: `Button` вида `Normal-contrast`, размер `L`. */
  button1?: ReactNode
  /** Figma `button-2` — `Button` вида `Flat-secondary`, размер `L`. */
  button2?: ReactNode
  /** Figma `button-3` — `Button` вида `Flat-secondary`, размер `L`. */
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
export function Placeholder({ picture, title, caption, button1, button2, button3 }: PlaceholderProps) {
  const actions = button1 || button2 || button3

  return (
    <div className="w-placeholder">
      {picture ? (
        <div className="w-placeholder__illustration">
          <Picture type={picture} />
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
          {button1}
          {button2}
          {button3}
        </div>
      ) : null}
    </div>
  )
}
