import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import './index.css'

/** 15 текстовых стилей кита. Имя стиля — как в Figma, значение приходит переменной. Релиз 2: номер идёт от крупного к мелкому, семейство Misc/Code убрано. */
const TEXT_STYLES = [
  'Header/Display 1',
  'Header/Display 2',
  'Header/Display 3',
  'Header/Display 4',
  'Header/Header 1',
  'Header/Header 2',
  'Header/Subheader 1',
  'Header/Subheader 2',
  'Header/Subheader 3',
  'Text/Body 1',
  'Text/Body 2',
  'Text/Body 3',
  'Text/Body 3 Short',
  'Text/Caption 1',
  'Text/Caption 2',
]

function styleVar(name: string) {
  return `var(--w-style-${name.toLowerCase().replace(/\//g, '-').replace(/ /g, '-')})`
}

function Sheet({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        padding: 24,
        background: 'var(--w-branding-base-background)',
        color: 'var(--w-text-primary)',
      }}
    >
      {children}
    </div>
  )
}

const meta = {
  title: 'Foundations/Typography',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

/** Гарнитура кита: Golos Text, три начертания. Видно, что шрифт подключён. */
export const Font: Story = {
  render: () => (
    <Sheet>
      {[
        ['Weight/Body — 400', 'var(--w-weight-body)'],
        ['Weight/Accent — 500', 'var(--w-weight-accent)'],
        ['Weight/Header — 600', 'var(--w-weight-header)'],
      ].map(([label, weight]) => (
        <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ font: 'var(--w-style-text-caption-1)', color: 'var(--w-text-secondary)' }}>
            {label}
          </span>
          <span
            style={{
              fontFamily: 'var(--w-font-stack-sans)',
              fontWeight: weight,
              fontSize: 32,
              lineHeight: '40px',
            }}
          >
            Приседания со штангой 102,5 кг
          </span>
        </div>
      ))}
    </Sheet>
  ),
}

/** Все 15 текстовых стилей подряд, подписаны именами из кита. */
export const TextStyles: Story = {
  render: () => (
    <Sheet>
      {TEXT_STYLES.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ font: 'var(--w-style-text-caption-1)', color: 'var(--w-text-secondary)' }}>
            {name}
          </span>
          <span style={{ font: styleVar(name) }}>Подход 3 из 5 — 102,5 кг</span>
        </div>
      ))}
    </Sheet>
  ),
}
