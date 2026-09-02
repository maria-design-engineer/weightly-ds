import type { ReactNode } from 'react'

import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'

import './theme.css'

/**
 * Обвязка витрины для ветки Gravity: тема чужой библиотеки плюс наши значения.
 * Продуктовой библиотекой не считается — папка живёт до вердикта этапа 6.
 */
export function ProbeFrame({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme="light">
      <div className="probe-gravity">{children}</div>
    </ThemeProvider>
  )
}

/** Ряд карточек: каждое состояние стоит своей карточкой с подписью, а не ловится курсором. */
export function Row({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
      {children}
    </div>
  )
}

/** Карточка состояния: подпись именем из UI-kit и сам компонент под ней. */
export function Cell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 120 }}>
      <span
        style={{
          font: 'var(--g-text-caption-2-font)',
          color: 'var(--g-color-text-secondary)',
        }}
      >
        {label}
      </span>
      {children}
    </div>
  )
}
