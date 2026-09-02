import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { STATUS_BAR_TONES } from './constants'
import { StatusBar } from './StatusBar'

const meta = {
  title: 'Custom/StatusBar',
  component: StatusBar,
  argTypes: {
    tone: { control: 'inline-radio', options: STATUS_BAR_TONES },
    time: { control: 'text' },
  },
} satisfies Meta<typeof StatusBar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { tone: 'dark', time: '9:41' } }

/** Ось Tone: light стоит поверх фотографии, dark везде остальное. */
export const Tones: Story = {
  render: (args) => (
    <Row>
      {STATUS_BAR_TONES.map((tone) => (
        <Cell key={tone} label={tone} width={380}>
          <div
            style={{
              background:
                tone === 'light' ? 'var(--w-branding-base-dark)' : 'var(--w-branding-base-background)',
            }}
          >
            <StatusBar {...args} tone={tone} />
          </div>
        </Cell>
      ))}
    </Row>
  ),
}
