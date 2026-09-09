import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { MOOD_SCALE_STATES } from './constants'
import { MoodScale } from './MoodScale'

const meta = {
  title: 'Product components/MoodScale',
  component: MoodScale,
  argTypes: { state: { control: 'inline-radio', options: MOOD_SCALE_STATES } },
  args: { title: 'Физическое состояние', caption: 'Как самочувствие, как энергия' },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MoodScale>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { state: 'mid' } }

/** Ось State: слева подсвечивается на low, справа на high, в середине обе серые. */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 328 }}>
      {MOOD_SCALE_STATES.map((state) => (
        <Cell key={state} label={state} width={328}>
          <MoodScale
            state={state}
            title="Физическое состояние"
            caption="Как самочувствие, как энергия"
          />
        </Cell>
      ))}
    </div>
  ),
}
