import type { ReactNode } from 'react'

import { Dialog } from '@base-ui/react/dialog'

import '../focus.css'
import './Paranja.css'

export type ParanjaProps = {
  /** Открыто ли наложение. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Карточка наложения. На макетах она во всю ширину и прижата к низу. */
  children?: ReactNode
  /** Подпись наложения для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Затемнение под наложением. Вид — прямоугольник кита на `Effect/Veil`;
 * поведение приходит из Base UI: закрытие по Escape и по клику мимо, ловушка
 * фокуса, возврат фокуса туда, откуда пришли, и блокировка прокрутки фона.
 */
export function Paranja({ open, onOpenChange, children, ariaLabel }: ParanjaProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="w-paranja" />
        <Dialog.Popup className="w-paranja__sheet" aria-label={ariaLabel}>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
