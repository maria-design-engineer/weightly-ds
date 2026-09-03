import type { ReactNode } from 'react'

import { Field } from '@base-ui/react/field'

import type { TextAreaSize, TextAreaView } from './constants'
import '../focus.css'
import '../visually-hidden.css'
import { useFieldLabelId } from '../Field/context'
import './TextArea.css'

export type TextAreaProps = {
  /** Figma Size — меняет отступы и радиус, высота поля всегда 102. */
  size?: TextAreaSize
  /** Figma View */
  view?: TextAreaView
  /** Figma ↳ Content text */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Figma State=Suggest — подсказка в пустом поле. */
  placeholder?: string
  /** Figma State=Disabled */
  disabled?: boolean
  /** Figma Error text. Пустая строка означает «ошибки нет». */
  errorMessage?: ReactNode
  /** Figma State=Error inline | Error outline. */
  errorPlacement?: 'inline' | 'outline'
  /** Подпись стоит над полем, в Custom / field. */
  ariaLabel?: string
}

/**
 * Многострочный ввод. Пары в Base UI нет — отдельного компонента у неё нет,
 * поэтому поле пишется своё, а связку ошибки с полем даёт Field, тот же,
 * что у TextInput: приём ошибки в базовом слое один на всех.
 */
export function TextArea({
  size = 'm',
  view = 'normal',
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  errorMessage,
  errorPlacement = 'outline',
  ariaLabel,
}: TextAreaProps) {
  const invalid = Boolean(errorMessage)
  /* Стоит внутри `Field` — имя контролу даёт его подпись, а не второй ariaLabel. */
  const fieldLabelId = useFieldLabelId()

  const className = [
    'w-text-area',
    `w-text-area_size_${size}`,
    `w-text-area_view_${view}`,
    invalid ? 'w-text-area_invalid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Field.Root className={className} disabled={disabled} invalid={invalid}>
      <div className="w-text-area__box">
        <Field.Control
          render={<textarea />}
          className="w-text-area__control"
          value={value}
          defaultValue={defaultValue}
          onValueChange={(next: string) => onValueChange?.(next)}
          placeholder={placeholder}
          aria-label={fieldLabelId ? undefined : ariaLabel}
          aria-labelledby={fieldLabelId}
        />
      </div>
      {invalid ? (
        <Field.Error
          className={errorPlacement === 'outline' ? 'w-text-area__error-text' : 'w-visually-hidden'}
          match
        >
          {errorMessage}
        </Field.Error>
      ) : null}
    </Field.Root>
  )
}
