import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { LiftCounter } from '../LiftCounter/LiftCounter'
import { LiftCounters } from '../LiftCounters/LiftCounters'
import { SetMarker } from '../SetMarker/SetMarker'
import { WeightWheel } from '../WeightWheel/WeightWheel'
import { SET_PANEL_STATES } from './constants'
import { SetPanel } from './SetPanel'

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

const MARKERS = (
  <>
    <SetMarker state="current" content="1" />
    <SetMarker state="planned" content="2" />
    <SetMarker state="planned" content="3" />
    <SetMarker state="planned" content="4" />
    <SetMarker state="planned" content="5" />
  </>
)

const meta = {
  title: 'Product components/SetPanel',
  component: SetPanel,
  argTypes: {
    state: { control: 'inline-radio', options: SET_PANEL_STATES },
    markers: { control: false },
    wheel: { control: false },
    lifts: { control: false },
    maxButton: { control: false },
    emptyAction: { control: false },
  },
  args: {
    title: 'Подход',
    caption: '50% от 123 кг',
    liftsTitle: 'Подъёмы',
    emptyTitle: 'Подходов пока нет',
    emptyCaption: 'Появятся, когда добавишь интенсивность',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SetPanel>

export default meta
type Story = StoryObj<typeof meta>

/** Панель с данными: пять отметок, барабан веса и два счётчика подъёмов. */
export const Default: Story = {
  args: {
    state: 'default',
    markers: MARKERS,
    onAddSet: () => {},
    maxButton: <Button view="flat-danger" size="xs" startIcon={<Icon data={Plus} />} content="Максимум" />,
    wheel: <WeightWheel direction="horizontal" values={VALUES} selected={43} ariaLabel="Вес подхода" />,
    lifts: (
      <LiftCounters>
        <LiftCounter content={2} />
        <LiftCounter content={3} />
      </LiftCounters>
    ),
  },
}

/** Пустое состояние: интенсивность не задана, подходов нет. */
export const Empty: Story = {
  args: {
    state: 'empty',
    emptyAction: <Button view="normal-contrast" size="m" content="Добавить" />,
  },
}

export const Playground: Story = { ...Default }
