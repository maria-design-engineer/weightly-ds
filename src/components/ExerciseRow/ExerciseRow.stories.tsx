import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExerciseRow } from './ExerciseRow'

const meta = {
  title: 'Custom/ExerciseRow',
  component: ExerciseRow,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { content: { control: 'text' }, caption: { control: 'text' } },
  args: { content: 'Выпады с проворотом', caption: '2 × 8' },
} satisfies Meta<typeof ExerciseRow>

export default meta
type Story = StoryObj<typeof meta>

/** Свойств два: название и раскладка. Состояний нет. */
export const Playground: Story = {}
