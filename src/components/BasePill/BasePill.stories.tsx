import type { Meta, StoryObj } from '@storybook/react-vite'

import { BasePill } from './BasePill'

const meta = {
  title: 'Custom/BasePill',
  component: BasePill,
  argTypes: { content: { control: 'text' } },
  args: { content: 'толчок' },
} satisfies Meta<typeof BasePill>

export default meta
type Story = StoryObj<typeof meta>

/** Свойство одно — текст. Состояний у плашки нет. */
export const Playground: Story = {}
