import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { Select } from '../Select/Select'
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
        /* Кнопки размера L и крестик в шапке — правка кита 14.09.2026. */
        onClose={() => setOpen(false)}
        action={<Button view="primary" size="l" content="Сохранить" onClick={() => setOpen(false)} />}
        secondAction={
          <Button view="flat" size="l" content="Отмена" onClick={() => setOpen(false)} />
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

/**
 * Поле выбора внутри шторки: список уходит в свой портал, а шторка модальная
 * и поднята слоем — проверяем, что он всё равно открывается поверх панели.
 * Проверка заведена по находке прогона 14.09.2026.
 */
export const WithSelect: Story = {
  render: () => {
    const items = [
      { value: 'snatch', label: 'Рывок' },
      { value: 'clean', label: 'Толчок' },
      { value: 'squat', label: 'Приседания со штангой' },
    ]

    return (
      <Drawer
        open
        title="Своё упражнение"
        actions="column"
        action={<Button view="primary" size="l" content="Добавить" />}
      >
        <Select items={items} placeholder="Движение" ariaLabel="Движение" />
      </Drawer>
    )
  },
}
