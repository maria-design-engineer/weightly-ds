import type * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import type { LiftMarkState } from '../LiftMark/constants'
import { Cell, Row } from '../story-layout'
import { LiftsCell } from './LiftsCell'

/** «нет» означает, что подъёма не было: в Figma это выключенное свойство Lift N. */
const OPTIONS = ['done', 'failed', 'skipped', 'нет'] as const

type Option = (typeof OPTIONS)[number]

type LiftsStoryArgs = {
  lift1: Option
  lift2: Option
  lift3: Option
  lift4: Option
  lift5: Option
}

function toLifts(args: LiftsStoryArgs): LiftMarkState[] {
  return [args.lift1, args.lift2, args.lift3, args.lift4, args.lift5].filter(
    (value): value is LiftMarkState => value !== 'нет',
  )
}

const option = { control: 'inline-radio', options: OPTIONS } as const

const meta: Meta<LiftsStoryArgs> = {
  title: 'Custom/LiftsCell',
  component: LiftsCell as unknown as React.ComponentType<LiftsStoryArgs>,
  argTypes: { lift1: option, lift2: option, lift3: option, lift4: option, lift5: option },
  args: { lift1: 'done', lift2: 'done', lift3: 'failed', lift4: 'skipped', lift5: 'нет' },
  render: (args) => <LiftsCell lifts={toLifts(args)} />,
}

export default meta
type Story = StoryObj<LiftsStoryArgs>

/** Каждый подъём выбирается своим переключателем: выполнен, неуспешен, пропущен или его нет. */
export const Playground: Story = {}

/** Число подъёмов: в Figma его набирают булевыми свойствами Lift 2…Lift 5. */
export const Counts: Story = {
  render: () => (
    <Row>
      <Cell label="три подъёма" width={140}>
        <LiftsCell lifts={['done', 'done', 'failed']} />
      </Cell>
      <Cell label="пять подъёмов" width={160}>
        <LiftsCell lifts={['done', 'done', 'done', 'skipped', 'failed']} />
      </Cell>
    </Row>
  ),
}
