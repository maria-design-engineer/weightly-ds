import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { BottomBar } from './BottomBar'
import { BOTTOM_BAR_SECTIONS } from './constants'

const meta = {
  title: 'Custom/BottomBar',
  component: BottomBar,
  argTypes: {
    active: { control: 'inline-radio', options: BOTTOM_BAR_SECTIONS },
    tabs: { control: false },
    ariaLabel: { control: 'text' },
  },
  args: { active: 'workouts', ariaLabel: 'Разделы' },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BottomBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Active: раздел, в котором человек сейчас. */
export const Sections: Story = {
  decorators: [],
  render: (args) => (
    <Row>
      {BOTTOM_BAR_SECTIONS.map((section) => (
        <Cell key={section} label={section} width={328}>
          <BottomBar {...args} active={section} />
        </Cell>
      ))}
    </Row>
  ),
}
