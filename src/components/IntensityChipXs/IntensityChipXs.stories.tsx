import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { IntensityChipXs } from './IntensityChipXs'
import { INTENSITY_CHIP_XS_BANDS, INTENSITY_CHIP_XS_SIZES } from './constants'

const meta = {
  title: 'Product components/IntensityChipXs',
  component: IntensityChipXs,
  argTypes: {
    band: { control: 'inline-radio', options: INTENSITY_CHIP_XS_BANDS },
    size: { control: 'inline-radio', options: INTENSITY_CHIP_XS_SIZES },
    content: { control: 'text' },
    icon: { control: 'boolean' },
  },
  args: { content: '75%', icon: false },
} satisfies Meta<typeof IntensityChipXs>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Band: neutral до 70 процентов, lime с 70, pink с 90. */
export const Bands: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_XS_BANDS.map((band) => (
        <Cell key={band} label={band} width={100}>
          <IntensityChipXs {...args} band={band} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Свойство Icon — значок подсказки справа от числа. */
export const WithIcon: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_XS_BANDS.map((band) => (
        <Cell key={band} label={band} width={100}>
          <IntensityChipXs {...args} band={band} icon />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Size: S ростом 24 — в карточке, M ростом 28 — в строке со временем тренировки. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {INTENSITY_CHIP_XS_SIZES.map((size) => (
        <Cell key={size} label={size} width={100}>
          <IntensityChipXs {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}
