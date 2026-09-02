import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SETTINGS_ROW_CARDS } from './constants'
import { SettingsRow } from './SettingsRow'

const meta = {
  title: 'Custom/SettingsRow',
  component: SettingsRow,
  argTypes: {
    card: { control: 'inline-radio', options: SETTINGS_ROW_CARDS },
    content: { control: 'text' },
    caption: { control: 'text' },
    onClick: { control: false },
  },
  args: { content: 'Рывок классический', caption: '78 кг · 12 мая' },
} satisfies Meta<typeof SettingsRow>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
}

/** Ось Card: строка лежит на карточке с тенью или прямо на фоне. */
export const Cards: Story = {
  render: (args) => (
    <Row>
      {SETTINGS_ROW_CARDS.map((card) => (
        <Cell key={card} label={`Card = ${card}`} width={328}>
          <SettingsRow {...args} card={card} />
        </Cell>
      ))}
    </Row>
  ),
}
