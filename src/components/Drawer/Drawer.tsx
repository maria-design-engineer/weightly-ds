import type { ReactNode } from 'react'

import { Drawer as BaseDrawer } from '@base-ui/react/drawer'

import '../focus.css'
import type { DrawerActions } from './constants'
import './Drawer.css'

export type DrawerProps = {
  /** Открыта ли шторка. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Figma Actions — кнопки столбиком или в строку. */
  actions?: DrawerActions
  /** Figma Title — заголовок шторки. */
  title?: ReactNode
  /** Figma Caption — подпись под заголовком. */
  caption?: ReactNode
  /** Слот содержимого. В ките на его месте стоит непубликуемый `.Product / drawer-slot`. */
  children?: ReactNode
  /** Figma Действие 1 — главная кнопка. */
  action?: ReactNode
  /** Figma Action 2 — вторая кнопка. */
  secondAction?: ReactNode
  /** Figma Divider top — разделитель под шапкой: содержимое ушло под обрез сверху. */
  dividerTop?: boolean
  /** Figma Divider bottom — разделитель над действиями: ниже есть что показать. */
  dividerBottom?: boolean
}

/**
 * Шторка наложения: шапка, слот содержимого и блок действий. Выезжает снизу,
 * прижата к нижнему краю экрана.
 *
 * Булевы кита `Header`, `Caption on`, `Content on` и `Action 2` во фронт не едут:
 * часть показывается тогда, когда для неё передано содержимое. Вид приходит от нас,
 * поведение — из Base UI: закрытие по Escape, по клику мимо и свайпом вниз,
 * ловушка фокуса и возврат фокуса туда, откуда пришли.
 */
export function Drawer({
  open,
  onOpenChange,
  actions = 'column',
  title,
  caption,
  children,
  action,
  secondAction,
  dividerTop = false,
  dividerBottom = false,
}: DrawerProps) {
  return (
    <BaseDrawer.Root open={open} onOpenChange={onOpenChange} swipeDirection="down">
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="w-drawer__backdrop" />
        <BaseDrawer.Viewport className="w-drawer__viewport">
          <BaseDrawer.Popup className="w-drawer">
            {title || caption ? (
              <div className="w-drawer__head">
                {title ? <BaseDrawer.Title className="w-drawer__title">{title}</BaseDrawer.Title> : null}
                {caption ? (
                  <BaseDrawer.Description className="w-drawer__caption">{caption}</BaseDrawer.Description>
                ) : null}
              </div>
            ) : null}
            {dividerTop ? <hr className="w-drawer__divider" /> : null}
            {children ? <div className="w-drawer__content">{children}</div> : null}
            {dividerBottom ? <hr className="w-drawer__divider" /> : null}
            {action || secondAction ? (
              <div className={`w-drawer__actions w-drawer__actions_${actions}`}>
                {/* В строку вторая кнопка стоит слева от главной — так в ките. */}
                {actions === 'row' ? secondAction : action}
                {actions === 'row' ? action : secondAction}
              </div>
            ) : null}
          </BaseDrawer.Popup>
        </BaseDrawer.Viewport>
      </BaseDrawer.Portal>
    </BaseDrawer.Root>
  )
}
