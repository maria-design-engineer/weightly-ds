import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { WEIGHT_WHEEL_DIRECTIONS } from './constants'
import { WeightWheel } from './WeightWheel'

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

const meta = {
  title: 'Custom/WeightWheel',
  component: WeightWheel,
  argTypes: {
    direction: { control: 'inline-radio', options: WEIGHT_WHEEL_DIRECTIONS },
    onSelect: { control: false },
  },
  args: { values: VALUES, selected: 43 },
} satisfies Meta<typeof WeightWheel>

export default meta
type Story = StoryObj<typeof meta>

/** Барабан крутится: колесом, пальцем и стрелками с клавиатуры. */
export const Playground: Story = {
  render: function Render(args) {
    const [selected, setSelected] = useState(args.selected)
    return <WeightWheel {...args} selected={selected} onSelect={setSelected} />
  },
}

/** Ось Direction: столбик на экране ввода веса, лента на экране подхода. */
export const Directions: Story = {
  render: function Render(args) {
    return (
      <Row>
        {WEIGHT_WHEEL_DIRECTIONS.map((direction) => (
          <Cell key={direction} label={direction} width={440}>
            <WeightWheel {...args} direction={direction} />
          </Cell>
        ))}
      </Row>
    )
  },
}
