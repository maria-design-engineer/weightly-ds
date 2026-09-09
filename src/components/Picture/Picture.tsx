import { CircleDashed, Clock } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import type { PictureType } from './constants'
import './Picture.css'

const ICONS = { 'empty-badge': CircleDashed, time: Clock }

const TITLES = { 'empty-badge': 'Пусто', time: 'Время' }

export type PictureProps = {
  /** Figma Type — пустое состояние или время. */
  type?: PictureType
}

/**
 * Круглый значок на брендовой подложке: стоит в пустых состояниях и там,
 * где показывают время. В ките значок нарисован векторами обводкой 2 на
 * `Branding/Base Brand`; здесь он берётся из иконотеки — пунктирный круг и часы.
 */
export function Picture({ type = 'empty-badge' }: PictureProps) {
  return (
    <span className="w-picture" role="img" aria-label={TITLES[type]}>
      <Icon data={ICONS[type]} size={29} />
    </span>
  )
}
