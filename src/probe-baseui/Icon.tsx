import type { SVGProps } from 'react'

type IconComponent = (props: SVGProps<SVGSVGElement>) => React.JSX.Element

/** Иконка из @gravity-ui/icons. Пакет ставится в любой ветке — решение плана. */
export function Icon({ data: Component, size = 16 }: { data: IconComponent; size?: number }) {
  return <Component width={size} height={size} aria-hidden focusable="false" />
}
