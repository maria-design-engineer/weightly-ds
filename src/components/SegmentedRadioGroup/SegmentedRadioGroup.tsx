import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

import type {
  SegmentedRadioGroupOption,
  SegmentedRadioGroupSize,
  SegmentedRadioGroupWidth,
} from './constants'
import '../focus.css'
import './SegmentedRadioGroup.css'

export type SegmentedRadioGroupProps = {
  /** Figma Size — высота кнопки: `s` 24, `m` 28, `l` 36, `xl` 44. */
  size?: SegmentedRadioGroupSize
  /** Figma Width — `auto` по содержимому, `max` во всю ширину родителя. */
  width?: SegmentedRadioGroupWidth
  /** Кнопки ряда по порядку. */
  options: SegmentedRadioGroupOption[]
  /** Выбранное значение. Не передано — группа держит выбор сама. */
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /** Figma State=Disabled на всей группе. */
  disabled?: boolean
  /** Подпись группы для чтения с экрана. */
  ariaLabel?: string
}

/**
 * Выбор одного варианта кнопками в ряд, собранными в общую рамку. Вид собран
 * по киту на токенах, из Base UI приходит поведение радиогруппы: выбор
 * стрелками, чтение с экрана, скрытое поле для формы.
 *
 * Выбранной кнопку делает значение группы, а не свой проп: ось `Selected` кита
 * в код не едет. Число кнопок задаётся массивом — булевы `Item N` это приём Figma.
 */
export function SegmentedRadioGroup({
  size = 'm',
  width = 'auto',
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  ariaLabel,
}: SegmentedRadioGroupProps) {
  const className = [
    'w-segmented-radio-group',
    `w-segmented-radio-group_size_${size}`,
    `w-segmented-radio-group_width_${width}`,
  ].join(' ')

  return (
    <RadioGroup
      className={className}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next: unknown) => {
        if (typeof next === 'string') onValueChange?.(next)
      }}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Radio.Root
          key={option.value}
          className="w-segmented-radio-group__item"
          value={option.value}
          disabled={option.disabled}
        >
          {option.icon ? (
            <span className="w-segmented-radio-group__icon">{option.icon}</span>
          ) : null}
          <span className="w-segmented-radio-group__text">{option.content}</span>
          {option.counter === undefined ? null : (
            <span className="w-segmented-radio-group__counter">{option.counter}</span>
          )}
        </Radio.Root>
      ))}
    </RadioGroup>
  )
}
