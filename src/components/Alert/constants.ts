/** Ось Theme кита — 6 значений. Профиль: ui-kit/figma-components/alert.md */
export const ALERT_THEMES = ['normal', 'info', 'success', 'warning', 'danger', 'utility'] as const

/** Ось View кита — 2 значения. */
export const ALERT_VIEWS = ['filled', 'outlined'] as const

/** Ось Corners кита — 2 значения. */
export const ALERT_CORNERS = ['rounded', 'squared'] as const

/** Ось Layout у внутреннего .Content — 2 значения, в коде это проп. */
export const ALERT_LAYOUTS = ['buttons-on-the-right', 'buttons-at-the-bottom'] as const

export type AlertTheme = (typeof ALERT_THEMES)[number]
export type AlertView = (typeof ALERT_VIEWS)[number]
export type AlertCorners = (typeof ALERT_CORNERS)[number]
export type AlertLayout = (typeof ALERT_LAYOUTS)[number]
