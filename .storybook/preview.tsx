import type { Preview } from '@storybook/react-vite'

// Слой значений библиотеки: витрина показывает компоненты на тех же токенах, что и продукт.
import '../src/tokens/index.css'

const preview: Preview = {
  parameters: {
    /*
     * Дерево витрины — три группы по разделу «Компоненты» design-system-guide:
     * Base UI — вид наш, поведение из библиотеки; Components — написаны с нуля,
     * пары в Base UI нет; Product components — есть только у этого продукта.
     * Впереди значения и обзор, в конце экраны-примеры. Внутри группы — по алфавиту.
     */
    options: {
      storySort: {
        order: ['Foundations', 'Overview', 'Base UI', 'Components', 'Product components', 'Screen Examples'],
        method: 'alphabetical',
      },
    },

    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;