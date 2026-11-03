import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronUp, EllipsisVertical, TargetDart } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell } from '../story-layout'
import { CardHeader } from './CardHeader'
import type { CardHeaderAction } from './CardHeader'
import type { CardHeaderSize } from './constants'
import { CARD_HEADER_SIZES } from './constants'

const ICON = <Icon data={TargetDart} />
const ACTION: CardHeaderAction = { icon: <Icon data={EllipsisVertical} size={12} />, ariaLabel: 'Ещё' }
const TITLE_BUTTON: CardHeaderAction = { icon: <Icon data={ChevronUp} size={12} />, ariaLabel: 'Свернуть' }

type PlaygroundArgs = {
  size: CardHeaderSize
  title: string
  description: string
  icon: boolean
  button: boolean
  'action-1': boolean
  'action-2': boolean
  'action-3': boolean
}

const meta = {
  title: 'Product components/CardHeader',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta

/**
 * Панель повторяет свойства кита: Size и `action-1`…`action-3` шапки, `icon` и
 * `button` вложенного заголовка. По умолчанию — как мастер `Size=Header 1`.
 */
export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    size: { control: 'inline-radio', options: CARD_HEADER_SIZES },
    title: { control: 'text' },
    description: { control: 'text' },
  },
  args: {
    size: 'header-1',
    title: 'Цель',
    description: 'Верхний уровень планирования задаётся рамкой и направлением',
    icon: true,
    button: false,
    'action-1': false,
    'action-2': false,
    'action-3': true,
  },
  render: (args) => (
    <div style={{ width: 506 }}>
      <CardHeader
        size={args.size}
        title={args.title}
        description={args.description || undefined}
        icon={args.icon ? ICON : undefined}
        button={args.button ? TITLE_BUTTON : undefined}
        action1={args['action-1'] ? ACTION : undefined}
        action2={args['action-2'] ? ACTION : undefined}
        action3={args['action-3'] ? ACTION : undefined}
      />
    </div>
  ),
}

/** Ось Size: стиль заголовка, кнопки 22, 22, 26, 34 и стиль пояснения меняются разом. */
export const Sizes: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {CARD_HEADER_SIZES.map((size) => (
        <Cell key={size} label={size} width={506}>
          <div style={{ width: 506 }}>
            <CardHeader
              size={size}
              title="Цель"
              description="Верхний уровень планирования задаётся рамкой и направлением"
              icon={ICON}
              action3={ACTION}
            />
          </div>
        </Cell>
      ))}
    </div>
  ),
}

/**
 * Витрина кита «card-header · состояния» `51675:42111`: четыре размера против
 * наборов включённых кнопок — одна, две, три.
 */
export const States: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {CARD_HEADER_SIZES.map((size) => (
        <div key={size} style={{ display: 'flex', gap: 24 }}>
          {[1, 2, 3].map((count) => (
            <Cell key={count} label={`${size} · кнопок ${count}`} width={360}>
              <div style={{ width: 360 }}>
                <CardHeader
                  size={size}
                  title="Цель"
                  description="Пояснение раздела"
                  icon={ICON}
                  action1={count >= 3 ? ACTION : undefined}
                  action2={count >= 2 ? ACTION : undefined}
                  action3={ACTION}
                />
              </div>
            </Cell>
          ))}
        </div>
      ))}
    </div>
  ),
}

/** Выключатели вложенного заголовка: без значка, со значком, с кнопкой у заголовка. */
export const Icons: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Cell label="icon=Off" width={506}>
        <div style={{ width: 506 }}>
          <CardHeader size="header-2" title="Данные" description="Пояснение раздела" />
        </div>
      </Cell>
      <Cell label="icon=On" width={506}>
        <div style={{ width: 506 }}>
          <CardHeader size="header-2" title="Данные" icon={ICON} description="Пояснение раздела" />
        </div>
      </Cell>
      <Cell label="icon=On · button=On" width={506}>
        <div style={{ width: 506 }}>
          <CardHeader size="header-2" title="Данные" icon={ICON} button={TITLE_BUTTON} description="Пояснение раздела" />
        </div>
      </Cell>
    </div>
  ),
}
