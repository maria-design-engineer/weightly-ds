import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import type { ParanjaProps } from './Paranja'
import { Paranja } from './Paranja'

const meta = {
  title: 'Custom/Paranja',
  component: Paranja,
  argTypes: {
    open: { control: 'boolean' },
    children: { control: false },
    onOpenChange: { control: false },
    ariaLabel: { control: 'text' },
  },
  args: { ariaLabel: 'Наложение' },
} satisfies Meta<typeof Paranja>

export default meta
type Story = StoryObj<typeof meta>

/** Карточка наложения — своя у каждого экрана; паранджа несёт только затемнение. */
function Sheet({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 16,
        borderRadius: 'var(--w-2xl-radius) var(--w-2xl-radius) 0 0',
        background: 'var(--w-base-float-float-bg)',
      }}
    >
      <span style={{ font: 'var(--w-style-header-header-2)' }}>Заголовок наложения</span>
      <Button view="primary" size="xl" content="Закрыть" onClick={onClose} />
    </div>
  )
}

/**
 * Открывается кнопкой. Проверяется руками: Escape и клик мимо закрывают,
 * Tab не уводит за пределы карточки, фон не прокручивается, фокус после
 * закрытия возвращается на кнопку.
 */
function ParanjaDemo(args: ParanjaProps) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: 400 }}>
      <Button view="secondary" size="m" content="Открыть наложение" onClick={() => setOpen(true)} />
      <Paranja {...args} open={open} onOpenChange={setOpen}>
        <Sheet onClose={() => setOpen(false)} />
      </Paranja>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <ParanjaDemo {...args} />,
}

/** Само затемнение, открытое сразу: видно цвет `Effect/Veil`. */
export const Veil: Story = {
  args: { open: true },
  render: (args) => (
    <div style={{ height: 400 }}>
      <Paranja {...args}>
        <Sheet onClose={() => {}} />
      </Paranja>
    </div>
  ),
}
