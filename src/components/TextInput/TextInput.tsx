import type { ReactNode } from 'react'

import { Field } from '@base-ui/react/field'
import { Input } from '@base-ui/react/input'
import { CircleExclamation } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { TextInputSize, TextInputView } from './constants'
import '../focus.css'
import './TextInput.css'

export type TextInputProps = {
  /** Figma Size */
  size?: TextInputSize
  /** Figma View */
  view?: TextInputView
  /** Figma Content */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Figma State=Suggest — подсказка в пустом поле. */
  placeholder?: string
  /** Figma State=Disabled */
  disabled?: boolean
  /** Figma Error text. Пустая строка означает «ошибки нет». */
  errorMessage?: ReactNode
  /**
   * Figma State=Error inline | Error outline.
   * inline — рамка и значок, outline — строка под полем.
   */
  errorPlacement?: 'inline' | 'outline'
  /** Figma Start icon */
  startIcon?: ReactNode
  /** Подпись поля стоит над полем, в Custom / field: свойство Label кита не берётся. */
  ariaLabel?: string
}

/**
 * Однострочный ввод. Вид собран по киту на токенах, из Base UI приходит
 * поведение поля: связка подписи и ошибки, состояния фокуса и отключения.
 */
export function TextInput({
  size = 'm',
  view = 'normal',
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  errorMessage,
  errorPlacement = 'outline',
  startIcon,
  ariaLabel,
}: TextInputProps) {
  const invalid = Boolean(errorMessage)

  const className = [
    'w-text-input',
    `w-text-input_size_${size}`,
    `w-text-input_view_${view}`,
    invalid ? 'w-text-input_invalid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Field.Root className={className} disabled={disabled} invalid={invalid}>
      <div className="w-text-input__box">
        {startIcon}
        <Input
          className="w-text-input__control"
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          placeholder={placeholder}
          aria-label={ariaLabel}
        />
        {invalid && errorPlacement === 'inline' ? (
          <span className="w-text-input__error-icon" title={String(errorMessage)}>
            <Icon data={CircleExclamation} size={16} />
          </span>
        ) : null}
      </div>
      {invalid && errorPlacement === 'outline' ? (
        <Field.Error className="w-text-input__error-text" match>
          {errorMessage}
        </Field.Error>
      ) : null}
    </Field.Root>
  )
}
