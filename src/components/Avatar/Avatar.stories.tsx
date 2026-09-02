import type { Meta, StoryObj } from '@storybook/react-vite'

import { Person } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { Avatar } from './Avatar'
import { AVATAR_BORDER_COLORS, AVATAR_SIZES, AVATAR_THEMES, AVATAR_VIEWS } from './constants'

const meta = {
  title: 'Avatar',
  component: Avatar,
  argTypes: {
    size: { control: 'select', options: AVATAR_SIZES },
    view: { control: 'inline-radio', options: AVATAR_VIEWS },
    theme: { control: 'inline-radio', options: AVATAR_THEMES },
    borderColor: { control: 'select', options: [undefined, ...AVATAR_BORDER_COLORS] },
  },
  args: { text: 'МА' },
} satisfies Meta<typeof Avatar>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { size: 'l', view: 'filled', theme: 'brand' },
}

/** Ось Size — 7 значений: сторона 16 · 20 · 24 · 28 · 32 · 42 · 50. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {AVATAR_SIZES.map((size) => (
        <Cell key={size} label={size} width={80}>
          <Avatar {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Оси View и Theme — цвет задаёт их пара, четыре сочетания. */
export const ViewsAndThemes: Story = {
  render: (args) => (
    <Row>
      {AVATAR_VIEWS.flatMap((view) =>
        AVATAR_THEMES.map((theme) => (
          <Cell key={`${view}-${theme}`} label={`${view} · ${theme}`}>
            <Avatar {...args} size="l" view={view} theme={theme} />
          </Cell>
        )),
      )}
    </Row>
  ),
}

/**
 * Ось Type пропом не является: тип задаёт то, что передали.
 * Картинка — imageUrl, иконка — icon, инициалы — text.
 */
export const Types: Story = {
  render: () => (
    <Row>
      <Cell label="Type=Text">
        <Avatar size="l" text="МА" />
      </Cell>
      <Cell label="Type=Icon">
        <Avatar size="l" icon={<Icon data={Person} size={20} />} />
      </Cell>
      <Cell label="Type=Image">
        <Avatar
          size="l"
          imageUrl="data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='42' height='42'%3E%3Crect width='42' height='42' fill='%23d2d246'/%3E%3C/svg%3E"
          alt="Фотография атлета"
        />
      </Cell>
    </Row>
  ),
}

/** Custom border — кольцо поверх любого варианта, 7 цветов. В ките это набор .Custom border. */
export const CustomBorder: Story = {
  render: (args) => (
    <Row>
      {AVATAR_BORDER_COLORS.map((color) => (
        <Cell key={color} label={color} width={90}>
          <Avatar {...args} size="l" borderColor={color} />
        </Cell>
      ))}
    </Row>
  ),
}
