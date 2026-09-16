import type { Meta, StoryObj } from '@storybook/react-vite'

import { Avatar } from '../Avatar/Avatar'
import { Cell, Row } from '../story-layout'
import { ProfileHeader } from './ProfileHeader'

const meta = {
  title: 'Product components/ProfileHeader',
  component: ProfileHeader,
  argTypes: {
    name: { control: 'text' },
    email: { control: 'text' },
    avatar: { control: false },
    onClick: { control: false },
    ariaLabel: { control: false },
  },
  args: {
    name: 'tanya',
    email: 'tanya@mail.ru',
    avatar: <Avatar size="xl" text="T" />,
  },
} satisfies Meta<typeof ProfileHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { onClick: () => {} },
}

/**
 * Ось State живёт наведением: шапка с действием красится `Base/Simple Hover`,
 * шапка без действия не нажимается вовсе — наводить не на что.
 */
export const States: Story = {
  render: (args) => (
    <Row>
      <Cell label="с действием — наведи курсор" width={328}>
        <ProfileHeader {...args} onClick={() => {}} ariaLabel="Данные аккаунта" />
      </Cell>
      <Cell label="без действия" width={328}>
        <ProfileHeader {...args} />
      </Cell>
    </Row>
  ),
}

/** Имя не заполнено — на его месте стоит логин из почты, а в значке его первая буква. */
export const Login: Story = {
  name: 'Имя не заполнено',
  decorators: [
    (Story) => (
      <div style={{ width: 328 }}>
        <Story />
      </div>
    ),
  ],
  args: { name: 'tanya', email: 'tanya@mail.ru', avatar: <Avatar size="xl" text="T" /> },
}
