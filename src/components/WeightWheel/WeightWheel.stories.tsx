import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { WEIGHT_WHEEL_DIRECTIONS } from './constants'
import { WeightWheel } from './WeightWheel'

const VALUES = [
  { whole: '60', fraction: '.0' },
  { whole: '61', fraction: '.0' },
  { whole: '61', fraction: '.5' },
  { whole: '62', fraction: '.0' },
  { whole: '62', fraction: '.5' },
]

const meta = {
  title: 'Custom/WeightWheel',
  component: WeightWheel,
  argTypes: {
    direction: { control: 'inline-radio', options: WEIGHT_WHEEL_DIRECTIONS },
    onSelect: { control: false },
  },
  args: { values: VALUES, selected: 2 },
} satisfies Meta<typeof WeightWheel>

export default meta
type Story = StoryObj<typeof meta>

/** Выбор ходит стрелками с клавиатуры и нажатием по значению. */
export const Playground: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selected)
    return <WeightWheel {...args} selected={selected} onSelect={setSelected} />
  },
}

/** Ось Direction: столбик на экране ввода веса, лента на экране подхода. */
export const Directions: Story = {
  render: (args) => (
    <Row>
      {WEIGHT_WHEEL_DIRECTIONS.map((direction) => (
        <Cell key={direction} label={direction} width={440}>
          <WeightWheel {...args} direction={direction} />
        </Cell>
      ))}
    </Row>
  ),
}
