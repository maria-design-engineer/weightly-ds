import type { ReactNode } from 'react'
import { useId } from 'react'

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

/** Поле формы: подпись сверху, контрол под ней. */
export function Field({ label, children }: FieldProps) {
  const labelId = useId()

  return (
    <div className="w-field" role="group" aria-labelledby={label ? labelId : undefined}>
      {label ? (
        <span className="w-field__label" id={labelId}>
          {label}
        </span>
      ) : null}
      {children}
    </div>
  )
}
