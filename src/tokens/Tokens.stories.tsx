import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import {
  COLOR_TOKENS,
  FAMILY_TOKENS,
  MODES,
  RADIUS_TOKENS,
  SIZE_TOKENS,
  SPACING_TOKENS,
  WEIGHT_TOKENS,
  type ValueToken,
} from './tokens.data'
import './index.css'

/** Атрибут режима на обёртке: плашка красится тем же CSS, что и продукт. */
const MODE_ATTRS = ['light', 'dark', 'light-hc', 'dark-hc']

/** Тени кита. Значения живут в styles.css, здесь только имена — образец рисует CSS. */
const SHADOWS = [
  'card-shadow/card-light (new)',
  'card-shadow/card (new)',
  'card-shadow/card-hover (new)',
  'shadows/float-area-default',
  'shadows/float-area-hover',
  'shadows/modal',
  'shadows/toast',
  'shadows/raised button',
  'shadows/raised button + stroke',
  'shadows/YC Select shadow',
  'shadows/blue',
]

function shadowVar(kitName: string) {
  return `var(--w-${kitName
    .toLowerCase()
    .replace(/\//g, '-')
    .replace(/[()+]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')})`
}

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        padding: 24,
        width: 1280,
        boxSizing: 'border-box',
        background: 'var(--w-branding-base-background)',
        color: 'var(--w-text-primary)',
      }}
    >
      <h2 style={{ font: 'var(--w-style-header-header-1)', margin: 0 }}>{title}</h2>
      {children}
    </div>
  )
}

function Name({ kit, name }: { kit: string; name: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 340, flex: 'none' }}>
      <span style={{ font: 'var(--w-style-text-body-1)' }}>{kit}</span>
      <span style={{ font: 'var(--w-style-misc-code-1)', color: 'var(--w-text-secondary)' }}>
        {name}
      </span>
    </div>
  )
}

function ValueRows({ tokens, sample }: { tokens: ValueToken[]; sample?: (t: ValueToken) => ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {tokens.map((token) => (
        <div
          key={token.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '6px 0',
            borderBottom: '1px solid var(--w-line-generic)',
          }}
        >
          <Name kit={token.kit} name={token.name} />
          <span style={{ font: 'var(--w-style-misc-code-1)', width: 160, flex: 'none' }}>
            {token.value}
          </span>
          {sample ? sample(token) : null}
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Foundations/Tokens',
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

/**
 * 158 цветов кита. В строке — имя из Figma, имя переменной и по плашке на каждый режим.
 * Плашка красится переменной через data-theme, а не вписанным цветом: видно то же, что увидит продукт.
 */
export const Colors: Story = {
  render: () => (
    <Page title="Цвета — 158 токенов, четыре режима">
      <div style={{ display: 'flex', gap: 16, paddingLeft: 340 }}>
        {MODES.map((mode) => (
          <span
            key={mode}
            style={{ width: 168, font: 'var(--w-style-header-subheader-1)', flex: 'none' }}
          >
            {mode}
          </span>
        ))}
      </div>
      {COLOR_TOKENS.map((token) => (
        <div
          key={token.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            paddingBottom: 8,
            borderBottom: '1px solid var(--w-line-generic)',
          }}
        >
          <Name kit={token.kit} name={token.name} />
          {MODE_ATTRS.map((attr, index) => (
            <div
              key={attr}
              data-theme={attr}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: 168,
                flex: 'none',
                padding: 4,
                borderRadius: 'var(--w-xs-radius)',
                background: 'var(--w-branding-base-background)',
                color: 'var(--w-text-primary)',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  flex: 'none',
                  borderRadius: 'var(--w-xs-radius)',
                  border: '1px solid var(--w-line-generic)',
                  background: `var(${token.name})`,
                }}
              />
              <span style={{ font: 'var(--w-style-misc-code-1)' }}>{token.values[index]}</span>
            </div>
          ))}
        </div>
      ))}
    </Page>
  ),
}

/** 12 отступов. Полоска показывает величину в масштабе один к одному. */
export const Spacings: Story = {
  render: () => (
    <Page title="Отступы — 12 токенов, один режим">
      <ValueRows
        tokens={SPACING_TOKENS}
        sample={(token) => (
          <span
            style={{
              height: 16,
              width: `var(${token.name})`,
              background: 'var(--w-branding-base-brand)',
            }}
          />
        )}
      />
    </Page>
  ),
}

/** 6 радиусов. Квадрат скруглён своим значением. */
export const Radii: Story = {
  render: () => (
    <Page title="Радиусы — 6 токенов, один режим">
      <ValueRows
        tokens={RADIUS_TOKENS}
        sample={(token) => (
          <span
            style={{
              width: 48,
              height: 32,
              background: 'var(--w-base-generic)',
              border: '1px solid var(--w-line-generic)',
              borderRadius: `var(${token.name})`,
            }}
          />
        )}
      />
    </Page>
  ),
}

/** 57 типографических токенов: гарнитуры, начертания, размеры со строкой. */
export const Typography: Story = {
  render: () => (
    <Page title="Типографика — 57 токенов, один режим">
      <h3 style={{ font: 'var(--w-style-header-subheader-3)', margin: 0 }}>Гарнитуры — 8</h3>
      <ValueRows tokens={FAMILY_TOKENS} />
      <h3 style={{ font: 'var(--w-style-header-subheader-3)', margin: 0 }}>Начертания — 7</h3>
      <ValueRows tokens={WEIGHT_TOKENS} />
      <h3 style={{ font: 'var(--w-style-header-subheader-3)', margin: 0 }}>
        Размер и строка — 21 пара, 42 токена
      </h3>
      <ValueRows tokens={SIZE_TOKENS} />
    </Page>
  ),
}

/** 11 теней кита. Цвет тени в ките вписан значением, на переменные не привязан. */
export const Shadows: Story = {
  render: () => (
    <Page title="Тени — 11 стилей">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
        {SHADOWS.map((kit) => (
          <div key={kit} style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 280 }}>
            <span style={{ font: 'var(--w-style-text-body-1)' }}>{kit}</span>
            <span
              style={{
                height: 64,
                borderRadius: 'var(--w-l-radius)',
                background: 'var(--w-base-float-float-bg)',
                boxShadow: shadowVar(kit),
              }}
            />
          </div>
        ))}
      </div>
    </Page>
  ),
}
