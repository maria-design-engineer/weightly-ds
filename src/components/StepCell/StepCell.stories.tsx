import type { Meta, StoryObj } from '@storybook/react-vite'

import { INTENSITY_CHIP_BANDS } from '../IntensityChip/constants'
import { SET_MARKER_STATES } from '../SetMarker/constants'
import { Cell, Row } from '../story-layout'
import { StepCell } from './StepCell'

const meta = {
  title: 'Custom/StepCell',
  component: StepCell,
  argTypes: {
    content: { control: 'text' },
    caption: { control: 'text' },
    band: { control: 'inline-radio', options: INTENSITY_CHIP_BANDS },
    chipState: { control: 'inline-radio', options: ['default', 'active'] },
    markerState: { control: 'inline-radio', options: SET_MARKER_STATES },
    markerContent: { control: 'text' },
  },
  args: { content: '70%', caption: '2 × 3', markerContent: '3' },
} satisfies Meta<typeof StepCell>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Состояние отметки: подход сделан, идёт сейчас или запланирован. */
export const MarkerStates: Story = {
  render: (args) => (
    <Row>
      {SET_MARKER_STATES.map((state) => (
        <Cell key={state} label={state} width={60}>
          <StepCell {...args} markerState={state} chipState={state === 'current' ? 'active' : 'default'} />
        </Cell>
      ))}
    </Row>
  ),
}
