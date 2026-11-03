import type { ReactNode } from 'react'
import { useEffect } from 'react'

/**
 * Режим витрины: ставит `data-theme` на корень страницы — так режимы включает и
 * продукт, `src/tokens/tokens.css`. Фон и цвет текста страницы — из того же режима.
 */
export function ModeRoot({ mode, children }: { mode: string; children: ReactNode }) {
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', mode)
    /* Фон и цвет текста страницы — из того же режима, иначе тёмный компонент стоит на белом. */
    document.body.style.background = 'var(--w-branding-base-background)'
    document.body.style.color = 'var(--w-text-primary)'
    return () => root.removeAttribute('data-theme')
  }, [mode])
  return children
}

