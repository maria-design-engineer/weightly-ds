import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { PICTURE_TYPES } from './constants'
import { Picture } from './Picture'

const meta = {
  title: 'Product components/Picture',
  component: Picture,
  argTypes: { type: { control: 'inline-radio', options: PICTURE_TYPES } },
} satisfies Meta<typeof Picture>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { type: 'empty-badge' } }

/** Ось Type: лицо в пунктирном круге под пустое состояние и часы под время. */
export const Types: Story = {
  render: () => (
    <Row>
      {PICTURE_TYPES.map((type) => (
        <Cell key={type} label={type} width={100}>
          <Picture type={type} />
        </Cell>
      ))}
    </Row>
  ),
}
