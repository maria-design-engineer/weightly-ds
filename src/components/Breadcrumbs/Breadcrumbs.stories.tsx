import type { Meta, StoryObj } from '@storybook/react-vite'

import { Star } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { Cell } from '../story-layout'
import { Breadcrumbs } from './Breadcrumbs'
import type { BreadcrumbsItem } from './Breadcrumbs'

/* Звенья-заглушки, как в мастере: «Previous page» и «Current page» — по-русски. */
function path(depth: number): BreadcrumbsItem[] {
  return [
    ...Array.from({ length: depth }, (_, index) => ({ label: `Раздел ${index + 1}`, href: '#' })),
    { label: 'Текущая страница' },
  ]
}

type PlaygroundArgs = { depth: number; icons: boolean; width: number }

const meta = {
  title: 'Components/Breadcrumbs',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta

/** Глубина пути — в ките булевы `Nesting page 1…5`, здесь число звеньев над страницей. */
export const Playground: StoryObj<PlaygroundArgs> = {
  argTypes: {
    depth: { control: { type: 'range', min: 0, max: 5, step: 1 } },
    width: { control: { type: 'range', min: 160, max: 600, step: 10 } },
  },
  args: { depth: 2, icons: false, width: 540 },
  render: ({ depth, icons, width }) => {
    const items = path(depth)
    if (icons) items[items.length - 1].icons = <Icon data={Star} size={16} />
    return (
      <div style={{ width }}>
        <Breadcrumbs items={items} ariaLabel="Путь" />
      </div>
    )
  },
}

/**
 * Состояния: путь в одно звено, полный путь в пять и тот же путь в узкой строке —
 * середина свёрнута в `Expand=On`.
 */
export const States: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Cell label="текущая страница" width={540}>
        <Breadcrumbs items={path(0)} ariaLabel="Путь" />
      </Cell>
      <Cell label="путь в одно звено" width={540}>
        <Breadcrumbs items={path(1)} ariaLabel="Путь" />
      </Cell>
      <Cell label="путь в пять звеньев" width={600}>
        <Breadcrumbs items={path(5)} ariaLabel="Путь" />
      </Cell>
      <Cell label="Expand=On · середина свёрнута" width={360}>
        <div style={{ width: 360 }}>
          <Breadcrumbs items={path(5)} ariaLabel="Путь" />
        </div>
      </Cell>
    </div>
  ),
}

/** `.breadcrumbs-icons` — один, два и три значка у текущей страницы. */
export const Icons: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {[1, 2, 3].map((count) => {
        const items = path(1)
        items[1].icons = Array.from({ length: count }, (_, index) => (
          <Icon key={index} data={Star} size={16} />
        ))
        return (
          <Cell key={count} label={`Icons=${count}`} width={540}>
            <Breadcrumbs items={items} ariaLabel="Путь" />
          </Cell>
        )
      })}
    </div>
  ),
}
