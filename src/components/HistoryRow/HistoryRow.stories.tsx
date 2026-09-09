import type { Meta, StoryObj } from '@storybook/react-vite'

import { Label } from '../Label/Label'
import { HistoryRow } from './HistoryRow'

const meta = {
  title: 'Product components/HistoryRow',
  component: HistoryRow,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: { content: { control: 'text' }, caption: { control: 'text' } },
  args: {
    content: 'Сегодня · утро',
    caption: 'КПШ 63 · вес 2 840 кг',
    mark: <Label size="s" theme="danger" content="92%" />,
  },
} satisfies Meta<typeof HistoryRow>

export default meta
type Story = StoryObj<typeof meta>

/** Плашка справа приходит содержимым: в ките это экземпляр Label. */
export const Playground: Story = {}

/**
 * Свойство Offline: значок «без сети» между текстом и плашкой — тренировка
 * записана на устройстве и ещё не выгружена. Заведено релизом 2.
 */
export const Offline: Story = {
  args: { offline: true },
}
