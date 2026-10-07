import type { Meta, StoryObj } from '@storybook/react-vite'

import { Magnifier, PencilToLine, Xmark } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { TEXT_INPUT_SIZES, TEXT_INPUT_VIEWS } from './constants'
import { TextInput } from './TextInput'

const MAGNIFIER = <Icon data={Magnifier} size={16} />
/* Значки слотов — те, что нарисованы в мастере: `xmark` у очистки, `pencil-to-line` у двух остальных. */
const XMARK = <Icon data={Xmark} />
const PENCIL = <Icon data={PencilToLine} />

const meta = {
  title: 'Base UI/TextInput',
  component: TextInput,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: 'select', options: TEXT_INPUT_SIZES },
    view: { control: 'select', options: TEXT_INPUT_VIEWS },
    errorPlacement: { control: 'inline-radio', options: ['inline', 'outline'] },
    // Сообщение — содержимое, и панель по умолчанию предлагает объект: подменяем строкой.
    errorMessage: { control: 'text' },
    onValueChange: { control: false },
    startIcon: { control: 'boolean', mapping: { true: MAGNIFIER, false: undefined } },
    clearIcon: { control: 'boolean', mapping: { true: XMARK, false: undefined } },
    icon1: { control: 'boolean', mapping: { true: PENCIL, false: undefined } },
    icon2: { control: 'boolean', mapping: { true: PENCIL, false: undefined } },
    onClearIconClick: { control: false },
    onIcon1Click: { control: false },
    onIcon2Click: { control: false },
    clearIconLabel: { table: { disable: true } },
    icon1Label: { table: { disable: true } },
    icon2Label: { table: { disable: true } },
    inputMode: { table: { disable: true } },
  },
  args: { ariaLabel: 'Вес штанги' },
} satisfies Meta<typeof TextInput>

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {
  args: { placeholder: '100', size: 'm' },
}

/** Ось Size — высоты 26 · 34 · 42 · 52. */
export const Sizes: Story = {
  render: (args) => (
    <Row>
      {TEXT_INPUT_SIZES.map((size) => (
        <Cell key={size} label={size} width={200}>
          <TextInput {...args} size={size} defaultValue="102,5" />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось View: Normal — поле в рамке, Clear — без коробки и боковых отступов. */
export const Views: Story = {
  render: (args) => (
    <Row>
      {TEXT_INPUT_VIEWS.map((view) => (
        <Cell key={view} label={view} width={200}>
          <TextInput {...args} view={view} defaultValue="102,5" />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Слоты значков — Clear icon, Icon 1, Icon 2. Поле от них не растёт: высоту
 * держит размер, а не содержимое слота. Правый значок здесь нажимаемый, и это
 * всё, что он берёт от кнопки.
 */
export const Icons: Story = {
  render: (args) => (
    <Row>
      <Cell label="Clear icon" width={200}>
        <TextInput {...args} defaultValue="102,5" clearIcon={XMARK} />
      </Cell>
      <Cell label="Icon 1" width={200}>
        <TextInput {...args} defaultValue="102,5" icon1={PENCIL} />
      </Cell>
      <Cell label="Три слота" width={200}>
        <TextInput
          {...args}
          defaultValue="102,5"
          clearIcon={XMARK}
          icon1={PENCIL}
          icon2={PENCIL}
        />
      </Cell>
      <Cell label="Нажимаемый" width={200}>
        <TextInput
          {...args}
          defaultValue="102,5"
          icon1={PENCIL}
          icon1Label="Править"
          onIcon1Click={() => undefined}
        />
      </Cell>
    </Row>
  ),
}

/**
 * Ось State. Hover и Active — рантайм, пропа под них нет: они проверяются
 * курсором и клавиатурой, карточками не показываются. Строка в отклонениях этапа.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="Suggest" width={200}>
        <TextInput {...args} placeholder="Введите вес" />
      </Cell>
      <Cell label="Default" width={200}>
        <TextInput {...args} defaultValue="102,5" />
      </Cell>
      <Cell label="Disabled" width={200}>
        <TextInput {...args} defaultValue="102,5" disabled />
      </Cell>
      <Cell label="Error inline" width={200}>
        <TextInput
          {...args}
          defaultValue="1000"
          errorMessage="Больше 500 кг не бывает"
          errorPlacement="inline"
        />
      </Cell>
      <Cell label="Error outline" width={200}>
        <TextInput
          {...args}
          defaultValue="1000"
          errorMessage="Больше 500 кг не бывает"
          errorPlacement="outline"
        />
      </Cell>
    </Row>
  ),
}
