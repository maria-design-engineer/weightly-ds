import type { LoaderSize } from './constants'
import './Loader.css'

export type LoaderProps = {
  /** Figma Size — s, m или l. */
  size?: LoaderSize
  /** Подпись для чтения с экрана: что именно грузится. */
  label?: string
}

/**
 * Загрузчик: три полоски, средняя выше крайних, по ним бежит подсветка.
 * В ките анимация лежит раскадровкой `.Loader base *` — три шага, на каждом
 * полоски стоят на 1, 0.5 и 0.15 прозрачности со сдвигом. Здесь это стилями.
 */
export function Loader({ size = 'm', label = 'Загружается' }: LoaderProps) {
  return (
    <span className={`w-loader w-loader_size_${size}`} role="status" aria-label={label}>
      <span className="w-loader__bar" />
      <span className="w-loader__bar" />
      <span className="w-loader__bar" />
    </span>
  )
}
