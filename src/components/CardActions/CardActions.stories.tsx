import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { CardActions } from './CardActions'

/*
 * В панели — выключатели мастера `Правка`, `Удаление`, `Перетаскивание`. Подписи кнопок
 * для скринридера пишет UX Writer; в витрине стоят нейтральные.
 */
const meta = {
  title: 'Product components/CardActions',
  component: CardActions,
  argTypes: {
    edit: { control: 'boolean', name: 'Правка' },
    remove: { control: 'boolean', name: 'Удаление' },
    drag: { control: 'boolean', name: 'Перетаскивание' },
    onEdit: { table: { disable: true } },
    onRemove: { table: { disable: true } },
    onDragStart: { table: { disable: true } },
    editLabel: { table: { disable: true } },
    removeLabel: { table: { disable: true } },
    dragLabel: { table: { disable: true } },
  },
  args: { edit: true, remove: true, drag: true, editLabel: 'Правка', removeLabel: 'Удаление', dragLabel: 'Перетаскивание' },
} satisfies Meta<typeof CardActions>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Выключатели по одному: каждая кнопка показывается своим. */
export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Row>
      <Cell label="все три">
        <CardActions {...args} />
      </Cell>
      <Cell label="Правка">
        <CardActions {...args} remove={false} drag={false} />
      </Cell>
      <Cell label="Удаление">
        <CardActions {...args} edit={false} drag={false} />
      </Cell>
      <Cell label="Перетаскивание">
        <CardActions {...args} edit={false} remove={false} />
      </Cell>
    </Row>
  ),
}
