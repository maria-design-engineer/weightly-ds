import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { Cell, Row } from '../story-layout'
import { BlockCard } from './BlockCard'
import { BLOCK_CARD_SHADOWS } from './constants'

const ACTIONS = (
  <>
    <Button view="secondary" size="s" content="Открыть" />
    <Button view="flat" size="s" content="Пропустить" />
  </>
)

const meta = {
  title: 'Custom/BlockCard',
  component: BlockCard,
  argTypes: {
    shadow: { control: 'inline-radio', options: BLOCK_CARD_SHADOWS },
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
      {BLOCK_CARD_SHADOWS.map((shadow) => (
        <Cell key={shadow} label={`Shadow = ${shadow}`} width={328}>
          <BlockCard {...args} shadow={shadow} />
        </Cell>
      ))}
    </Row>
  ),
}
