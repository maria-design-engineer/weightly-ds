import type { ReactNode } from 'react'

import { TextInput as GravityTextInput } from '@gravity-ui/uikit'

import type { TextInputSize, TextInputView } from './constants'

export type TextInputProps = {
  /** Figma Size */
  size?: TextInputSize
  /** Figma View */
  view?: TextInputView
  /** Figma Content */
  value?: string
  defaultValue?: string
  onUpdate?: (value: string) => void
  /** Figma State=Suggest — подсказка в пустом поле. */
  placeholder?: string
  /** Figma State=Disabled */
  disabled?: boolean
  /** Figma Error text — строка ошибки. Пустая означает «ошибки нет». */
  errorMessage?: ReactNode
  /**
   * Figma State=Error inline | Error outline.
   * inline — только рамка и значок, outline — строка под полем.
   */
  errorPlacement?: 'inline' | 'outline'
  /** Figma Clear button */
  hasClear?: boolean
  /** Figma Start icon */
  startIcon?: ReactNode
  /** Подпись поля стоит над полем, в Custom / field, а не внутри — правило продукта. */
  ariaLabel?: string
}

/**
 * Однострочный ввод. Наше имя и наши свойства снаружи, поведение Gravity внутри.
 * Свойство Label кита не берётся: подпись у нас стоит над полем, в Custom / field.
 */
export function TextInput({
  size = 'm',
  view = 'normal',
  value,
  defaultValue,
  onUpdate,
  placeholder,
  disabled,
  errorMessage,
  errorPlacement = 'outline',
  hasClear,
  startIcon,
  ariaLabel,
}: TextInputProps) {
  return (
    <GravityTextInput
      size={size}
      view={view}
      value={value}
      defaultValue={defaultValue}
      onUpdate={onUpdate}
      placeholder={placeholder}
      disabled={disabled}
      validationState={errorMessage ? 'invalid' : undefined}
      errorMessage={errorMessage}
      // Имена значений у кита и у кода разные: inline → inside, outline → outside.
      errorPlacement={errorPlacement === 'inline' ? 'inside' : 'outside'}
      hasClear={hasClear}
      startContent={startIcon}
      controlProps={{ 'aria-label': ariaLabel }}
    />
  )
}
