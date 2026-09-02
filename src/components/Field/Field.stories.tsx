import type { Meta, StoryObj } from '@storybook/react-vite'

import { Select } from '../Select/Select'
import { TextArea } from '../TextArea/TextArea'
import { TextInput } from '../TextInput/TextInput'
import { Cell, Row } from '../story-layout'
import { Field } from './Field'

const meta = {
  title: 'Custom/Field',
  component: Field,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { label: { control: 'text' } },
  args: { label: 'Вес штанги' },
} satisfies Meta<typeof Field>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { children: <TextInput size="xl" defaultValue="102,5" ariaLabel="Вес штанги" /> },
}

/** Свойство Control — подмена: поле, многострочный ввод или выбор. */
export const Controls: Story = {
  args: { children: <TextInput size="xl" defaultValue="102,5" ariaLabel="Вес штанги" /> },
  render: (args) => (
    <Row>
      <Cell label="Control = TextInput" width={328}>
        <Field {...args}>
          <TextInput size="xl" defaultValue="102,5" ariaLabel="Вес штанги" />
        </Field>
      </Cell>
      <Cell label="Control = Select" width={328}>
        <Field {...args} label="Упражнение">
          <Select
            size="xl"
            items={[
              { value: 'snatch', label: 'Рывок' },
              { value: 'clean-and-jerk', label: 'Толчок' },
            ]}
            defaultValue="snatch"
            ariaLabel="Упражнение"
          />
        </Field>
      </Cell>
      <Cell label="Control = TextArea" width={328}>
        <Field {...args} label="Комментарий">
          <TextArea size="xl" defaultValue="Держи спину прямее" ariaLabel="Комментарий" />
        </Field>
      </Cell>
    </Row>
  ),
}
