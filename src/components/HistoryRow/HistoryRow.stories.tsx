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
  argTypes: {
    content: { control: 'text' },
    caption: { control: 'text' },
    onClick: { control: false },
    ariaLabel: { control: false },
  },
  args: {
    content: 'Сегодня · утро',
    caption: '63 КПШ · 2 840 кг',
    mark: <Label size="s" theme="danger" content="92%" />,
    /* Строка открывает тренировку: с действием она кнопка и отвечает на нажатие. */
    onClick: () => {},
  },
} satisfies Meta<typeof HistoryRow>

export default meta
type Story = StoryObj<typeof meta>

/** Плашка справа приходит содержимым: в ките это экземпляр Label. */
export const Playground: Story = {}

/**
 * Ось наведения: строка с действием красится `Base/Simple Hover` под курсором
 * и на время нажатия; строка без действия не нажимается вовсе.
 */
export const States: Story = {
  name: 'Наведение и нажатие',
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <HistoryRow {...args} onClick={() => {}} ariaLabel="Открыть тренировку" />
      <HistoryRow {...args} onClick={undefined} />
    </div>
  ),
}

/**
 * Свойство Offline: значок «без сети» между текстом и плашкой — тренировка
 * записана на устройстве и ещё не выгружена. Заведено релизом 2.
 */
export const Offline: Story = {
  args: { offline: true },
}
