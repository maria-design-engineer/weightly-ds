import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Icon } from '../Icon'
import { Cell, ProbeFrame, Row } from '../ProbeFrame'
import { Button } from './Button'
import { BUTTON_SIZES, BUTTON_VIEWS } from './constants'

const meta = {
  title: 'Probe Base UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <ProbeFrame>
        <Story />
      </ProbeFrame>
    ),
  ],
  argTypes: {
    view: { control: 'select', options: BUTTON_VIEWS },
    size: { control: 'select', options: BUTTON_SIZES },
  },
  args: { content: 'Запустить тренировку' },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/** Любое сочетание четырёх осей собирается ручками панели Controls. */
export const Playground: Story = {
  args: { view: 'action', size: 'l' },
}

/** Ось View — 21 значение кита. Продукт берёт Normal, Action, Outlined. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {BUTTON_VIEWS.map((view) => (
        <Cell key={view} label={view}>
          <Button {...args} view={view} content="Кнопка" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Size — 5 значений: высоты 24 · 28 · 34 · 42 · 52. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {BUTTON_SIZES.map((size) => (
        <Cell key={size} label={size}>
          <Button {...args} size={size} content="Кнопка" />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Ось State. Hover в ките — ось варианта, в коде рантайм: карточка ниже
 * красит кнопку тем же токеном, курсор для показа не нужен.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Default">
        <Button {...args} content="Кнопка" />
      </Cell>
      <Cell label="Hover">
        <span className="w-button-hover-demo">
          <Button {...args} content="Кнопка" />
        </span>
      </Cell>
      <Cell label="Selected">
        <Button {...args} selected content="Кнопка" />
      </Cell>
      <Cell label="Disabled">
        <Button {...args} disabled content="Кнопка" />
      </Cell>
      <Cell label="Loading">
        <Button {...args} loading content="Кнопка" />
      </Cell>
    </Row>
  ),
}

/** Icon only=On: иконка без подписи, у Size=M квадрат 34 × 34. */
export const IconOnly: Story = {
  args: { content: undefined },
  render: (args) => (
    <Row>
      {BUTTON_SIZES.map((size) => (
        <Cell key={size} label={`Icon only · ${size}`}>
          <Button
            {...args}
            size={size}
            ariaLabel="Добавить подход"
            startIcon={<Icon data={Plus} size={16} />}
          />
        </Cell>
      ))}
    </Row>
  ),
}

/** Три вида, которые берёт продукт, рядом — так они стоят на макетах. */
export const InProduct: Story = {
  render: () => (
    <Row>
      <Cell label="Action · L">
        <Button view="action" size="l" content="Запустить тренировку" />
      </Cell>
      <Cell label="Outlined · L">
        <Button view="outlined" size="l" content="Завершить подход" />
      </Cell>
      <Cell label="Normal · M">
        <Button view="normal" size="m" content="Отмена" />
      </Cell>
    </Row>
  ),
}
