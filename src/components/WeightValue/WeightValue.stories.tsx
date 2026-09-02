import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { WEIGHT_VALUE_STATES } from './constants'
import { WeightValue } from './WeightValue'

const meta = {
  title: 'Custom/WeightValue',
  component: WeightValue,
  argTypes: {
    state: { control: 'inline-radio', options: WEIGHT_VALUE_STATES },
    whole: { control: 'text' },
    fraction: { control: 'text' },
  },
  args: { whole: '61', fraction: '.5' },
} satisfies Meta<typeof WeightValue>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось State: выбранное значение и соседнее. */
export const States: Story = {
  render: (args) => (
    <Row>
      {WEIGHT_VALUE_STATES.map((state) => (
        <Cell key={state} label={state} width={120}>
          <WeightValue {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
