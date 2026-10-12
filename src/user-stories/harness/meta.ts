import type { Meta } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { epics } from '../catalog';
import { PrototypeApp } from './PrototypeApp';
import { withStoryBrief } from './StoryBrief';

/** Meta comum das visões de um épico: protótipo em tela cheia + cartão da história. */
export const epicMeta = (epic: number) =>
  ({
    title: `Histórias de usuário/${epic} · ${epics[epic]}`,
    component: PrototypeApp,
    tags: ['user-story'],
    parameters: { layout: 'fullscreen' },
    decorators: [withStoryBrief],
    args: { onEvent: fn() },
    argTypes: { setup: { control: false }, onEvent: { control: false } },
  }) satisfies Meta<typeof PrototypeApp>;
