import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import './index.css'

/** 21 текстовый стиль кита. Имя стиля — как в Figma, значение приходит переменной. */
const TEXT_STYLES = [
  'Header/Display 4',
  'Header/Display 3',
  'Header/Display 2',
  'Header/Display 1',
  'Header/Header 2',
  'Header/Header 1',
  'Header/Subheader 3',
  'Header/Subheader 2',
  'Header/Subheader 1',
  'Text/Body 3',
  'Text/Body 2',
  'Text/Body 1',
  'Text/Body 1 Short',
  'Text/Caption 2',
  'Text/Caption 1',
  'Misc/Code 3',
  'Misc/Code 2',
  'Misc/Code 1',
  'Misc/Code 3 Inline',
  'Misc/Code 2 Inline',
  'Misc/Code 1 Inline',
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
          <span style={{ font: 'var(--w-style-text-caption-2)', color: 'var(--w-text-secondary)' }}>
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

/** Все 21 текстовый стиль подряд, подписаны именами из кита. */
export const TextStyles: Story = {
  render: () => (
    <Sheet>
      {TEXT_STYLES.map((name) => (
        <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ font: 'var(--w-style-text-caption-2)', color: 'var(--w-text-secondary)' }}>
            {name}
          </span>
          <span style={{ font: styleVar(name) }}>Подход 3 из 5 — 102,5 кг</span>
        </div>
      ))}
    </Sheet>
  ),
}
