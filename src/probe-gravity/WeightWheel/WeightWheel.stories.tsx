import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, ProbeFrame, Row } from '../ProbeFrame'
import { WeightWheel } from './WeightWheel'
import { WeightWheelRow } from './WeightWheelRow'

const meta = {
  title: 'Probe Gravity/Custom/WeightWheel',
  component: WeightWheel,
  decorators: [
    (Story) => (
      <ProbeFrame>
        <Story />
      </ProbeFrame>
    ),
  ],
} satisfies Meta<typeof WeightWheel>

export default meta

type Story = StoryObj<typeof meta>

/** Барабан целиком: прокрутка колесом и пальцем, стрелки на клавиатуре. */
export const Default: Story = {}

/** Строка барабана отдельно: выбранная и соседняя. */
export const RowStates: Story = {
  render: () => (
    <Row>
      <Cell label="weight-wheel-row · выбранная">
        <WeightWheelRow whole="100" fraction="0" selected />
      </Cell>
      <Cell label="weight-wheel-row · соседняя">
        <WeightWheelRow whole="102" fraction="5" />
      </Cell>
    </Row>
  ),
}
