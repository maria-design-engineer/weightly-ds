import type { Meta, StoryObj } from '@storybook/react-vite'

import { IntensityChip } from '../IntensityChip/IntensityChip'
import { StepCell } from '../StepCell/StepCell'
import { Cell, Row } from '../story-layout'
import { ExerciseCard } from './ExerciseCard'
import { EXERCISE_CARD_TYPES } from './constants'

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
  title: 'Custom/ExerciseCard',
  component: ExerciseCard,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    type: { control: 'inline-radio', options: EXERCISE_CARD_TYPES },
    content: { control: 'text' },
    caption: { control: 'text' },
    steps: { control: false },
    onHint: { control: false },
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

/**
 * Ступени приходят содержимым: сколько чипов передали, столько и стоит.
 * Переключатель `type` меняет и содержимое — у каждого вида кита оно своё.
 */
export const Playground: Story = {
  render: (args) => (
    <ExerciseCard
      {...args}
      content={TITLE_BY_TYPE[args.type ?? 'plan']}
      steps={STEPS_BY_TYPE[args.type ?? 'plan']}
    />
  ),
}

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
