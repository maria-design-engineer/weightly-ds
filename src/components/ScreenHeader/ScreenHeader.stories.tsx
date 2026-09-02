import type { Meta, StoryObj } from '@storybook/react-vite'

import { ScreenHeader } from './ScreenHeader'

const meta = {
  title: 'Custom/ScreenHeader',
  component: ScreenHeader,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { content: { control: 'text' }, onBack: { control: false } },
  args: { content: '12 мая, понедельник' },
} satisfies Meta<typeof ScreenHeader>

export default meta
type Story = StoryObj<typeof meta>

/** Кнопка «назад» и дата рядом. Свойство одно — текст даты. */
export const Playground: Story = {}
