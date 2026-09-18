import type { Meta, StoryObj } from '@storybook/react-vite'

import { CircleInfo } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { Alert } from './Alert'
import { ALERT_CORNERS, ALERT_LAYOUTS, ALERT_THEMES, ALERT_VIEWS } from './constants'

const ALERT_ICON = <Icon data={CircleInfo} size={18} />

const ACTIONS = (
  <>
    {/*
      Кнопки alert — как в мастере `.Content`: второстепенные `flat-secondary`,
      главная `flat`, размер `l`. Пересснято 18.09.2026; до этого главная была
      `normal-contrast` размера `xl`.
    */}
    <Button view="flat-secondary" size="l" content="Повторить" />
    <Button view="flat" size="l" content="Отмена" />
  </>
)

const meta = {
  title: 'Components/Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  /*
   * Порядок и имена настроек — как в панели Figma у мастера `53623:196774`:
   * Theme, View, Corners, Close button, Icon (optional), затем Content — Layout,
   * Content text, Title text, Show buttons. Сортировку выключаем, иначе витрина
   * выстраивает их по алфавиту и с китом не сходится. Просьба пользователя
   * 18.09.2026. Всё, чего в панели кита нет, из настроек убрано.
   */
  parameters: { controls: { sort: 'none', exclude: ['closeLabel'] } },
  argTypes: {
    theme: { name: 'Theme', control: 'select', options: ALERT_THEMES },
    view: { name: 'View', control: 'inline-radio', options: ALERT_VIEWS },
    corners: { name: 'Corners', control: 'inline-radio', options: ALERT_CORNERS },
    // Содержимое переключателем не задаётся, поэтому булев тумблер подменяет его целиком.
    // В ките это ровно те же булевы свойства: Show buttons, Close button, Icon (optional).
    onClose: {
      name: 'Close button',
      control: 'boolean',
      mapping: { true: () => {}, false: undefined },
    },
    icon: { name: 'Icon (optional)', control: 'boolean', mapping: { true: ALERT_ICON, false: undefined } },
    layout: { name: 'Layout', control: 'inline-radio', options: ALERT_LAYOUTS },
    message: { name: 'Content text', control: 'text' },
    title: { name: 'Title text', control: 'text' },
    actions: { name: 'Show buttons', control: 'boolean', mapping: { true: ACTIONS, false: undefined } },
    closeLabel: { control: false },
  },
  /* Состояние по умолчанию — как в панели кита: Normal, Outlined, Rounded, всё включено. */
  args: {
    theme: 'normal',
    view: 'outlined',
    corners: 'rounded',
    layout: 'row',
    title: 'Тренировка не сохранена',
    message: 'Соединение прервалось. Повторите отправку.',
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

/** Кнопки, значок и крестик включаются тумблерами «Show buttons», «Icon», «Close button». */
export const Playground: Story = {
  args: { icon: ALERT_ICON, actions: ACTIONS, onClose: () => {} },
}

/** Ось Theme — 6 значений. Success красится токенами Positive. */
export const Themes: Story = {
  render: (args) => (
    <Row>
      {ALERT_THEMES.map((theme) => (
        <Cell key={theme} label={theme} width={487}>
          <Alert {...args} theme={theme} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Filled — заливка по теме, Outlined — обводка. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {ALERT_VIEWS.map((view) => (
        <Cell key={view} label={view} width={487}>
          <Alert {...args} view={view} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось Corners: скруглённая плита и прямоугольная. */
export const Corners: Story = {
  render: (args) => (
    <Row>
      {ALERT_CORNERS.map((corners) => (
        <Cell key={corners} label={corners} width={487}>
          <Alert {...args} corners={corners} />
        </Cell>
      ))}
    </Row>
  ),
}

