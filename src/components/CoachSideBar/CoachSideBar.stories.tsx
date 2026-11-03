import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { CoachSideBar } from './CoachSideBar'
import type { CoachSideBarSection } from './constants'
import { COACH_SIDE_BAR_SECTIONS } from './constants'
import { COACH_SIDE_BAR_ITEMS } from './defaults'

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

/**
 * Переключение пунктов: по ним можно кликать. Плашка у текущего пункта вырастает из
 * середины, значок и подпись перекрашиваются плавно — так же, как в продукте. На
 * странице `States` пункты стоят неподвижно, и движения там не видно — просьба
 * пользователя 03.11.2026.
 */
function SwitchingDemo(args: React.ComponentProps<typeof CoachSideBar>) {
  const [active, setActive] = useState<CoachSideBarSection>('profile')
  return (
    <CoachSideBar
      {...args}
      active={active}
      items={COACH_SIDE_BAR_ITEMS.map((item) => ({ ...item, onClick: () => setActive(item.id) }))}
    />
  )
}

export const Switching: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => <SwitchingDemo {...args} />,
}
