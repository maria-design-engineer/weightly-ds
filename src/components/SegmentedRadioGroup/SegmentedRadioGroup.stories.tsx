import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { SegmentedRadioGroup } from './SegmentedRadioGroup'
import {
  SEGMENTED_RADIO_GROUP_SIZES,
  SEGMENTED_RADIO_GROUP_WIDTHS,
} from './constants'

const MOVEMENTS = [
  { value: 'first', content: 'Движение 1' },
  { value: 'second', content: 'Движение 2' },
]

const meta = {
  title: 'Base UI/SegmentedRadioGroup',
  component: SegmentedRadioGroup,
  argTypes: {
    size: { control: 'inline-radio', options: SEGMENTED_RADIO_GROUP_SIZES },
    width: { control: 'inline-radio', options: SEGMENTED_RADIO_GROUP_WIDTHS },
  },
  args: {
    size: 'l',
    width: 'auto',
    options: MOVEMENTS,
    defaultValue: 'first',
    ariaLabel: 'Движение упражнения',
  },
} satisfies Meta<typeof SegmentedRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Size — 4: высота кнопки 24, 28, 36 и 44. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SEGMENTED_RADIO_GROUP_SIZES.map((size) => (
        <Cell key={size} label={size} width={200}>
          <SegmentedRadioGroup {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Width — 2: по содержимому и во всю ширину родителя. */
export const Widths: Story = {
  render: (args) => (
    <Row>
      {SEGMENTED_RADIO_GROUP_WIDTHS.map((width) => (
        <Cell key={width} label={width} width={328}>
          <SegmentedRadioGroup {...args} width={width} />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Состояния кнопки: выбрана и нет, отключены по отдельности и вся группа.
 * Выбранной кнопку делает значение группы, своего пропа у неё нет.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="выбрана первая" width={200}>
        <SegmentedRadioGroup {...args} defaultValue="first" />
      </Cell>
      <Cell label="выбрана вторая" width={200}>
        <SegmentedRadioGroup {...args} defaultValue="second" />
      </Cell>
      <Cell label="кнопка отключена" width={200}>
        <SegmentedRadioGroup
          {...args}
          options={[MOVEMENTS[0]!, { ...MOVEMENTS[1]!, disabled: true }]}
        />
      </Cell>
      <Cell label="группа отключена" width={200}>
        <SegmentedRadioGroup {...args} disabled />
      </Cell>
    </Row>
  ),
}

/** Счётчик справа от подписи — свойство `Counter` кита. */
export const Counters: Story = {
  render: (args) => (
    <Row>
      <Cell label="counter" width={240}>
        <SegmentedRadioGroup
          {...args}
          options={[
            { value: 'first', content: 'Движение 1', counter: 3 },
            { value: 'second', content: 'Движение 2', counter: 1 },
          ]}
        />
      </Cell>
    </Row>
  ),
}
