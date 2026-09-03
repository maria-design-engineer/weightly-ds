import type { ReactNode } from 'react'
import { useId } from 'react'

import { FieldLabelContext } from './context'
import './Field.css'

export type FieldProps = {
  /** Figma Text — подпись поля. Стоит над полем, не внутри. */
  label?: ReactNode
  /**
   * Figma Control — подмена: TextInput, TextArea или Select.
   * Контрол приходит содержимым, поэтому поле не знает, что внутри.
   */
  children: ReactNode
}

/**
 * Поле формы: подпись сверху, контрол под ней. Подпись называет сам контрол,
 * а не группу: её номер уезжает вниз через контекст, контрол ставит себе
 * `aria-labelledby`. До правки подпись висела на `role="group"`, и у поля
 * своего имени не было — находка 5 ревью этапа 14.
 */
export function Field({ label, children }: FieldProps) {
  const labelId = useId()

  return (
    <div className="w-field">
      {label ? (
        <span className="w-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      <FieldLabelContext.Provider value={label ? labelId : undefined}>
        {children}
      </FieldLabelContext.Provider>
    </div>
  )
}
