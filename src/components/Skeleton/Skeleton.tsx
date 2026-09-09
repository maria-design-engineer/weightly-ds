import './Skeleton.css'

export type SkeletonProps = {
  /** Ширина заглушки: число — в пикселях, строка — как есть. По умолчанию во всю ширину родителя. */
  width?: number | string
  /** Высота заглушки. По умолчанию 16 — высота строки текста в ките. */
  height?: number | string
  /** Круглая заглушка под аватар: Type=User в ките. */
  round?: boolean
}

/**
 * Серая заглушка на месте ещё не загруженного содержимого.
 * Ось `Type` кита пропом не является: четыре сборки — `User`, `Block`,
 * `Multilines`, `User + block` — собираются размером и раскладкой,
 * так сказано в профиле компонента. Каждая из них — истории витрины.
 */
export function Skeleton({ width, height = 16, round = false }: SkeletonProps) {
  return (
    <span
      className={`w-skeleton${round ? ' w-skeleton_round' : ''}`}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}
