import type { ReactNode } from 'react'

import type { StatTileTone } from './constants'
import './StatTile.css'

export type StatTileProps = {
  /** Figma Tone — brand красит число брендовым цветом. */
  tone?: StatTileTone
  /** Figma Text — само число. */
  content?: ReactNode
  /** Figma Caption — что за число. */
  caption?: ReactNode
}

/** Плитка показателя тренировки: крупное число и подпись под ним. */
export function StatTile({ tone = 'plain', content, caption }: StatTileProps) {
  return (
    <div className={`w-stat-tile w-stat-tile_tone_${tone}`}>
      <span className="w-stat-tile__value">{content}</span>
      {caption ? <span className="w-stat-tile__caption">{caption}</span> : null}
    </div>
  )
}
