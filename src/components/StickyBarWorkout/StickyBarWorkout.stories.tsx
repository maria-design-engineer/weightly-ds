import type { Meta, StoryObj } from '@storybook/react-vite'

import { StickyBarWorkout } from './StickyBarWorkout'

const meta = {
  title: 'Custom/StickyBarWorkout',
  component: StickyBarWorkout,
  argTypes: { actions: { control: false } },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyBarWorkout>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
