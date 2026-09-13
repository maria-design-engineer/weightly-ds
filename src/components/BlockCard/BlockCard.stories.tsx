import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { Cell, Row } from '../story-layout'
import { BlockCard } from './BlockCard'
import { BLOCK_CARD_FILLS } from './constants'

const ACTIONS = (
  <>
    <Button view="secondary" size="s" content="Открыть" />
    <Button view="flat" size="s" content="Пропустить" />
  </>
)

const meta = {
  title: 'Product components/BlockCard',
  component: BlockCard,
  argTypes: {
    fill: { control: 'inline-radio', options: BLOCK_CARD_FILLS },
    content: { control: 'text' },
    caption: { control: 'text' },
    actions: { control: 'boolean', mapping: { true: ACTIONS, false: undefined } },
  },
  args: { content: 'Разминка', caption: '4 упражнения', actions: ACTIONS },
} satisfies Meta<typeof BlockCard>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
}

/** Ось Shadow: карточка с тенью и без неё. */
export const Shadows: Story = {
  render: (args) => (
    <Row>
      {BLOCK_CARD_FILLS.map((fill) => (
        <Cell key={fill} label={`Fill = ${fill}`} width={328}>
          <BlockCard {...args} fill={fill} />
        </Cell>
      ))}
    </Row>
  ),
}
