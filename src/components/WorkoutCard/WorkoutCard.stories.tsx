import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { Label } from '../Label/Label'
import { WorkoutCard } from './WorkoutCard'

const ACTIONS = (
  <>
    <Button view="secondary" size="l" content="Посмотреть" />
    <Button view="primary-brand" size="l" content="Запустить тренировку" />
  </>
)

const meta = {
  title: 'Custom/WorkoutCard',
  component: WorkoutCard,
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
    actions: { control: 'boolean', mapping: { true: ACTIONS, false: undefined } },
  },
  args: {
    content: 'Тренировка на сегодня',
    caption: 'КПШ 63 · вес 2 840 кг',
    mark: <Label size="s" theme="normal" content="92%" />,
    actions: ACTIONS,
  },
} satisfies Meta<typeof WorkoutCard>

export default meta
type Story = StoryObj<typeof meta>

/** Оранжевая кнопка здесь одна на продукт — «Запустить тренировку». */
export const Playground: Story = {}
