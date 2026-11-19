import type { ReactNode } from 'react'
import { useId, useState } from 'react'

import { Combobox as BaseCombobox } from '@base-ui/react/combobox'
import { Check, ChevronDown, TriangleExclamation } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { SelectItem, SelectSize } from '../Select/constants'
import '../focus.css'
import '../visually-hidden.css'
import '../Select/Select.css'
import './Combobox.css'

type Item = Extract<SelectItem, { value: string; label: string }>

export type ComboboxProps = {
  /** Figma Size у вложенного `Select` — 26 · 34 · 42 · 52. */
  size?: SelectSize
  /** Пункты списка — те же, что у `Select`: подпись, значок слева, метка справа. */
  items: Item[]
  /** Выбранный пункт; `null` — ничего не выбрано. */
  value: string | null
  onValueChange: (value: string) => void
  /**
   * Текст в поле, пока ничего не выбрано: название из файла, которое продукт не узнал, —
   * кадр `4п` «Разбора файла».
   */
  defaultInputValue?: string
  placeholder?: string
  /**
   * Пункт-действие в конце списка, после линии: «+ Добавить новое движение», кадры `4п` и `4р`.
   * Набранный текст его не прячет.
   */
  action?: { label: string; icon?: ReactNode; onPick: (query: string) => void }
  /** Поле с ошибкой — рамка `Line/Danger` и треугольник, как у `TextInput`. */
  invalid?: boolean
  ariaLabel?: string
}

const ACTION = '\u0000action'

/**
 * Поле выбора с набором — `Product / select-open` кита: кнопка `Select` и под ней список
 * `DropdownMenu`. Набранный текст сужает список, кадр `4р`; пункт-действие стоит последним.
 * Вид берётся у `Select` целиком, своего у компонента — только поле ввода. Поведение — `Combobox`
 * из Base UI: клавиатура, чтение с экрана, открытие и закрытие. Релиз 0.16.0, решение
 * пользователя 19.11.2026.
 */
export function Combobox({
  size = 'l',
  items,
  value,
  onValueChange,
  defaultInputValue,
  placeholder,
  action,
  invalid,
  ariaLabel,
}: ComboboxProps) {
  const labelId = useId()
  /* Набранный текст — его получает пункт-действие: «Добавить новое движение» с тем, что уже набрано. */
  const [query, setQuery] = useState(defaultInputValue ?? '')
  const all = action ? [...items, { value: ACTION, label: action.label, icon: action.icon }] : items
  const selected = all.find((item) => item.value === value) ?? null

  return (
    <div
      className={['w-select', 'w-combobox', `w-select_size_${size}`, 'w-select_view_normal', invalid ? 'w-select_invalid' : '']
        .filter(Boolean)
        .join(' ')}
    >
      {ariaLabel ? (
        <span className="w-visually-hidden" id={labelId}>
          {ariaLabel}
        </span>
      ) : null}
      <BaseCombobox.Root
        items={all}
        value={selected}
        defaultInputValue={selected ? undefined : defaultInputValue}
        itemToStringLabel={(item: Item) => (item.value === ACTION ? '' : item.label)}
        isItemEqualToValue={(item: Item, current: Item) => item.value === current.value}
        /* Сужает по вхождению без учёта регистра; пункт-действие виден всегда. */
        filter={(item: Item, query: string) =>
          item.value === ACTION || item.label.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru'))
        }
        onInputValueChange={(next: string) => setQuery(next)}
        onValueChange={(next: Item | null) => {
          if (next === null) return
          if (next.value === ACTION) {
            action?.onPick(query)
            return
          }
          onValueChange(next.value)
        }}
      >
        <BaseCombobox.InputGroup className="w-select__trigger w-combobox__group">
          <BaseCombobox.Input
            className="w-combobox__input"
            placeholder={placeholder}
            aria-labelledby={ariaLabel ? labelId : undefined}
          />
          {invalid ? (
            <span className="w-select__error-icon">
              <Icon data={TriangleExclamation} size={16} />
            </span>
          ) : null}
          <BaseCombobox.Trigger className="w-select__icon w-combobox__trigger" aria-label={ariaLabel}>
            <Icon data={ChevronDown} size={16} />
          </BaseCombobox.Trigger>
        </BaseCombobox.InputGroup>
        <BaseCombobox.Portal>
          <BaseCombobox.Positioner className="w-select__positioner" sideOffset={4}>
            <BaseCombobox.Popup className="w-select__popup">
              <BaseCombobox.List>
                {(item: Item) => (
                  <div key={item.value} className="w-combobox__row">
                    {/* Строка `Type=Divider` кита — линия перед пунктом-действием. */}
                    {item.value === ACTION ? <div className="w-select__separator" role="separator" /> : null}
                    <BaseCombobox.Item className="w-select__item" value={item}>
                      <BaseCombobox.ItemIndicator className="w-select__item-indicator">
                        <Icon data={Check} size={16} />
                      </BaseCombobox.ItemIndicator>
                      {item.icon === undefined ? null : <span className="w-select__item-icon">{item.icon}</span>}
                      <span className="w-select__item-text">{item.label}</span>
                      {item.secondary === undefined ? null : (
                        <span className="w-select__item-secondary">{item.secondary}</span>
                      )}
                    </BaseCombobox.Item>
                  </div>
                )}
              </BaseCombobox.List>
            </BaseCombobox.Popup>
          </BaseCombobox.Positioner>
        </BaseCombobox.Portal>
      </BaseCombobox.Root>
    </div>
  )
}
