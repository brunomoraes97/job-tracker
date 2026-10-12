import type { Preview } from '@storybook/react-vite';
import '../src/design-system/fonts';
import { GlobalStyles } from '../src/design-system/GlobalStyles';
import { color } from '../src/design-system/tokens';

const preview: Preview = {
  decorators: [
    (Story) => (
      <>
        <GlobalStyles />
        <Story />
      </>
    ),
  ],
  parameters: {
    layout: 'centered',
    controls: { expanded: true, matchers: { color: /(background|color)$/i } },
    backgrounds: {
      options: {
        canvas: { name: 'Canvas', value: color.canvas },
        surface: { name: 'Surface', value: color.surface },
        dark: { name: 'Sidebar', value: color.sidebarBg },
      },
    },
    a11y: { test: 'todo' },
    options: {
      storySort: {
        order: ['Design System', ['Visão geral', 'Tokens (referência)'], 'Atoms', 'Molecules', 'Organisms', 'Templates', 'Pages'],
      },
    },
  },
  initialGlobals: { backgrounds: { value: 'canvas' } },
};

export default preview;
