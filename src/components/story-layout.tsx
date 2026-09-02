import type { ReactNode } from 'react'

/** Ряд карточек витрины. Состояние показывается карточкой, а не ловится курсором. */
export function Row({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
      {children}
    </div>
  )
}

/** Карточка витрины: подпись именем из UI-kit и компонент под ней. */
export function Cell({
  label,
  width = 132,
  children,
}: {
  label: string
  width?: number
  children: ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width }}>
      <span style={{ font: 'var(--w-style-text-caption-2)', color: 'var(--w-text-secondary)' }}>
        {label}
      </span>
      {children}
    </div>
  )
}
