import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { LiftCounter } from './LiftCounter'

const meta = {
  title: 'Product components/LiftCounter',
  component: LiftCounter,
  args: { content: 2 },
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
