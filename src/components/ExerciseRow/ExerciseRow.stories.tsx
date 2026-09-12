import type { Meta, StoryObj } from '@storybook/react-vite'

import { ExerciseRow } from './ExerciseRow'

const meta = {
  title: 'Product components/ExerciseRow',
  component: ExerciseRow,
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
    basis: { control: 'text' },
    value: { control: 'text' },
    comment: { control: 'text' },
  },
  args: { content: 'Выпады с проворотом', caption: '2 × 8' },
} satisfies Meta<typeof ExerciseRow>

export default meta
type Story = StoryObj<typeof meta>

/** Четыре части, три из них необязательные. Состояний нет. */
export const Playground: Story = {}

/**
 * Составы записи упражнения ОФП — кадр `5а` сценария «Прохождение тренировки».
 * Их шесть, и все шесть лежат в сиде: от одного названия до названия с составом,
 * временем и комментарием.
 */
export const Forms: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <ExerciseRow content="Суставная гимнастика" />
      <ExerciseRow content="Прыжки на скакалке" caption="1 × 50" />
      <ExerciseRow content="Приседания с гантелью" caption="8 кг" />
      <ExerciseRow content="Планка" value="40 с" />
      <ExerciseRow content="Выпады с гантелями" caption="3 × 10 · 8 кг" />
      <ExerciseRow
        content="Удержание ягодичного мостика с подъёмом одной ноги"
        caption="3 × 12 · 8 кг"
        value="30 с"
        comment="Держи таз ровно, не заваливайся вбок. Если поясница тянет — опусти ниже и сделай меньше повторов, но не бросай подход на середине."
      />
      <ExerciseRow comment="Потянуть заднюю поверхность бедра, как в прошлый раз" />
      <ExerciseRow
        content="Приседания с гантелью"
        caption="3 × 12 · 8 кг"
        basis="Приседания со штангой"
        value="40 с"
        comment="Спина прямая, колени наружу. Прислонись спиной к стене и держи колени под 90° по 30 секунд, три подхода"
      />
    </div>
  ),
}
