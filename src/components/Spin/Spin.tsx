import type { SpinSize } from './constants'
import './Spin.css'

export type SpinProps = {
  /** Figma Size — xs, s, m, l или xl. */
  size?: SpinSize
  /** Подпись для чтения с экрана: что именно грузится. */
  label?: string
}

/**
 * Второй индикатор ожидания системы: кольцо с разрывом, которое крутится.
 * Чем он отличается по смыслу от `Loader`, кит не задаёт — это решение по продукту.
 */
export function Spin({ size = 'm', label = 'Загружается' }: SpinProps) {
  return <span className={`w-spin w-spin_size_${size}`} role="status" aria-label={label} />
}
