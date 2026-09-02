import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { Chip } from './Chip'
import { CHIP_BANDS, CHIP_SIZES, CHIP_STATES } from './constants'

const meta = {
  title: 'Custom/Chip',
  component: Chip,
  argTypes: {
    size: { control: 'inline-radio', options: CHIP_SIZES },
    state: { control: 'inline-radio', options: CHIP_STATES },
    band: { control: 'inline-radio', options: CHIP_BANDS },
    content: { control: 'text' },
    caption: { control: 'text' },
  },
  args: { content: '75%', caption: '2 × 2' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Band: neutral до 70 процентов, lime с 70, pink с 90. */
export const Bands: Story = {
  render: (args) => (
    <Row>
      {CHIP_BANDS.map((band) => (
        <Cell key={band} label={band} width={100}>
          <Chip {...args} band={band} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Size — 52 и 60. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {CHIP_SIZES.map((size) => (
        <Cell key={size} label={size} width={100}>
          <Chip {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось State: у активного вокруг чипа кольцо Base/Brand. */
export const States: Story = {
  render: (args) => (
    <Row>
      {CHIP_STATES.map((state) => (
        <Cell key={state} label={state} width={100}>
          <Chip {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Все двенадцать сочетаний осей — так они лежат в ките. */
export const All: Story = {
  render: (args) => (
    <Row>
      {CHIP_SIZES.flatMap((size) =>
        CHIP_STATES.flatMap((state) =>
          CHIP_BANDS.map((band) => (
            <Cell key={`${size}-${state}-${band}`} label={`${size} · ${state} · ${band}`} width={120}>
              <Chip {...args} size={size} state={state} band={band} />
            </Cell>
          )),
        ),
      )}
    </Row>
  ),
}
