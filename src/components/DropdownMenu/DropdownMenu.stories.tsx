import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowRightFromSquare, Pencil, TrashBin } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { DropdownMenu } from './DropdownMenu'
import type { DropdownMenuItem, DropdownMenuSize } from './constants'
import { DROPDOWN_MENU_SIZES } from './constants'

const BASIC: DropdownMenuItem[] = [
  { id: 'add', content: 'Добавить упражнение' },
  { id: 'all', content: 'Открыть все упражнения' },
]

const WITH_ICONS: DropdownMenuItem[] = [
  { id: 'rename', content: 'Переименовать', icon: <Icon data={Pencil} size={16} /> },
  { id: 'move', content: 'Перенести', icon: <Icon data={ArrowRightFromSquare} size={16} /> },
  { id: 'delete', content: 'Удалить', icon: <Icon data={TrashBin} size={16} /> },
]

/*
 * Десять пунктов — столько строк нарисовано у мастера кита. Потолка у кода нет:
 * строк столько, сколько пришло в `items`; когда список не помещается на экран,
 * появляется полоса прокрутки — свойство `Scroll` карты.
 */
const LONG: DropdownMenuItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: `item-${index + 1}`,
  content: `Пункт ${index + 1}`,
}))

const GROUPED: DropdownMenuItem[] = [
  { id: 'add', content: 'Добавить упражнение' },
  { id: 'all', content: 'Открыть все упражнения' },
  { type: 'separator', id: 'line' },
  { id: 'delete', content: 'Удалить упражнение', disabled: true },
]

const meta = {
  title: 'Base UI/DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    size: { control: 'inline-radio', options: DROPDOWN_MENU_SIZES },
  },
  args: { size: 'xl', items: BASIC, switcherLabel: 'Действия с упражнением' },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

/** Меню закрыто: видна кнопка-многоточие, нажатие открывает список. */
export const Playground: Story = {
  render: (args) => (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: 360 }}>
      <DropdownMenu {...args} />
    </div>
  ),
}

/**
 * Открытое меню показывается само, а не ловится нажатием: состояние, которое
 * видно только курсором, ни снять снимком, ни показать другому.
 */
function Opened({ size, items }: { size: DropdownMenuSize; items: DropdownMenuItem[] }) {
  const [open, setOpen] = useState(true)

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', width: 360, height: 480 }}>
      <DropdownMenu
        size={size}
        items={items}
        open={open}
        onOpenChange={setOpen}
        switcherLabel="Действия с упражнением"
        ariaLabel="Действия с упражнением"
      />
    </div>
  )
}

/** Состав `Type=Basic`: только подписи. */
export const Basic: Story = { render: (args) => <Opened size={args.size ?? 'xl'} items={BASIC} /> }

/** Состав `Type=With icons`: значок слева от подписи. */
export const WithIcons: Story = {
  render: (args) => <Opened size={args.size ?? 'xl'} items={WITH_ICONS} />,
}

/** Состав `Type=Grouped`: группы отбиты разделителем; последняя строка отключена. */
export const Grouped: Story = {
  render: (args) => <Opened size={args.size ?? 'xl'} items={GROUPED} />,
}

/**
 * Десять пунктов — столько же строк у мастера кита, и это не потолок кода.
 * Выше свободного места под кнопкой меню не растёт: не поместилось — список
 * прокручивается, поэтому на низком окне у этой истории появляется полоса.
 */
export const LongList: Story = { render: (args) => <Opened size={args.size ?? 'xl'} items={LONG} /> }

/** Ось Size — 4: высота строки 24, 28, 36 и 44. */
export const SizeS: Story = { render: () => <Opened size="s" items={BASIC} /> }
export const SizeM: Story = { render: () => <Opened size="m" items={BASIC} /> }
export const SizeL: Story = { render: () => <Opened size="l" items={BASIC} /> }
export const SizeXl: Story = { render: () => <Opened size="xl" items={BASIC} /> }
