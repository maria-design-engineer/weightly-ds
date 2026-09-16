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
    view: { control: 'inline-radio', options: ['panel', 'columns'] },
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

/**
 * Подходов больше, чем влезает: восемь отметок. Ряд прокручивается вбок свайпом,
 * кнопка «плюс» не сжимается, первая отметка не уходит за левый край.
 */
export const ManySets: Story = {
  args: {
    ...Default.args,
    markers: (
      <>
        <SetMarker state="current" content="1" />
        {[2, 3, 4, 5, 6, 7, 8].map((order) => (
          <SetMarker key={order} state="planned" content={String(order)} />
        ))}
      </>
    ),
  },
}

/**
 * Три колонки — мастер `set-panel-columns`, узел `50561:55532`: отметки подходов
 * столбиком с «плюсом» в конце, барабан веса стоймя, счётчики подъёмов один
 * под другим, до четырёх.
 */
export const Columns: Story = {
  args: {
    ...Default.args,
    view: 'columns',
    /* Кнопка максимума и подпись в ките включаются порознь: здесь подпись. */
    maxButton: undefined,
    markers: (
      <>
        <SetMarker state="current" content="1" />
        <SetMarker state="planned" content="2" />
        <SetMarker state="planned" content="3" />
      </>
    ),
    wheel: <WeightWheel direction="vertical" values={VALUES} selected={43} ariaLabel="Вес подхода" />,
    lifts: (
      <>
        <LiftCounter content={3} />
        <LiftCounter content={2} />
        <LiftCounter content={2} />
        <LiftCounter content={2} />
      </>
    ),
  },
}

/** Те же колонки, когда максимум не внесён: вместо подписи кнопка «Максимум». */
export const ColumnsNoMax: Story = {
  args: {
    ...Columns.args,
    caption: undefined,
    maxButton: <Button view="flat-danger" size="xs" startIcon={<Icon data={Plus} />} content="Максимум" />,
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
