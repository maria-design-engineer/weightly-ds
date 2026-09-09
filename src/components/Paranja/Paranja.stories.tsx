import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { Cell, Row } from '../story-layout'
import { PARANJA_TYPES } from './constants'
import type { ParanjaProps } from './Paranja'
import { Paranja } from './Paranja'

const meta = {
  title: 'Product components/Paranja',
  component: Paranja,
  argTypes: {
    type: { control: 'inline-radio', options: PARANJA_TYPES },
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
      <span style={{ font: 'var(--w-style-header-header-1)' }}>Заголовок наложения</span>
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

/**
 * Ось Type: под шторкой затемнение `Effect/Veil`, под информационным окном
 * `Effect/Shadow` — оно светлее. Наложения показаны в рамке экрана, чтобы обе
 * заливки было видно рядом.
 */
export const Types: Story = {
  render: () => (
    <Row>
      {PARANJA_TYPES.map((type) => (
        <Cell key={type} label={type} width={200}>
          <div style={{ position: 'relative', width: 200, height: 300, overflow: 'hidden', borderRadius: 16, background: 'var(--w-branding-base-background)' }}>
            <div style={{ padding: 16, font: 'var(--w-style-text-body-3)', color: 'var(--w-text-primary)' }}>
              Экран под наложением
            </div>
            <div style={{ position: 'absolute', inset: 0, background: type === 'drawer' ? 'var(--w-effect-veil)' : 'var(--w-effect-shadow)' }} />
          </div>
        </Cell>
      ))}
    </Row>
  ),
}
