import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SPIN_SIZES } from './constants'
import { Spin } from './Spin'

const meta = {
  title: 'Components/Spin',
  component: Spin,
  argTypes: { size: { control: 'inline-radio', options: SPIN_SIZES } },
} satisfies Meta<typeof Spin>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { size: 'm' } }

/** Ось Size: пять размеров, сторона 16, 24, 28, 32 и 36. Толщина кольца везде 2. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {SPIN_SIZES.map((size) => (
        <Cell key={size} label={size} width={80}>
          <Spin size={size} />
        </Cell>
      ))}
    </Row>
  ),
}
