import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { ChipSelect } from './ChipSelect'
import { CHIP_SELECT_SIZES, CHIP_SELECT_STATES } from './constants'

const meta = {
  title: 'Product components/ChipSelect',
  component: ChipSelect,
  argTypes: {
    state: { control: 'inline-radio', options: CHIP_SELECT_STATES },
    size: { control: 'inline-radio', options: CHIP_SELECT_SIZES },
    content: { control: 'text' },
    onPick: { control: false },
  },
  args: { content: 'С помоста', size: 's' },
} satisfies Meta<typeof ChipSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Size — 3: S 26, M 34, L 42, оба состояния. */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {CHIP_SELECT_SIZES.map((size) => (
        <Row key={size}>
          {CHIP_SELECT_STATES.map((state) => (
            <Cell key={state} label={`${size} · ${state}`} width={132}>
              <ChipSelect {...args} size={size} state={state} />
            </Cell>
          ))}
        </Row>
      ))}
    </div>
  ),
}

/** Ось State — 2: выбран и нет. */
export const States: Story = {
  render: (args) => (
    <Row>
      {CHIP_SELECT_STATES.map((state) => (
        <Cell key={state} label={state} width={132}>
          <ChipSelect {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Группа: в ней выбирается один чип. Ряд с переносом, промежуток 4; обёртка
 * несёт `role="radiogroup"` с подписью — это работа экрана, не компонента.
 */
export const Group: Story = {
  render: () => (
    <div
      role="radiogroup"
      aria-label="Точка старта"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 4, maxWidth: 328 }}
    >
      <ChipSelect state="selected" content="С помоста" onPick={() => {}} />
      <ChipSelect content="С виса" onPick={() => {}} />
      <ChipSelect content="С плинтов" onPick={() => {}} />
      <ChipSelect content="Из ямы" onPick={() => {}} />
    </div>
  ),
}
