import { createContext, useContext } from 'react'

/**
 * Подпись поля живёт в `Custom / field`, а контрол — внутри него, и связать их
 * можно только сверху вниз: поле кладёт сюда номер своей подписи, контрол его
 * забирает и ставит себе `aria-labelledby`. Находка 5 ревью этапа 14.
 */
export const FieldLabelContext = createContext<string | undefined>(undefined)

/** Номер подписи поля, если контрол стоит внутри `Field`. */
export function useFieldLabelId() {
  return useContext(FieldLabelContext)
}
