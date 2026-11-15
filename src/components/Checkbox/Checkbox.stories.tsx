import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Cell, Row } from '../story-layout'
import { Checkbox } from './Checkbox'
import { CHECKBOX_SIZES } from './constants'

/*
 * В панели стоят ровно те настройки и в том порядке, что оси мастера кита:
 * Size, Checked, Indeterminate, Disabled, Content, Content text. Оси Hover в коде нет —
 * профиль `ui-kit/components/checkbox.md`: в браузере наведение даёт сам браузер.
 */
const meta = {
  title: 'Base UI/Checkbox',
  component: Checkbox,
  argTypes: {
    size: { control: 'inline-radio', options: CHECKBOX_SIZES },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    content: { control: 'boolean' },
    contentText: { control: 'text' },
    /* Не оси кита — в панель не выносим: там стоит ровно то, что в мастере. */
    defaultChecked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
  },
  args: {
    size: 'm',
    checked: false,
    indeterminate: false,
    disabled: false,
    content: true,
    contentText: 'Подпись',
    ariaLabel: 'Подпись',
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Нажатие ставит и снимает отметку и переставляет `Checked` в панели: отметка одна
 * и та же, откуда её ни меняй. Нажатие по черте ставит отметку и снимает черту.
 */
export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return (
      <Checkbox
        {...args}
        onCheckedChange={(checked) => updateArgs({ checked, indeterminate: false })}
      />
    )
  },
}

/** Ось Size — коробка `m` 14, `l` 17, `xl` 24; подпись Body 3, Body 2, Body 2. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {CHECKBOX_SIZES.map((size) => (
        <Row key={size}>
          <Cell label={`${size} · off`} width={140}>
            <Checkbox {...args} size={size} checked={false} />
          </Cell>
          <Cell label={`${size} · checked`} width={140}>
            <Checkbox {...args} size={size} checked />
          </Cell>
          <Cell label={`${size} · indeterminate`} width={140}>
            <Checkbox {...args} size={size} checked={false} indeterminate />
          </Cell>
        </Row>
      ))}
    </div>
  ),
}

const MARKS = [
  { label: 'checked=off', checked: false, indeterminate: false },
  { label: 'checked=on', checked: true, indeterminate: false },
  { label: 'indeterminate=on', checked: false, indeterminate: true },
] as const

/**
 * Оси State, Checked и Indeterminate — девять мастеров на размер. `Hover` в ките —
 * значение оси, в коде — поведение браузера: карточка красит коробку теми же
 * токенами, курсор не нужен. `focus` — кольцо с клавиатуры: в ките его нет,
 * в коде оно обязательно.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {MARKS.map((mark) => (
        <Row key={mark.label}>
          <Cell label={`default · ${mark.label}`} width={170}>
            <Checkbox {...args} checked={mark.checked} indeterminate={mark.indeterminate} />
          </Cell>
          <Cell label={`hover · ${mark.label}`} width={170}>
            <span className="w-checkbox-hover-demo">
              <Checkbox {...args} checked={mark.checked} indeterminate={mark.indeterminate} />
            </span>
          </Cell>
          <Cell label={`disabled · ${mark.label}`} width={170}>
            <Checkbox {...args} checked={mark.checked} indeterminate={mark.indeterminate} disabled />
          </Cell>
          <Cell label={`focus · ${mark.label}`} width={170}>
            <span className="w-checkbox-focus-demo">
              <Checkbox {...args} checked={mark.checked} indeterminate={mark.indeterminate} />
            </span>
          </Cell>
        </Row>
      ))}
    </div>
  ),
}

/** Ось Content — Off убирает подпись, коробка стоит сама по себе. */
export const Content: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Row>
      <Cell label="on">
        <Checkbox {...args} />
      </Cell>
      <Cell label="off">
        <Checkbox {...args} content={false} />
      </Cell>
    </Row>
  ),
}
