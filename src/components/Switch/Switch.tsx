import { Switch as BaseSwitch } from '@base-ui/react/switch'

import type { SwitchSize } from './constants'
import '../focus.css'
import './Switch.css'

/*
 * Настройки идут в том же порядке и под теми же именами, что оси мастера —
 * профиль `ui-kit/components/switch.md`, раздел «Как ложится в код».
 *
 * Оси `Hover` среди них нет: профиль говорит, что она живёт только в Figma,
 * а в коде наведение — дело браузера.
 */
export type SwitchProps = {
  /** Figma Size — дорожка, кружок и стиль подписи: `l` 42 × 24, `m` 36 × 20. */
  size?: SwitchSize
  /** Figma Checked. Не передан — компонент держит положение сам. */
  checked?: boolean
  /** Figma Disabled: тумблер не гаснет, гаснет подпись. */
  disabled?: boolean
  /** Figma Content — стоит ли подпись справа от тумблера. */
  content?: boolean
  /** Figma Content text — сама подпись. */
  contentText?: string
  defaultChecked?: boolean
  onCheckedChange?: (checked: boolean) => void
  /** Подпись для чтения с экрана, когда своей подписи рядом нет. */
  ariaLabel?: string
}

/**
 * Тумблер: нажатие меняет состояние сразу, без кнопки подтверждения.
 *
 * Вид собран по киту на токенах, из Base UI приходит поведение: нажатие,
 * клавиатура, чтение с экрана и скрытое поле для формы.
 */
export function Switch({
  size = 'l',
  checked,
  disabled,
  content,
  contentText,
  defaultChecked,
  onCheckedChange,
  ariaLabel,
}: SwitchProps) {
  const control = (
    <BaseSwitch.Root
      className={`w-switch__control w-focus w-switch__control_size_${size}`}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      aria-label={content === true ? undefined : ariaLabel}
    >
      <BaseSwitch.Thumb className="w-switch__thumb" />
    </BaseSwitch.Root>
  )

  /* Content=Off — тумблер стоит сам по себе, ряда вокруг него не нужно. */
  if (content !== true) return control

  const className = [
    'w-switch',
    `w-switch_size_${size}`,
    disabled ? 'w-switch_disabled' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <label className={className}>
      {control}
      <span className="w-switch__label">{contentText}</span>
    </label>
  )
}
