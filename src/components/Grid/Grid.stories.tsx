import type { Meta, StoryObj } from '@storybook/react-vite'

import { Grid } from './Grid'

const meta = {
  title: 'Product components/Grid',
  component: Grid,
  parameters: { layout: 'padded', controls: { disable: true } },
} satisfies Meta<typeof Grid>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Полотно на сером поле, чтобы был виден край: свойств у него нет. Мастер 1182 × 832,
 * здесь уменьшено вдвое.
 */
export const Playground: Story = {
  render: () => (
    <div style={{ padding: 16, background: 'var(--w-base-generic)' }}>
      <div style={{ width: 591, height: 416, display: 'grid' }}>
        <Grid />
      </div>
    </div>
  ),
}
