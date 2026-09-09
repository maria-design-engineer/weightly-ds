import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { MoodTrack } from './MoodTrack'

const meta = {
  title: 'Product components/MoodTrack',
  component: MoodTrack,
  argTypes: { value: { control: { type: 'inline-radio', options: [0, 1, 2] } } },
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

export const Playground: Story = { args: { value: 1 } }

/** Три слота: ручка стоит в своём, два других показывают подпись. */
export const Positions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 258 }}>
      {[0, 1, 2].map((value) => (
        <Cell key={value} label={`слот ${value}`} width={258}>
          <MoodTrack value={value} />
        </Cell>
      ))}
    </div>
  ),
}
