import { useState } from 'react'
import type React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Plus } from '@gravity-ui/icons'

import { Button } from '../Button/Button'
import { Icon } from '../Icon/Icon'
import { IntensityChip } from '../IntensityChip/IntensityChip'
import { StepCell } from '../StepCell/StepCell'
import { Cell, Row } from '../story-layout'
import { ExerciseCard, type ExerciseCardProps } from './ExerciseCard'
import { ExerciseBullets } from '../ExerciseBullets/ExerciseBullets'
import { EXERCISE_CARD_STATES, EXERCISE_CARD_TYPES, EXERCISE_CARD_VIEWS } from './constants'

/*
 * Шесть ступеней: в карточку влезает пять, шестая уезжает за край — ряд
 * прокручивается. Активного чипа у плана не бывает: решение пользователя 03.09.2026.
 */
const STEPS_S = (
  <>
    <IntensityChip band="neutral" content="60%" caption="2 × 3" />
    <IntensityChip band="neutral" content="70%" caption="2 × 2" />
    <IntensityChip band="lime" content="75%" caption="2 × 2" />
    <IntensityChip band="lime" content="80%" caption="3 × 1" />
    <IntensityChip band="pink" content="90%" caption="2 × 1" />
    <IntensityChip band="pink" content="92%" caption="1 × 1" />
  </>
)

const STEPS_L = (
  <>
    <IntensityChip size="l" state="active" content="50%" caption="3 × 3" />
    <IntensityChip size="l" content="60%" caption="3 × 2" />
    <IntensityChip size="l" content="92%" caption="3 × 1" />
    <IntensityChip size="l" content="92%" caption="3 × 1" />
    <IntensityChip size="l" content="92%" caption="3 × 1" />
    <IntensityChip size="l" content="92%" caption="3 × 1" />
    {/* После чипов — «+», как на экране подхода: ряд несёт её сам. */}
    <Button view="secondary" size="l" startIcon={<Icon data={Plus} />} ariaLabel="Добавить ступень" />
  </>
)

/** Ступени идущего упражнения — компонент `StepCell`, он же `Custom / step-cell`. */
const STEPS_RUNNING = (
  <>
    <StepCell band="neutral" content="50%" caption="3 × 1" markerState="done" markerContent="1" />
    <StepCell band="neutral" content="60%" caption="3 × 1" markerState="done" markerContent="2" />
    <StepCell band="lime" content="70%" caption="2 × 3" markerState="done" markerContent="3" />
    <StepCell band="lime" chipState="active" content="70%" caption="2 × 3" markerState="current" markerContent="4" />
    <StepCell band="lime" content="70%" caption="2 × 3" markerState="planned" markerContent="5" />
    <StepCell band="pink" content="90%" caption="1 × 1" markerState="planned" markerContent="6" />
  </>
)

const STEPS_BY_TYPE = { plan: STEPS_S, task: STEPS_L, running: STEPS_RUNNING }

const TITLE_BY_TYPE = {
  plan: 'Рывок классический',
  task: 'Тяга рывковая · с подставки · с середины бедра · с остановкой · без касания помоста',
  running: 'Тяга рывковая с подставки с середины бедра с остановкой без касания помоста',
}

const meta = {
  title: 'Product components/ExerciseCard',
  component: ExerciseCard,
  argTypes: {
    type: { control: 'inline-radio', options: EXERCISE_CARD_TYPES },
    view: { control: 'inline-radio', options: EXERCISE_CARD_VIEWS },
    state: { control: 'inline-radio', options: EXERCISE_CARD_STATES },
    bullets: { control: false },
    content: { control: 'text' },
    caption: { control: 'text' },
    steps: { control: false },
    /*
     * Действия и подписи для чтения с экрана в панели не правятся: действия вешает
     * экран, подписи он же вписывает. Разворот включают кнопкой в карточке или `view`.
     */
    onHint: { table: { disable: true } },
    hintLabel: { table: { disable: true } },
    onDragStart: { table: { disable: true } },
    dragLabel: { table: { disable: true } },
    onExpand: { table: { disable: true } },
    expandLabel: { table: { disable: true } },
    collapseLabel: { table: { disable: true } },
  },
  args: {
    type: 'plan',
    content: TITLE_BY_TYPE.plan,
    caption: 'Упражнение 2 из 5',
    steps: STEPS_S,
    onHint: () => {},
  },
} satisfies Meta<typeof ExerciseCard>

export default meta
type Story = StoryObj<typeof meta>

/** Движения для списка в Playground: первое длинное — оно одно забирает две строки. */
const MOVEMENTS = [
  'Тяга рывковая · с подставки · с середины бедра · с остановкой · без касания помоста',
  'Толчок · над головой · с остановкой',
  'Толчок от груди · с помоста · на плечах · ноги вместе',
  'Тяга толчковая · с помоста · в полуприсед · ноги вместе',
  'Рывок · с виса',
]

type PlaygroundArgs = ExerciseCardProps & { movements: number }

/**
 * Карточка во всё окно витрины: тяни W и H в панели размеров — карточка тянется
 * по ширине и высоте, название сжимается до двух строк, появляются разделитель
 * и кнопка «развернуть». Кнопка работает. `movements` — одно название или список.
 */
function PlaygroundDemo({ movements, view: viewArg = 'collapsed', ...args }: PlaygroundArgs) {
  /* Переключатель `view` в панели пересоздаёт демо через `key` — состояние берёт его как начальное. */
  const [view, setView] = useState(viewArg)
  const type = args.type ?? 'plan'
  const bulletsView = type === 'plan' ? 'plan' : view
  const list = movements > 1

  return (
    <div style={{ boxSizing: 'border-box', width: '100%', height: '100vh', padding: 16 }}>
      <ExerciseCard
        {...args}
        view={view}
        content={list ? undefined : (args.content ?? MOVEMENTS[0])}
        bullets={
          list
            ? MOVEMENTS.slice(0, movements).map((movement) => (
                <ExerciseBullets key={movement} view={bulletsView} content={movement} />
              ))
            : undefined
        }
        steps={STEPS_BY_TYPE[type]}
        onExpand={() => setView((current) => (current === 'expanded' ? 'collapsed' : 'expanded'))}
        expandLabel="Развернуть название"
        collapseLabel="Свернуть название"
      />
    </div>
  )
}

export const Playground: StoryObj<PlaygroundArgs> = {
  decorators: [],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    movements: { control: { type: 'range', min: 1, max: 5, step: 1 } },
  },
  args: { type: 'task', movements: 1, content: MOVEMENTS[0] },
  render: (args) => <PlaygroundDemo key={args.view ?? 'collapsed'} {...args} />,
}

/** Ширина колонки кита, 328: в ней показывают истории без растяжения. */
const COLUMN = (Story: () => React.ReactNode) => (
  <div style={{ width: 328 }}>
    <Story />
  </div>
)

/** Ось Type: план, задание, идущее упражнение. Ряд ступеней прокручивается вбок. */
export const Types: Story = {
  decorators: [],
  render: (args) => (
    <Row>
      {EXERCISE_CARD_TYPES.map((type) => (
        <Cell key={type} label={type} width={328}>
          <ExerciseCard
            {...args}
            type={type}
            content={TITLE_BY_TYPE[type]}
            steps={STEPS_BY_TYPE[type]}
          />
        </Cell>
      ))}
    </Row>
  ),
}

/**
 * Список движений вместо названия строкой: в ките его набирают булевыми
 * `Bullets` и `Move 2`…`Move 4`, в коде он приходит слотом. Ось View меняет
 * размер набора — `collapsed` крупнее `expanded`.
 */
export const Bullets: Story = {
  decorators: [COLUMN],
  render: (args) => (
    <Row>
      {EXERCISE_CARD_VIEWS.map((view) => (
        <Cell key={view} label={view} width={328}>
          <ExerciseCard
            {...args}
            type="task"
            view={view}
            steps={STEPS_BY_TYPE.task}
            bullets={
              <>
                <ExerciseBullets view={view} content="Приседания со штангой · на груди" />
                <ExerciseBullets view={view} content="Толчок от груди" />
              </>
            }
          />
        </Cell>
      ))}
    </Row>
  ),
}

/** Задание в месте заданной высоты: название упирается в минимум и разворачивается кнопкой. */
function ExpandDemo({ list, height = 182 }: { list: boolean; height?: number | string }) {
  const [view, setView] = useState<'collapsed' | 'expanded'>('collapsed')
  const bulletsView = view === 'expanded' ? 'expanded' : 'collapsed'
  return (
    /* Ширина экрана 360; высота — место, которое экран отдаёт карточке. */
    <div style={{ width: 360, height }}>
      <ExerciseCard
        type="task"
        view={view}
        caption="Упражнение 2 из 5"
        onHint={() => {}}
        content={list ? undefined : 'Тяга рывковая · с подставки · с середины бедра · с остановкой · без касания помоста и глубокий сед в ножницы'}
        bullets={
          list ? (
            <>
              <ExerciseBullets view={bulletsView} content="Толчок · над головой · с остановкой" />
              <ExerciseBullets view={bulletsView} content="Толчок от груди · с помоста · на плечах · ноги вместе" />
              <ExerciseBullets view={bulletsView} content="Тяга толчковая · с помоста · в полуприсед · ноги вместе" />
            </>
          ) : undefined
        }
        steps={STEPS_BY_TYPE.task}
        onExpand={() => setView((current) => (current === 'expanded' ? 'collapsed' : 'expanded'))}
        expandLabel="Развернуть название"
        collapseLabel="Свернуть название"
      />
    </div>
  )
}

/**
 * Кнопка в углу задания: название не влезло — разделитель и «развернуть», по нажатию
 * название целиком текстом 13 без ряда ступеней. Гайд «как собирается название».
 */
export const Expand: Story = {
  decorators: [],
  render: () => (
    <Row>
      <Cell label="одно движение" width={360}>
        <ExpandDemo list={false} />
      </Cell>
      <Cell label="список движений" width={360}>
        <ExpandDemo list />
      </Cell>
    </Row>
  ),
}

/**
 * Высота экрана: карточка задания забирает всю высоту окна витрины. Тяни H в панели
 * размеров — на высоком окне название видно целиком, на низком сжимается до двух
 * строк, появляются разделитель и кнопка «развернуть». Минимум карточки — 182.
 */
export const ScreenHeight: Story = {
  name: 'Высота экрана',
  decorators: [],
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, height: '100vh', padding: 16, boxSizing: 'border-box' }}>
      <ExpandDemo list={false} height="100%" />
      <ExpandDemo list height="100%" />
    </div>
  ),
}

/**
 * Ось State: карточку тянут — заливка светлеет, появляется тень. Ручка справа
 * от названия стоит только там, где экран передал `onDragStart`.
 */
export const Drag: Story = {
  decorators: [COLUMN],
  render: (args) => (
    <Row>
      {EXERCISE_CARD_STATES.map((state) => (
        <Cell key={state} label={state} width={328}>
          <ExerciseCard
            {...args}
            type="plan"
            state={state}
            content={TITLE_BY_TYPE.task}
            steps={STEPS_BY_TYPE.plan}
            onDragStart={() => {}}
            dragLabel="Передвинуть упражнение"
          />
        </Cell>
      ))}
    </Row>
  ),
}
