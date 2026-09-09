import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { MoodTrack } from './MoodTrack'

const meta = {
  title: 'Product components/MoodTrack',
  component: MoodTrack,
  argTypes: { value: { control: { type: 'range', min: 0, max: 4, step: 1 } } },
  decorators: [
    (Story) => (
      <div style={{ width: 258 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MoodTrack>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { value: 2 } }

/** Пять делений: ручка стоит на своём, остальные показывают подпись. */
export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 258 }}>
      {[0, 2, 4].map((value) => (
        <Cell key={value} label={`деление ${value}`} width={258}>
          <MoodTrack value={value} />
        </Cell>
      ))}
    </div>
  ),
}
