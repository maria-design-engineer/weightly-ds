import type { Meta, StoryObj } from '@storybook/react-vite'

import { ChevronUp, EllipsisVertical, TargetDart } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import type { ButtonSize } from '../Button/constants'
import { Icon } from '../Icon/Icon'
import { Cell } from '../story-layout'
import { CardHeader } from './CardHeader'
import type { CardHeaderSize } from './constants'
import { CARD_HEADER_SIZES } from './constants'

/* Размер кнопки у заголовка — по мастерам `.Product / title`: XS, XS, S, M. */
const TITLE_BUTTON_SIZE: Record<CardHeaderSize, ButtonSize> = {
  'caption-1': 'xs',
  'subheader-2': 'xs',
  'header-2': 's',
  'header-1': 'm',
}

const ICON = <Icon data={TargetDart} />

function titleButton(size: CardHeaderSize) {
  return (
    <Button
      view="flat-secondary"
      size={TITLE_BUTTON_SIZE[size]}
      startIcon={<Icon data={ChevronUp} size={12} />}
      ariaLabel="Свернуть"
    />
  )
}

const ACTION = (
  <Button view="flat-secondary" size="m" startIcon={<Icon data={EllipsisVertical} size={12} />} ariaLabel="Ещё" />
)

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
 * Панель повторяет свойства кита: Size и выключатели `icon`, `button` вложенного
 * заголовка, `action-1`…`action-3` шапки. По умолчанию — как мастер `50990:74036`.
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
    button: true,
    'action-1': false,
    'action-2': false,
    'action-3': true,
  },
  render: (args) => (
    <div style={{ width: 554 }}>
      <CardHeader
        size={args.size}
        title={args.title}
        description={args.description || undefined}
        icon={args.icon ? ICON : undefined}
        button={args.button ? titleButton(args.size) : undefined}
        action1={args['action-1'] ? ACTION : undefined}
        action2={args['action-2'] ? ACTION : undefined}
        action3={args['action-3'] ? ACTION : undefined}
      />
    </div>
  ),
}

/** Ось Size вложенного `.Product / title` — четыре стиля заголовка. */
export const Sizes: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {CARD_HEADER_SIZES.map((size) => (
        <Cell key={size} label={size} width={554}>
          <div style={{ width: 554 }}>
            <CardHeader
              size={size}
              title="Цель"
              description="Пояснение раздела в одну строку"
              icon={ICON}
              button={titleButton(size)}
              action3={ACTION}
            />
          </div>
        </Cell>
      ))}
    </div>
  ),
}

/** Выключатели: без значка, без кнопки, без действий, все три действия. */
export const Icons: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Cell label="только заголовок" width={554}>
        <div style={{ width: 554 }}>
          <CardHeader size="header-2" title="Данные" />
        </div>
      </Cell>
      <Cell label="icon" width={554}>
        <div style={{ width: 554 }}>
          <CardHeader size="header-2" title="Данные" icon={ICON} description="Пояснение раздела" />
        </div>
      </Cell>
      <Cell label="icon · button · action-1 · action-2 · action-3" width={554}>
        <div style={{ width: 554 }}>
          <CardHeader
            size="header-2"
            title="Данные"
            icon={ICON}
            button={titleButton('header-2')}
            action1={ACTION}
            action2={ACTION}
            action3={ACTION}
            description="Пояснение раздела"
          />
        </div>
      </Cell>
    </div>
  ),
}
