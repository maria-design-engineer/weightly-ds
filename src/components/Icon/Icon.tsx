import type { JSX, SVGProps } from 'react'

type IconComponent = (props: SVGProps<SVGSVGElement>) => JSX.Element

/**
 * Иконка из @gravity-ui/icons — иконотека в Figma это наша копия гравитивской,
 * и все иконки макетов идут оттуда. Пакет MIT, от выбора библиотеки не зависит.
 */
export function Icon({ data: Component, size = 16 }: { data: IconComponent; size?: number }) {
  return <Component width={size} height={size} aria-hidden focusable="false" />
}
