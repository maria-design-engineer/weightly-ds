import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { WEIGHT_FIELD_STATES } from './constants'
import { WeightField } from './WeightField'

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

const meta = {
  title: 'Product components/WeightField',
  component: WeightField,
  argTypes: {
    state: { control: 'inline-radio', options: WEIGHT_FIELD_STATES },
    values: { control: false },
    onSelect: { control: false },
  },
  args: { values: VALUES, selected: 43, ariaLabel: 'Вес подхода', errorText: 'Вес не задан' },
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof WeightField>

export default meta
type Story = StoryObj<typeof meta>

/** Барабан крутится, выбранное значение остаётся в середине. */
function WeightFieldDemo(args: React.ComponentProps<typeof WeightField>) {
  const [selected, setSelected] = useState(43)
  return <WeightField {...args} selected={selected} onSelect={setSelected} />
}

export const Playground: Story = {
  render: (args) => <WeightFieldDemo {...args} />,
}

/**
 * Ось State: обычное поле, поле в фокусе с кольцом снаружи и поле с ошибкой —
 * красная обводка и строка под полем.
 */
export const States: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 328 }}>
      {WEIGHT_FIELD_STATES.map((state) => (
        <Cell key={state} label={state} width={328}>
          <WeightField {...args} state={state} />
        </Cell>
      ))}
    </div>
  ),
}
