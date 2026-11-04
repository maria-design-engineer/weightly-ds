import { useState } from 'react'

import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button/Button'
import type { ModalProps } from './Modal'
import { Modal } from './Modal'

/**
 * Витрина повторяет свойства мастера `Product / modal` тем же порядком:
 * `Header`, `Close on`, `Content on`, `fixSlot on`, `Actions`, `action-1` … `action-4`.
 *
 * В коде этих булевых у компонента нет: часть показывается, когда для неё передано
 * содержимое, — как у шторки. Здесь они живут переключателями витрины и решают,
 * передать проп или нет.
 */
type DemoArgs = ModalProps & {
  header?: boolean
  contentOn?: boolean
  fixSlotOn?: boolean
  actions?: boolean
  'action-1'?: boolean
  'action-2'?: boolean
  'action-3'?: boolean
  'action-4'?: boolean
}

const hidden = { table: { disable: true } }

const meta = {
  title: 'Product components/Modal',
  parameters: { controls: { sort: 'none' }, layout: 'fullscreen' },
  argTypes: {
    header: { control: 'boolean', name: 'Header' },
    closeOn: { control: 'boolean', name: 'Close on' },
    contentOn: { control: 'boolean', name: 'Content on' },
    fixSlotOn: { control: 'boolean', name: 'fixSlot on' },
    actions: { control: 'boolean', name: 'Actions' },
    'action-1': { control: 'boolean', name: 'action-1' },
    'action-2': { control: 'boolean', name: 'action-2' },
    'action-3': { control: 'boolean', name: 'action-3' },
    'action-4': { control: 'boolean', name: 'action-4' },
    title: { control: 'text', name: 'Title' },
    description: { control: 'text', name: 'Description' },
    open: hidden,
    onOpenChange: hidden,
    icon: hidden,
    closeLabel: hidden,
    fixSlot: hidden,
    children: hidden,
    action1: hidden,
    action2: hidden,
    action3: hidden,
    action4: hidden,
    initialFocus: hidden,
  },
  /* Все выключатели мастера включены по умолчанию — профиль `modal.md`. */
  args: {
    header: true,
    closeOn: true,
    contentOn: true,
    fixSlotOn: true,
    actions: true,
    'action-1': true,
    'action-2': true,
    'action-3': true,
    'action-4': true,
    title: 'Заголовок окна',
    description: 'Пояснение под заголовком',
  },
} satisfies Meta<DemoArgs>

export default meta
type Story = StoryObj<typeof meta>

/** Заглушка слота: в ките на его месте `.Product / drawer-slot`, в коде приходит children. */
function Slot({ height = 80, children }: { height?: number; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: height,
        borderRadius: 'var(--w-2xl-radius)',
        background: 'var(--w-base-generic)',
        font: 'var(--w-style-text-body-3)',
        color: 'var(--w-text-primary)',
      }}
    >
      {children}
    </div>
  )
}

function ModalDemo({
  header = true,
  contentOn = true,
  fixSlotOn = true,
  actions = true,
  slotHeight = 80,
  ...args
}: DemoArgs & { slotHeight?: number }) {
  /* Окно открыто сразу: так его видно на снимке витрины без нажатия. */
  const [open, setOpen] = useState(true)
  const close = () => setOpen(false)
  const button = (on: boolean | undefined, view: 'primary' | 'flat-secondary') =>
    actions && on ? <Button view={view} size="l" content="Сохранить" onClick={close} /> : undefined

  return (
    <div style={{ height: '100vh', padding: 24 }}>
      <Button view="secondary" size="m" content="Открыть окно" onClick={() => setOpen(true)} />
      <Modal
        open={open}
        onOpenChange={setOpen}
        closeOn={args.closeOn}
        title={header ? args.title : undefined}
        description={header ? args.description : undefined}
        fixSlot={fixSlotOn ? <Slot>Fix slot</Slot> : undefined}
        action1={button(args['action-1'], 'flat-secondary')}
        action2={button(args['action-2'], 'flat-secondary')}
        action3={button(args['action-3'], 'flat-secondary')}
        action4={button(args['action-4'], 'primary')}
      >
        {contentOn ? <Slot height={slotHeight}>Slot</Slot> : null}
      </Modal>
    </div>
  )
}

/**
 * Мастер целиком. Проверяется руками: Escape, нажатие мимо и крестик закрывают,
 * Tab не уводит за пределы окна, после закрытия фокус возвращается на кнопку.
 */
export const Playground: Story = {
  render: (args) => <ModalDemo {...args} />,
}

/**
 * Длинное содержимое: окно не выше 80 % экрана, прокручивается только второй слот,
 * шапка, первый слот и ряд действий стоят на месте. При выключенном `fixSlot on`
 * отступ под шапкой не удваивается — проверка из передачи релиза 6.
 */
export const LongContent: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => <ModalDemo {...args} slotHeight={1200} />,
}
