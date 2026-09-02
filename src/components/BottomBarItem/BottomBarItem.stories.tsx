import type { Meta, StoryObj } from '@storybook/react-vite'

import { ListCheck } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { BottomBarItem } from './BottomBarItem'
import { BOTTOM_BAR_ITEM_STATES } from './constants'

const ICON = <Icon data={ListCheck} size={20} />

const meta = {
  title: 'Custom/BottomBarItem',
  component: BottomBarItem,
  argTypes: {
    state: { control: 'inline-radio', options: BOTTOM_BAR_ITEM_STATES },
    label: { control: 'text' },
    icon: { control: 'boolean', mapping: { true: ICON, false: undefined } },
    onClick: { control: false },
  },
  args: { label: 'Тренировки', icon: ICON },
} satisfies Meta<typeof BottomBarItem>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось State: активный раздел красится брендовым цветом. */
export const States: Story = {
  render: (args) => (
    <Row>
      {BOTTOM_BAR_ITEM_STATES.map((state) => (
        <Cell key={state} label={state} width={120}>
          <BottomBarItem {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
