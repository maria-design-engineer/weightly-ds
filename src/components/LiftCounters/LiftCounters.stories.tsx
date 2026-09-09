import type { Meta, StoryObj } from '@storybook/react-vite'

import { LiftCounter } from '../LiftCounter/LiftCounter'
import { Cell } from '../story-layout'
import { LiftCounters } from './LiftCounters'

const meta = {
  title: 'Product components/LiftCounters',
  component: LiftCounters,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LiftCounters>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: {
    children: (
      <>
        <LiftCounter content={2} />
        <LiftCounter content={3} />
      </>
    ),
  },
}

/** От одного счётчика до четырёх: два входят в ширину экрана, дальше ряд едет вбок. */
export const Counts: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: 328 }}>
      {[1, 2, 4].map((count) => (
        <Cell key={count} label={`движений ${count}`} width={328}>
          <LiftCounters>
            {Array.from({ length: count }, (_, index) => (
              <LiftCounter key={index} content={index + 2} />
            ))}
          </LiftCounters>
        </Cell>
      ))}
    </div>
  ),
}
