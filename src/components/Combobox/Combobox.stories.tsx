import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { Combobox, type ComboboxProps } from './Combobox'

const MOVEMENTS = [
  { value: '1', label: 'Приседания со штангой' },
  { value: '2', label: 'Приседания со штангой · на груди' },
  { value: '3', label: 'Тяга рывковая' },
  { value: '4', label: 'Тяга толчковая' },
  { value: '5', label: 'Тяга с ремнями', secondary: 'Своё' },
]

const meta = {
  title: 'Product components/Combobox',
  component: Combobox,
  args: { items: MOVEMENTS, value: null, onValueChange: () => {}, ariaLabel: 'Движение' },
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Поле движения в попапе «Разбора файла»: набранное сужает список, кадр `4р`; последним —
 * «+ Добавить новое движение». Нажмите в поле и наберите «тяга».
 */
export const Movement: Story = {
  render: (args) => <MovementDemo {...args} />,
}

function MovementDemo(args: ComboboxProps) {
  {
    const [value, setValue] = useState<string | null>(null)
    const [picked, setPicked] = useState('')
    return (
      <Row>
        <Cell label="Набор" width={328}>
          <Combobox
            {...args}
            value={value}
            onValueChange={setValue}
            action={{ label: 'Добавить новое движение', icon: <Icon data={Plus} size={16} />, onPick: (query) => setPicked(query) }}
          />
          {picked ? <p style={{ font: 'var(--w-style-text-caption-1)' }}>Новое: {picked}</p> : null}
        </Cell>
        <Cell label="Не распознано · кадр 4п" width={328}>
          <Combobox
            {...args}
            value={null}
            invalid
            defaultInputValue="Тяга с ремнями"
            action={{ label: 'Добавить новое движение', icon: <Icon data={Plus} size={16} />, onPick: () => {} }}
          />
        </Cell>
      </Row>
    )
  }
}
