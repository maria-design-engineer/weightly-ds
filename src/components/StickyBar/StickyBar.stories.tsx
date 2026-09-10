import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { StickyBar } from './StickyBar'

const meta = {
  title: 'Product components/StickyBar',
  component: StickyBar,
  argTypes: { children: { control: false } },
  args: {
    children: (
      <>
        <Button view="secondary" size="xl" content="Слева" />
        <Button view="primary" size="xl" content="Справа" />
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StickyBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/**
 * Булево кита `Right button = false`: правой кнопки нет. Пропом это не является —
 * кнопка просто не передана, и оставшаяся занимает всю ширину.
 */
export const OneButton: Story = {
  args: { children: <Button view="primary" size="xl" content="Одна кнопка" /> },
}
