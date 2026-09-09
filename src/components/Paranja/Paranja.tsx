import type { ReactNode } from 'react'

import { Dialog } from '@base-ui/react/dialog'

import type { ParanjaType } from './constants'
import '../focus.css'
import './Paranja.css'

export type ParanjaProps = {
  /** Figma Type — под шторкой или под информационным окном. */
  type?: ParanjaType
  /** Открыто ли наложение. */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Карточка наложения. На макетах она во всю ширину и прижата к низу. */
  children?: ReactNode
  /** Подпись наложения для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Затемнение под наложением. Вид — прямоугольник кита: под шторкой `Effect/Veil`,
 * под информационным окном `Effect/Shadow` — оно светлее;
 * поведение приходит из Base UI: закрытие по Escape и по клику мимо, ловушка
 * фокуса, возврат фокуса туда, откуда пришли, и блокировка прокрутки фона.
 */
export function Paranja({ type = 'drawer', open, onOpenChange, children, ariaLabel }: ParanjaProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={`w-paranja w-paranja_type_${type}`} />
        <Dialog.Popup className="w-paranja__sheet" aria-label={ariaLabel}>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
