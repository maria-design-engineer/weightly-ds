import type { ReactNode } from 'react'

import { ChevronLeft } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Label } from '../Label/Label'
import './ScreenHeader.css'

export type ScreenHeaderProps = {
  /** Figma Text — дата тренировки. */
  content?: ReactNode
  /** Что делает кнопка «назад». */
  onBack?: () => void
  /** Подпись кнопки для чтения с экрана. */
  backLabel?: string
}

/** Шапка экрана: кнопка «назад» и дата рядом с ней. */
export function ScreenHeader({ content, onBack, backLabel = 'Назад' }: ScreenHeaderProps) {
  return (
    <div className="w-screen-header">
      {/*
       * Кнопки нет, когда возвращаться некуда: иначе в обходе с клавиатуры
       * появляется остановка, которая ничего не делает. Находка 11 ревью этапа 14.
       */}
      {onBack ? (
        <Button
          view="secondary"
          size="m"
          ariaLabel={backLabel}
          startIcon={<Icon data={ChevronLeft} size={16} />}
          onClick={onBack}
        />
      ) : null}
      <Label size="m" theme="unknown" content={content} />
    </div>
  )
}
