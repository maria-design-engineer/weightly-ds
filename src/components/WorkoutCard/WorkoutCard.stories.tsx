import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronRight, ChevronsRight, Play } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Label } from '../Label/Label'
import { WorkoutCard } from './WorkoutCard'

/* Размер кнопок M — правка мастера `Actions=on` (`49086:34322`) 03.10.2026, был L. */
const ACTIONS = (
  <>
    <Button
      view="flat"
      size="m"
      content="Пропустить"
      endIcon={<Icon data={ChevronsRight} />}
    />
    <Button
      view="primary-brand"
      size="m"
      content="Начать"
      endIcon={<Icon data={Play} />}
    />
  </>
)

const meta = {
  title: 'Product components/WorkoutCard',
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
    content: 'Сегодня · утро',
    caption: '63 КПШ · 5 упражнений',
    mark: <Label size="s" theme="danger" content="90%" />,
    trailing: (
      <Button
        view="flat-secondary"
        size="s"
        ariaLabel="Открыть тренировку"
        startIcon={<Icon data={ChevronRight} />}
      />
    ),
    actions: ACTIONS,
  },
} satisfies Meta<typeof WorkoutCard>

export default meta
type Story = StoryObj<typeof meta>

/** Оранжевая кнопка здесь одна на продукт — «Запустить тренировку». */
export const Playground: Story = {}
