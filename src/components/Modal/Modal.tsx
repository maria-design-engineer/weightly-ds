import type { ReactNode, RefObject } from 'react'

import { Dialog } from '@base-ui/react/dialog'

import { Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { CardHeader } from '../CardHeader/CardHeader'
import { Icon } from '../Icon/Icon'

import '../focus.css'
import './Modal.css'

export type ModalProps = {
  /** Открыто ли окно. */
  open?: boolean
  /** Base UI зовёт его на Escape, на нажатие мимо окна и на крестик. */
  onOpenChange?: (open: boolean) => void
  /** Заголовок вложенной шапки `Product / card-header`, размер `Header 2`. Не передан — шапки нет. */
  title?: ReactNode
  /** Пояснение вложенной шапки. Не передано — строки нет. */
  description?: ReactNode
  /** Figma `icon` вложенной шапки — значок слева от заголовка. Не передан — значка нет. */
  icon?: ReactNode
  /**
   * Figma `Close on` — крестик в правом верхнем углу, по умолчанию включён.
   * Выключенный прячет только крестик: Escape и нажатие мимо окно закрывают.
   */
  closeOn?: boolean
  /** Подпись крестика для чтения с экрана. */
  closeLabel?: string
  /** Figma `fixSlot` — слот под шапкой, не прокручивается. Не передан — слота нет. */
  fixSlot?: ReactNode
  /** Figma `Content` — слот `Slot`, прокручивается. В ките на его месте заглушка `.Product / drawer-slot`. */
  children?: ReactNode
  /** Figma `action-1` — первая кнопка левого слота. */
  action1?: ReactNode
  /** Figma `action-2` — вторая кнопка левого слота. */
  action2?: ReactNode
  /** Figma `action-3` — первая кнопка правого слота. */
  action3?: ReactNode
  /** Figma `action-4` — крайняя правая, главная кнопка окна: вид `Primary`, размер `L`. */
  action4?: ReactNode
  /**
   * Куда встаёт фокус, когда окно открылось. По умолчанию Base UI берёт первое,
   * до чего доходит Tab, — в окне это крестик. Форме нужно первое поле.
   */
  initialFocus?: RefObject<HTMLElement | null>
}

/**
 * Окно поверх страницы на настольном экране — `Product / modal` `51719:36605`,
 * настольная пара шторки. Шапка, два слота и ряд действий; под окном затемнение
 * `Product / paranja`, `Type=info`.
 *
 * Булевы кита `Header`, `Content on`, `fixSlot on`, `Actions` и `action-1` … `action-4`
 * во фронт не едут: часть показывается, когда для неё передано содержимое, — так же,
 * как у шторки. Вид приходит от нас, поведение — из Base UI: Escape, нажатие мимо,
 * ловушка фокуса, возврат фокуса туда, откуда пришли, блокировка прокрутки страницы.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  closeOn = true,
  closeLabel = 'Закрыть',
  fixSlot,
  children,
  action1,
  action2,
  action3,
  action4,
  initialFocus,
}: ModalProps) {
  const showClose = closeOn && Boolean(onOpenChange)
  const left = action1 || action2
  const right = action3 || action4

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="w-modal__backdrop" />
        <Dialog.Viewport className="w-modal__viewport">
          <Dialog.Popup className="w-modal" initialFocus={initialFocus}>
            {title || showClose ? (
              <div className="w-modal__head">
                {title ? (
                  <div className="w-modal__heading">
                    {/*
                      Заголовок и пояснение стоят в шапке раздела, а имя окну дают
                      Base UI `Title` и `Description`: они отрисованы внутри шапки
                      строчными элементами и связывают окно с текстом сами.
                    */}
                    <CardHeader
                      size="header-2"
                      icon={icon}
                      title={<Dialog.Title render={<span />}>{title}</Dialog.Title>}
                      description={
                        description ? (
                          <Dialog.Description render={<span />}>{description}</Dialog.Description>
                        ) : undefined
                      }
                    />
                  </div>
                ) : null}
                {showClose ? (
                  /* Крестик 34 — `Button` размера `M`, только значок `xmark` 12. */
                  <Button
                    view="flat-secondary"
                    size="m"
                    startIcon={<Icon data={Xmark} />}
                    ariaLabel={closeLabel}
                    onClick={() => onOpenChange?.(false)}
                  />
                ) : null}
              </div>
            ) : null}
            {fixSlot ? <div className="w-modal__fix-slot">{fixSlot}</div> : null}
            {children ? <div className="w-modal__content">{children}</div> : null}
            {left || right ? (
              <div className="w-modal__actions">
                <div className="w-modal__actions-side">
                  {action1}
                  {action2}
                </div>
                <div className="w-modal__actions-side">
                  {action3}
                  {action4}
                </div>
              </div>
            ) : null}
          </Dialog.Popup>
        </Dialog.Viewport>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
