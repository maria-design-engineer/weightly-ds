import type { ReactNode } from 'react'

import { FaceSad, FaceSmile } from '@gravity-ui/icons'

import { Icon } from '../Icon/Icon'
import { MoodTrack } from '../MoodTrack/MoodTrack'
import type { MoodScaleState } from './constants'
import './MoodScale.css'

/** Слот ручки на дорожке: три слота, по слоту на оценку. */
const TRACK_POSITION = { low: 0, mid: 1, high: 2 }

export type MoodScaleProps = {
  /** Figma State — низкая, средняя или высокая оценка. */
  state?: MoodScaleState
  /** Figma Title — вопрос. */
  title?: ReactNode
  /** Figma Caption — подпись под вопросом. */
  caption?: ReactNode
  /** Поставить низкую оценку. */
  onLow?: () => void
  /** Поставить высокую оценку. */
  onHigh?: () => void
}

/**
 * Оценка после тренировки: вопрос, подпись и шкала с боковыми кнопками.
 * Боковая кнопка подсвечивается только на своём краю: в среднем положении обе серые.
 */
export function MoodScale({
  state = 'mid',
  title,
  caption,
  onLow,
  onHigh,
}: MoodScaleProps) {
  return (
    <div className="w-mood-scale">
      <div className="w-mood-scale__head">
        <span className="w-mood-scale__title">{title}</span>
        <span className="w-mood-scale__caption">{caption}</span>
      </div>
      <div className="w-mood-scale__row">
        <button
          type="button"
          className={`w-mood-scale__side${state === 'low' ? ' w-mood-scale__side_low' : ''}`}
          onClick={onLow}
          aria-label="Оценка ниже"
          aria-pressed={state === 'low'}
        >
          <Icon data={FaceSad} />
        </button>
        <MoodTrack value={TRACK_POSITION[state]} />
        <button
          type="button"
          className={`w-mood-scale__side${state === 'high' ? ' w-mood-scale__side_high' : ''}`}
          onClick={onHigh}
          aria-label="Оценка выше"
          aria-pressed={state === 'high'}
        >
          <Icon data={FaceSmile} />
        </button>
      </div>
    </div>
  )
}
