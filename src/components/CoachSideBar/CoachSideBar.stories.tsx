import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { CoachSideBar } from './CoachSideBar'
import { COACH_SIDE_BAR_SECTIONS } from './constants'

const meta = {
  title: 'Product components/CoachSideBar',
  component: CoachSideBar,
  argTypes: {
    active: { control: 'inline-radio', options: COACH_SIDE_BAR_SECTIONS },
    items: { control: false },
    ariaLabel: { control: false },
  },
  args: { active: 'profile', ariaLabel: 'Разделы' },
} satisfies Meta<typeof CoachSideBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Текущий раздел: в ките его задаёт `State=Active` у пункта. Осей у меню нет. */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Row>
      {COACH_SIDE_BAR_SECTIONS.map((section) => (
        <Cell key={section} label={section} width={106}>
          <CoachSideBar {...args} active={section} />
        </Cell>
      ))}
    </Row>
  ),
}
