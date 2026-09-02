import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SELECT_SIZES, SELECT_VIEWS } from './constants'
import { Select } from './Select'

const EXERCISES = [
  { value: 'snatch', label: 'Рывок' },
  { value: 'clean-and-jerk', label: 'Толчок' },
  { value: 'back-squat', label: 'Приседания со штангой' },
]

const meta = {
  title: 'Select',
  component: Select,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: SELECT_SIZES },
    view: { control: 'inline-radio', options: SELECT_VIEWS },
    errorPlacement: { control: 'inline-radio', options: ['inline', 'outline'] },
    // Сообщение — содержимое, и панель по умолчанию предлагает объект: подменяем строкой.
    errorMessage: { control: 'text' },
  },
  args: { items: EXERCISES, placeholder: 'Выберите упражнение', ariaLabel: 'Упражнение' },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Size — высоты те же, что у TextInput: 28 · 34 · 42 · 52. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SELECT_SIZES.map((size) => (
        <Cell key={size} label={size} width={220}>
          <Select {...args} size={size} defaultValue="snatch" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Normal — в рамке, Clear — без рамки и боковых отступов. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {SELECT_VIEWS.map((view) => (
        <Cell key={view} label={view} width={220}>
          <Select {...args} view={view} defaultValue="snatch" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось State. Hover и Active — рантайм: наведение и открытый список. */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Suggest" width={220}>
        <Select {...args} />
      </Cell>
      <Cell label="Default" width={220}>
        <Select {...args} defaultValue="snatch" />
      </Cell>
      <Cell label="Disabled" width={220}>
        <Select {...args} defaultValue="snatch" disabled />
      </Cell>
      <Cell label="Error inline" width={220}>
        <Select {...args} errorMessage="Выберите упражнение" errorPlacement="inline" />
      </Cell>
      <Cell label="Error outline" width={220}>
        <Select {...args} errorMessage="Выберите упражнение" errorPlacement="outline" />
      </Cell>
    </Row>
  ),
}

/** Counter — счётчик выбранных значений, гаснет только в отключённом состоянии. */
export const Counter: Story = {
  render: (args) => (
    <Row>
      <Cell label="Counter" width={220}>
        <Select {...args} defaultValue="snatch" counter={2} />
      </Cell>
      <Cell label="Counter · Disabled" width={220}>
        <Select {...args} defaultValue="snatch" counter={2} disabled />
      </Cell>
    </Row>
  ),
}
