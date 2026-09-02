import type { ReactNode } from 'react'
import { useId } from 'react'

import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown, CircleExclamation } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { SelectItem, SelectSize, SelectView } from './constants'
import '../focus.css'
import '../visually-hidden.css'
import './Select.css'

export type SelectProps = {
  /** Figma Size */
  size?: SelectSize
  /** Figma View */
  view?: SelectView
  /** Значения списка. В ките открытого списка нет — рисуется только закрытая кнопка. */
  items: SelectItem[]
  /** Figma Content — выбранное значение. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Figma State=Suggest — подсказка, пока ничего не выбрано. */
  placeholder?: string
  /** Figma State=Disabled */
  disabled?: boolean
  /** Figma ↳ Counter value — счётчик выбранных значений. */
  counter?: number
  /** Figma Error text. Пустая строка означает «ошибки нет». */
  errorMessage?: ReactNode
  /** Figma State=Error inline | Error outline. */
  errorPlacement?: 'inline' | 'outline'
  /** Подпись стоит над полем, в Custom / field: свойство Label кита не берётся. */
  ariaLabel?: string
}

/**
 * Выбор значения из списка. Вид закрытой кнопки собран по киту на токенах,
 * из Base UI приходит поведение: клавиатура, чтение с экрана, открытие и закрытие.
 */
export function Select({
  size = 'm',
  view = 'normal',
  items,
  value,
  defaultValue,
  onValueChange,
  placeholder,
  disabled,
  counter,
  errorMessage,
  errorPlacement = 'outline',
  ariaLabel,
}: SelectProps) {
  const invalid = Boolean(errorMessage)
  const errorId = useId()

  const className = [
    'w-select',
    `w-select_size_${size}`,
    `w-select_view_${view}`,
    invalid ? 'w-select_invalid' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <BaseSelect.Root
        items={items}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next: string | null) => {
          if (next !== null) onValueChange?.(next)
        }}
        disabled={disabled}
      >
        <BaseSelect.Trigger
          className="w-select__trigger"
          aria-label={ariaLabel}
          aria-describedby={invalid ? errorId : undefined}
        >
          <BaseSelect.Value className="w-select__value">
            {(selected: string | null) => {
              const item = items.find((candidate) => candidate.value === selected)
              return item ? (
                item.label
              ) : (
                <span className="w-select__value_empty">{placeholder}</span>
              )
            }}
          </BaseSelect.Value>
          {counter === undefined ? null : <span className="w-select__counter">{counter}</span>}
          {invalid && errorPlacement === 'inline' ? (
            <span className="w-select__error-icon">
              <Icon data={CircleExclamation} size={16} />
            </span>
          ) : null}
          <BaseSelect.Icon className="w-select__icon">
            <Icon data={ChevronDown} size={16} />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
        <BaseSelect.Portal>
          <BaseSelect.Positioner sideOffset={4}>
            <BaseSelect.Popup className="w-select__popup">
              {items.map((item) => (
                <BaseSelect.Item key={item.value} className="w-select__item" value={item.value}>
                  <BaseSelect.ItemIndicator className="w-select__item-indicator">
                    <Icon data={Check} size={16} />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.Popup>
          </BaseSelect.Positioner>
        </BaseSelect.Portal>
      </BaseSelect.Root>
      {invalid ? (
        <span
          id={errorId}
          className={errorPlacement === 'outline' ? 'w-select__error-text' : 'w-visually-hidden'}
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  )
}
