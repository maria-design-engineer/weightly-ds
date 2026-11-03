import type { Meta, StoryObj } from '@storybook/react-vite'

import { ListCheck } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { BottomBarItem } from './BottomBarItem'
import { BOTTOM_BAR_ITEM_DEVISES, BOTTOM_BAR_ITEM_STATES } from './constants'

const ICON = <Icon data={ListCheck} size={20} />

const meta = {
  title: 'Product components/BottomBarItem',
  component: BottomBarItem,
  argTypes: {
    state: { control: 'inline-radio', options: BOTTOM_BAR_ITEM_STATES },
    devise: { control: 'inline-radio', options: BOTTOM_BAR_ITEM_DEVISES },
    label: { control: 'text' },
    icon: { control: 'boolean', mapping: { true: ICON, false: undefined } },
    href: { control: false },
    onClick: { control: false },
  },
  args: { label: 'Тренировки', icon: ICON, devise: 'mobile' },
} satisfies Meta<typeof BottomBarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/**
 * Оси State и Devise — четыре мастера набора `49064:26938`. Desktop — пункт бокового
 * меню кабинета: выше, неактивный цветом `Text/Primary`.
 */
export const States: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {BOTTOM_BAR_ITEM_DEVISES.map((devise) => (
        <Row key={devise}>
          {BOTTOM_BAR_ITEM_STATES.map((state) => (
            <Cell key={state} label={`${state} · ${devise}`} width={120}>
              <BottomBarItem {...args} state={state} devise={devise} />
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  ),
}
