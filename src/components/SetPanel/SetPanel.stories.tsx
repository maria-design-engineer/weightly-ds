import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { LiftCounter } from '../LiftCounter/LiftCounter'
import { LiftCounters } from '../LiftCounters/LiftCounters'
import { SetMarker } from '../SetMarker/SetMarker'
import { WeightWheel } from '../WeightWheel/WeightWheel'
import { SetPanel, type SetPanelProps } from './SetPanel'

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

const MAX_BUTTON = <Button view="flat-danger" size="xs" startIcon={<Icon data={Plus} />} content="Максимум" />

/**
 * Свойства историй — те же, что у мастера в Figma и в том же порядке: вид панели,
 * `Set 3`…`Set 5`, `Max button`, `Caption`. Содержимое — отметки, барабан, счётчики —
 * собирает сама история: в панели свойств витрины его не правят.
 */
type PanelArgs = {
  view?: SetPanelProps['view']
  set3?: boolean
  set4?: boolean
  set5?: boolean
  maxButton?: boolean
  caption?: boolean
  state?: SetPanelProps['state']
  /** Отметок больше пяти — для истории с прокруткой ряда. */
  manySets?: boolean
}

function markersOf({ set3, set4, set5, manySets }: PanelArgs) {
  const orders = manySets
    ? [2, 3, 4, 5, 6, 7, 8]
    : [2, ...(set3 ? [3] : []), ...(set4 ? [4] : []), ...(set5 ? [5] : [])]
  return (
    <>
      <SetMarker state="current" content="1" />
      {orders.map((order) => (
        <SetMarker key={order} state="planned" content={String(order)} />
      ))}
    </>
  )
}

const meta = {
  title: 'Product components/SetPanel',
  component: SetPanel,
  argTypes: {
    view: { name: 'Property 1', control: 'inline-radio', options: ['panel', 'columns'] },
    set3: { name: 'Set 3', control: 'boolean' },
    set4: { name: 'Set 4', control: 'boolean' },
    set5: { name: 'Set 5', control: 'boolean' },
    maxButton: { name: 'Max button', control: 'boolean' },
    caption: { name: 'Caption', control: 'boolean' },
    state: { table: { disable: true } },
    manySets: { table: { disable: true } },
  },
  args: {
    view: 'panel',
    set3: true,
    set4: false,
    set5: false,
    maxButton: false,
    caption: true,
    state: 'default',
  },
  render: (args: PanelArgs) => (
    <SetPanel
      state={args.state}
      view={args.view}
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
      lifts={
        args.view === 'columns' ? (
          <>
            <LiftCounter content={3} />
            <LiftCounter content={2} />
            <LiftCounter content={2} />
            <LiftCounter content={2} />
          </>
        ) : (
          <LiftCounters>
            <LiftCounter content={2} />
            <LiftCounter content={3} />
          </LiftCounters>
        )
      }
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
export const Columns: Story = { args: { view: 'columns' } }

/** Те же колонки, когда максимум не внесён: вместо подписи кнопка «Максимум». */
export const ColumnsNoMax: Story = {
  args: { view: 'columns', caption: false, maxButton: true },
}

/** Пустое состояние: интенсивность не задана, подходов нет. */
export const Empty: Story = { args: { state: 'empty' } }

export const Playground: Story = {}
