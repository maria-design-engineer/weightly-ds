import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell, Row } from '../story-layout'
import { CoachComment } from './CoachComment'
import { COACH_COMMENT_BANDS, COACH_COMMENT_STATES } from './constants'

const meta = {
  title: 'Product components/CoachComment',
  component: CoachComment,
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    band: { control: 'inline-radio', options: COACH_COMMENT_BANDS },
    state: { control: 'inline-radio', options: COACH_COMMENT_STATES },
    content: { control: 'text' },
    author: { control: 'text' },
    body: { control: 'text' },
    onToggle: { control: 'boolean', mapping: { true: () => {}, false: undefined } },
  },
  args: {
    content: 'Комментарий тренера',
    author: 'Сергей Гаврилов',
    body: 'Сегодня надо сосредоточиться на технике.',
    onToggle: () => {},
  },
} satisfies Meta<typeof CoachComment>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Ось Band — свечение за карточкой берётся по полосе интенсивности. */
export const Bands: Story = {
  render: (args) => (
    <Row>
      {COACH_COMMENT_BANDS.map((band) => (
        <Cell key={band} label={band} width={328}>
          <CoachComment {...args} band={band} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Ось State — свёрнутый комментарий показывает только шапку. */
export const States: Story = {
  render: (args) => (
    <Row>
      {COACH_COMMENT_STATES.map((state) => (
        <Cell key={state} label={state} width={328}>
          <CoachComment {...args} state={state} />
        </Cell>
      ))}
    </Row>
  ),
}

/** Без шеврона: комментарий, который не сворачивают. Тумблер onToggle выключен. */
export const WithoutToggle: Story = {
  args: { onToggle: undefined },
}

/**
 * State=scroll на длинном тексте: карточка не растёт, текст прокручивается.
 * На коротком тексте это состояние от `open` не отличается — предела не достаёт.
 */
export const LongComment: Story = {
  args: {
    state: 'scroll',
    body:
      'Сегодня надо сосредоточиться на технике рывка. Начни с растяжки, потом работай, ' +
      'пока силы не кончатся. Если поясница тянет — снизь вес и добери объёмом, но подход ' +
      'не бросай. В конце пройди закачку целиком, она сегодня важнее основной части.',
  },
}
