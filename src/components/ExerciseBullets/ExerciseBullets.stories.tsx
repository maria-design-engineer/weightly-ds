import type { Meta, StoryObj } from '@storybook/react-vite'

import { Cell } from '../story-layout'
import { EXERCISE_BULLETS_VIEWS } from './constants'
import { ExerciseBullets } from './ExerciseBullets'

const meta = {
  title: 'Product components/ExerciseBullets',
  component: ExerciseBullets,
  argTypes: { view: { control: 'inline-radio', options: EXERCISE_BULLETS_VIEWS } },
  args: { content: 'Приседания со штангой · на груди' },
} satisfies Meta<typeof ExerciseBullets>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = { args: { view: 'collapsed' } }

/** Ось View: Subheader 2 у collapsed, Subheader 3 у plan, Body 3 у expanded. */
export const Views: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 328 }}>
      {EXERCISE_BULLETS_VIEWS.map((view) => (
        <Cell key={view} label={view} width={328}>
          <ExerciseBullets view={view} content="Приседания со штангой · на груди" />
        </Cell>
      ))}
    </div>
  ),
}
