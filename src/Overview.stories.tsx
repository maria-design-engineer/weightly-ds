import type { ReactNode } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChevronRight, CircleInfo, Person, Play, Plus } from '@gravity-ui/icons'

import { Alert } from './components/Alert/Alert'
import { ALERT_CORNERS, ALERT_THEMES, ALERT_VIEWS } from './components/Alert/constants'
import { Avatar } from './components/Avatar/Avatar'
import {
  AVATAR_BORDER_COLORS,
  AVATAR_SIZES,
  AVATAR_THEMES,
  AVATAR_VIEWS,
} from './components/Avatar/constants'
import { BlockCard } from './components/BlockCard/BlockCard'
import { BLOCK_CARD_SHADOWS } from './components/BlockCard/constants'
import { BlockTab } from './components/BlockTab/BlockTab'
import { BLOCK_TAB_STATES } from './components/BlockTab/constants'
import { BlockTabs } from './components/BlockTabs/BlockTabs'
import { BottomBar } from './components/BottomBar/BottomBar'
import { BOTTOM_BAR_SECTIONS } from './components/BottomBar/constants'
import { BottomBarItem } from './components/BottomBarItem/BottomBarItem'
import { BOTTOM_BAR_ITEM_STATES } from './components/BottomBarItem/constants'
import { Button } from './components/Button/Button'
import { BUTTON_SIZES, BUTTON_VIEWS } from './components/Button/constants'
import { CoachComment } from './components/CoachComment/CoachComment'
import { COACH_COMMENT_BANDS, COACH_COMMENT_STATES } from './components/CoachComment/constants'
import { CorrespondenceRow } from './components/CorrespondenceRow/CorrespondenceRow'
import { Divider } from './components/Divider/Divider'
import { ExerciseCard } from './components/ExerciseCard/ExerciseCard'
import { EXERCISE_CARD_TYPES } from './components/ExerciseCard/constants'
import { ExerciseRow } from './components/ExerciseRow/ExerciseRow'
import { Field } from './components/Field/Field'
import { HistoryRow } from './components/HistoryRow/HistoryRow'
import { Icon } from './components/Icon/Icon'
import { IntensityChip } from './components/IntensityChip/IntensityChip'
import {
  INTENSITY_CHIP_BANDS,
  INTENSITY_CHIP_SIZES,
  INTENSITY_CHIP_STATES,
} from './components/IntensityChip/constants'
import { Label } from './components/Label/Label'
import { LABEL_SIZES, LABEL_THEMES } from './components/Label/constants'
import { LiftMark } from './components/LiftMark/LiftMark'
import { LIFT_MARK_STATES } from './components/LiftMark/constants'
import { LiftsCell } from './components/LiftsCell/LiftsCell'
import { ScreenHeader } from './components/ScreenHeader/ScreenHeader'
import { Select } from './components/Select/Select'
import { SELECT_SIZES, SELECT_VIEWS } from './components/Select/constants'
import { SetMarker } from './components/SetMarker/SetMarker'
import { SET_MARKER_STATES } from './components/SetMarker/constants'
import { SettingsRow } from './components/SettingsRow/SettingsRow'
import { SETTINGS_ROW_CARDS } from './components/SettingsRow/constants'
import { StatTile } from './components/StatTile/StatTile'
import { STAT_TILE_TONES } from './components/StatTile/constants'
import { StatusBar } from './components/StatusBar/StatusBar'
import { StepCell } from './components/StepCell/StepCell'
import { STATUS_BAR_TONES } from './components/StatusBar/constants'
import { StickyBar } from './components/StickyBar/StickyBar'
import { StickyBarWorkout } from './components/StickyBarWorkout/StickyBarWorkout'
import { TableCell } from './components/TableCell/TableCell'
import { TABLE_CELL_TONES } from './components/TableCell/constants'
import { TextArea } from './components/TextArea/TextArea'
import { TEXT_AREA_SIZES, TEXT_AREA_VIEWS } from './components/TextArea/constants'
import { TextInput } from './components/TextInput/TextInput'
import { TEXT_INPUT_SIZES, TEXT_INPUT_VIEWS } from './components/TextInput/constants'
import { WeightWheel } from './components/WeightWheel/WeightWheel'
import { WorkoutCard } from './components/WorkoutCard/WorkoutCard'
import { WEIGHT_WHEEL_DIRECTIONS } from './components/WeightWheel/constants'
import { WeightWheelItem } from './components/WeightWheelItem/WeightWheelItem'
import { WEIGHT_WHEEL_ITEM_STATES } from './components/WeightWheelItem/constants'
import './tokens/index.css'

/*
 * Обзорная страница библиотеки. Существует ради приёмки: сотню карточек в
 * отдельных историях никто не прокликает. Ширина 1280, сетки продукта нет,
 * секция на компонент, порядок снизу вверх — базовый слой, атомы, молекулы,
 * организмы. Фон и цвета из токенов, у каждого Mode своя история.
 * Примеры выдуманные: ни одного настоящего имени, адреса или суммы.
 */

const SELECT_ITEMS = [
  { value: 'snatch', label: 'Рывок' },
  { value: 'clean', label: 'Толчок' },
]

/** Шкала веса: от 40 до 200 килограммов с шагом полкило — как в истории барабана. */
const WHEEL_VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

function Page({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        width: 1280,
        padding: 24,
        background: 'var(--w-branding-base-background)',
        color: 'var(--w-text-primary)',
      }}
    >
      <h2 style={{ margin: 0, font: 'var(--w-style-header-header-1)' }}>{title}</h2>
      {children}
    </div>
  )
}

/** Слой библиотеки: базовый, атомы, молекулы, организмы. */
function Layer({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <h3
        style={{
          margin: 0,
          paddingBottom: 8,
          borderBottom: '1px solid var(--w-line-generic)',
          font: 'var(--w-style-header-subheader-3)',
        }}
      >
        {title}
      </h3>
      {children}
    </section>
  )
}

/** Секция компонента: подписана именем из UI-kit и именем в коде. */
function Component({ kit, code, children }: { kit: string; code: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ font: 'var(--w-style-header-subheader-2)' }}>{kit}</span>
        <span style={{ font: 'var(--w-style-misc-code-1)', color: 'var(--w-text-secondary)' }}>
          {code}
        </span>
      </div>
      {children}
    </div>
  )
}

/** Ряд одной оси: подпись оси слева, значения справа. */
function Axis({ name, children }: { name: string; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
      <span
        style={{
          flex: 'none',
          width: 160,
          paddingTop: 4,
          font: 'var(--w-style-text-caption-2)',
          color: 'var(--w-text-secondary)',
        }}
      >
        {name}
      </span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-start' }}>
        {children}
      </div>
    </div>
  )
}

/** Образец с подписью значения. */
function Item({ label, width, children }: { label: string; width?: number; children: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 6,
        width,
      }}
    >
      <span style={{ font: 'var(--w-style-misc-code-1)', color: 'var(--w-text-hint)' }}>{label}</span>
      {children}
    </div>
  )
}

function Base() {
  return (
    <Layer title="Базовый слой — 7 компонентов и иконотека">
      <Component kit="Button" code="Button">
        <Axis name="View · 21">
          {BUTTON_VIEWS.map((view) => (
            <Item key={view} label={view}>
              <Button view={view} content="Кнопка" />
            </Item>
          ))}
        </Axis>
        <Axis name="Size · 5">
          {BUTTON_SIZES.map((size) => (
            <Item key={size} label={size}>
              <Button size={size} content="Кнопка" />
            </Item>
          ))}
        </Axis>
        <Axis name="State">
          <Item label="default">
            <Button content="Кнопка" />
          </Item>
          <Item label="disabled">
            <Button content="Кнопка" disabled />
          </Item>
          <Item label="loading">
            <Button content="Кнопка" loading />
          </Item>
          <Item label="selected">
            <Button content="Кнопка" selected />
          </Item>
          <Item label="icon only">
            <Button startIcon={<Icon data={Plus} size={16} />} ariaLabel="Добавить" />
          </Item>
        </Axis>
      </Component>

      <Component kit="TextInput" code="TextInput">
        <Axis name="View · 2">
          {TEXT_INPUT_VIEWS.map((view) => (
            <Item key={view} label={view} width={200}>
              <TextInput view={view} placeholder="Вес штанги" ariaLabel="Вес штанги" />
            </Item>
          ))}
        </Axis>
        <Axis name="Size · 4">
          {TEXT_INPUT_SIZES.map((size) => (
            <Item key={size} label={size} width={200}>
              <TextInput size={size} placeholder="Вес штанги" ariaLabel="Вес штанги" />
            </Item>
          ))}
        </Axis>
        <Axis name="State">
          <Item label="disabled" width={200}>
            <TextInput placeholder="Вес штанги" ariaLabel="Вес штанги" disabled />
          </Item>
          <Item label="error inline" width={200}>
            <TextInput
              ariaLabel="Вес штанги"
              defaultValue="Тонна"
              errorMessage="Введите число"
              errorPlacement="inline"
            />
          </Item>
          <Item label="error outline" width={200}>
            <TextInput
              ariaLabel="Вес штанги"
              defaultValue="Тонна"
              errorMessage="Введите число"
              errorPlacement="outline"
            />
          </Item>
        </Axis>
      </Component>

      <Component kit="TextArea" code="TextArea">
        <Axis name="View · 2">
          {TEXT_AREA_VIEWS.map((view) => (
            <Item key={view} label={view} width={220}>
              <TextArea view={view} placeholder="Заметка к тренировке" ariaLabel="Заметка" />
            </Item>
          ))}
        </Axis>
        <Axis name="Size · 4">
          {TEXT_AREA_SIZES.map((size) => (
            <Item key={size} label={size} width={220}>
              <TextArea size={size} placeholder="Заметка к тренировке" ariaLabel="Заметка" />
            </Item>
          ))}
        </Axis>
        <Axis name="State">
          <Item label="disabled" width={220}>
            <TextArea placeholder="Заметка" ariaLabel="Заметка" disabled />
          </Item>
          <Item label="error" width={220}>
            <TextArea ariaLabel="Заметка" errorMessage="Слишком длинно" errorPlacement="outline" />
          </Item>
        </Axis>
      </Component>

      <Component kit="Select" code="Select">
        <Axis name="View · 2">
          {SELECT_VIEWS.map((view) => (
            <Item key={view} label={view} width={200}>
              <Select view={view} items={SELECT_ITEMS} placeholder="Упражнение" ariaLabel="Упражнение" />
            </Item>
          ))}
        </Axis>
        <Axis name="Size · 4">
          {SELECT_SIZES.map((size) => (
            <Item key={size} label={size} width={200}>
              <Select size={size} items={SELECT_ITEMS} placeholder="Упражнение" ariaLabel="Упражнение" />
            </Item>
          ))}
        </Axis>
        <Axis name="State">
          <Item label="disabled" width={200}>
            <Select items={SELECT_ITEMS} placeholder="Упражнение" ariaLabel="Упражнение" disabled />
          </Item>
          <Item label="error" width={200}>
            <Select
              items={SELECT_ITEMS}
              placeholder="Упражнение"
              ariaLabel="Упражнение"
              errorMessage="Выберите упражнение"
              errorPlacement="outline"
            />
          </Item>
          <Item label="counter" width={200}>
            <Select items={SELECT_ITEMS} placeholder="Упражнение" ariaLabel="Упражнение" counter={2} />
          </Item>
        </Axis>
      </Component>

      <Component kit="Avatar" code="Avatar">
        <Axis name="Size · 7">
          {AVATAR_SIZES.map((size) => (
            <Item key={size} label={size}>
              <Avatar size={size} text="ТА" alt="Тренер" />
            </Item>
          ))}
        </Axis>
        <Axis name="View · 2">
          {AVATAR_VIEWS.map((view) => (
            <Item key={view} label={view}>
              <Avatar view={view} text="ТА" alt="Тренер" />
            </Item>
          ))}
        </Axis>
        <Axis name="Theme · 2">
          {AVATAR_THEMES.map((theme) => (
            <Item key={theme} label={theme}>
              <Avatar theme={theme} text="ТА" alt="Тренер" />
            </Item>
          ))}
        </Axis>
        <Axis name="Border · 7">
          {AVATAR_BORDER_COLORS.map((color) => (
            <Item key={color} label={color}>
              <Avatar borderColor={color} text="ТА" alt="Тренер" />
            </Item>
          ))}
        </Axis>
        <Axis name="Содержимое">
          <Item label="icon">
            <Avatar icon={<Icon data={Person} size={20} />} alt="Спортсмен" />
          </Item>
          <Item label="text">
            <Avatar text="СП" alt="Спортсмен" />
          </Item>
        </Axis>
      </Component>

      <Component kit="Label" code="Label">
        <Axis name="Theme · 8">
          {LABEL_THEMES.map((theme) => (
            <Item key={theme} label={theme}>
              <Label theme={theme} content="Блок" />
            </Item>
          ))}
        </Axis>
        <Axis name="Size · 3">
          {LABEL_SIZES.map((size) => (
            <Item key={size} label={size}>
              <Label size={size} content="Блок" />
            </Item>
          ))}
        </Axis>
        <Axis name="Содержимое">
          <Item label="icon">
            <Label content="Блок" icon={<Icon data={Person} size={14} />} />
          </Item>
          <Item label="value">
            <Label content="Подходы" value="12" />
          </Item>
        </Axis>
      </Component>

      <Component kit="Alert" code="Alert">
        <Axis name="Theme · 6">
          {ALERT_THEMES.map((theme) => (
            <Item key={theme} label={theme} width={280}>
              <Alert theme={theme} title="Тренировка не сохранена" message="Нет связи с сервером" />
            </Item>
          ))}
        </Axis>
        <Axis name="View · 2">
          {ALERT_VIEWS.map((view) => (
            <Item key={view} label={view} width={280}>
              <Alert view={view} title="Тренировка не сохранена" message="Нет связи с сервером" />
            </Item>
          ))}
        </Axis>
        <Axis name="Corners · 2">
          {ALERT_CORNERS.map((corners) => (
            <Item key={corners} label={corners} width={280}>
              <Alert corners={corners} title="Тренировка не сохранена" />
            </Item>
          ))}
        </Axis>
        <Axis name="Со значком и кнопкой">
          <Item label="filled" width={280}>
            <Alert
              title="Тренировка не сохранена"
              message="Нет связи с сервером"
              icon={<Icon data={CircleInfo} size={18} />}
              actions={<Button view="outlined-info" size="s" content="Повторить" />}
            />
          </Item>
        </Axis>
      </Component>

      <Component kit="Иконотека Gravity" code="Icon">
        <Axis name="Размер">
          {[14, 16, 20, 24].map((size) => (
            <Item key={size} label={String(size)}>
              <Icon data={Play} size={size} />
            </Item>
          ))}
        </Axis>
      </Component>
    </Layer>
  )
}

function Atoms() {
  return (
    <Layer title="Атомы — 11 компонентов">
      <Component kit="Custom / divider" code="Divider">
        <Axis name="Свойств нет">
          <Item label="divider" width={280}>
            <Divider />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / table-cell" code="TableCell">
        <Axis name="Tone · 3">
          {TABLE_CELL_TONES.map((tone) => (
            <Item key={tone} label={tone}>
              <TableCell tone={tone} content="12" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / intensity-chip" code="IntensityChip">
        <Axis name="Size · 2">
          {INTENSITY_CHIP_SIZES.map((size) => (
            <Item key={size} label={size}>
              <IntensityChip size={size} content="75%" caption="2 × 2" />
            </Item>
          ))}
        </Axis>
        <Axis name="State · 2">
          {INTENSITY_CHIP_STATES.map((state) => (
            <Item key={state} label={state}>
              <IntensityChip state={state} content="75%" caption="2 × 2" />
            </Item>
          ))}
        </Axis>
        <Axis name="Band · 3">
          {INTENSITY_CHIP_BANDS.map((band) => (
            <Item key={band} label={band}>
              <IntensityChip band={band} content="75%" caption="2 × 2" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / lift-mark" code="LiftMark">
        <Axis name="State · 3">
          {LIFT_MARK_STATES.map((state) => (
            <Item key={state} label={state}>
              <LiftMark state={state} />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / set-marker" code="SetMarker">
        <Axis name="State · 3">
          {SET_MARKER_STATES.map((state) => (
            <Item key={state} label={state}>
              <SetMarker state={state} content="3" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / status-bar" code="StatusBar">
        <Axis name="Tone · 2">
          {STATUS_BAR_TONES.map((tone) => (
            <Item key={tone} label={tone} width={360}>
              <StatusBar tone={tone} time="9:41" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / exercise-row" code="ExerciseRow">
        <Axis name="Свойств нет">
          <Item label="exercise-row" width={328}>
            <ExerciseRow content="Рывок классический" caption="3 × 3" />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / stat-tile" code="StatTile">
        <Axis name="Tone · 2">
          {STAT_TILE_TONES.map((tone) => (
            <Item key={tone} label={tone}>
              <StatTile tone={tone} content="120" caption="Тоннаж" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / weight-wheel-item" code="WeightWheelItem">
        <Axis name="State · 2">
          {WEIGHT_WHEEL_ITEM_STATES.map((state) => (
            <Item key={state} label={state}>
              <WeightWheelItem state={state} whole="72" fraction="5" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / step-cell" code="StepCell">
        <Axis name="Состояние отметки">
          {SET_MARKER_STATES.map((state) => (
            <Item key={state} label={state}>
              <StepCell
                band="lime"
                chipState={state === 'current' ? 'active' : 'default'}
                content="70%"
                caption="2 × 3"
                markerState={state}
                markerContent="3"
              />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / lifts-cell" code="LiftsCell">
        <Axis name="Список отметок">
          <Item label="done, failed, skipped">
            <LiftsCell lifts={['done', 'failed', 'skipped']} />
          </Item>
        </Axis>
      </Component>
    </Layer>
  )
}

/** Ступени плана и задания: чипы разных полос, у задания — крупные. */
function plainSteps(type: (typeof EXERCISE_CARD_TYPES)[number]) {
  const size = type === 'task' ? 'l' : 's'
  return (
    <>
      <IntensityChip size={size} band="neutral" content="60%" caption="2 × 3" />
      <IntensityChip size={size} band="neutral" content="70%" caption="2 × 2" />
      <IntensityChip size={size} band="lime" content="75%" caption="2 × 2" />
      <IntensityChip size={size} band="lime" content="80%" caption="3 × 1" />
      <IntensityChip size={size} band="pink" content="90%" caption="2 × 1" />
    </>
  )
}

/** Ступени идущего упражнения: `Custom / step-cell` — чип и отметка подхода. */
const RUNNING_STEPS = (
  <>
    <StepCell band="neutral" content="50%" caption="3 × 1" markerState="done" markerContent="1" />
    <StepCell band="neutral" content="60%" caption="3 × 1" markerState="done" markerContent="2" />
    <StepCell band="lime" chipState="active" content="70%" caption="2 × 3" markerState="current" markerContent="3" />
    <StepCell band="lime" content="80%" caption="2 × 3" markerState="planned" markerContent="4" />
    <StepCell band="pink" content="90%" caption="1 × 1" markerState="planned" markerContent="5" />
  </>
)

function Molecules() {
  return (
    <Layer title="Молекулы — 12 компонентов">
      <Component kit="Custom / bottom-bar-item" code="BottomBarItem">
        <Axis name="State · 2">
          {BOTTOM_BAR_ITEM_STATES.map((state) => (
            <Item key={state} label={state}>
              <BottomBarItem state={state} label="Тренировки" icon={<Icon data={Play} size={20} />} />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / block-tab" code="BlockTab">
        <Axis name="State · 3">
          {BLOCK_TAB_STATES.map((state) => (
            <Item key={state} label={state} width={100}>
              <BlockTab state={state} content="Разминка" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / screen-header" code="ScreenHeader">
        <Axis name="Свойств нет">
          <Item label="screen-header" width={328}>
            <ScreenHeader content="12 марта" onClose={() => {}} />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / field" code="Field">
        <Axis name="Подпись и контрол">
          <Item label="field" width={240}>
            <Field label="Вес штанги">
              <TextInput placeholder="75" />
            </Field>
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / history-row" code="HistoryRow">
        <Axis name="Свойств нет">
          <Item label="history-row" width={328}>
            <HistoryRow
              content="Тренировка"
              caption="12 марта"
              mark={<Label size="xs" theme="success" content="Выполнена" />}
            />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / settings-row" code="SettingsRow">
        <Axis name="Card · 2">
          {SETTINGS_ROW_CARDS.map((card) => (
            <Item key={card} label={card} width={328}>
              <SettingsRow card={card} content="Уведомления" caption="Включены" onClick={() => {}} />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / correspondence-row" code="CorrespondenceRow">
        <Axis name="Свойств нет">
          <Item label="correspondence-row" width={328}>
            <CorrespondenceRow content="Рывок классический" pill="Рывок" />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / block-card" code="BlockCard">
        <Axis name="Shadow · 2">
          {BLOCK_CARD_SHADOWS.map((shadow) => (
            <Item key={shadow} label={shadow} width={328}>
              <BlockCard
                shadow={shadow}
                content="Разминка"
                caption="4 упражнения"
                actions={<Button view="flat-secondary" size="s" content="Открыть" />}
              />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / workout-card" code="WorkoutCard">
        <Axis name="Свойств нет">
          <Item label="workout-card" width={328}>
            <WorkoutCardSample />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / coach-comment" code="CoachComment">
        <Axis name="Band · 3">
          {COACH_COMMENT_BANDS.map((band) => (
            <Item key={band} label={band} width={328}>
              <CoachComment
                band={band}
                content="Комментарий тренера"
                author="Тренер"
                body="Держи спину, добавь паузу в подседе."
                onToggle={() => {}}
              />
            </Item>
          ))}
        </Axis>
        <Axis name="State · 2">
          {COACH_COMMENT_STATES.map((state) => (
            <Item key={state} label={state} width={328}>
              <CoachComment
                state={state}
                content="Комментарий тренера"
                author="Тренер"
                body="Держи спину, добавь паузу в подседе."
                onToggle={() => {}}
              />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / exercise-card" code="ExerciseCard">
        <Axis name="Type · 3">
          {EXERCISE_CARD_TYPES.map((type) => (
            <Item key={type} label={type} width={328}>
              <ExerciseCard
                type={type}
                content="Рывок классический"
                caption="Упражнение 2 из 5"
                steps={type === 'running' ? RUNNING_STEPS : plainSteps(type)}
                onHint={() => {}}
              />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / weight-wheel" code="WeightWheel">
        <Axis name="Direction · 2">
          {WEIGHT_WHEEL_DIRECTIONS.map((direction) => (
            <Item key={direction} label={direction} width={direction === 'vertical' ? 136 : 340}>
              <WeightWheel
                direction={direction}
                values={WHEEL_VALUES}
                selected={43}
                ariaLabel="Вес штанги"
              />
            </Item>
          ))}
        </Axis>
      </Component>
    </Layer>
  )
}

/** Карточка тренировки: содержимое приходит извне, поэтому собрана отдельно. */
function WorkoutCardSample() {
  return (
    <WorkoutCard
      content="Тренировка"
      caption="4 упражнения"
      mark={<IntensityChip content="90%" caption="2 × 2" />}
      trailing={<Button view="flat-secondary" size="s" startIcon={<Icon data={ChevronRight} size={16} />} ariaLabel="Открыть" />}
      actions={
        <>
          <Button view="flat" size="l" content="Пропустить" />
          <Button view="primary-brand" size="l" content="Начать" startIcon={<Icon data={Play} size={16} />} />
        </>
      }
    />
  )
}

function Organisms() {
  return (
    <Layer title="Организмы — 5 компонентов">
      <Component kit="Custom / bottom-bar" code="BottomBar">
        <Axis name="Active · 3">
          {BOTTOM_BAR_SECTIONS.map((section) => (
            <Item key={section} label={section} width={328}>
              <BottomBar active={section} ariaLabel="Разделы" />
            </Item>
          ))}
        </Axis>
      </Component>

      <Component kit="Custom / sticky-bar" code="StickyBar">
        <Axis name="Свойств нет">
          <Item label="sticky-bar" width={360}>
            <StickyBar>
              <Button view="secondary" size="xl" content="Слева" />
              <Button view="primary" size="xl" content="Справа" />
            </StickyBar>
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / sticky-bar-workout" code="StickyBarWorkout">
        <Axis name="Свойств нет">
          <Item label="sticky-bar-workout" width={360}>
            <StickyBarWorkout />
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / block-tabs" code="BlockTabs">
        <Axis name="Свойств нет">
          <Item label="block-tabs" width={328}>
            <BlockTabs>
              <BlockTab state="done" content="Разминка" />
              <BlockTab state="active" content="Основа" />
              <BlockTab state="default" content="Закачка" />
              <BlockTab state="default" content="Растяжка" />
            </BlockTabs>
          </Item>
        </Axis>
      </Component>

      <Component kit="Custom / paranja" code="Paranja">
        <Axis name="Свойств нет">
          <Item label="открыта" width={360}>
            <ParanjaSample />
          </Item>
        </Axis>
      </Component>
    </Layer>
  )
}

/**
 * Паранджа уходит в портал и ложится на весь экран, поэтому на обзорной
 * странице показан её цвет, а поведение проверяется в своей истории.
 */
function ParanjaSample() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        height: 120,
        padding: 8,
        borderRadius: 'var(--w-l-radius)',
        background: 'var(--w-effect-veil)',
        color: 'var(--w-text-light-primary)',
        font: 'var(--w-style-text-caption-2)',
      }}
    >
      Effect/Veil · карточка наложения ложится сюда
    </div>
  )
}

function Overview({ mode, title }: { mode: string; title: string }) {
  return (
    <div data-theme={mode}>
      <Page title={title}>
        <Base />
        <Atoms />
        <Molecules />
        <Organisms />
      </Page>
    </div>
  )
}

const meta = {
  title: 'Overview/Components',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Светлый режим — тот, что стоит на `:root`. */
export const Light: Story = {
  render: () => <Overview mode="light" title="Все компоненты — режим Light" />,
}

/** Тёмный режим. */
export const Dark: Story = {
  render: () => <Overview mode="dark" title="Все компоненты — режим Dark" />,
}

/** Светлый с повышенным контрастом. */
export const LightHighContrast: Story = {
  render: () => <Overview mode="light-hc" title="Все компоненты — режим Light HC" />,
}

/** Тёмный с повышенным контрастом. */
export const DarkHighContrast: Story = {
  render: () => <Overview mode="dark-hc" title="Все компоненты — режим Dark HC" />,
}
