import type { ReactNode } from 'react'
import { useId } from 'react'

import { Select as BaseSelect } from '@base-ui/react/select'
import { Check, ChevronDown, CircleExclamation } from '@gravity-ui/icons'

import { useFieldLabelId } from '../Field/context'
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
  /* Строки, которые выбираются: разделитель — линия, значения у него нет. */
  const pickable = items.filter((item) => item.type !== 'separator')
  const invalid = Boolean(errorMessage)
  const errorId = useId()
  const valueId = useId()
  const ownLabelId = useId()
  /*
   * Имя кнопки собирается из подписи и выбранного значения: у роли combobox
   * `aria-label` вытесняет содержимое, и значение переставало объявляться —
   * находка 4 ревью этапа 14. Подпись берётся из `Field`, а когда его нет —
   * из `ariaLabel`, спрятанного рядом.
   */
  const fieldLabelId = useFieldLabelId()
  const labelId = fieldLabelId ?? (ariaLabel ? ownLabelId : undefined)
  const labelledBy = labelId ? `${labelId} ${valueId}` : undefined

  /* Есть пункт со второй строкой — список шире поля и без предела в пять строк. */
  const multiline = pickable.some((item) => item.description !== undefined)
  const className = [
    'w-select',
    `w-select_size_${size}`,
    `w-select_view_${view}`,
    invalid ? 'w-select_invalid' : '',
    multiline ? 'w-select_multiline' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={className}>
      <BaseSelect.Root
        /* Разделители — вид, а не значение: в Base UI уходят только пункты. */
        items={pickable}
        value={value}
        defaultValue={defaultValue}
        onValueChange={(next: string | null) => {
          if (next !== null) onValueChange?.(next)
        }}
        disabled={disabled}
      >
        <BaseSelect.Trigger
          className="w-select__trigger"
          aria-labelledby={labelledBy}
          aria-describedby={invalid ? errorId : undefined}
        >
          {!fieldLabelId && ariaLabel ? (
            <span className="w-visually-hidden" id={ownLabelId}>
              {ariaLabel}
            </span>
          ) : null}
          <BaseSelect.Value className="w-select__value" id={valueId}>
            {(selected: string | null) => {
              const item = pickable.find((candidate) => candidate.value === selected)
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
          {/*
            Слой стоит на позиционере, а не на самом списке: список приходит
            `position: static`, а на статичном элементе `z-index` не работает —
            он уходил под панель шторки. Находка прогона 14.09.2026.

            `alignItemWithTrigger` выключен: с ним Base UI ставит список так, чтобы
            выбранный пункт оказался под пальцем, и у поля внизу экрана список
            уезжал за верхний край.
          */}
          <BaseSelect.Positioner
            className="w-select__positioner"
            sideOffset={4}
            alignItemWithTrigger={false}
          >
            <BaseSelect.Popup
              className={multiline ? 'w-select__popup w-select__popup_multiline' : 'w-select__popup'}
            >
              {items.map((item) =>
                item.type === 'separator' ? (
                  /* Строка `Type=Divider` кита: линия, отделяющая группу от группы. */
                  <div key={item.value} className="w-select__separator" role="separator" />
                ) : (
                  <BaseSelect.Item key={item.value} className="w-select__item" value={item.value}>
                    <BaseSelect.ItemIndicator className="w-select__item-indicator">
                      <Icon data={Check} size={16} />
                    </BaseSelect.ItemIndicator>
                    {/* Слот `Start Icon` строки — значок слева, «+» у пункта добавления. */}
                    {item.icon === undefined ? null : (
                      <span className="w-select__item-icon">{item.icon}</span>
                    )}
                    {item.description === undefined ? (
                      <BaseSelect.ItemText className="w-select__item-text">
                        {item.label}
                      </BaseSelect.ItemText>
                    ) : (
                      /* `Type=Multiline`: подпись и под ней вторая строка. */
                      <span className="w-select__item-rows">
                        <BaseSelect.ItemText className="w-select__item-text">
                          {item.label}
                        </BaseSelect.ItemText>
                        <span className="w-select__item-description">{item.description}</span>
                      </span>
                    )}
                    {/* Слот `Secondary content` — метка справа, «Своё» у своей основы. */}
                    {item.secondary === undefined ? null : (
                      <span className="w-select__item-secondary">{item.secondary}</span>
                    )}
                  </BaseSelect.Item>
                ),
              )}
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
