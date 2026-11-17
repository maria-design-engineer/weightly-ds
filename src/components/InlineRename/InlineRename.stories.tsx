import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { InlineRename } from './InlineRename'

/*
 * Осей у компонента нет — профиль `inline-rename.md`: состояния приходят от поля
 * и кнопок. Витрина показывает их карточками: обычное, пустое — галочка выключена,
 * ошибка под полем, сохранение идёт. Подписи для скринридера — нейтральные.
 */
const meta = {
  title: 'Product components/InlineRename',
  component: InlineRename,
  parameters: { controls: { disable: true } },
  args: {
    value: 'Неделя 3 · день 1',
    onValueChange: () => {},
    onSave: () => {},
    onCancel: () => {},
    ariaLabel: 'Название',
    cancelLabel: 'Отменить',
    saveLabel: 'Сохранить',
  },
} satisfies Meta<typeof InlineRename>

export default meta
type Story = StoryObj<typeof meta>

/** Живая правка: Enter сохраняет, Esc и щелчок мимо отменяют — подпись под полем говорит, что случилось. */
export const Playground: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value)
    const [log, setLog] = useState('')
    return (
      <div style={{ width: 428, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InlineRename
          {...args}
          value={value}
          onValueChange={setValue}
          onSave={() => setLog(`сохранено: ${value}`)}
          onCancel={() => setLog('отменено')}
        />
        <span>{log}</span>
      </div>
    )
  },
}

export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="обычное" width={428}>
        <InlineRename {...args} />
      </Cell>
      <Cell label="пустое · галочка выключена" width={428}>
        <InlineRename {...args} value="" />
      </Cell>
      <Cell label="ошибка" width={428}>
        <InlineRename {...args} errorMessage="Текст ошибки под полем" />
      </Cell>
      <Cell label="сохранение идёт" width={428}>
        <InlineRename {...args} saving />
      </Cell>
    </Row>
  ),
}
