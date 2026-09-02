import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { STAT_TILE_TONES } from './constants'
import { StatTile } from './StatTile'

const meta = {
  title: 'Custom/StatTile',
  component: StatTile,
  argTypes: {
    tone: { control: 'inline-radio', options: STAT_TILE_TONES },
    content: { control: 'text' },
    caption: { control: 'text' },
  },
  args: { content: '90%', caption: 'интенсивность' },
} satisfies Meta<typeof StatTile>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Tone: brand красит число брендовым цветом. */
export const Tones: Story = {
  render: (args) => (
    <Row>
      {STAT_TILE_TONES.map((tone) => (
        <Cell key={tone} label={tone} width={120}>
          <StatTile {...args} tone={tone} />
        </Cell>
      ))}
    </Row>
  ),
}
