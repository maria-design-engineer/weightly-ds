import type { ReactNode } from 'react'

import './tokens.css'

/**
 * Обвязка витрины для ветки Base UI: своя тема, чужого CSS нет.
 * Продуктовой библиотекой не считается — папка живёт до вердикта этапа 6.
 */
export function ProbeFrame({ children }: { children: ReactNode }) {
  return <div className="probe-baseui">{children}</div>
}

/** Ряд карточек: каждое состояние стоит своей карточкой с подписью. */
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
      <span style={{ font: 'var(--w-text-caption-2)', color: 'var(--w-color-text-secondary)' }}>
        {label}
      </span>
      {children}
    </div>
  )
}
