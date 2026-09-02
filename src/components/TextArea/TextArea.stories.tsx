import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { TEXT_AREA_SIZES, TEXT_AREA_VIEWS } from './constants'
import { TextArea } from './TextArea'

const meta = {
  title: 'TextArea',
  component: TextArea,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: TEXT_AREA_SIZES },
    view: { control: 'inline-radio', options: TEXT_AREA_VIEWS },
    errorPlacement: { control: 'inline-radio', options: ['inline', 'outline'] },
    // Сообщение — содержимое, и панель по умолчанию предлагает объект: подменяем строкой.
    errorMessage: { control: 'text' },
  },
  args: { ariaLabel: 'Комментарий тренера' },
} satisfies Meta<typeof TextArea>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { placeholder: 'Что скорректировать' } }

/** Ось Size меняет отступы и радиус, высота поля всегда 102. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {TEXT_AREA_SIZES.map((size) => (
        <Cell key={size} label={size} width={240}>
          <TextArea {...args} size={size} defaultValue="Держи спину прямее" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Normal — в рамке, Clear — без рамки и боковых отступов. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {TEXT_AREA_VIEWS.map((view) => (
        <Cell key={view} label={view} width={240}>
          <TextArea {...args} view={view} defaultValue="Держи спину прямее" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось State. Hover и Active — рантайм, проверяются курсором и клавиатурой. */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Suggest" width={240}>
        <TextArea {...args} placeholder="Что скорректировать" />
      </Cell>
      <Cell label="Default" width={240}>
        <TextArea {...args} defaultValue="Держи спину прямее" />
      </Cell>
      <Cell label="Disabled" width={240}>
        <TextArea {...args} defaultValue="Держи спину прямее" disabled />
      </Cell>
      <Cell label="Error inline" width={240}>
        <TextArea {...args} defaultValue="" errorMessage="Заполните комментарий" errorPlacement="inline" />
      </Cell>
      <Cell label="Error outline" width={240}>
        <TextArea {...args} defaultValue="" errorMessage="Заполните комментарий" errorPlacement="outline" />
      </Cell>
    </Row>
  ),
}
