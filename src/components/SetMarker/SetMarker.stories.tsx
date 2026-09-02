import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SET_MARKER_STATES } from './constants'
import { SetMarker } from './SetMarker'

const meta = {
  title: 'Custom/SetMarker',
  component: SetMarker,
  argTypes: {
    state: { control: 'inline-radio', options: SET_MARKER_STATES },
    content: { control: 'text' },
  },
  args: { content: '1' },
} satisfies Meta<typeof SetMarker>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось State: выполненный подход, текущий и запланированный. */
export const States: Story = {
  render: (args) => (
    <Row>
      {SET_MARKER_STATES.map((state) => (
        <Cell key={state} label={state} width={90}>
          <SetMarker {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
