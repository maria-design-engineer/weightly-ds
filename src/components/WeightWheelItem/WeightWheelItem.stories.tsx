import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { WEIGHT_WHEEL_ITEM_STATES } from './constants'
import { WeightWheelItem } from './WeightWheelItem'

const meta = {
  title: 'Custom/WeightWheelItem',
  component: WeightWheelItem,
  argTypes: {
    state: { control: 'inline-radio', options: WEIGHT_WHEEL_ITEM_STATES },
    whole: { control: 'text' },
    fraction: { control: 'text' },
  },
  args: { whole: '61', fraction: '.5' },
} satisfies Meta<typeof WeightWheelItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось State: выбранное значение и соседнее. Разница только в цвете. */
export const States: Story = {
  render: (args) => (
    <Row>
      {WEIGHT_WHEEL_ITEM_STATES.map((state) => (
        <Cell key={state} label={state} width={120}>
          <WeightWheelItem {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
