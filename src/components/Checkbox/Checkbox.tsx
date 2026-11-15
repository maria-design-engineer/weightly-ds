import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'

import { CHECKBOX_MARKS, type CheckboxSize } from './constants'
import '../focus.css'
import './Checkbox.css'

/*
 * Настройки идут в том же порядке и под теми же именами, что оси мастера —
 * профиль `ui-kit/components/checkbox.md`, раздел «Как ложится в код».
 *
 * Оси `State` в коде нет: `Disabled` — проп `disabled`, `Hover` даёт браузер.
 */
export type CheckboxProps = {
  /** Figma Size — коробка, радиус, промежуток и стиль подписи: `m` 14, `l` 17, `xl` 24. */
  size?: CheckboxSize
  /** Figma Checked. Не передан — компонент держит отметку сам. */
  checked?: boolean
  /** Figma Indeterminate — черта вместо галочки; ставится при `checked={false}`. */
  indeterminate?: boolean
  /** Figma State=Disabled. */
  disabled?: boolean
  /** Figma Content — стоит ли подпись справа от коробки. В ките включена по умолчанию. */
  content?: boolean
  /** Figma Content text — сама подпись. */
  contentText?: string
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Подпись для чтения с экрана, когда своей подписи рядом нет. */
  ariaLabel?: string
}

/**
 * Отметка, которую человек ставит и снимает.
 *
 * Вид собран по киту на токенах, из Base UI приходит поведение: нажатие,
 * клавиатура, чтение с экрана и скрытое поле для формы.
 */
export function Checkbox({
  size = 'm',
  checked,
  indeterminate,
  disabled,
  content = true,
  contentText,
  defaultChecked,
  onCheckedChange,
  ariaLabel,
}: CheckboxProps) {
  const marks = CHECKBOX_MARKS[size]

  const control = (
    <BaseCheckbox.Root
      className={`w-checkbox__box w-checkbox__box_size_${size}`}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      onCheckedChange={(next) => onCheckedChange?.(next)}
      disabled={disabled}
      aria-label={content ? undefined : ariaLabel}
    >
      <BaseCheckbox.Indicator className="w-checkbox__mark">
        {indeterminate ? (
          <span
            className="w-checkbox__brick"
            style={{ width: marks.brick.width, height: marks.brick.height }}
          />
        ) : (
          <svg
            width={marks.check.width}
            height={marks.check.height}
            viewBox={`0 0 ${marks.check.width} ${marks.check.height}`}
            aria-hidden="true"
          >
            <path d={marks.check.path} fill="currentColor" />
          </svg>
        )}
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )

  /* Content=Off — коробка стоит сама по себе, ряда вокруг неё не нужно. */
  if (!content) return control

  const className = ['w-checkbox', `w-checkbox_size_${size}`, disabled ? 'w-checkbox_disabled' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <label className={className}>
      {control}
      <span className="w-checkbox__label">{contentText}</span>
    </label>
  )
}
