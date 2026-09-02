import type { Meta, StoryObj } from '@storybook/react-vite'

import { Person } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { LABEL_SIZES, LABEL_THEMES } from './constants'
import { Label } from './Label'

const meta = {
  title: 'Label',
  component: Label,
  argTypes: {
    size: { control: 'inline-radio', options: LABEL_SIZES },
    theme: { control: 'select', options: LABEL_THEMES },
  },
  args: { content: 'Разминка' },
} satisfies Meta<typeof Label>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { size: 's', theme: 'normal' } }

/** Ось Size — высоты 20 · 24 · 28. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {LABEL_SIZES.map((size) => (
        <Cell key={size} label={size} width={100}>
          <Label {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Theme — 8 значений. Clear единственная с обводкой вместо заливки. */
export const Themes: Story = {
  render: (args) => (
    <Row>
      {LABEL_THEMES.map((theme) => (
        <Cell key={theme} label={theme} width={110}>
          <Label {...args} theme={theme} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Key text и Value: второй кусок текста через разделитель. */
export const WithValue: Story = {
  render: (args) => (
    <Row>
      <Cell label="Key text" width={140}>
        <Label {...args} />
      </Cell>
      <Cell label="Key text + Value" width={160}>
        <Label {...args} value=" · 5 подходов" />
      </Cell>
      <Cell label="Icon only" width={100}>
        <Label {...args} content={undefined} icon={<Icon data={Person} size={14} />} />
      </Cell>
    </Row>
  ),
}
