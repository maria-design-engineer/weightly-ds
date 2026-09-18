import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { BottomBar } from './BottomBar'
import type { BottomBarSection } from './constants'
import { BOTTOM_BAR_SECTIONS } from './constants'
import { BOTTOM_BAR_TABS } from './defaults'

const meta = {
  title: 'Product components/BottomBar',
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

/**
 * Переключение вкладок: по ним можно кликать. Заливка текущей вырастает из середины,
 * нажатие видно сдвигом внутрь — просьба пользователя 18.09.2026.
 */
function SwitchingDemo(args: React.ComponentProps<typeof BottomBar>) {
  const [active, setActive] = useState<BottomBarSection>(BOTTOM_BAR_SECTIONS[0])
  return (
    <BottomBar
      {...args}
      active={active}
      tabs={BOTTOM_BAR_TABS.map((tab) => ({ ...tab, href: undefined, onClick: () => setActive(tab.id) }))}
    />
  )
}

export const Switching: Story = {
  render: (args) => <SwitchingDemo {...args} />,
}
