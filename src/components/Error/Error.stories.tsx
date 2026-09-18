import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowRotateLeft } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { PICTURE_TYPES } from '../Picture/constants'
import { ErrorState } from './Error'

const RELOAD = (
  <Button
    view="normal-contrast"
    size="l"
    startIcon={<Icon data={ArrowRotateLeft} size={16} />}
    content="Перезагрузить"
  />
)

const meta = {
  title: 'Product components/Error',
  component: ErrorState,
  parameters: { controls: { sort: 'none' } },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    picture: { name: 'Значок', control: 'inline-radio', options: PICTURE_TYPES },
    title: { name: 'Заголовок', control: 'text' },
    message: { name: 'Пояснение', control: 'text' },
    action: { name: 'Кнопка', control: 'boolean', mapping: { true: RELOAD, false: undefined } },
  },
  args: {
    picture: 'disconect',
    title: 'Нет сети',
    message: 'Проверь связь и перезагрузи страницу',
    action: RELOAD,
  },
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Три состояния продукта: сбой у нас, сети нет, ответа нет — кадры входа. */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="fix" width={360}>
        <ErrorState
          {...args}
          picture="fix"
          title="Что-то сломалось у нас"
          message="Уже чиним. Попробуй перезагрузить сейчас или немного позже"
        />
      </Cell>
      <Cell label="disconect" width={360}>
        <ErrorState
          {...args}
          picture="disconect"
          title="Нет сети"
          message="Проверь связь и перезагрузи страницу"
        />
      </Cell>
      <Cell label="empty-badge" width={360}>
        <ErrorState
          {...args}
          picture="empty-badge"
          title="Сеть не отвечает"
          message="Запрос ушёл, ответ не пришёл. Попробуй перезагрузить страницу"
        />
      </Cell>
    </Row>
  ),
}
