import type { Meta, StoryObj } from '@storybook/react-vite'

import { ProbeFrame } from '../ProbeFrame'
import { Paranja } from './Paranja'

const meta = {
  title: 'Probe Gravity/Custom/Paranja',
  component: Paranja,
  decorators: [
    (Story) => (
      <ProbeFrame>
        <Story />
      </ProbeFrame>
    ),
  ],
} satisfies Meta<typeof Paranja>

export default meta

type Story = StoryObj<typeof meta>

/** Сам компонент: свойств нет, состояние одно. */
export const Default: Story = {}

/** Он же поверх экрана — так наложение стоит на макетах d1–d7. */
export const OverScreen: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 360, height: 780 }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 16,
          background: 'var(--g-color-base-background)',
          font: 'var(--g-text-body-2-font)',
          color: 'var(--g-color-text-primary)',
        }}
      >
        Экран под наложением
      </div>
      <div style={{ position: 'absolute', inset: 0 }}>
        <Paranja />
      </div>
    </div>
  ),
}
