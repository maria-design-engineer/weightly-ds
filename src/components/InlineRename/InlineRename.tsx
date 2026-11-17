import { useEffect, useRef, type KeyboardEvent, type ReactNode } from 'react'

import { Check, Xmark } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { TextInput } from '../TextInput/TextInput'
import './InlineRename.css'

export type InlineRenameProps = {
  /** Название в поле — у вложенного `TextInput`, свойство `↳ Content text`. */
  value: string
  onValueChange: (value: string) => void
  /** Галочка и Enter. Пустое название не сохраняется: галочка выключена. */
  onSave: () => void
  /** Крестик, Esc и щелчок мимо формы — правка отменяется. */
  onCancel: () => void
  /** Ошибка под полем — вид `Error` у `TextInput`: кадры `6о`, `6п`. */
  errorMessage?: ReactNode
  /** Сохранение идёт — галочка в ожидании, второе нажатие не проходит. */
  saving?: boolean
  /** Подписи для скринридера: поле и две кнопки. Пишет UX Writer, ставит экран. */
  ariaLabel?: string
  cancelLabel?: string
  saveLabel?: string
}

/**
 * Правка названия на месте — `Product / inline-rename` `51821:34187`, профиль
 * `ui-kit/product-components/inline-rename.md`, 17.11.2026. Встаёт поверх названия:
 * поле и две кнопки — крестик отменяет, галочка сохраняет.
 *
 * Поведение — заметка UI Designer «Фронту · правка названия на месте» `2283:25061`:
 * Enter сохраняет, Esc отменяет, щелчок мимо формы закрывает её и правку отменяет;
 * пустое имя не сохраняется — галочка недоступна. Своих состояний у обёртки нет:
 * ошибка — у поля, недоступность — у кнопки.
 */
export function InlineRename({
  value,
  onValueChange,
  onSave,
  onCancel,
  errorMessage,
  saving,
  ariaLabel,
  cancelLabel,
  saveLabel,
}: InlineRenameProps) {
  const root = useRef<HTMLDivElement>(null)
  const empty = value.trim() === ''

  /* Открылась правка — фокус в поле: правят то, что открыли. */
  useEffect(() => {
    root.current?.querySelector('input')?.focus({ preventScroll: true })
  }, [])

  /* Щелчок мимо формы отменяет правку — заметка `2283:25061`. */
  const cancelRef = useRef(onCancel)
  cancelRef.current = onCancel
  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (root.current && !root.current.contains(event.target as Node)) cancelRef.current()
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onCancel()
    } else if (event.key === 'Enter' && event.target instanceof HTMLInputElement) {
      event.preventDefault()
      if (!empty && !saving) onSave()
    }
  }

  return (
    <div className="w-inline-rename" ref={root} onKeyDown={onKeyDown}>
      <TextInput size="m" value={value} onValueChange={onValueChange} errorMessage={errorMessage} ariaLabel={ariaLabel} autoComplete="off" />
      <div className="w-inline-rename__actions">
        <Button view="flat-danger" size="m" ariaLabel={cancelLabel} startIcon={<Icon data={Xmark} size={12} />} onClick={onCancel} />
        <Button view="primary" size="m" ariaLabel={saveLabel} startIcon={<Icon data={Check} size={12} />} disabled={empty} loading={saving} onClick={onSave} />
      </div>
    </div>
  )
}
