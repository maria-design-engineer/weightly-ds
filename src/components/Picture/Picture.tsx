import type { ComponentType, SVGProps } from 'react'

import { ClockArrowRotateLeft, CloudSlash, FaceNeutralDashed, Smartphone, Wrench } from '@gravity-ui/icons'

import type { PictureType } from './constants'
import './Picture.css'

/** Иконка из иконотеки — компонент `@gravity-ui/icons`. */
export type PictureIcon = ComponentType<SVGProps<SVGSVGElement>>

/**
 * Значки мастера `Product / picture`, `50053:7574`. С 17.11.2026 — экземпляры иконок
 * из иконотеки «🏋️‍♀️ Icons», а не рисунки внутри компонента: вид прежний, картинка
 * приходит из набора. Профиль `ui-kit/product-components/picture.md`, релиз кита 7.
 */
const ICONS: Record<PictureType, PictureIcon> = {
  'empty-badge': FaceNeutralDashed,
  disconect: CloudSlash,
  fix: Wrench,
  time: ClockArrowRotateLeft,
  phone: Smartphone,
}

const TITLES: Record<PictureType, string> = {
  'empty-badge': 'Пусто',
  disconect: 'Нет связи',
  fix: 'Чиним',
  time: 'Время',
  phone: 'Телефон',
}

export type PictureProps = {
  /** Figma Type — пустое состояние, нет связи, чиним, время или телефон. */
  type?: PictureType
  /**
   * Подмена иконки внутри `Type=Phone` — профиль: «`Phone` — образец, иконка внутри
   * подменяется на любую из иконотеки». Четыре первых типа — закрытый список, у них
   * подмены нет, и проп они не читают.
   */
  icon?: PictureIcon
}

/**
 * Круглый значок на брендовой подложке: стоит в пустых состояниях, на экранах
 * сбоя и там, где показывают время.
 */
export function Picture({ type = 'empty-badge', icon }: PictureProps) {
  const Glyph = type === 'phone' && icon ? icon : ICONS[type]
  return (
    <span className={`w-picture w-picture_type_${type}`} role="img" aria-label={TITLES[type]}>
      <Glyph className="w-picture__icon" aria-hidden="true" />
    </span>
  )
}
