import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronDown } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { BlockCard } from './BlockCard'
import { BLOCK_CARD_FILLS } from './constants'

/*
 * Кнопка карточки блока — один шеврон значком, без подписи: правка кита
 * 13.09.2026. Вид `flat-action` — значок красится брендовым.
 */
const ACTIONS = (
  <Button
    view="flat-action"
    size="s"
    startIcon={<Icon data={ChevronDown} size={12} />}
    ariaLabel="Раскрыть блок"
  />
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

/** Ось Fill: карточка с заливкой и без неё. */
export const Fills: Story = {
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
