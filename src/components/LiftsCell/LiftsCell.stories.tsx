import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { LiftsCell } from './LiftsCell'

const meta = {
  title: 'Custom/LiftsCell',
  component: LiftsCell,
} satisfies Meta<typeof LiftsCell>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { lifts: ['done', 'done', 'failed', 'skipped', 'done'] },
}

/** Число подъёмов задаётся списком: в Figma его набирают булевыми свойствами Lift 2…Lift 5. */
export const Counts: Story = {
  args: { lifts: ['done', 'done', 'failed'] },
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
