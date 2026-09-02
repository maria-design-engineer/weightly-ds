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

export { Icon } from './components/Icon/Icon'
