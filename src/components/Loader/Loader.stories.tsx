import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { LOADER_SIZES } from './constants'
import { Loader } from './Loader'

const meta = {
  title: 'Components/Loader',
  component: Loader,
  argTypes: { size: { control: 'inline-radio', options: LOADER_SIZES } },
} satisfies Meta<typeof Loader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { size: 'm' } }

/** Ось Size: три размера. Полоска 5, 7 и 9, промежуток равен её ширине. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {LOADER_SIZES.map((size) => (
        <Cell key={size} label={size} width={80}>
          <Loader size={size} />
        </Cell>
      ))}
    </Row>
  ),
}
