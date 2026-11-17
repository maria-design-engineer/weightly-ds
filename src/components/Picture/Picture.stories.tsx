import type { Meta, StoryObj } from '@storybook/react-vite'

import { FolderOpen } from '@gravity-ui/icons'

import { Cell, Row } from '../story-layout'
import { PICTURE_TYPES } from './constants'
import { Picture } from './Picture'

const meta = {
  title: 'Product components/Picture',
  component: Picture,
  argTypes: {
    type: { control: 'inline-radio', options: PICTURE_TYPES },
    /* Подмена иконки — переопределение экземпляра в Figma, не свойство: в панель не выносим. */
    icon: { table: { disable: true } },
  },
} satisfies Meta<typeof Picture>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { type: 'empty-badge' } }

/**
 * Ось Type: четыре значка из иконотеки — закрытый список, и `Phone` 42 × 42. Последняя
 * карточка — `Phone` с подменённой иконкой: так берут значок с новой картинкой.
 */
export const Types: Story = {
  render: () => (
    <Row>
      {PICTURE_TYPES.map((type) => (
        <Cell key={type} label={type} width={100}>
          <Picture type={type} />
        </Cell>
      ))}
      <Cell label="phone · подмена" width={100}>
        <Picture type="phone" icon={FolderOpen} />
      </Cell>
    </Row>
  ),
}
