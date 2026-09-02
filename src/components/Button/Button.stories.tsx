import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { Button } from './Button'
import { BUTTON_SIZES, BUTTON_VIEWS } from './constants'

const PLUS_ICON = <Icon data={Plus} size={16} />

const meta = {
  title: 'Button',
  component: Button,
  argTypes: {
    view: { control: 'select', options: BUTTON_VIEWS },
    size: { control: 'select', options: BUTTON_SIZES },
    // Содержимое панелью не задаётся: текст правится строкой, иконки — тумблером.
    content: { control: 'text' },
    startIcon: { control: 'boolean', mapping: { true: PLUS_ICON, false: undefined } },
    endIcon: { control: 'boolean', mapping: { true: PLUS_ICON, false: undefined } },
    // Обработчик приходит от приложения: панелью не задаётся, нажатия видно во вкладке Actions.
    onClick: { control: false },
  },
  args: { content: 'Запустить тренировку' },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

/** Любое сочетание четырёх осей собирается ручками панели Controls. */
export const Playground: Story = {
  args: { view: 'primary-brand', size: 'l' },
}

/** Ось View — 21 значение кита. Контрастные виды стоят на тёмной подложке. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {BUTTON_VIEWS.map((view) => (
        <Cell key={view} label={view}>
          <div
            style={{
              padding: 8,
              borderRadius: 'var(--w-s-radius)',
              background: view.endsWith('contrast')
                ? 'var(--w-branding-base-dark)'
                : 'transparent',
            }}
          >
            <Button {...args} view={view} content="Кнопка" />
          </div>
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
 * красит кнопку тем же токеном Base/Generic Hover, курсор не нужен.
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
            startIcon={PLUS_ICON}
          />
        </Cell>
      ))}
    </Row>
  ),
}

/** Девять видов, которые стоят на макетах. Число экземпляров — перепись 02.09.2026. */
export const InProduct: Story = {
  render: () => (
    <Row>
      {[
        ['flat-secondary · 55', 'flat-secondary', 'Отмена'],
        ['secondary · 42', 'secondary', 'Добавить подход'],
        ['flat · 27', 'flat', 'Подробнее'],
        ['primary-brand · 17', 'primary-brand', 'Запустить тренировку'],
        ['primary · 13', 'primary', 'Завершить подход'],
        ['flat-danger · 10', 'flat-danger', 'Удалить'],
      ].map(([label, view, text]) => (
        <Cell key={view} label={label}>
          <Button view={view as never} size="l" content={text} />
        </Cell>
      ))}
    </Row>
  ),
}
