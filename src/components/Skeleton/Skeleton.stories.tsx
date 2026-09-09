import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { Skeleton } from './Skeleton'

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { width: 328, height: 16 } }

/**
 * Четыре сборки кита. Ось Type пропом не является: `User` — круг 28,
 * `Block` — полоса, `Multilines` — три полосы с промежутком 16,
 * `User + block` — круг и полоса 160 в строку.
 */
export const Types: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 332 }}>
      <Cell label="User" width={332}>
        <Skeleton width={28} height={28} round />
      </Cell>
      <Cell label="Block" width={332}>
        <Skeleton />
      </Cell>
      <Cell label="Multilines" width={332}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </Cell>
      <Cell label="User + block" width={332}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Skeleton width={28} height={28} round />
          <Skeleton width={160} />
        </div>
      </Cell>
    </div>
  ),
}
