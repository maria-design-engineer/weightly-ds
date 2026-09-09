import type { ReactNode } from 'react'

/*
 * Моноширинный шрифт витрины. Своего токена у него нет: семейство `Misc/Code`
 * убрано из кита релизом 2, а имена токенов и значения цветов в столбик
 * читаются только моноширинным. Системный — в продукт он не едет.
 */
export const MONO_FONT = '400 12px/18px ui-monospace, SFMono-Regular, Menlo, monospace'

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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8, width }}>
      <span style={{ font: 'var(--w-style-text-caption-1)', color: 'var(--w-text-secondary)' }}>
        {label}
      </span>
      {children}
    </div>
  )
}
