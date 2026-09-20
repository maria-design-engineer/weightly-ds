import type { Meta, StoryObj } from '@storybook/react-vite'
import { useArgs } from 'storybook/preview-api'

import { Cell, Row } from '../story-layout'
import { SWITCH_SIZES } from './constants'
import { Switch } from './Switch'

/*
 * В панели стоят ровно те настройки и в том порядке, что оси мастера кита:
 * Size, Checked, Disabled, Content, Content text. Оси Hover в коде нет — профиль
 * `ui-kit/components/switch.md`: она живёт только в Figma, в браузере наведение
 * даёт сам браузер.
 */
const meta = {
  title: 'Base UI/Switch',
  component: Switch,
  argTypes: {
    size: { control: 'inline-radio', options: SWITCH_SIZES },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    content: { control: 'boolean' },
    contentText: { control: 'text' },
    /* Не оси кита — в панель не выносим: там стоит ровно то, что в мастере. */
    defaultChecked: { table: { disable: true } },
    onCheckedChange: { table: { disable: true } },
    ariaLabel: { table: { disable: true } },
  },
  args: { size: 'l', checked: false, disabled: false, content: true, contentText: 'Тренировка без сети' },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Нажатие двигает тумблер и переставляет `Checked` в панели: положение одно
 * и то же, откуда его ни меняй.
 */
export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs()
    return <Switch {...args} onCheckedChange={(checked) => updateArgs({ checked })} />
  },
}

/** Ось Size — дорожка `m` 36 × 20 с кружком 16, `l` 42 × 24 с кружком 18. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {SWITCH_SIZES.map((size) => (
        <Cell key={size} label={size} width={220}>
          <Switch {...args} size={size} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Checked — выключенная дорожка Base/Generic Medium, включённая Branding/Base Brand. */
export const Checked: Story = {
  render: (args) => (
    <Row>
      <Cell label="off" width={220}>
        <Switch {...args} checked={false} />
      </Cell>
      <Cell label="on" width={220}>
        <Switch {...args} checked />
      </Cell>
    </Row>
  ),
}

/** Ось Disabled — тумблер не гаснет, гаснет подпись: прозрачность 0,5. */
export const Disabled: Story = {
  render: (args) => (
    <Row>
      <Cell label="off · disabled" width={220}>
        <Switch {...args} checked={false} disabled />
      </Cell>
      <Cell label="on · disabled" width={220}>
        <Switch {...args} checked disabled />
      </Cell>
    </Row>
  ),
}

/** Ось Content — Off убирает подпись, тумблер стоит сам по себе. */
export const Content: Story = {
  render: (args) => (
    <Row>
      <Cell label="on" width={220}>
        <Switch {...args} />
      </Cell>
      <Cell label="off" width={220}>
        <Switch {...args} content={false} ariaLabel="Тренировка без сети" />
      </Cell>
    </Row>
  ),
}
