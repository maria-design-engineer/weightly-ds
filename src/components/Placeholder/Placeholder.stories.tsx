import type { Meta, StoryObj } from '@storybook/react-vite'

import { ArrowRotateLeft } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { Cell, Row } from '../story-layout'
import { PICTURE_TYPES } from '../Picture/constants'
import type { PictureType } from '../Picture/constants'
import type { PlaceholderProps } from './Placeholder'
import { Placeholder } from './Placeholder'

/**
 * Витрина повторяет свойства мастера `Placeholder` тем же порядком: `icon`,
 * `caption`, `button-1`, `button-2`, `button-3`; тип значка — подмена `Product / picture`.
 *
 * В коде булевых нет: часть показывается, когда для неё передано содержимое.
 * Здесь они живут переключателями витрины и решают, передать проп или нет.
 */
type DemoArgs = PlaceholderProps & {
  icon?: boolean
  type?: PictureType
  captionOn?: boolean
  'button-1'?: boolean
  'button-2'?: boolean
  'button-3'?: boolean
  width?: number
}

const hidden = { table: { disable: true } }

const meta = {
  title: 'Components/Placeholder',
  parameters: { controls: { sort: 'none' } },
  argTypes: {
    icon: { control: 'boolean', name: 'icon' },
    captionOn: { control: 'boolean', name: 'caption' },
    'button-1': { control: 'boolean', name: 'button-1' },
    'button-2': { control: 'boolean', name: 'button-2' },
    'button-3': { control: 'boolean', name: 'button-3' },
    type: { control: 'inline-radio', options: PICTURE_TYPES, name: 'Type' },
    title: { control: 'text', name: 'Title' },
    caption: { control: 'text', name: 'Caption' },
    picture: hidden,
    button1: hidden,
    button2: hidden,
    button3: hidden,
    width: hidden,
  },
  /* По умолчанию включены `icon`, `caption` и `button-1` — профиль `placeholder.md`. */
  args: {
    icon: true,
    captionOn: true,
    'button-1': true,
    'button-2': false,
    'button-3': false,
    type: 'disconect',
    title: 'Заголовок заглушки',
    caption: 'Пояснение под заголовком',
  },
} satisfies Meta<DemoArgs>

export default meta
type Story = StoryObj<typeof meta>

function Demo({ icon, type, captionOn, width = 360, ...args }: DemoArgs) {
  const button = (on: boolean | undefined, view: 'normal-contrast' | 'flat-secondary', content: string) =>
    on ? (
      <Button view={view} size="l" startIcon={<Icon data={ArrowRotateLeft} />} content={content} />
    ) : undefined

  return (
    <div style={{ width }}>
      <Placeholder
        picture={icon ? type : undefined}
        title={args.title}
        caption={captionOn ? args.caption : undefined}
        button1={button(args['button-1'], 'normal-contrast', 'Первое действие')}
        button2={button(args['button-2'], 'flat-secondary', 'Второе действие')}
        button3={button(args['button-3'], 'flat-secondary', 'Третье действие')}
      />
    </div>
  )
}

export const Playground: Story = {
  render: (args) => <Demo {...args} />,
}

/**
 * Ширину задаёт место: 360 на телефоне, 656 в карточке кабинета. Три кнопки
 * при 360 встают столбиком, при 656 — в ряд; проверка из передачи релиза 6.
 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  args: { 'button-2': true, 'button-3': true },
  render: (args) => (
    <Row>
      {[360, 656].map((width) => (
        <Cell key={width} label={`${width}`} width={width}>
          <Demo {...args} width={width} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Тип значка — пять мастеров набора `Product / picture`; без пояснения — `caption` выключен. */
export const Icons: Story = {
  parameters: { controls: { disable: true } },
  render: (args) => (
    <Row>
      {PICTURE_TYPES.map((type) => (
        <Cell key={type} label={type} width={360}>
          <Demo {...args} type={type} />
        </Cell>
      ))}
      <Cell label="caption выключен" width={360}>
        <Demo {...args} captionOn={false} />
      </Cell>
    </Row>
  ),
}
