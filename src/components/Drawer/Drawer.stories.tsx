import { useState } from 'react'

import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import { DRAWER_ACTIONS } from './constants'
import type { DrawerProps } from './Drawer'
import { Drawer } from './Drawer'

/**
 * Витрина повторяет свойства мастера: ось `Actions`, тексты заголовка и подписи
 * и булевы, которыми части включаются, — `Caption on`, `Header`, `Content on`,
 * `Divider top`, `Divider bottom`, `fixSlot on`. Решение пользователя 15.09.2026.
 *
 * В коде этих булевых у компонента нет намеренно: часть показывается тогда, когда
 * для неё передано содержимое. Здесь они живут переключателями витрины и решают,
 * передать проп или нет, — так виден и состав мастера, и правило кода.
 */
type DemoArgs = DrawerProps & {
  captionOn?: boolean
  header?: boolean
  contentOn?: boolean
  fixSlotOn?: boolean
}

const meta = {
  title: 'Product components/Drawer',
  /*
   * Компонент в `meta` не назван намеренно: тогда Storybook добавляет к таблице
   * свои строки из типов и ставит их своим порядком, а нам нужен порядок мастера.
   * Свойства перечислены ниже руками — в той же последовательности, что в ките.
   */
  /*
   * Порядок тот же, что у свойств мастера: `Actions`, `Title`, `Caption`,
   * `Caption on`, `Header`, `Content on`, `fixSlot on`. Разделители сюда не идут —
   * шторка считает их сама по прокрутке.
   */
  parameters: {
    controls: { sort: 'none' },
    /*
     * Кадр предпросмотра без полей: шторка прижата к низу окна, а поля витрины
     * вокруг кадра читались как её отступ снизу. Находка прогона 15.09.2026.
     */
    layout: 'fullscreen',
  },
  argTypes: {
    actions: { control: 'inline-radio', options: DRAWER_ACTIONS, name: 'Actions' },
    title: { control: 'text', name: 'Title' },
    caption: { control: 'text', name: 'Caption' },
    captionOn: { control: 'boolean', name: 'Caption on' },
    header: { control: 'boolean', name: 'Header' },
    contentOn: { control: 'boolean', name: 'Content on' },
    fixSlotOn: { control: 'boolean', name: 'fixSlot on' },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
    fixSlot: { table: { disable: true } },
    children: { table: { disable: true } },
    action: { table: { disable: true } },
    secondAction: { table: { disable: true } },
    onClose: { table: { disable: true } },
    closeLabel: { table: { disable: true } },
  },
  args: {
    actions: 'column',
    title: 'Заголовок шторки',
    caption: 'Подпись под заголовком',
    captionOn: true,
    header: true,
    contentOn: true,
    fixSlotOn: true,
  },
} satisfies Meta<DemoArgs>

export default meta
type Story = StoryObj<typeof meta>

/** Слот содержимого: в ките на его месте стоит заглушка, в коде приходит children. */
function Slot({ height = 118, children = 'Содержимое шторки' }: { height?: number; children?: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height,
        borderRadius: 'var(--w-l-radius)',
        background: 'var(--w-base-generic)',
        font: 'var(--w-style-text-body-3)',
        color: 'var(--w-text-secondary)',
      }}
    >
      {children}
    </div>
  )
}

/** Шторка мастера: шапка, `Fix-slot`, `Slot` и блок действий. */
function DrawerDemo({
  captionOn = true,
  header = true,
  contentOn = true,
  fixSlotOn = true,
  ...args
}: DemoArgs) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ height: 420 }}>
      <Button view="secondary" size="m" content="Открыть шторку" onClick={() => setOpen(true)} />
      <Drawer
        {...args}
        open={open}
        onOpenChange={setOpen}
        /* Шапка мастера — заголовок, подпись и крестик: выключена, ничего из них нет. */
        title={header ? args.title : undefined}
        caption={header && captionOn ? args.caption : undefined}
        onClose={header ? () => setOpen(false) : undefined}
        /* `Fix-slot` стоит на месте, `Slot` под ним прокручивается — слои мастера. */
        fixSlot={fixSlotOn ? <Slot height={64}>Fix-slot</Slot> : undefined}
        action={<Button view="primary" size="l" content="Сохранить" onClick={() => setOpen(false)} />}
        secondAction={
          <Button view="flat" size="l" content="Отмена" onClick={() => setOpen(false)} />
        }
      >
        {contentOn ? <Slot height={420} /> : null}
      </Drawer>
    </div>
  )
}

/**
 * Ось Actions = column: кнопки столбиком, промежуток 8. Открывается кнопкой;
 * проверяется руками: Escape, клик мимо и свайп вниз закрывают, Tab не уводит
 * за пределы шторки, фокус возвращается на кнопку.
 */
export const ActionsColumn: Story = {
  args: { actions: 'column' },
  render: (args) => <DrawerDemo {...args} />,
}

/** Ось Actions = row: кнопки в строку по 160, вторая слева от главной. */
export const ActionsRow: Story = {
  args: { actions: 'row' },
  render: (args) => <DrawerDemo {...args} />,
}

/**
 * Разделители: их ставит сама шторка, когда содержимое ушло под обрез. Прокрутите
 * слот — сверху появится линия, внизу списка пропадёт нижняя.
 */
export const Dividers: Story = {
  render: (args) => <DrawerDemo {...args} />,
}
