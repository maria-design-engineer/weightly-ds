import type { Meta, StoryObj } from '@storybook/react-vite'

import { IntensityChip } from '../IntensityChip/IntensityChip'
import { ExerciseCard } from './ExerciseCard'

const STEPS = (
  <>
    <IntensityChip band="neutral" content="60%" caption="2 × 3" />
    <IntensityChip band="neutral" content="70%" caption="2 × 2" />
    <IntensityChip band="lime" state="active" content="75%" caption="2 × 2" />
    <IntensityChip band="lime" content="80%" caption="3 × 1" />
    <IntensityChip band="pink" content="90%" caption="2 × 1" />
  </>
)

const meta = {
  title: 'Custom/ExerciseCard',
  component: ExerciseCard,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    content: { control: 'text' },
    caption: { control: 'text' },
    onHint: { control: false },
  },
  args: {
    content: 'Рывок классический',
    caption: 'Упражнение 2 из 5',
    steps: STEPS,
    onHint: () => {},
  },
} satisfies Meta<typeof ExerciseCard>

export default meta
type Story = StoryObj<typeof meta>

/** Ступени приходят содержимым: в Figma их число набирают свойствами Step 2…Step 5. */
export const Playground: Story = {}
