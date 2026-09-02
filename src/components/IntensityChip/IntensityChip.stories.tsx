import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { IntensityChip } from './IntensityChip'
import { INTENSITY_CHIP_BANDS, INTENSITY_CHIP_SIZES, INTENSITY_CHIP_STATES } from './constants'

const meta = {
  title: 'Custom/IntensityChip',
  component: IntensityChip,
  argTypes: {
    size: { control: 'inline-radio', options: INTENSITY_CHIP_SIZES },
    state: { control: 'inline-radio', options: INTENSITY_CHIP_STATES },
    band: { control: 'inline-radio', options: INTENSITY_CHIP_BANDS },
    content: { control: 'text' },
    caption: { control: 'text' },
  },
  args: { content: '75%', caption: '2 × 2' },
} satisfies Meta<typeof IntensityChip>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Band: neutral до 70 процентов, lime с 70, pink с 90. */
export const Bands: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_BANDS.map((band) => (
        <Cell key={band} label={band} width={100}>
          <IntensityChip {...args} band={band} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Size — 52 и 60. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_SIZES.map((size) => (
        <Cell key={size} label={size} width={100}>
          <IntensityChip {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось State: у активного вокруг чипа кольцо Base/Brand. */
export const States: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_STATES.map((state) => (
        <Cell key={state} label={state} width={100}>
          <IntensityChip {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Все двенадцать сочетаний осей — так они лежат в ките. */
export const All: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_SIZES.flatMap((size) =>
        INTENSITY_CHIP_STATES.flatMap((state) =>
          INTENSITY_CHIP_BANDS.map((band) => (
            <Cell key={`${size}-${state}-${band}`} label={`${size} · ${state} · ${band}`} width={120}>
              <IntensityChip {...args} size={size} state={state} band={band} />
            </Cell>
          )),
        ),
      )}
    </Row>
  ),
}
