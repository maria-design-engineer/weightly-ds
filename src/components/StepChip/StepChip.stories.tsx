import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { STEP_CHIP_BANDS } from './constants'
import { StepChip } from './StepChip'

const meta = {
  title: 'Custom/StepChip',
  component: StepChip,
  argTypes: {
    band: { control: 'inline-radio', options: STEP_CHIP_BANDS },
    content: { control: 'text' },
    caption: { control: 'text' },
  },
  args: { content: '75%', caption: '2 × 2' },
} satisfies Meta<typeof StepChip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Band: neutral до 70 процентов, lime с 70, pink с 90. */
export const Bands: Story = {
  render: (args) => (
    <Row>
      {STEP_CHIP_BANDS.map((band) => (
        <Cell key={band} label={band} width={90}>
          <StepChip {...args} band={band} />
        </Cell>
      ))}
    </Row>
  ),
}
