import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { LIFT_MARK_STATES } from './constants'
import { LiftMark } from './LiftMark'

const meta = {
  title: 'Custom/LiftMark',
  component: LiftMark,
  argTypes: { state: { control: 'inline-radio', options: LIFT_MARK_STATES } },
} satisfies Meta<typeof LiftMark>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { state: 'done' } }

/** Ось State: done ✓ успешно, failed ✕ неуспешно, skipped — пропущено. */
export const States: Story = {
  render: () => (
    <Row>
      {LIFT_MARK_STATES.map((state) => (
        <Cell key={state} label={state} width={80}>
          <LiftMark state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
