// Слой значений: токены и стили кита. Едет в пакет отдельным файлом dist/ds.css.
import './tokens/index.css'

export { Button } from './components/Button/Button'
export type { ButtonProps } from './components/Button/Button'
export { BUTTON_SIZES, BUTTON_VIEWS } from './components/Button/constants'
export type { ButtonSize, ButtonView } from './components/Button/constants'

export { TextInput } from './components/TextInput/TextInput'
export type { TextInputProps } from './components/TextInput/TextInput'
export { TEXT_INPUT_SIZES, TEXT_INPUT_VIEWS } from './components/TextInput/constants'
export type { TextInputSize, TextInputView } from './components/TextInput/constants'

export { Avatar } from './components/Avatar/Avatar'
export type { AvatarProps } from './components/Avatar/Avatar'
export {
  AVATAR_BORDER_COLORS,
  AVATAR_SIZES,
  AVATAR_THEMES,
  AVATAR_VIEWS,
} from './components/Avatar/constants'
export type {
  AvatarBorderColor,
  AvatarSize,
  AvatarTheme,
  AvatarView,
} from './components/Avatar/constants'

export { Select } from './components/Select/Select'
export type { SelectProps } from './components/Select/Select'
export { SELECT_SIZES, SELECT_VIEWS } from './components/Select/constants'
export type { SelectItem, SelectSize, SelectView } from './components/Select/constants'

export { Label } from './components/Label/Label'
export type { LabelProps } from './components/Label/Label'
export { LABEL_SIZES, LABEL_THEMES } from './components/Label/constants'
export type { LabelSize, LabelTheme } from './components/Label/constants'

export { TextArea } from './components/TextArea/TextArea'
export type { TextAreaProps } from './components/TextArea/TextArea'
export { TEXT_AREA_SIZES, TEXT_AREA_VIEWS } from './components/TextArea/constants'
export type { TextAreaSize, TextAreaView } from './components/TextArea/constants'

export { Alert } from './components/Alert/Alert'
export type { AlertProps } from './components/Alert/Alert'
export {
  ALERT_CORNERS,
  ALERT_LAYOUTS,
  ALERT_THEMES,
  ALERT_VIEWS,
} from './components/Alert/constants'
export type {
  AlertCorners,
  AlertLayout,
  AlertTheme,
  AlertView,
} from './components/Alert/constants'

export { Icon } from './components/Icon/Icon'
