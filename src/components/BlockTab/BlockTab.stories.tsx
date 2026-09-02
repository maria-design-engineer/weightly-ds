import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { BlockTab } from './BlockTab'
import { BLOCK_TAB_STATES } from './constants'

const meta = {
  title: 'Custom/BlockTab',
  component: BlockTab,
  argTypes: {
    state: { control: 'inline-radio', options: BLOCK_TAB_STATES },
    content: { control: 'text' },
    onClick: { control: false },
  },
  args: { content: 'Разминка' },
} satisfies Meta<typeof BlockTab>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 79 }}>
        <Story />
      </div>
    ),
  ],
}

/** Ось State: блок идёт сейчас, пройден или ещё впереди. */
export const States: Story = {
  render: (args) => (
    <Row>
      {BLOCK_TAB_STATES.map((state) => (
        <Cell key={state} label={state} width={100}>
          <BlockTab {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
