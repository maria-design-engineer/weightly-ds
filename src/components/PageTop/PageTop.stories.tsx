import type { Meta, StoryObj } from '@storybook/react-vite'

import { Breadcrumbs } from '../Breadcrumbs/Breadcrumbs'
import { Cell } from '../story-layout'
import { PageTop } from './PageTop'

const CRUMBS = <Breadcrumbs items={[{ label: 'Раздел', href: '#' }, { label: 'Страница' }]} ariaLabel="Путь" />

type PlaygroundArgs = { breadcrumbs: boolean }

const meta = {
  title: 'Product components/PageTop',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta

/** Панель повторяет свойство кита `breadcrumbs`. Рамка показывает высоту строки — 42. */
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { breadcrumbs: true },
  render: ({ breadcrumbs }) => (
    <div style={{ width: 1148, outline: '1px dashed var(--w-line-generic)' }}>
      <PageTop breadcrumbs={breadcrumbs ? CRUMBS : undefined} />
    </div>
  ),
}

/** С путём и пустая: высота одна. */
export const States: StoryObj = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Cell label="breadcrumbs" width={1148}>
        <div style={{ width: 1148, outline: '1px dashed var(--w-line-generic)' }}>
          <PageTop breadcrumbs={CRUMBS} />
        </div>
      </Cell>
      <Cell label="без пути" width={1148}>
        <div style={{ width: 1148, outline: '1px dashed var(--w-line-generic)' }}>
          <PageTop />
        </div>
      </Cell>
    </div>
  ),
}
