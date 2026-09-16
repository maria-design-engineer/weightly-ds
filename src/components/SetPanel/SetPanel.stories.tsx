import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { LiftCounter } from '../LiftCounter/LiftCounter'
import { LiftCounters } from '../LiftCounters/LiftCounters'
import { SetMarker } from '../SetMarker/SetMarker'
import { WeightWheel } from '../WeightWheel/WeightWheel'
import { SET_PANEL_BANDS } from './constants'
import { SetPanel, type SetPanelProps } from './SetPanel'

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

const MAX_BUTTON = <Button view="flat-danger" size="xs" startIcon={<Icon data={Plus} />} content="Максимум" />

/**
 * Свойства историй — то, что правят у мастера: вид панели, полоса интенсивности,
 * число подходов и подъёмов, `Max button`, `Caption`. Содержимое — отметки, барабан,
 * счётчики — собирает сама история.
 */
type PanelArgs = {
  view?: SetPanelProps['view']
  /** Полоса интенсивности: серая, лаймовая, розовая. */
  band?: SetPanelProps['band']
  /** Подходов в зоне — от одного до пяти, решение пользователя 16.09.2026. */
  sets?: number
  /** Счётчиков подъёмов — по движению связки, от одного до четырёх. */
  lifts?: number
  maxButton?: boolean
  caption?: boolean
  state?: SetPanelProps['state']
  /** Отметок больше пяти — для истории с прокруткой ряда. */
  manySets?: boolean
}

function markersOf({ sets = 1, manySets }: PanelArgs) {
  const orders = manySets ? [2, 3, 4, 5, 6, 7, 8] : Array.from({ length: Math.max(0, sets - 1) }, (_, at) => at + 2)
  return (
    <>
      <SetMarker state="current" content="1" />
      {orders.map((order) => (
        <SetMarker key={order} state="planned" content={String(order)} />
      ))}
    </>
  )
}

/** Счётчик на движение связки: первое на трёх подъёмах, остальные на двух. */
function liftsOf({ lifts = 1 }: PanelArgs) {
  return Array.from({ length: lifts }, (_, at) => <LiftCounter key={at} content={at === 0 ? 3 : 2} />)
}

const meta = {
  title: 'Product components/SetPanel',
  /*
   * Компонент здесь не объявлен нарочно: иначе витрина вытаскивает в панель свойств
   * все его пропы — содержимое отметок, барабана и счётчиков, — которые в ней не правят.
   * Правятся только свойства мастера: вид, число подходов и подъёмов, подпись, кнопка.
   */
  argTypes: {
    view: { name: 'Property 1', control: 'inline-radio', options: ['panel', 'columns'] },
    band: { name: 'Band', control: 'inline-radio', options: SET_PANEL_BANDS },
    /* Подходов до пяти, движений до четырёх — модель, решение пользователя 16.09.2026. */
    sets: { name: 'Подходы', control: { type: 'range', min: 1, max: 5, step: 1 } },
    lifts: { name: 'Подъёмы', control: { type: 'range', min: 1, max: 4, step: 1 } },
    maxButton: { name: 'Max button', control: 'boolean' },
    caption: { name: 'Caption', control: 'boolean' },
    state: { table: { disable: true } },
    manySets: { table: { disable: true } },
  },
  args: {
    view: 'panel',
    band: 'neutral',
    sets: 3,
    lifts: 2,
    maxButton: false,
    caption: true,
    state: 'default',
  },
  render: (args: PanelArgs) => (
    <SetPanel
      state={args.state}
      view={args.view}
      band={args.band}
      title="Подход"
      markers={markersOf(args)}
      onAddSet={() => {}}
      caption={args.caption ? '50% от 123 кг' : undefined}
      maxButton={args.maxButton ? MAX_BUTTON : undefined}
      wheel={
        <WeightWheel
          direction={args.view === 'columns' ? 'vertical' : 'horizontal'}
          values={VALUES}
          selected={43}
          ariaLabel="Вес подхода"
        />
      }
      liftsTitle="Подъёмы"
      lifts={args.view === 'columns' ? <>{liftsOf(args)}</> : <LiftCounters>{liftsOf(args)}</LiftCounters>}
      emptyTitle="Подходов пока нет"
      emptyCaption="Появятся, когда добавишь интенсивность"
      emptyAction={<Button view="normal-contrast" size="m" content="Добавить" />}
    />
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<PanelArgs>

export default meta
type Story = StoryObj<typeof meta>

/** Панель рядами: отметки подходов, барабан веса и счётчики подъёмов. */
export const Default: Story = {}

/** Подходов больше, чем влезает: ряд прокручивается вбок, кнопка «плюс» не сжимается. */
export const ManySets: Story = { args: { manySets: true } }

/**
 * Три колонки — мастер `set-panel-columns`, узел `50561:55532`: отметки подходов
 * столбиком, барабан веса стоймя, счётчики подъёмов один под другим.
 */
export const Columns: Story = { args: { view: 'columns', sets: 5, lifts: 4 } }

/** Те же колонки, когда максимум не внесён: вместо подписи кнопка «Максимум». */
export const ColumnsNoMax: Story = {
  args: { view: 'columns', caption: false, maxButton: true },
}

/** Пустое состояние: интенсивность не задана, подходов нет. */
export const Empty: Story = { args: { state: 'empty' } }

export const Playground: Story = {}
