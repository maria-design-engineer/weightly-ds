import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, ProbeFrame, Row } from '../ProbeFrame'
import { TEXT_INPUT_SIZES, TEXT_INPUT_VIEWS } from './constants'
import { TextInput } from './TextInput'

const meta = {
  title: 'Probe Base UI/TextInput',
  component: TextInput,
  decorators: [
    (Story) => (
      <ProbeFrame>
        <div style={{ width: 328 }}>
          <Story />
        </div>
      </ProbeFrame>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: TEXT_INPUT_SIZES },
    view: { control: 'select', options: TEXT_INPUT_VIEWS },
    errorPlacement: { control: 'inline-radio', options: ['inline', 'outline'] },
  },
  args: { ariaLabel: 'Вес штанги' },
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { placeholder: '100', size: 'm' },
}

/** Ось Size — высоты 28 · 34 · 42 · 52. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {TEXT_INPUT_SIZES.map((size) => (
        <Cell key={size} label={size}>
          <TextInput {...args} size={size} defaultValue="100" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Normal — поле в рамке, Clear — без рамки и боковых отступов. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {TEXT_INPUT_VIEWS.map((view) => (
        <Cell key={view} label={view}>
          <TextInput {...args} view={view} defaultValue="100" />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Ось State. Hover и Active — рантайм, пропа под них нет: их карточки
 * на пробе не собираются, это находка в hand-off этапа.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Suggest">
        <TextInput {...args} placeholder="Введите вес" />
      </Cell>
      <Cell label="Default">
        <TextInput {...args} defaultValue="100" />
      </Cell>
      <Cell label="Disabled">
        <TextInput {...args} defaultValue="100" disabled />
      </Cell>
      <Cell label="Error inline">
        <TextInput
          {...args}
          defaultValue="1000"
          errorMessage="Больше 500 кг не бывает"
          errorPlacement="inline"
        />
      </Cell>
      <Cell label="Error outline">
        <TextInput
          {...args}
          defaultValue="1000"
          errorMessage="Больше 500 кг не бывает"
          errorPlacement="outline"
        />
      </Cell>
    </Row>
  ),
}
