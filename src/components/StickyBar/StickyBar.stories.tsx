import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { StickyBar } from './StickyBar'

const meta = {
  title: 'Custom/StickyBar',
  component: StickyBar,
  argTypes: { children: { control: false } },
  args: {
    children: (
      <>
        <Button view="secondary" size="xl" content="Слева" />
        <Button view="primary" size="xl" content="Справа" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
