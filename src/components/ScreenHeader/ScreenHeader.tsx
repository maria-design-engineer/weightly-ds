import type { ReactNode } from 'react'

import { Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Label } from '../Label/Label'
import './ScreenHeader.css'

export type ScreenHeaderProps = {
  /** Figma Text — дата тренировки. */
  content?: ReactNode
  /** Что делает кнопка закрытия. Не передана — кнопки нет. */
  onClose?: () => void
  /** Подпись кнопки для чтения с экрана. */
  closeLabel?: string
}

/**
 * Шапка экрана: кнопка закрытия и дата рядом с ней. Значок — `xmark`:
 * кнопка закрывает экран прохождения, а не возвращает на шаг назад.
 * Правка кита 03.09.2026, перенесена приёмкой релиза 0.1.0.
 */
export function ScreenHeader({ content, onClose, closeLabel = 'Закрыть' }: ScreenHeaderProps) {
  return (
    <div className="w-screen-header">
      {/*
       * Кнопки нет, когда закрывать нечем: иначе в обходе с клавиатуры
       * появляется остановка, которая ничего не делает. Находка 11 ревью этапа 14.
       */}
      {onClose ? (
        <Button
          view="secondary"
          size="m"
          ariaLabel={closeLabel}
          startIcon={<Icon data={Xmark} size={16} />}
          onClick={onClose}
        />
      ) : null}
      <Label size="m" theme="unknown" content={content} />
    </div>
  )
}
