import type { ReactNode } from 'react'
import { useCallback, useState } from 'react'

import { Drawer as BaseDrawer } from '@base-ui/react/drawer'

import { Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'

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
  /**
   * Figma `Fix-slot` — слот, который не прокручивается: стоит под заголовком,
   * над обычным слотом. Нужен формам, где верх остаётся на месте, а поля ездят
   * под ним, — форма своего упражнения, кадры `3` и `3б`.
   */
  fixSlot?: ReactNode
  /** Слот содержимого. В ките на его месте стоит непубликуемый `.Product / drawer-slot`. */
  children?: ReactNode
  /** Figma Действие 1 — главная кнопка. */
  action?: ReactNode
  /** Figma Action 2 — вторая кнопка. */
  secondAction?: ReactNode
  /**
   * Figma Divider top — разделитель над слотом: содержимое ушло под обрез сверху.
   * Ставить руками не нужно — шторка сама смотрит, прокручено ли содержимое;
   * проп оставлен на случай, когда линия нужна всегда.
   */
  dividerTop?: boolean
  /** Figma Divider bottom — то же снизу: под обрезом осталось ещё содержимое. */
  dividerBottom?: boolean
  /**
   * Закрыли крестиком. Не передан — крестика нет: закрывают кнопкой действий,
   * свайпом, Escape или нажатием мимо.
   */
  onClose?: () => void
  /** Подпись крестика для чтения с экрана. */
  closeLabel?: string
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
  fixSlot,
  children,
  action,
  secondAction,
  dividerTop = false,
  dividerBottom = false,
  onClose,
  closeLabel = 'Закрыть',
}: DrawerProps) {
  /*
   * Разделители показывают, что содержимое ушло под обрез, — значит считать их
   * должна сама шторка: экран не знает ни высоты окна, ни того, куда докрутили.
   * Решение пользователя 15.09.2026. Пропы остаются принудительными: `true`
   * держит линию всегда.
   */
  const [cutTop, setCutTop] = useState(false)
  const [cutBottom, setCutBottom] = useState(false)

  /*
   * Слот появляется не вместе со шторкой: Base UI монтирует панель своим шагом,
   * и обычный эффект успевает отработать раньше — узла ещё нет, подписываться
   * не на что. Поэтому подписка висит на ref-функции: она вызывается ровно тогда,
   * когда узел появился, и ещё раз, когда он уходит.
   */
  const watch = useCallback((node: HTMLDivElement | null) => {
    if (node === null) return

    const measure = () => {
      setCutTop(node.scrollTop > 0)
      /* Единица запаса: дробная высота даёт остаток в доли пикселя на самом низу. */
      setCutBottom(node.scrollTop + node.clientHeight < node.scrollHeight - 1)
    }

    measure()
    node.addEventListener('scroll', measure, { passive: true })
    /* Содержимое меняется — меняется и обрез: список отфильтровали, поле выросло. */
    const observer = new ResizeObserver(measure)
    observer.observe(node)
    for (const child of node.children) observer.observe(child)

    return () => {
      node.removeEventListener('scroll', measure)
      observer.disconnect()
    }
  }, [])

  return (
    /*
     * `trap-focus` вместо полной модальности: при ней Base UI гасит нажатия по всему,
     * что вне шторки, — включая списки, которые уходят в свой портал. Поле выбора
     * внутри формы переставало открываться. Находка прогона 14.09.2026. Фокус
     * по-прежнему держится внутри, нажатие мимо закрывает.
     */
    <BaseDrawer.Root
      open={open}
      onOpenChange={onOpenChange}
      swipeDirection="down"
      modal="trap-focus"
    >
      <BaseDrawer.Portal>
        <BaseDrawer.Backdrop className="w-drawer__backdrop" />
        <BaseDrawer.Viewport className="w-drawer__viewport">
          <BaseDrawer.Popup className="w-drawer">
            {title || caption || onClose ? (
              /*
               * Шапка стоит строкой: слева заголовок с подписью, справа крестик —
               * правка кита 14.09.2026, до неё крестика у шторки не было вовсе.
               */
              <div className="w-drawer__head">
                <div className="w-drawer__heading">
                  {title ? (
                    <BaseDrawer.Title className="w-drawer__title">{title}</BaseDrawer.Title>
                  ) : null}
                  {caption ? (
                    <BaseDrawer.Description className="w-drawer__caption">
                      {caption}
                    </BaseDrawer.Description>
                  ) : null}
                </div>
                {onClose ? (
                  <Button
                    view="flat-secondary"
                    size="m"
                    startIcon={<Icon data={Xmark} size={16} />}
                    ariaLabel={closeLabel}
                    onClick={onClose}
                  />
                ) : null}
              </div>
            ) : null}
            {/* `Fix-slot` стоит на месте: прокрутка живёт ниже, в обычном слоте. */}
            {fixSlot ? <div className="w-drawer__fix-slot">{fixSlot}</div> : null}
            {/*
              Разделители обрамляют прокручиваемый слот и прилегают к нему вплотную:
              они говорят, что содержимое ушло под обрез сверху или снизу. Поэтому
              верхний стоит не под шапкой, а прямо над слотом — правка 15.09.2026.
            */}
            {dividerTop || cutTop ? (
              <hr className="w-drawer__divider w-drawer__divider_top" />
            ) : null}
            {children ? (
              <div className="w-drawer__content" ref={watch}>
                {children}
              </div>
            ) : null}
            {dividerBottom || cutBottom ? (
              <hr className="w-drawer__divider w-drawer__divider_bottom" />
            ) : null}
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
