import type * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from '../Select/Select'
import { TextArea } from '../TextArea/TextArea'
import { TextInput } from '../TextInput/TextInput'
import { Cell, Row } from '../story-layout'
import { Field } from './Field'

const EXERCISES = [
  { value: 'snatch', label: 'Рывок' },
  { value: 'clean-and-jerk', label: 'Толчок' },
]

const CONTROLS = ['TextInput', 'Select', 'TextArea'] as const
const SIZES = ['s', 'm', 'l', 'xl'] as const

type ControlName = (typeof CONTROLS)[number]
type ControlSize = (typeof SIZES)[number]

/** Подмена Control: какой контрол стоит внутри поля и какого он размера. */
function control(name: ControlName, size: ControlSize, label: string) {
  if (name === 'Select') {
    return <Select size={size} items={EXERCISES} defaultValue="snatch" ariaLabel={label} />
  }
  if (name === 'TextArea') {
    return <TextArea size={size} defaultValue="Держи спину прямее" ariaLabel={label} />
  }
  return <TextInput size={size} defaultValue="102,5" ariaLabel={label} />
}

type FieldStoryArgs = {
  label: string
  control: ControlName
  size: ControlSize
}

const meta: Meta<FieldStoryArgs> = {
  title: 'Custom/Field',
  component: Field as unknown as React.ComponentType<FieldStoryArgs>,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    label: { control: 'text' },
    control: { control: 'inline-radio', options: CONTROLS },
    size: { control: 'inline-radio', options: SIZES },
  },
  args: { label: 'Вес штанги', control: 'TextInput', size: 'xl' },
  render: ({ label, control: name, size }) => (
    <Field label={label}>{control(name, size, label)}</Field>
  ),
}

export default meta
type Story = StoryObj<FieldStoryArgs>

/** Контрол и его размер переключаются в панели Controls. */
export const Playground: Story = {}

/** Свойство Control — подмена: поле, выбор или многострочный ввод. */
export const Controls: Story = {
  render: () => (
    <Row>
      {CONTROLS.map((name) => (
        <Cell key={name} label={`Control = ${name}`} width={328}>
          <Field label="Вес штанги">{control(name, 'xl', 'Вес штанги')}</Field>
        </Cell>
      ))}
    </Row>
  ),
}

/** Размер контрола: те же четыре, что у поля ввода. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {SIZES.map((size) => (
        <Cell key={size} label={size} width={328}>
          <Field label="Вес штанги">{control('TextInput', size, 'Вес штанги')}</Field>
        </Cell>
      ))}
    </Row>
  ),
}
