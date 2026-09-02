import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { TABLE_CELL_TONES } from './constants'
import { TableCell } from './TableCell'

const meta = {
  title: 'Custom/TableCell',
  component: TableCell,
  argTypes: {
    tone: { control: 'inline-radio', options: TABLE_CELL_TONES },
    content: { control: 'text' },
  },
  args: { content: 'подход 1' },
} satisfies Meta<typeof TableCell>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Tone — меняет только цвет текста. */
export const Tones: Story = {
  render: (args) => (
    <Row>
      {TABLE_CELL_TONES.map((tone) => (
        <Cell key={tone} label={tone} width={120}>
          <TableCell {...args} tone={tone} />
        </Cell>
      ))}
    </Row>
  ),
}
