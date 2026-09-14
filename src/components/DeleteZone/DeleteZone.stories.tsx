import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { DeleteZone } from './DeleteZone'
import { DELETE_ZONE_STATES } from './constants'

const meta = {
  title: 'Product components/DeleteZone',
  component: DeleteZone,
  argTypes: {
    state: { control: 'inline-radio', options: DELETE_ZONE_STATES },
    content: { control: 'text' },
  },
  args: { content: 'Удалить упражнение' },
} satisfies Meta<typeof DeleteZone>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  render: (args) => (
    <div style={{ width: 328 }}>
      <DeleteZone {...args} />
    </div>
  ),
}

/** Ось State — 2: карточку тянут мимо и карточка над зоной. */
export const States: Story = {
  render: (args) => (
    <Row>
      {DELETE_ZONE_STATES.map((state) => (
        <Cell key={state} label={state} width={328}>
          <DeleteZone {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}
