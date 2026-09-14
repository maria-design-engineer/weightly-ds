import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowRightFromSquare, Pencil, TrashBin } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { DropdownMenu } from './DropdownMenu'
import type { DropdownMenuItem } from './constants'
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

const GROUPED: DropdownMenuItem[] = [
  { id: 'add', content: 'Добавить упражнение' },
  { id: 'all', content: 'Открыть все упражнения' },
  { type: 'separator', id: 'line' },
  { id: 'delete', content: 'Удалить упражнение', disabled: true },
]

/*
 * Десять пунктов — столько строк нарисовано у мастера кита. Потолка у кода нет:
 * строк столько, сколько пришло в `items`.
 */
const LONG: DropdownMenuItem[] = Array.from({ length: 10 }, (_, index) => ({
  id: `item-${index + 1}`,
  content: `Пункт ${index + 1}`,
}))

const meta = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  argTypes: {
    size: { control: 'inline-radio', options: DROPDOWN_MENU_SIZES },
  },
  args: { size: 'xl', items: BASIC, ariaLabel: 'Действия с упражнением' },
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Состав `Type=Basic`: только подписи. */
export const Basic: Story = { render: (args) => <DropdownMenu {...args} items={BASIC} /> }

/** Состав `Type=With icons`: значок слева от подписи. */
export const WithIcons: Story = { render: (args) => <DropdownMenu {...args} items={WITH_ICONS} /> }

/** Состав `Type=Grouped`: группы отбиты разделителем; последняя строка отключена. */
export const Grouped: Story = { render: (args) => <DropdownMenu {...args} items={GROUPED} /> }

/**
 * Десять пунктов в отведённой высоте: не поместилось — список прокручивается.
 * Сколько места у меню, решает экран, поэтому высоту ставит обёртка.
 */
export const LongList: Story = {
  render: (args) => (
    <div style={{ height: 280 }}>
      <DropdownMenu {...args} items={LONG} />
    </div>
  ),
}

/** Ось Size — 4: высота строки 24, 28, 36 и 44. */
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
      {DROPDOWN_MENU_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ font: 'var(--w-style-text-caption-1)', color: 'var(--w-text-secondary)' }}>
            {size}
          </span>
          <DropdownMenu {...args} size={size} items={BASIC} />
        </div>
      ))}
    </div>
  ),
}
