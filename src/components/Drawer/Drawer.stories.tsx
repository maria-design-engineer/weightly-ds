import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { DRAWER_ACTIONS } from './constants'
import type { DrawerProps } from './Drawer'
import { Drawer } from './Drawer'

const meta = {
  title: 'Product components/Drawer',
  component: Drawer,
  argTypes: {
    actions: { control: 'inline-radio', options: DRAWER_ACTIONS },
    open: { control: 'boolean' },
    dividerTop: { control: 'boolean' },
    dividerBottom: { control: 'boolean' },
    children: { control: false },
    action: { control: false },
    secondAction: { control: false },
    onOpenChange: { control: false },
  },
  args: {
    title: 'Заголовок шторки',
    caption: 'Подпись под заголовком',
    actions: 'column',
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

/** Слот содержимого: в ките на его месте стоит заглушка, в коде приходит children. */
function Slot() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 118,
        borderRadius: 'var(--w-l-radius)',
        background: 'var(--w-base-generic)',
        font: 'var(--w-style-text-body-3)',
        color: 'var(--w-text-secondary)',
      }}
    >
      Содержимое шторки
    </div>
  )
}

/**
 * Открывается кнопкой. Проверяется руками: Escape, клик мимо и свайп вниз
 * закрывают, Tab не уводит за пределы шторки, фокус возвращается на кнопку.
 */
function DrawerDemo(args: DrawerProps) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: 420 }}>
      <Button view="secondary" size="m" content="Открыть шторку" onClick={() => setOpen(true)} />
      <Drawer
        {...args}
        open={open}
        onOpenChange={setOpen}
        action={<Button view="primary" size="xl" content="Сохранить" onClick={() => setOpen(false)} />}
        secondAction={
          <Button view="secondary" size="xl" content="Отмена" onClick={() => setOpen(false)} />
        }
      >
        <Slot />
      </Drawer>
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <DrawerDemo {...args} />,
}

/** Ось Actions = column: кнопки столбиком, промежуток 8, панель 360 × 340. */
export const ActionsColumn: Story = {
  args: { actions: 'column' },
  render: (args) => <DrawerDemo {...args} />,
}

/** Ось Actions = row: кнопки в строку по 160, вторая слева от главной. */
export const ActionsRow: Story = {
  args: { actions: 'row' },
  render: (args) => <DrawerDemo {...args} />,
}

/** Разделители: включаются, когда содержимое уходит под обрез сверху или снизу. */
export const Dividers: Story = {
  args: { dividerTop: true, dividerBottom: true },
  render: (args) => <DrawerDemo {...args} />,
}
