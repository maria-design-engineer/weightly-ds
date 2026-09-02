import type { ReactNode } from 'react'

import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

import type { AvatarBorderColor, AvatarSize, AvatarTheme, AvatarView } from './constants'
import './Avatar.css'

export type AvatarProps = {
  /** Figma Size — 7 значений: сторона круга от 16 до 50. */
  size?: AvatarSize
  /** Figma View */
  view?: AvatarView
  /** Figma Theme */
  theme?: AvatarTheme
  /** Figma Type=Image — адрес картинки. Тип задаётся тем, что передали. */
  imageUrl?: string
  /** Figma Type=Icon — иконка. */
  icon?: ReactNode
  /** Figma ↳ Content text — инициалы для Type=Text. */
  text?: string
  /** Figma Custom border — кольцо поверх любого варианта, 7 цветов. */
  borderColor?: AvatarBorderColor
  /** Описание картинки для чтения с экрана. */
  alt?: string
}

/**
 * Значок человека: картинка, иконка или инициалы. Тип пропом не задаётся —
 * его определяет то, что передали, так же как в ките решает ось Type.
 */
export function Avatar({
  size = 'm',
  view = 'filled',
  theme = 'brand',
  imageUrl,
  icon,
  text,
  borderColor,
  alt,
}: AvatarProps) {
  const type = imageUrl ? 'image' : icon ? 'icon' : 'text'

  const className = [
    'w-avatar',
    `w-avatar_size_${size}`,
    `w-avatar_view_${view}`,
    `w-avatar_theme_${theme}`,
    `w-avatar_type_${type}`,
    borderColor ? `w-avatar_border_${borderColor}` : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <BaseAvatar.Root className={className}>
      {imageUrl ? (
        <BaseAvatar.Image className="w-avatar__image" src={imageUrl} alt={alt} />
      ) : null}
      <BaseAvatar.Fallback>{icon ?? text}</BaseAvatar.Fallback>
    </BaseAvatar.Root>
  )
}
