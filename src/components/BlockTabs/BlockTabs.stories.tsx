import type { Meta, StoryObj } from '@storybook/react-vite'

import { BlockTab } from '../BlockTab/BlockTab'
import { BlockTabs } from './BlockTabs'

const meta = {
  title: 'Custom/BlockTabs',
  component: BlockTabs,
  argTypes: { children: { control: false } },
  args: {
    children: (
      <>
        <BlockTab state="done" content="Разминка" />
        <BlockTab state="active" content="Основа" />
        <BlockTab state="default" content="Закачка" />
        <BlockTab state="default" content="Растяжка" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BlockTabs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
