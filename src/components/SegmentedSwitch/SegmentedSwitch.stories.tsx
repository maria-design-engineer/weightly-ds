import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SegmentedSwitch } from './SegmentedSwitch'
import { SEGMENTED_SWITCH_SIZES } from './constants'
import type { SegmentedSwitchSize } from './constants'

/** Подписи мастера кита, по порядку `Item 1`-`Item 5`. */
const ITEMS = [
  { value: 'week', content: 'Нед' },
  { value: 'month', content: 'Мес' },
  { value: 'year', content: 'Год' },
  { value: 'all', content: 'Всё' },
  { value: 'own', content: 'Свой' },
]

type Args = {
  size: SegmentedSwitchSize
  'Item 1': boolean
  'Item 2': boolean
  'Item 3': boolean
  'Item 4': boolean
  'Item 5': boolean
}

const meta = {
  title: 'Product components/SegmentedSwitch',
  argTypes: {
    size: { control: 'inline-radio', options: SEGMENTED_SWITCH_SIZES },
  },
  /* Как в мастере: включены первые три кнопки. */
  args: { size: 's', 'Item 1': true, 'Item 2': true, 'Item 3': true, 'Item 4': false, 'Item 5': false },
  render: (args) => {
    const items = ITEMS.filter((_, at) => args[`Item ${at + 1}` as keyof Args])
    /* Ключ пересаживает переключатель, когда меняется состав кнопок. */
    return (
      <SegmentedSwitch
        key={items.map((item) => item.value).join()}
        size={args.size}
        items={items}
        ariaLabel="Период"
      />
    )
  },
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Кнопки нажимаются: выбранная белеет и приподнимается. */
export const Playground: Story = {}

/** Ось Size — 2: S на кнопках XS, L на кнопках M. */
export const Sizes: Story = {
  render: () => (
    <Row>
      {SEGMENTED_SWITCH_SIZES.map((size) => (
        <Cell key={size} label={size} width={200}>
          <SegmentedSwitch size={size} items={ITEMS.slice(0, 3)} ariaLabel="Период" />
        </Cell>
      ))}
    </Row>
  ),
}
