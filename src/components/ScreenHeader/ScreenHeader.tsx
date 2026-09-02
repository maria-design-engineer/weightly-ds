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
      <Button
        view="secondary"
        size="m"
        ariaLabel={backLabel}
        startIcon={<Icon data={ChevronLeft} size={16} />}
        onClick={onBack}
      />
      <Label size="m" theme="unknown" content={content} />
    </div>
  )
}
