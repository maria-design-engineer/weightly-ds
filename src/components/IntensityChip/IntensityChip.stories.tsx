import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { INTENSITY_CHIP_STATES } from './constants'
import { IntensityChip } from './IntensityChip'

const meta = {
  title: 'Custom/IntensityChip',
  component: IntensityChip,
  argTypes: {
    state: { control: 'inline-radio', options: INTENSITY_CHIP_STATES },
    content: { control: 'text' },
    caption: { control: 'text' },
  },
  args: { content: '50%', caption: '3 × 1' },
} satisfies Meta<typeof IntensityChip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось State: выбранная полоса обведена брендовым цветом. */
export const States: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_STATES.map((state) => (
        <Cell key={state} label={state} width={100}>
          <IntensityChip {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
