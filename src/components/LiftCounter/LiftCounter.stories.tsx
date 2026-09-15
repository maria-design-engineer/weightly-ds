import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { LIFT_COUNTER_VIEWS } from './constants'
import { LiftCounter } from './LiftCounter'

const meta = {
  title: 'Product components/LiftCounter',
  component: LiftCounter,
  args: { view: 'panel', content: 2 },
  argTypes: {
    view: { control: 'inline-radio', options: LIFT_COUNTER_VIEWS },
    content: { control: 'text' },
  },
} satisfies Meta<typeof LiftCounter>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Счётчик со своим числом: кнопки меняют его на единицу, ниже нуля не уходит. */
function LiftCounterDemo() {
  const [lifts, setLifts] = useState(2)
  return (
    <LiftCounter
      content={lifts}
      onDecrease={() => setLifts((value) => Math.max(0, value - 1))}
      onIncrease={() => setLifts((value) => value + 1)}
    />
  )
}

/** Кнопки меняют число на единицу; ниже нуля счётчик не уходит. */
export const Live: Story = {
  render: () => <LiftCounterDemo />,
}

/** Оба вида рядом: `panel` — панель подхода, `field` — форма шторки, ширина 156 как в мастере. */
export const Views: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
      <LiftCounter view="panel" content={2} />
      <div style={{ width: 156 }}>
        <LiftCounter view="field" content={2} />
      </div>
    </div>
  ),
}
