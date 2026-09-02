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
    <Button view="secondary" size="s" content="Повторить" />
    <Button view="flat" size="s" content="Отмена" />
  </>
)

const meta = {
  title: 'Alert',
  component: Alert,
  decorators: [
    (Story) => (
      <div style={{ width: 487 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    theme: { control: 'select', options: ALERT_THEMES },
    view: { control: 'inline-radio', options: ALERT_VIEWS },
    corners: { control: 'inline-radio', options: ALERT_CORNERS },
    layout: { control: 'inline-radio', options: ALERT_LAYOUTS },
    // Содержимое переключателем не задаётся, поэтому булев тумблер подменяет его целиком.
    // В ките это ровно те же булевы свойства: Show buttons, Close button, Icon (optional).
    actions: { control: 'boolean', mapping: { true: ACTIONS, false: undefined } },
    onClose: { control: 'boolean', mapping: { true: () => {}, false: undefined } },
    icon: { control: 'boolean', mapping: { true: ALERT_ICON, false: undefined } },
  },
  args: {
    title: 'Тренировка не сохранена',
    message: 'Соединение прервалось. Повторите отправку.',
  },
} satisfies Meta<typeof Alert>

export default meta

type Story = StoryObj<typeof meta>

/** Кнопки, значок и крестик включаются тумблерами `actions`, `icon` и `onClose`. */
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

/** Layout внутреннего .Content: кнопки справа или под текстом. */
export const Layouts: Story = {
  render: (args) => (
    <Row>
      {ALERT_LAYOUTS.map((layout) => (
        <Cell key={layout} label={layout} width={487}>
          <Alert
            {...args}
            layout={layout}
            icon={ALERT_ICON}
            actions={ACTIONS}
            onClose={() => {}}
          />
        </Cell>
      ))}
    </Row>
  ),
}
