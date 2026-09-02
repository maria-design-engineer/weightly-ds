import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { WeightWheelRow } from './WeightWheelRow'

const meta = {
  title: 'Custom/WeightWheelRow',
  component: WeightWheelRow,
  argTypes: { whole: { control: 'text' }, fraction: { control: 'text' } },
  args: { whole: '102', fraction: '.5' },
} satisfies Meta<typeof WeightWheelRow>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Выбранная строка и соседняя: разница только в цвете текста. */
export const Selected: Story = {
  render: (args) => (
    <Row>
      <Cell label="выбранная" width={320}>
        <WeightWheelRow {...args} selected />
      </Cell>
      <Cell label="соседняя" width={320}>
        <WeightWheelRow {...args} whole="105" fraction=".0" />
      </Cell>
    </Row>
  ),
}
