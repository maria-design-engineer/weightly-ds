import type { Meta, StoryObj } from '@storybook/react-vite'

import { Divider } from './Divider'

const meta = {
  title: 'Custom/Divider',
  component: Divider,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>

export default meta
type Story = StoryObj<typeof meta>

/** Линия в 1 пиксель на цвете Line/Generic. Свойств нет. */
export const Default: Story = {}
