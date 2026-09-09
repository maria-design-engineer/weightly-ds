import type { ReactNode } from 'react'

import { CloudSlash, Xmark } from '@gravity-ui/icons'

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
  /** Figma Offline — значок «без сети» слева от даты. Заведён релизом 2. */
  offline?: boolean
  /** Подпись значка «без сети» для чтения с экрана. */
  offlineLabel?: string
}

/**
 * Шапка экрана: кнопка закрытия и дата рядом с ней. Значок — `xmark`:
 * кнопка закрывает экран прохождения, а не возвращает на шаг назад.
 * Правка кита 03.09.2026, перенесена приёмкой релиза 0.1.0.
 */
export function ScreenHeader({
  content,
  onClose,
  closeLabel = 'Закрыть',
  offline = false,
  offlineLabel = 'Без сети',
}: ScreenHeaderProps) {
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
      <span className="w-screen-header__mark">
        {offline ? (
          <span className="w-screen-header__offline" role="img" aria-label={offlineLabel}>
            <Icon data={CloudSlash} size={16} />
          </span>
        ) : null}
        <Label size="m" theme="unknown" content={content} />
      </span>
    </div>
  )
}
