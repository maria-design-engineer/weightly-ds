import type { Meta, StoryObj } from '@storybook/react-vite'

import { CorrespondenceRow } from './CorrespondenceRow'

const meta = {
  title: 'Custom/CorrespondenceRow',
  component: CorrespondenceRow,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { content: { control: 'text' }, pill: { control: 'text' } },
  args: { content: 'Выпад', pill: 'База' },
} satisfies Meta<typeof CorrespondenceRow>

export default meta
type Story = StoryObj<typeof meta>

/** Плашка справа собрана внутри строки: прежний base-pill в библиотеку не вошёл. */
export const Playground: Story = {}
