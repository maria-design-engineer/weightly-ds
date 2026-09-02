import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronRight, ChevronsRight, Play } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Label } from '../Label/Label'
import { WorkoutCard } from './WorkoutCard'

const ACTIONS = (
  <>
    <Button
      view="flat"
      size="l"
      content="Пропустить"
      endIcon={<Icon data={ChevronsRight} size={16} />}
    />
    <Button
      view="primary-brand"
      size="l"
      content="Начать"
      endIcon={<Icon data={Play} size={16} />}
    />
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
    content: 'Сегодня · утро',
    caption: '63 КПШ · 5 упражнений',
    mark: <Label size="s" theme="danger" content="90%" />,
    trailing: (
      <Button
        view="flat-secondary"
        size="s"
        ariaLabel="Открыть тренировку"
        startIcon={<Icon data={ChevronRight} size={16} />}
      />
    ),
    actions: ACTIONS,
  },
} satisfies Meta<typeof WorkoutCard>

export default meta
type Story = StoryObj<typeof meta>

/** Оранжевая кнопка здесь одна на продукт — «Запустить тренировку». */
export const Playground: Story = {}
