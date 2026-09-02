import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { TEXT_INPUT_SIZES, TEXT_INPUT_VIEWS } from './constants'
import { TextInput } from './TextInput'

const meta = {
  title: 'TextInput',
  component: TextInput,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
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
        <Cell key={size} label={size} width={200}>
          <TextInput {...args} size={size} defaultValue="102,5" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Normal — поле в рамке, Clear — без коробки и боковых отступов. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {TEXT_INPUT_VIEWS.map((view) => (
        <Cell key={view} label={view} width={200}>
          <TextInput {...args} view={view} defaultValue="102,5" />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Ось State. Hover и Active — рантайм, пропа под них нет: они проверяются
 * курсором и клавиатурой, карточками не показываются. Строка в отклонениях этапа.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Suggest" width={200}>
        <TextInput {...args} placeholder="Введите вес" />
      </Cell>
      <Cell label="Default" width={200}>
        <TextInput {...args} defaultValue="102,5" />
      </Cell>
      <Cell label="Disabled" width={200}>
        <TextInput {...args} defaultValue="102,5" disabled />
      </Cell>
      <Cell label="Error inline" width={200}>
        <TextInput
          {...args}
          defaultValue="1000"
          errorMessage="Больше 500 кг не бывает"
          errorPlacement="inline"
        />
      </Cell>
      <Cell label="Error outline" width={200}>
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
