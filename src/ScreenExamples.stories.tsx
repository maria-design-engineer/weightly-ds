import type { ReactNode } from 'react'
import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  ArrowChevronRight,
  Check,
  ChevronLeft,
  Comment,
  Minus,
  Play,
  Plus,
  Xmark,
} from '@gravity-ui/icons'

import { BlockCard } from './components/BlockCard/BlockCard'
import { BlockTab } from './components/BlockTab/BlockTab'
import { BlockTabs } from './components/BlockTabs/BlockTabs'
import { Button } from './components/Button/Button'
import { CoachComment } from './components/CoachComment/CoachComment'
import { ExerciseCard } from './components/ExerciseCard/ExerciseCard'
import { Icon } from './components/Icon/Icon'
import { IntensityChip } from './components/IntensityChip/IntensityChip'
import { ScreenHeader } from './components/ScreenHeader/ScreenHeader'
import { SetMarker } from './components/SetMarker/SetMarker'
import { StatusBar } from './components/StatusBar/StatusBar'
import { StickyBarWorkout } from './components/StickyBarWorkout/StickyBarWorkout'
import { WeightWheel } from './components/WeightWheel/WeightWheel'
import './tokens/index.css'

/*
 * Два экрана продукта, собранные из библиотеки: «Прохождение · подход» и
 * «Просмотр тренировки». Сняты обходом макетов Figma 03.09.2026 —
 * `49618:55908` и `49038:9261`. Своего вида здесь нет: всё, что не компонент
 * библиотеки, — раскладка экрана. Примеры выдуманные, настоящих имён нет.
 */

/** Шкала веса: от 40 до 200 килограммов с шагом полкило. */
const WHEEL_VALUES = Array.from({ length: 321 }, (_, index) => {
  const value = 40 + index * 0.5
  return { whole: String(Math.trunc(value)), fraction: value % 1 === 0 ? '.0' : '.5' }
})

/**
 * Экран телефона: 360 в ширину, панель действий прижата к низу.
 * `scroll` — прокручивается ли содержимое: экран подхода стоит на месте,
 * экран просмотра длинный и листается.
 */
function Screen({
  height,
  children,
  bar,
  scroll = false,
}: {
  height: number
  children: ReactNode
  bar: ReactNode
  scroll?: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: 360,
        height,
        overflow: 'hidden',
        /*
         * Рамка экрана из макета: 360 × 781, радиус 32, обводка 2 внутрь на
         * Accent/Neutral Surface. Снято обходом Figma 03.09.2026.
         */
        border: '2px solid var(--w-accent-neutral-surface)',
        borderRadius: 32,
        background: 'var(--w-branding-base-background)',
        color: 'var(--w-text-primary)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: scroll ? 'auto' : 'hidden',
        }}
      >
        {children}
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0, left: 0 }}>{bar}</div>
    </div>
  )
}

/*
 * Серая панель подхода: тянется до низа экрана, под панелью действий.
 * Нижнее поле 104 — высота панели действий: содержимое под неё не уезжает.
 */
function Panel({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        gap: 16,
        padding: '16px 16px 104px',
        /* Верхние углы скруглены на 20, нижних у панели нет: она уходит за край экрана. */
        borderRadius: '20px 20px 0 0',
        background: 'var(--w-base-simple-hover-solid)',
      }}
    >
      {children}
    </div>
  )
}

/*
 * Карточка барабана: лента шире карточки — 409 против 328, — поэтому края
 * обрезаны и растворены в белое. Так же сделано в макете: две полосы по 72.
 */
function Card({ children, align }: { children: ReactNode; align?: 'center' }) {
  const fade = 'linear-gradient(90deg, var(--w-base-float-float-bg), rgba(255, 255, 255, 0))'
  return (
    <div
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'stretch',
        alignItems: align,
        gap: 16,
        padding: '12px 12px 16px',
        borderRadius: 'var(--w-xl-radius)',
        background: 'var(--w-base-float-float-bg)',
        overflow: 'hidden',
      }}
    >
      {children}
      <span
        aria-hidden
        style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 72, background: fade }}
      />
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: 72,
          background: fade,
          transform: 'scaleX(-1)',
        }}
      />
    </div>
  )
}

/** Ступени задания на экране подхода: пять чипов разных полос. */
const TASK_STEPS = (
  <>
    <IntensityChip size="l" state="active" content="50%" caption="3 × 3" />
    <IntensityChip size="l" content="60%" caption="3 × 2" />
    <IntensityChip size="l" content="92%" caption="3 × 1" />
    <IntensityChip size="l" band="lime" content="92%" caption="3 × 1" />
    <IntensityChip size="l" band="pink" content="92%" caption="3 × 1" />
  </>
)

/** Ступени задания на экране просмотра: чипы размера S. */
function planSteps(steps: { percent: string; caption: string; band?: 'neutral' | 'lime' | 'pink' }[]) {
  return (
    <>
      {steps.map((step) => (
        <IntensityChip
          key={`${step.percent}-${step.caption}`}
          band={step.band ?? 'neutral'}
          content={step.percent}
          caption={step.caption}
        />
      ))}
    </>
  )
}

/** Действия панели подхода: отметить неуспешным, успешным или пропустить. */
const WORKOUT_ACTIONS = [
  {
    id: 'fail',
    button: <Button view="flat-danger" size="xl" startIcon={<Icon data={Xmark} size={20} />} ariaLabel="Неуспешно" />,
    caption: 'Неуспешно',
  },
  {
    id: 'success',
    button: <Button view="primary-brand" size="xl" startIcon={<Icon data={Check} size={20} />} ariaLabel="Успешно" />,
    caption: 'Успешно',
  },
  {
    id: 'skip',
    button: (
      <Button view="flat-secondary" size="xl" startIcon={<Icon data={ArrowChevronRight} size={20} />} ariaLabel="Пропустить" />
    ),
    caption: 'Пропустить',
  },
]

/** Действия панели просмотра: вернуться, начать тренировку или пропустить. */
const REVIEW_ACTIONS = [
  {
    id: 'back',
    button: <Button view="flat-secondary" size="xl" startIcon={<Icon data={ChevronLeft} size={20} />} ariaLabel="Вернуться" />,
    caption: 'Вернуться',
  },
  {
    id: 'start',
    button: <Button view="primary-brand" size="xl" startIcon={<Icon data={Play} size={20} />} ariaLabel="Начать" />,
    caption: 'Начать',
  },
  {
    id: 'skip',
    button: (
      <Button view="flat-secondary" size="xl" startIcon={<Icon data={ArrowChevronRight} size={20} />} ariaLabel="Пропустить" />
    ),
    caption: 'Пропустить',
  },
]

function SetScreen() {
  const [weight, setWeight] = useState(43)
  const [lifts, setLifts] = useState(4)

  return (
    <Screen height={781} bar={<StickyBarWorkout actions={WORKOUT_ACTIONS} />}>
      <div style={{ display: 'flex', flex: 'none', flexDirection: 'column', gap: 16, paddingTop: 16 }}>
        <StatusBar tone="dark" time="9:41" />

        <div style={{ padding: '0 16px' }}>
          <ScreenHeader content="Сегодня · утро" onBack={() => {}} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px' }}>
          {/*
           * Кнопка комментария 34 × 34, радиус 10, заливка — розовое свечение
           * `Gradient/Pink glow`. Снято обходом макета Figma 03.09.2026.
           */}
          <span
            style={{
              display: 'inline-flex',
              flex: 'none',
              borderRadius: 10,
              background: 'var(--w-gradient-pink-glow)',
            }}
          >
            <Button
              view="flat"
              size="m"
              startIcon={<Icon data={Comment} size={16} />}
              ariaLabel="Комментарий тренера"
            />
          </span>
          <BlockTabs>
            <BlockTab state="done" content="Разминка" />
            <BlockTab state="active" content="Основа" />
            <BlockTab state="default" content="Закачка" />
            <BlockTab state="default" content="Растяжка" />
          </BlockTabs>
        </div>

        <ExerciseCard
          type="task"
          caption="Упражнение 2 из 5"
          content="Тяга рывковая · с подставки · с середины бедра · с остановкой · без касания помоста"
          steps={TASK_STEPS}
          onHint={() => {}}
        />
      </div>

      <Panel>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              {/* Заголовок и ряд подходов стоят по центру блока — как в макете. */}
              <span style={{ font: 'var(--w-style-header-subheader-2)' }}>Подход</span>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <SetMarker state="done" content="1" />
                <SetMarker state="current" content="2" />
                <SetMarker state="planned" content="3" />
                <Button
                  view="flat-secondary"
                  size="m"
                  startIcon={<Icon data={Plus} size={16} />}
                  ariaLabel="Добавить подход"
                />
              </div>

              <Card align="center">
                <span
                  style={{
                    alignSelf: 'stretch',
                    font: 'var(--w-style-text-caption-2)',
                    color: 'var(--w-text-secondary)',
                    textAlign: 'center',
                  }}
                >
                  50% от 123 кг
                </span>
                <WeightWheel
                  direction="horizontal"
                  values={WHEEL_VALUES}
                  selected={weight}
                  onSelect={setWeight}
                  ariaLabel="Вес подхода, килограммы"
                />
              </Card>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span
                style={{
                  font: 'var(--w-style-text-caption-2)',
                  color: 'var(--w-text-secondary)',
                  textAlign: 'center',
                }}
              >
                Подъёмы
              </span>
              <div
                style={{
                  boxSizing: 'border-box',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 24,
                  padding: 8,
                  borderRadius: 'var(--w-xl-radius)',
                  background: 'var(--w-base-float-float-bg)',
                }}
              >
                <Button
                  view="secondary"
                  size="l"
                  startIcon={<Icon data={Minus} size={16} />}
                  ariaLabel="Меньше подъёмов"
                  onClick={() => setLifts((count) => Math.max(count - 1, 0))}
                />
                <span style={{ font: 'var(--w-style-header-header-2)' }}>{lifts}</span>
                <Button
                  view="secondary"
                  size="l"
                  startIcon={<Icon data={Plus} size={16} />}
                  ariaLabel="Больше подъёмов"
                  onClick={() => setLifts((count) => count + 1)}
                />
              </div>
            </div>
      </Panel>
    </Screen>
  )
}

function ReviewScreen() {
  return (
    <Screen height={781} scroll bar={<StickyBarWorkout actions={REVIEW_ACTIONS} />}>
      {/* Системная панель стоит в 16 от верха экрана — как в макете, а не вплотную. */}
      <div style={{ position: 'absolute', top: 16, right: 0, left: 0 }}>
        <StatusBar tone="dark" time="9:41" />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          padding: '64px 16px 104px',
        }}
      >
        <ScreenHeader content="Сегодня · утро" onBack={() => {}} />

        <CoachComment
          band="pink"
          state="closed"
          content="Комментарий тренера"
          author="Тренер"
          body="Сегодня начинаем с растяжки, дальше работаем по плану и следим за спиной."
          onToggle={() => {}}
        />

        <BlockCard shadow="on" content="Разминка" caption="4 упражнения · 10 минут" />
        <BlockCard shadow="off" content="Основа" caption="63 КПШ · 5 упражнений" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <ExerciseCard
            content="Рывок классический"
            steps={planSteps([
              { percent: '75%', caption: '2 × 2' },
              { percent: '70%', caption: '2 × 2', band: 'lime' },
              { percent: '75%', caption: '2 × 2', band: 'lime' },
            ])}
          />
          <ExerciseCard
            content="Тяга рывковая с подставки с середины бедра с остановкой без касания помоста"
            steps={planSteps([
              { percent: '75%', caption: '2 × 2' },
              { percent: '75%', caption: '3 × 4', band: 'lime' },
              { percent: '90%', caption: '3 × 4', band: 'pink' },
            ])}
          />
          <ExerciseCard
            content="Тяга рывковая + рывок с виса"
            steps={planSteps([
              { percent: '70%', caption: '2 × 3', band: 'lime' },
              { percent: '90%', caption: '2 × 1', band: 'pink' },
            ])}
          />
          <ExerciseCard
            content="Приседания со штангой на груди"
            steps={planSteps([{ percent: '80%', caption: '3 × 3', band: 'lime' }])}
            onHint={() => {}}
          />
          <ExerciseCard
            content="Наклоны со штангой"
            steps={planSteps([{ percent: '75%', caption: '2 × 2' }])}
            onHint={() => {}}
          />
        </div>

        <BlockCard shadow="on" content="Закачка" caption="2 упражнения" />
        <BlockCard shadow="on" content="Растяжка" caption="2 упражнения" />
      </div>
    </Screen>
  )
}

const meta = {
  title: 'Screen Examples',
  parameters: { layout: 'centered' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

/** Экран 8 макетов: прохождение тренировки, текущий подход. */
export const SetScreenStory: Story = {
  name: 'Подход',
  render: () => <SetScreen />,
}

/** Экран 5 макетов: просмотр тренировки перед началом. */
export const ReviewScreenStory: Story = {
  name: 'Просмотр тренировки',
  render: () => <ReviewScreen />,
}
